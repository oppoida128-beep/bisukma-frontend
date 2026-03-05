import Link from "next/link"
import { LayoutGrid, Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="border-t bg-white text-foreground">
      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand Section */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
              <LayoutGrid className="h-6 w-6 text-accent" />
              <span>Bisukma<span className="text-accent">Digital</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Katalisator transformasi digital Anda. Kami menghadirkan solusi teknologi presisi tinggi dengan standar kualitas global untuk pertumbuhan bisnis yang berkelanjutan.
            </p>
            <div className="flex gap-5">
              {[
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  className="text-muted-foreground hover:text-accent transition-all hover:scale-110"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Links Section - Grid on Mobile */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-5">
              <h3 className="text-sm font-bold tracking-wider text-primary uppercase">Eksplorasi</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/profil" className="hover:text-accent transition-colors">Profil</Link></li>
                <li><Link href="/layanan" className="hover:text-accent transition-colors">Layanan</Link></li>
                <li><Link href="/berita" className="hover:text-accent transition-colors">Berita</Link></li>
                <li><Link href="/mitra" className="hover:text-accent transition-colors">Kemitraan</Link></li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-sm font-bold tracking-wider text-primary uppercase">Solusi</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="hover:text-accent transition-colors cursor-default">Software Dev</li>
                <li className="hover:text-accent transition-colors cursor-default">Cloud Infra</li>
                <li className="hover:text-accent transition-colors cursor-default">Data Analytics</li>
                <li className="hover:text-accent transition-colors cursor-default">IT Consulting</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-sm font-bold tracking-wider text-primary uppercase">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <span className="leading-relaxed">Jl. HM Joni No. 50 L, Medan, Sumatera Utara, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <span>info@bisukmadigital.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-10 md:my-16 opacity-50" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-muted-foreground">
          <p>© {new Date().getFullYear()} Bisukma Digital. Seluruh hak cipta dilindungi.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-accent transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-accent transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
