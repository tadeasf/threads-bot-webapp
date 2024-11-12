import { NextRequest, NextResponse } from "next/server"
import { getThreadsToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = await getThreadsToken()
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const response = await fetch("https://www.threads.net/api/graphql", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query UserData {
            me {
              id
              username
              name
              biography: threads_biography
              profilePicture: threads_profile_picture_url
            }
          }
        `
      })
    })

    const data = await response.json()
    
    if (data.errors) {
      throw new Error(data.errors[0].message)
    }

    return NextResponse.json({
      id: data.data.me.id,
      username: data.data.me.username,
      name: data.data.me.name,
      threads_biography: data.data.me.biography,
      threads_profile_picture_url: data.data.me.profilePicture
    })
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
  }
} 