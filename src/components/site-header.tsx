"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Profil Bisukma", href: "/profil" },
  { name: "Berita", href: "/berita" },
  { name: "Layanan", href: "/layanan" },
  { name: "Mitra", href: "/mitra" },
  { name: "Gallery", href: "/gallery" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
          <LayoutGrid className="h-6 w-6 text-accent" />
          <span>Bisukma<span className="text-accent">Digital</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                pathname === item.href ? "text-accent" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Button variant="default" className="bg-accent hover:bg-accent/90">
            Hubungi Kami
          </Button>
        </nav>

        {/* Mobile Nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-6 pt-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-accent",
                    pathname === item.href ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="default" className="mt-4 bg-accent hover:bg-accent/90">
                Hubungi Kami
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
