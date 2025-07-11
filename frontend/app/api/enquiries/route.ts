import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, company, message } = body

    if (!name || !email || !company || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // delete the old enquiryService.create(…)
    const { data, error } = await supabaseServer
      .from("enquiries")
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: body.phone?.trim() || null,
          company: company.trim(),
          employees: body.employees || null,
          interest: body.interest || null,
          message: message.trim(),
        },
      ])
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully",
        id: data.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseServer.from("enquiries").select("*").order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ enquiries: data })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 })
  }
}
