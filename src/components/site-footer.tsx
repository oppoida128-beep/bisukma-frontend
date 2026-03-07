import Link from "next/link"
import { LayoutGrid, Mail, Phone, MapPin, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-white text-foreground">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-2.5 font-headline text-2xl font-black text-primary">
              <div className="bg-accent/10 p-2 rounded-xl">
                <LayoutGrid className="h-6 w-6 text-accent" />
              </div>
              <span>Bisukma <span className="text-accent">Digital</span></span>
            </Link>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-sm font-medium">
              Katalisator transformasi digital terpercaya. Kami menghadirkan solusi teknologi presisi tinggi dengan standar kualitas global untuk pertumbuhan bisnis yang berkelanjutan.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://instagram.com/bisukma", label: "Instagram" },
                { icon: Linkedin, href: "https://linkedin.com/company/bisukma", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com/bisukma", label: "Twitter" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center h-10 w-10 rounded-full border border-muted-foreground/10 text-muted-foreground hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Links Section */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xs font-bold tracking-widest text-primary/40 uppercase">Eksplorasi</h3>
              <ul className="space-y-4">
                {[
                  { name: "Profil Bisukma", href: "/profil/tentang-kami" },
                  { name: "Layanan Kami", href: "/layanan" },
                  { name: "Berita Terbaru", href: "/berita" },
                  { name: "Kemitraan Strategis", href: "/mitra" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm font-semibold text-muted-foreground hover:text-accent transition-colors flex items-center group"
                    >
                      {link.name}
                      <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-bold tracking-widest text-primary/40 uppercase">Layanan Strategis</h3>
              <ul className="space-y-4">
                {[
                  "Perencanaan Dapur MBG",
                  "Setup Operasional Dapur",
                  "Rantai Pasok Pangan",
                  "Monitoring & Evaluasi"
                ].map((service) => (
                  <li key={service} className="text-sm font-semibold text-muted-foreground cursor-default hover:text-primary transition-colors">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xs font-bold tracking-widest text-primary/40 uppercase">Hubungi Kami</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="bg-muted p-2 rounded-lg shrink-0">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground leading-relaxed">
                  Jl. HM Joni No. 50 L, Medan, Sumatera Utara, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-muted p-2 rounded-lg shrink-0">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-muted p-2 rounded-lg shrink-0">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground truncate">bisukmafoundation@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-12 md:my-16 opacity-50" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-muted-foreground/60 tracking-tight order-2 md:order-1">
            © {currentYear} Bisukma Digital. Seluruh Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-8 order-1 md:order-2">
            <Link href="#" className="text-xs font-medium text-muted-foreground/60 hover:text-accent transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="text-xs font-medium text-muted-foreground/60 hover:text-accent transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}