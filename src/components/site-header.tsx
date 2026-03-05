"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, LayoutGrid, SquareArrowUpRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
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

  const navItemClasses = "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-accent focus:text-accent transition-colors shadow-none border-none px-3 text-sm font-medium"

  const mobileNavItems = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Berita", href: "/berita" },
    { name: "Layanan", href: "/layanan" },
    { name: "Mitra", href: "/mitra" },
  ]

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "h-16 bg-white/95 backdrop-blur-md border-b shadow-sm" : "h-20 bg-white border-transparent"
    )}>
      <div className="container mx-auto flex h-full items-center px-4">
        {/* Logo */}
        <div className="flex flex-1 md:w-1/4 shrink-0">
          <Link href="/" className="flex items-center gap-2 font-headline text-lg md:text-xl font-bold text-primary">
            <LayoutGrid className="h-5 w-5 text-accent" />
            <span>Bisukma<span className="text-accent">Digital</span></span>
          </Link>
        </div>

        {/* Desktop Nav - Center */}
        <nav className="hidden md:flex flex-1 items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
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
        <div className="flex flex-1 md:w-1/4 justify-end shrink-0 items-center gap-2">
          <div className="hidden md:block">
            <MorphButton text="Daftar mitra" icon={SquareArrowUpRight} />
          </div>

          {/* Mobile Nav Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10 text-primary">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0 bg-white flex flex-col">
              <SheetHeader className="p-6 border-b text-left">
                <SheetTitle className="flex items-center gap-2">
                  <LayoutGrid className="h-5 w-5 text-accent" />
                  <span>Bisukma<span className="text-accent">Digital</span></span>
                </SheetTitle>
              </SheetHeader>
              
              <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                {mobileNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-4 rounded-xl text-base font-semibold transition-all active:scale-[0.98]",
                      pathname === item.href 
                        ? "bg-accent/10 text-accent" 
                        : "text-muted-foreground hover:bg-muted/50"
                    )}
                  >
                    {item.name}
                    {pathname === item.href && <div className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  </Link>
                ))}
              </nav>

              <div className="p-6 border-t bg-muted/20">
                <Button 
                  className="w-full h-12 bg-accent hover:bg-accent/90 text-white rounded-xl font-bold shadow-lg shadow-accent/20"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link href="/mitra">
                    Daftar Kemitraan
                    <SquareArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Transformasi Digital Bersama Kami
                </p>
              </div>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/5 hover:text-accent",
            props.className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
