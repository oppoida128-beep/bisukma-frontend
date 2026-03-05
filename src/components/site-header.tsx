"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, LayoutGrid } from "lucide-react"
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
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-all duration-300 bg-white",
      isScrolled ? "shadow-sm border-b" : "shadow-none border-transparent"
    )}>
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo - Sisi Kiri */}
        <div className="flex w-1/4 shrink-0">
          <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
            <LayoutGrid className="h-6 w-6 text-accent" />
            <span>Bisukma<span className="text-accent">Digital</span></span>
          </Link>
        </div>

        {/* Desktop Nav - Terpusat di Tengah */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8">
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
        </nav>

        {/* Action & Mobile Menu - Sisi Kanan */}
        <div className="flex w-1/4 justify-end shrink-0">
          <div className="hidden md:block">
            <Button variant="default" className="bg-accent hover:bg-accent/90">
              Hubungi Kami
            </Button>
          </div>

          {/* Mobile Nav Trigger */}
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
      </div>
    </header>
  )
}