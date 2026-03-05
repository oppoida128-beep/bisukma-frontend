"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const profilItems: { title: string; href: string; description: string }[] = [
  {
    title: "Visi & Misi",
    href: "/profil",
    description: "Tujuan strategis kami untuk merevolusi ekosistem teknologi di Indonesia.",
  },
  {
    title: "Tentang Kami",
    href: "/profil",
    description: "Mengenal sejarah, nilai-nilai inti, dan dedikasi kami dalam inovasi digital.",
  },
  {
    title: "Nilai Inti",
    href: "/profil",
    description: "Prinsip integritas, kolaborasi, dan kualitas yang mendasari setiap karya kami.",
  },
]

const beritaItems: { title: string; href: string; description: string }[] = [
  {
    title: "Teknologi",
    href: "/berita?category=Teknologi",
    description: "Update terbaru mengenai perkembangan teknologi dan inovasi digital.",
  },
  {
    title: "Infrastruktur",
    href: "/berita?category=Infrastruktur",
    description: "Berita seputar pengembangan infrastruktur IT dan cloud computing.",
  },
  {
    title: "Keamanan",
    href: "/berita?category=Keamanan",
    description: "Wawasan tentang keamanan siber dan perlindungan data perusahaan.",
  },
  {
    title: "Event",
    href: "/berita?category=Event",
    description: "Informasi mengenai acara, seminar, dan konferensi Bisukma Digital.",
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

  const navItemClasses = "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-accent focus:text-accent transition-colors shadow-none border-none"

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-all duration-300 bg-white",
      isScrolled ? "shadow-sm border-b" : "shadow-none border-transparent"
    )}>
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo */}
        <div className="flex w-1/4 shrink-0">
          <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
            <LayoutGrid className="h-6 w-6 text-accent" />
            <span>Bisukma<span className="text-accent">Digital</span></span>
          </Link>
        </div>

        {/* Desktop Nav - Center */}
        <nav className="hidden md:flex flex-1 items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), navItemClasses, pathname === "/" && "text-accent")}>
                  <Link href="/">Beranda</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(navItemClasses, pathname === "/profil" && "text-accent")}>
                  Profil Bisukma
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
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
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                    {beritaItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                    <li className="md:col-span-2 pt-2 border-t">
                      <NavigationMenuLink asChild>
                        <Link href="/berita" className="flex items-center justify-center p-2 text-sm font-medium text-accent hover:underline">
                          Lihat Semua Berita
                        </Link>
                      </NavigationMenuLink>
                    </li>
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

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), navItemClasses, pathname === "/gallery" && "text-accent")}>
                  <Link href="/gallery">Gallery</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Action Button */}
        <div className="flex w-1/4 justify-end shrink-0">
          <div className="hidden md:block">
            <Button variant="default" className="bg-accent hover:bg-accent/90 shadow-none">
              Hubungi Kami
            </Button>
          </div>

          {/* Mobile Nav */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <nav className="flex flex-col gap-6 pt-10">
                {[
                  { name: "Beranda", href: "/" },
                  { name: "Profil Bisukma", href: "/profil" },
                  { name: "Berita", href: "/berita" },
                  { name: "Layanan", href: "/layanan" },
                  { name: "Mitra", href: "/mitra" },
                  { name: "Gallery", href: "/gallery" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-accent leading-7",
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-accent",
            props.className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}