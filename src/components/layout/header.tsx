"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenubarMenu, Menubar, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"

export function Header() {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()

  const revokeToken = () => {
    // Implement revokeToken function
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Menubar className="flex-1">
          <MenubarMenu>
            <MenubarTrigger>Navigation</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/">Home</Link>
              </MenubarItem>
              {!isAuthenticated && (
                <MenubarItem>
                  <Link href="/sign-in">Sign In</Link>
                </MenubarItem>
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {isAuthenticated && user && (
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.threads_profile_picture_url} />
                  <AvatarFallback>{user.username?.[0]}</AvatarFallback>
                </Avatar>
                <Badge variant="outline">{user.username}</Badge>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">{user.name}</h4>
                  <p className="text-sm text-muted-foreground">{user.threads_biography}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    revokeToken()
                    useAuth.getState().setUser(null)
                  }}
                >
                  Sign out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  )
} 