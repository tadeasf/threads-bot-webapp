import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state") || "/";
  
  if (!code) {
    return NextResponse.redirect(new URL("/auth/error", request.url));
  }

  try {
    const tokenResponse = await fetch("https://graph.threads.net/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.THREADS_APP_ID!,
        client_secret: process.env.THREADS_APP_SECRET!,
        grant_type: "authorization_code",
        redirect_uri: process.env.THREADS_REDIRECT_URI!,
        code,
      }),
    });

    const data = await tokenResponse.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    // Here you would typically store the token in a secure session/cookie
    // For this example, we'll use cookies
    const response = NextResponse.redirect(new URL(state, request.url));
    response.cookies.set("threads_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.redirect(new URL("/auth/error", request.url));
  }
} 