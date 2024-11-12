import { NextRequest, NextResponse } from "next/server"
import { getThreadsToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = await getThreadsToken()
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const response = await fetch("https://graph.threads.net/me?fields=id,username,name,threads_profile_picture_url,threads_biography", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
  }
} 