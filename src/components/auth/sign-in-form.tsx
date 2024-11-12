"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function SignInForm() {
  const router = useRouter()
  const { toast } = useToast()

  const handleSignIn = async () => {
    try {
      router.push("/api/threads/auth")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate sign in",
        variant: "destructive",
      })
    }
  }

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