export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string;
          name: string;
          grade: string;
          status: 'active' | 'inactive';
          attendance: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          grade: string;
          status?: 'active' | 'inactive';
          attendance?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          grade?: string;
          status?: 'active' | 'inactive';
          attendance?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      teachers: {
        Row: {
          id: string;
          name: string;
          subject: string;
          status: 'active' | 'inactive';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          subject: string;
          status?: 'active' | 'inactive';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          subject?: string;
          status?: 'active' | 'inactive';
          created_at?: string;
          updated_at?: string;
        };
      };
      assignments: {
        Row: {
          id: string;
          title: string;
          description: string;
          subject: string;
          grade: string;
          teacher: string;
          status: 'draft' | 'published' | 'archived' | 'completed';
          due_date: string;
          attachments: Array<{
            name: string;
            url: string;
            type: string;
          }>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          subject: string;
          grade: string;
          teacher: string;
          status?: 'draft' | 'published' | 'archived' | 'completed';
          due_date: string;
          attachments?: Array<{
            name: string;
            url: string;
            type: string;
          }>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          subject?: string;
          grade?: string;
          teacher?: string;
          status?: 'draft' | 'published' | 'archived' | 'completed';
          due_date?: string;
          attachments?: Array<{
            name: string;
            url: string;
            type: string;
          }>;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          content: string;
          sender_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          content: string;
          sender_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          content?: string;
          sender_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      message_recipients: {
        Row: {
          id: string;
          message_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          message_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          message_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      teacher_students: {
        Row: {
          id: string;
          teacher_id: string;
          student_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          teacher_id: string;
          student_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          teacher_id?: string;
          student_id?: string;
          created_at?: string;
        };
      };
      parent_students: {
        Row: {
          id: string;
          parent_id: string;
          student_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          parent_id: string;
          student_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          parent_id?: string;
          student_id?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      exec_sql: {
        Args: {
          sql: string;
        };
        Returns: void;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
} 