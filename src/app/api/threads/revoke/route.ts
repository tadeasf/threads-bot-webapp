import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Clear the access token cookie
    const cookieStore = await cookies()
    cookieStore.delete("threads_access_token")
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error revoking token:", error)
    return NextResponse.json(
      { error: "Failed to revoke token" },
      { status: 500 }
    )
  }
} 