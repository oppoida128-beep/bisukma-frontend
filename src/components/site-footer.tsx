
import Link from "next/link"
import { LayoutGrid, Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold text-primary">
              <LayoutGrid className="h-6 w-6 text-accent" />
              <span>Bisukma<span className="text-accent">Digital</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Solusi digital terdepan untuk transformasi bisnis masa kini. Memberikan layanan terbaik dengan inovasi dan teknologi modern.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors"><Linkedin className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors"><Twitter className="h-5 w-5" /></Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-headline font-semibold">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/profil" className="hover:text-accent transition-colors">Tentang Kami</Link></li>
              <li><Link href="/layanan" className="hover:text-accent transition-colors">Layanan Kami</Link></li>
              <li><Link href="/berita" className="hover:text-accent transition-colors">Berita Terbaru</Link></li>
              <li><Link href="/mitra" className="hover:text-accent transition-colors">Mitra Kami</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-headline font-semibold">Layanan</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Software Development</li>
              <li>Digital Transformation</li>
              <li>Cloud Computing</li>
              <li>IT Consulting</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-headline font-semibold">Kontak</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <span>info@bisukmadigital.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Bisukma Digital. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
