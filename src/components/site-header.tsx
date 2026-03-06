"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, SquareArrowUpRight, ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MorphButton } from "@/components/ui/morph-button"
import { motion, AnimatePresence } from "framer-motion"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const profilItems: { title: string; href: string; description: string }[] = [
  {
    title: "Visi & misi",
    href: "/profil/visi-misi",
    description: "Tujuan strategis kami untuk merevolusi ekosistem teknologi.",
  },
  {
    title: "Tentang kami",
    href: "/profil/tentang-kami",
    description: "Mengenal sejarah, nilai-nilai inti, dan dedikasi kami.",
  },
  {
    title: "Nilai inti",
    href: "/profil/nilai-inti",
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
  {
    title: "Desain",
    href: "/berita?category=Desain",
    description: "Tren desain UI/UX dan estetika digital terbaru.",
  },
  {
    title: "Event",
    href: "/berita?category=Event",
    description: "Kabar seputar konferensi dan acara Bisukma.",
  },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItemClasses = "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent hover:text-accent focus:text-accent transition-colors shadow-none border-none px-3 text-sm font-medium"

  return (
    <>
      <header className={cn(
        "sticky top-0 z-[60] w-full transition-all duration-300 bg-white h-14",
        (mounted && (isScrolled || isOpen)) ? "border-b shadow-sm" : "border-transparent"
      )}>
        <div className="container mx-auto flex h-full items-center px-4 relative z-[70]">
          {/* Logo */}
          <div className="flex flex-1 md:w-1/4 shrink-0">
            <Link href="/" className="flex items-center gap-2 font-headline text-lg md:text-xl font-bold text-primary">
              <LayoutGrid className="h-5 w-5 text-accent" />
              <span>Bisukma<span className="text-accent">digital</span></span>
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
                  <NavigationMenuTrigger className={cn(navItemClasses, pathname.startsWith("/profil") && "text-accent")}>
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
                    <div className="w-[400px] md:w-[500px] lg:w-[600px] bg-white p-2">
                      <ul className="grid gap-1 md:grid-cols-2">
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
                      <div className="mt-2 p-2 pt-3 border-t">
                        <Link 
                          href="/berita" 
                          className="flex items-center justify-center gap-2 text-xs font-bold text-accent hover:text-accent/80 transition-colors py-2 group"
                        >
                          Lihat semua berita <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
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

            {/* Mobile Nav Toggle Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden h-10 w-10 relative z-[80] hover:bg-transparent focus:bg-transparent"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <motion.span
                  className="absolute w-6 h-0.5 bg-primary rounded-full"
                  initial={false}
                  animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <motion.span
                  className="absolute w-6 h-0.5 bg-primary rounded-full"
                  initial={false}
                  animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="absolute top-14 left-0 w-full bg-white border-b z-50 overflow-hidden md:hidden shadow-xl"
            >
              <nav className="container mx-auto py-6 px-4">
                <Accordion type="single" collapsible className="w-full">
                  <div className="py-2">
                    <Link 
                      href="/" 
                      className={cn(
                        "flex items-center text-base font-semibold transition-colors py-2",
                        pathname === "/" ? "text-accent" : "text-muted-foreground hover:text-accent"
                      )}
                    >
                      Beranda
                    </Link>
                  </div>

                  <AccordionItem value="profil" className="border-none">
                    <AccordionTrigger className={cn(
                      "py-2 hover:no-underline font-semibold text-base transition-colors",
                      pathname.startsWith("/profil") ? "text-accent" : "text-muted-foreground hover:text-accent"
                    )}>
                      Profil
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pl-4">
                      <div className="flex flex-col gap-4 pt-3">
                        {profilItems.map((item) => (
                          <Link 
                            key={item.title} 
                            href={item.href} 
                            className="text-sm font-medium text-muted-foreground hover:text-accent flex items-center justify-between group"
                          >
                            {item.title}
                            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="berita" className="border-none">
                    <AccordionTrigger className={cn(
                      "py-2 hover:no-underline font-semibold text-base transition-colors",
                      pathname.startsWith("/berita") ? "text-accent" : "text-muted-foreground hover:text-accent"
                    )}>
                      Berita
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pl-4">
                      <div className="flex flex-col gap-4 pt-3">
                        {beritaItems.map((item) => (
                          <Link 
                            key={item.title} 
                            href={item.href} 
                            className="text-sm font-medium text-muted-foreground hover:text-accent flex items-center justify-between group"
                          >
                            {item.title}
                            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                          </Link>
                        ))}
                        <Link 
                          href="/berita" 
                          className="text-sm font-bold text-accent hover:text-accent/80 flex items-center justify-between group pt-2"
                        >
                          Lihat semua berita
                          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <div className="py-2">
                    <Link 
                      href="/layanan" 
                      className={cn(
                        "flex items-center text-base font-semibold transition-colors py-2",
                        pathname === "/layanan" ? "text-accent" : "text-muted-foreground hover:text-accent"
                      )}
                    >
                      Layanan
                    </Link>
                  </div>

                  <div className="py-2">
                    <Link 
                      href="/mitra" 
                      className={cn(
                        "flex items-center text-base font-semibold transition-colors py-2",
                        pathname === "/mitra" ? "text-accent" : "text-muted-foreground hover:text-accent"
                      )}
                    >
                      Mitra
                    </Link>
                  </div>
                </Accordion>

                <div className="mt-8 pt-6 border-t border-muted">
                  <Button 
                    className="w-full h-12 bg-accent hover:bg-accent/90 text-white rounded-xl font-bold"
                    asChild
                  >
                    <Link href="/mitra">
                      Daftar kemitraan
                      <SquareArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
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