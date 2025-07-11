import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase-server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabaseServer.from("enquiries").select("*").eq("id", params.id).single()

    if (error) {
      console.error("Supabase Error:", error)
      return NextResponse.json({ error: "Failed to fetch enquiry" }, { status: 500 })
    }

    return NextResponse.json({ enquiry: data })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch enquiry" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body

    if (!status || !["new", "contacted", "qualified", "closed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const { data, error } = await supabaseServer
      .from("enquiries")
      .update({ status })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Supabase Error:", error)
      return NextResponse.json({ error: "Failed to update enquiry" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry updated successfully",
      enquiry: data,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to update enquiry" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabaseServer.from("enquiries").delete().eq("id", params.id)

    if (error) {
      console.error("Supabase Error:", error)
      return NextResponse.json({ error: "Failed to delete enquiry" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully",
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to delete enquiry" }, { status: 500 })
  }
}
