import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("threads_token");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch("https://www.threads.net/api/graphql", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query UserData {
            me {
              id
              username
              name
              threads_biography
              threads_profile_picture_url
            }
          }
        `
      })
    });

    const data = await response.json();
    
    if (data.errors) {
      if (data.errors[0]?.code === 1349245) {
        return NextResponse.json(
          { error: "Please accept the app invite in Threads first" }, 
          { status: 403 }
        );
      }
      throw new Error(data.errors[0].message);
    }

    return NextResponse.json(data.data.me);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}
