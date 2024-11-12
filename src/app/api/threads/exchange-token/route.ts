import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const shortLivedToken = cookieStore.get("threads_token");

  if (!shortLivedToken) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  try {
    const response = await fetch("https://graph.threads.net/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "th_exchange_token",
        client_secret: process.env.THREADS_APP_SECRET || "",
        access_token: shortLivedToken.value,
      }).toString(),
    });

    const data = await response.json();
    console.log("Exchange token response:", data);

    if (data.error) {
      throw new Error(data.error.message);
    }

    const cookieResponse = NextResponse.json({ expires_in: data.expires_in });
    cookieResponse.cookies.set("threads_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: data.expires_in,
    });

    return cookieResponse;
  } catch (error) {
    console.error("Token exchange error:", error);
    return NextResponse.json({ error: "Failed to exchange token" }, { status: 500 });
  }
} 