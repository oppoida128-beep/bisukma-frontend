"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, LayoutGrid, SquareArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MorphButton } from "@/components/ui/morph-button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const profilItems: { title: string; href: string; description: string }[] = [
  {
    title: "Visi & Misi",
    href: "/profil",
    description: "Tujuan strategis kami untuk merevolusi ekosistem teknologi.",
  },
  {
    title: "Tentang Kami",
    href: "/profil",
    description: "Mengenal sejarah, nilai-nilai inti, dan dedikasi kami.",
  },
  {
    title: "Nilai Inti",
    href: "/profil",
    description: "Prinsip integritas, kolaborasi, dan kualitas kami.",
  },
]

const beritaItems: { title: string; href: string; description: string }[] = [
  {
    title: "Teknologi",
    href: "/berita?category=Teknologi",
    description: "Update terbaru mengenai perkembangan teknologi.",
  },
  {
    title: "Infrastruktur",
    href: "/berita?category=Infrastruktur",
    description: "Berita seputar infrastruktur IT dan cloud.",
  },
  {
    title: "Keamanan",
    href: "/berita?category=Keamanan",
    description: "Wawasan tentang keamanan siber dan data.",
  },
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

  const navItemClasses = "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-accent focus:text-accent transition-colors shadow-none border-none px-2 text-xs"

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-all duration-300 bg-white",
      isScrolled ? "h-14 shadow-sm border-b" : "h-14 shadow-none border-transparent"
    )}>
      <div className="container mx-auto flex h-full items-center px-4">
        {/* Logo */}
        <div className="flex w-1/4 shrink-0">
          <Link href="/" className="flex items-center gap-2 font-headline text-base font-bold text-primary">
            <LayoutGrid className="h-4 w-4 text-accent" />
            <span>Bisukma<span className="text-accent">Digital</span></span>
          </Link>
        </div>

        {/* Desktop Nav - Center */}
        <nav className="hidden md:flex flex-1 items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-0.5">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), navItemClasses, pathname === "/" && "text-accent")}>
                  <Link href="/">Beranda</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(navItemClasses, pathname === "/profil" && "text-accent")}>
                  Profil
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                    {profilItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(navItemClasses, pathname.startsWith("/berita") && "text-accent")}>
                  Berita
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                    {beritaItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), navItemClasses, pathname === "/layanan" && "text-accent")}>
                  <Link href="/layanan">Layanan</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), navItemClasses, pathname === "/mitra" && "text-accent")}>
                  <Link href="/mitra">Mitra</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Action Button */}
        <div className="flex w-1/4 justify-end shrink-0">
          <div className="hidden md:block">
            <MorphButton text="Daftar mitra" icon={SquareArrowUpRight} />
          </div>

          {/* Mobile Nav */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <nav className="flex flex-col gap-4 pt-10">
                {[
                  { name: "Beranda", href: "/" },
                  { name: "Profil", href: "/profil" },
                  { name: "Berita", href: "/berita" },
                  { name: "Layanan", href: "/layanan" },
                  { name: "Mitra", href: "/mitra" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-accent leading-6",
                      pathname === item.href ? "text-accent" : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button variant="default" className="mt-4 bg-accent hover:bg-accent/90 shadow-none">
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

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-accent",
            props.className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
