import { SignInForm } from "@/components/auth/sign-in-form"

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in with Threads
          </h1>
          <p className="text-sm text-muted-foreground">
            Connect your Threads account to get started
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
} 