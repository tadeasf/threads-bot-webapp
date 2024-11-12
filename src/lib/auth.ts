import { cookies } from "next/headers";

export async function getThreadsToken() {
  const cookieStore = await cookies();
  return cookieStore.get("threads_token")?.value;
}

export async function exchangeForLongLivedToken(shortLivedToken: string) {
  const response = await fetch(`https://graph.threads.net/access_token?` + 
    new URLSearchParams({
      grant_type: "th_exchange_token",
      client_secret: process.env.THREADS_APP_SECRET!,
      access_token: shortLivedToken,
    }));

  const data = await response.json();
  return data.access_token;
}

export async function isAuthenticated() {
  const token = await getThreadsToken();
  return !!token;
}

export async function refreshToken(token: string) {
  const response = await fetch(`https://graph.threads.net/refresh_access_token?` + 
    new URLSearchParams({
      grant_type: "th_refresh_token",
      access_token: token,
    }));

  const data = await response.json();
  return data.access_token;
}

export async function revokeToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.delete("threads_token");
} 