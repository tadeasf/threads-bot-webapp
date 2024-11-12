import { cookies } from "next/headers";

export async function getThreadsToken() {
  const cookieStore = await cookies();
  return cookieStore.get("threads_token")?.value;
}

export async function isAuthenticated() {
  const token = await getThreadsToken();
  return !!token;
}

export async function revokeToken() {
  const cookieStore = await cookies();
  cookieStore.delete("threads_token");
}

export async function getUserData(token: string) {
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
  });

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  return data.data.me;
} 