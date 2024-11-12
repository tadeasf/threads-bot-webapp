import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const returnUrl = searchParams.get("return_url") || "/";

  const authUrl = new URL("https://threads.net/oauth/authorize");
  authUrl.searchParams.set("client_id", process.env.THREADS_APP_ID!);
  authUrl.searchParams.set("redirect_uri", process.env.THREADS_REDIRECT_URI!);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", [
    "threads_basic",
    "threads_content_publish",
    "threads_manage_insights",
    "threads_manage_replies",
    "threads_read_replies"
  ].join(","));
  authUrl.searchParams.set("state", returnUrl);

  return NextResponse.redirect(authUrl.toString());
} 