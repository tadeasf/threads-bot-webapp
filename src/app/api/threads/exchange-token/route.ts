import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const shortLivedToken = await cookieStore.get("threads_token");

  if (!shortLivedToken) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `https://graph.threads.net/access_token?grant_type=th_exchange_token&client_secret=${process.env.THREADS_APP_SECRET}&access_token=${shortLivedToken.value}`
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    // Set the long-lived token in an HTTP-only cookie
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