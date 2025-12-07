export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      brand_profiles: {
        Row: {
          accent_color: string | null
          created_at: string
          heading_font: string | null
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          primary_font: string | null
          secondary_color: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          accent_color?: string | null
          created_at?: string
          heading_font?: string | null
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          primary_font?: string | null
          secondary_color?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          accent_color?: string | null
          created_at?: string
          heading_font?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          primary_font?: string | null
          secondary_color?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      file_versions: {
        Row: {
          changes_description: string | null
          created_at: string | null
          file_id: string
          file_size: number
          id: string
          storage_path: string
          user_id: string
          version_number: number
        }
        Insert: {
          changes_description?: string | null
          created_at?: string | null
          file_id: string
          file_size: number
          id?: string
          storage_path: string
          user_id: string
          version_number: number
        }
        Update: {
          changes_description?: string | null
          created_at?: string | null
          file_id?: string
          file_size?: number
          id?: string
          storage_path?: string
          user_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "file_versions_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "plr_files"
            referencedColumns: ["id"]
          },
        ]
      }
      licenses: {
        Row: {
          acquired_date: string
          associated_content: string[] | null
          can_distribute: boolean | null
          can_edit: boolean | null
          can_sell: boolean | null
          created_at: string
          expiration_date: string | null
          id: string
          name: string
          notes: string | null
          provider: string
          requires_attribution: boolean | null
          status: string
          type: string
          updated_at: string
          usage_limitations: string | null
          user_id: string
        }
        Insert: {
          acquired_date?: string
          associated_content?: string[] | null
          can_distribute?: boolean | null
          can_edit?: boolean | null
          can_sell?: boolean | null
          created_at?: string
          expiration_date?: string | null
          id?: string
          name: string
          notes?: string | null
          provider: string
          requires_attribution?: boolean | null
          status?: string
          type: string
          updated_at?: string
          usage_limitations?: string | null
          user_id: string
        }
        Update: {
          acquired_date?: string
          associated_content?: string[] | null
          can_distribute?: boolean | null
          can_edit?: boolean | null
          can_sell?: boolean | null
          created_at?: string
          expiration_date?: string | null
          id?: string
          name?: string
          notes?: string | null
          provider?: string
          requires_attribution?: boolean | null
          status?: string
          type?: string
          updated_at?: string
          usage_limitations?: string | null
          user_id?: string
        }
        Relationships: []
      }
      plr_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      plr_files: {
        Row: {
          category_id: string | null
          confidence_score: number | null
          content_hash: string | null
          created_at: string | null
          description: string | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          is_plr: boolean | null
          last_modified: string | null
          license_text: string | null
          license_type: string | null
          notes: string | null
          quality_score: number | null
          storage_path: string | null
          tags: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category_id?: string | null
          confidence_score?: number | null
          content_hash?: string | null
          created_at?: string | null
          description?: string | null
          file_name: string
          file_path: string
          file_size?: number
          file_type: string
          id?: string
          is_plr?: boolean | null
          last_modified?: string | null
          license_text?: string | null
          license_type?: string | null
          notes?: string | null
          quality_score?: number | null
          storage_path?: string | null
          tags?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category_id?: string | null
          confidence_score?: number | null
          content_hash?: string | null
          created_at?: string | null
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          is_plr?: boolean | null
          last_modified?: string | null
          license_text?: string | null
          license_type?: string | null
          notes?: string | null
          quality_score?: number | null
          storage_path?: string | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plr_files_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "plr_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      scan_history: {
        Row: {
          created_at: string | null
          files_found: number | null
          folders_scanned: string[] | null
          id: string
          plr_files_detected: number | null
          scan_duration: number | null
          scan_options: Json | null
          scan_type: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          files_found?: number | null
          folders_scanned?: string[] | null
          id?: string
          plr_files_detected?: number | null
          scan_duration?: number | null
          scan_options?: Json | null
          scan_type?: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          files_found?: number | null
          folders_scanned?: string[] | null
          id?: string
          plr_files_detected?: number | null
          scan_duration?: number | null
          scan_options?: Json | null
          scan_type?: string
          status?: string
          user_id?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
