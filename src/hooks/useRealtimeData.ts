import { useEffect, useState } from 'react';
import { supabase, RealtimeSubscriptionOptions } from '../lib/supabase';
import { Database } from '../lib/database.types';

type TableName = keyof Database['public']['Tables'];
type Row<T extends TableName> = Database['public']['Tables'][T]['Row'];

interface UseRealtimeDataOptions<T extends TableName> {
  table: T;
  initialData?: Row<T>[];
  filter?: string;
  pageSize?: number;
}

export function useRealtimeData<T extends TableName>({
  table,
  initialData = [],
  filter,
  pageSize = 10
}: UseRealtimeDataOptions<T>) {
  const [data, setData] = useState<Row<T>[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Initial data fetch
    const fetchData = async () => {
      try {
        let query = supabase
          .from(table)
          .select('*')
          .order('created_at', { ascending: false })
          .limit(pageSize);

        if (filter) {
          // Parse the filter string into column, operator, and value
          const [column, operator, value] = filter.split('=');
          query = query.filter(column, operator, value);
        }

        const { data: initialData, error } = await query;
        if (error) throw error;
        setData(initialData as Row<T>[]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time subscription
    const subscriptionOptions: RealtimeSubscriptionOptions = {
      table,
      event: '*',
      filter,
      callback: (payload) => {
        setData((currentData) => {
          const newData = [...currentData];
          
          switch (payload.eventType) {
            case 'INSERT':
              newData.unshift(payload.new as Row<T>);
              break;
            case 'UPDATE':
              const index = newData.findIndex((item) => item.id === payload.new.id);
              if (index !== -1) {
                newData[index] = payload.new as Row<T>;
              }
              break;
            case 'DELETE':
              const deleteIndex = newData.findIndex((item) => item.id === payload.old.id);
              if (deleteIndex !== -1) {
                newData.splice(deleteIndex, 1);
              }
              break;
          }

          // Maintain page size
          return newData.slice(0, pageSize);
        });
      }
    };

    const channel = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table,
          filter
        },
        (payload) => {
          subscriptionOptions.callback(payload);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [table, filter, pageSize]);

  const refresh = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(pageSize);

      if (filter) {
        // Parse the filter string into column, operator, and value
        const [column, operator, value] = filter.split('=');
        query = query.filter(column, operator, value);
      }

      const { data: newData, error } = await query;
      if (error) throw error;
      setData(newData as Row<T>[]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refresh
  };
}

// Example usage:
/*
const { data: students, loading, error, refresh } = useRealtimeData({
  table: 'students',
  filter: 'grade=eq.10',
  pageSize: 20
});
*/ 