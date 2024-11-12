import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Redirect to the threads-specific callback handler
  return NextResponse.redirect(new URL("/api/auth/callback/threads", request.url));
}
