"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

export function SignInForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { setToken } = useAuth()

  const handleSignIn = async () => {
    try {
      // First check if we're already authenticated
      const response = await fetch("/api/threads/user");
      if (response.ok) {
        router.push("/");
        return;
      }
      
      // If not authenticated, start the OAuth flow
      router.push("/api/threads");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate sign in",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-6">
      <Button 
        onClick={handleSignIn}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      >
        Continue with Threads
      </Button>
    </div>
  )
} 
