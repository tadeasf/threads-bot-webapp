"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"
import { Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  const revokeToken = async () => {
    try {
      const response = await fetch("/api/auth/revoke", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to revoke token")
      }

      // Clear user state
      useAuth.getState().setUser(null)
      
      // Redirect to home page
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error revoking token:", error)
    }
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <NavigationMenu className="flex-1">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Menu className="h-5 w-5" />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="min-w-[200px] p-2">
                  <Link href="/" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    Home
                  </Link>
                  {!isAuthenticated && (
                    <Link href="/sign-in" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      Sign In
                    </Link>
                  )}
                  <Link href="/privacy-policy" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    Privacy Policy
                  </Link>
                  <Link href="/tos" className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    Terms of Service
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isAuthenticated && user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user.threads_profile_picture_url} />
                    <AvatarFallback>{user.username?.[0]}</AvatarFallback>
                  </Avatar>
                  <Badge variant="outline">{user.username}</Badge>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80">
                <div className="grid gap-4 p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.threads_biography}</p>
                  </div>
                  <DropdownMenuItem
                    onClick={() => {
                      revokeToken()
                      useAuth.getState().setUser(null)
                    }}
                  >
                    Sign out
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
} 