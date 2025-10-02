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
      file_versions: {
        Row: {
          changes_description: string
          created_at: string
          file_id: string
          file_size: number
          id: string
          storage_path: string
          user_id: string
          version_number: number
        }
        Insert: {
          changes_description: string
          created_at?: string
          file_id: string
          file_size: number
          id?: string
          storage_path: string
          user_id: string
          version_number?: number
        }
        Update: {
          changes_description?: string
          created_at?: string
          file_id?: string
          file_size?: number
          id?: string
          storage_path?: string
          user_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "file_versions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      plr_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parent_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plr_categories_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "plr_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plr_categories_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      plr_files: {
        Row: {
          category: string | null
          confidence_score: number
          content_hash: string
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          license_type: string | null
          metadata: Json | null
          quality_score: number | null
          tags: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          confidence_score?: number
          content_hash: string
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          license_type?: string | null
          metadata?: Json | null
          quality_score?: number | null
          tags?: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          confidence_score?: number
          content_hash?: string
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          license_type?: string | null
          metadata?: Json | null
          quality_score?: number | null
          tags?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plr_files_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      plr_file_tags: {
        Row: {
          id: string
          file_path: string
          tag_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          file_path: string
          tag_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          file_path?: string
          tag_id?: string
          user_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "plr_file_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plr_file_tags_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          onboarding_completed: boolean
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          onboarding_completed?: boolean
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          onboarding_completed?: boolean
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      scan_history: {
        Row: {
          created_at: string
          id: string
          plr_files_found: number
          scan_date: string
          total_files: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          plr_files_found: number
          scan_date: string
          total_files: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          plr_files_found?: number
          scan_date?: string
          total_files?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scan_history_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          id: string
          name: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          user_id?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}