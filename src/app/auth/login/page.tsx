import { LoginButton } from "@/components/auth/login-button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connect your Threads account to get started
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
} 