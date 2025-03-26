import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { useState, useEffect } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Realtime subscription types
export type RealtimeChannel = ReturnType<typeof supabase.channel>;

// Realtime subscription options
export interface RealtimeSubscriptionOptions {
  table: string;
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
  callback: (payload: any) => void;
}

// Hook for managing real-time subscriptions
export const useRealtimeSubscription = (options: RealtimeSubscriptionOptions) => {
  const channel = supabase
    .channel(`${options.table}_changes`)
    .on(
      'postgres_changes',
      {
        event: options.event,
        schema: 'public',
        table: options.table,
        filter: options.filter
      },
      (payload) => {
        options.callback(payload);
      }
    )
    .subscribe();

  return () => {
    channel.unsubscribe();
  };
};

// Row Level Security (RLS) policies
export const setupRLSPolicies = async () => {
  // Example RLS policies for different tables
  const policies = [
    {
      table: 'students',
      policy: `
        CREATE POLICY "Users can view their own students"
        ON students
        FOR SELECT
        USING (
          auth.uid() IN (
            SELECT user_id FROM teacher_students WHERE student_id = id
            UNION
            SELECT user_id FROM parent_students WHERE student_id = id
          )
        );
      `
    },
    {
      table: 'assignments',
      policy: `
        CREATE POLICY "Teachers can manage their assignments"
        ON assignments
        FOR ALL
        USING (
          auth.uid() = teacher_id
        );
      `
    },
    {
      table: 'messages',
      policy: `
        CREATE POLICY "Users can view messages they're involved in"
        ON messages
        FOR SELECT
        USING (
          auth.uid() = sender_id
          OR auth.uid() IN (
            SELECT user_id FROM message_recipients WHERE message_id = id
          )
        );
      `
    }
  ];

  // Apply policies
  for (const policy of policies) {
    try {
      await supabase.rpc('exec_sql', { sql: policy.policy });
    } catch (error) {
      console.error(`Error applying policy for ${policy.table}:`, error);
    }
  }
};

// Optimized query functions
export const getPaginatedData = async <T>(
  table: string,
  page: number,
  pageSize: number,
  filters?: Record<string, any>
) => {
  const start = page * pageSize;
  const end = start + pageSize - 1;

  let query = supabase
    .from(table)
    .select('*', { count: 'exact' })
    .range(start, end)
    .order('created_at', { ascending: false });

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    data: data as T[],
    count,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize)
  };
};

// Edge function wrapper for Netlify
export const createEdgeFunction = async (
  handler: (event: any, context: any) => Promise<any>
) => {
  return async (event: any, context: any) => {
    try {
      // Add caching headers for better performance
      const response = await handler(event, context);
      return {
        ...response,
        headers: {
          ...response.headers,
          'Cache-Control': 'public, max-age=60, stale-while-revalidate=30'
        }
      };
    } catch (error) {
      console.error('Edge function error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal server error' })
      };
    }
  };
};

// Add after the existing types
interface RealtimePayload {
  new: Record<string, any>;
  old: Record<string, any>;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  schema: string;
  table: string;
  commit_timestamp: string;
}

// Update the SubscriptionOptions interface
interface SubscriptionOptions {
  table: string;
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  filter?: string;
  callback: (payload: RealtimePayload) => void;
  debounceMs?: number;
  batchSize?: number;
  maxRetries?: number;
}

interface OptimizedSubscription {
  channel: RealtimeChannel;
  unsubscribe: () => void;
  retryCount: number;
}

// Update the createOptimizedSubscription function
export const createOptimizedSubscription = (
  options: SubscriptionOptions
): OptimizedSubscription => {
  const {
    table,
    event,
    filter,
    callback,
    debounceMs = 100,
    batchSize = 10,
    maxRetries = 3
  } = options;

  let retryCount = 0;
  let updateQueue: RealtimePayload[] = [];
  let timeoutId: NodeJS.Timeout | null = null;

  // Debounced callback for UPDATE events
  const debouncedCallback = (payload: RealtimePayload) => {
    if (event === 'UPDATE') {
      updateQueue.push(payload);
      
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        if (updateQueue.length > 0) {
          // Process updates in batches
          const batch = updateQueue.slice(0, batchSize);
          callback(batch[0]); // Process first update in batch
          updateQueue = updateQueue.slice(batchSize);
          
          // Process remaining updates if any
          if (updateQueue.length > 0) {
            debouncedCallback(updateQueue[0]);
          }
        }
      }, debounceMs);
    } else {
      callback(payload);
    }
  };

  // Create subscription channel
  const channel = supabase
    .channel(`${table}_${event}_${Math.random().toString(36).substring(7)}`)
    .on(
      'postgres_changes' as any, // Type assertion to fix the event type error
      {
        event,
        schema: 'public',
        table,
        filter
      },
      (payload: RealtimePayload) => {
        try {
          debouncedCallback(payload);
        } catch (error) {
          console.error('Error in subscription callback:', error);
          handleSubscriptionError(error);
        }
      }
    )
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log(`Subscribed to ${table} ${event} events`);
      } else if (status === 'CHANNEL_ERROR') {
        handleSubscriptionError(new Error('Channel subscription failed'));
      }
    });

  // Error handling with retry logic
  const handleSubscriptionError = (error: any) => {
    console.error('Subscription error:', error);
    
    if (retryCount < maxRetries) {
      retryCount++;
      const backoff = Math.min(1000 * Math.pow(2, retryCount), 30000);
      
      setTimeout(() => {
        console.log(`Retrying subscription (attempt ${retryCount})...`);
        channel.subscribe();
      }, backoff);
    } else {
      console.error('Max retries reached, subscription failed');
    }
  };

  return {
    channel,
    unsubscribe: () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      channel.unsubscribe();
    },
    retryCount
  };
};

// Add a hook for using optimized subscriptions
export const useOptimizedSubscription = (
  options: SubscriptionOptions,
  dependencies: any[] = []
) => {
  const [subscription, setSubscription] = useState<OptimizedSubscription | null>(null);

  useEffect(() => {
    const sub = createOptimizedSubscription(options);
    setSubscription(sub);

    return () => {
      sub.unsubscribe();
    };
  }, dependencies);

  return subscription;
};
