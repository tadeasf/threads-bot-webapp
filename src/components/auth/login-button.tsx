"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LoginButton() {
  const router = useRouter();

  return (
    <Button 
      onClick={() => router.push("/api/threads/auth")}
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
    >
      Sign in with Threads
    </Button>
  );
} 