import { NextRequest, NextResponse } from "next/server";

const SCOPES = [
  'threads_basic',
  'threads_content_publish',
  'threads_manage_insights',
  'threads_manage_replies',
  'threads_read_replies'
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const returnUrl = searchParams.get("return_url") || "/";

  const authUrl = new URL("https://www.threads.net/oauth/authorize");
  authUrl.searchParams.set("client_id", process.env.THREADS_APP_ID!);
  authUrl.searchParams.set("redirect_uri", `${process.env.NEXT_PUBLIC_APP_URL}/threads/callback`);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", SCOPES.join(","));
  authUrl.searchParams.set("state", returnUrl);

  return NextResponse.redirect(authUrl.toString());
}
