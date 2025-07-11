import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Enquiry {
  id?: string
  name: string
  email: string
  phone?: string
  company: string
  employees?: string
  interest?: string
  message: string
  status?: "new" | "contacted" | "qualified" | "closed"
  created_at?: string
  updated_at?: string
}

// Database operations
export const enquiryService = {
  // Get all enquiries (for admin use)
  async getAll() {
    const { data, error } = await supabaseBrowser
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching enquiries:", error)
      throw new Error("Failed to fetch enquiries")
    }

    return data
  },

  // Get enquiry by ID
  async getById(id: string) {
    const { data, error } = await supabaseBrowser.from("enquiries").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching enquiry:", error)
      throw new Error("Failed to fetch enquiry")
    }

    return data
  },

  // Update enquiry status
  async updateStatus(id: string, status: Enquiry["status"]) {
    const { data, error } = await supabaseBrowser.from("enquiries").update({ status }).eq("id", id).select().single()

    if (error) {
      console.error("Error updating enquiry:", error)
      throw new Error("Failed to update enquiry")
    }

    return data
  },

  // Delete enquiry
  async delete(id: string) {
    const { error } = await supabaseBrowser.from("enquiries").delete().eq("id", id)

    if (error) {
      console.error("Error deleting enquiry:", error)
      throw new Error("Failed to delete enquiry")
    }

    return true
  },
}
