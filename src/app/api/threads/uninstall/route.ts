import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const signature = headersList.get("x-hub-signature");
  
  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 401 });
  }

  try {
    const body = await request.text();
    
    const expectedSignature = crypto
      .createHmac("sha256", process.env.CLIENT_TOKEN!)
      .update(body)
      .digest("hex");
    
    if (signature !== `sha256=${expectedSignature}`) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const data = JSON.parse(body);
    console.log("App uninstalled for user:", data.user_id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Uninstall webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
