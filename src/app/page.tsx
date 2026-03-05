import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Zap, Shield, Globe, Rocket, Monitor, Cpu, Sparkles, Layout, Layers, Users, Star, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero')
  const service1Img = PlaceHolderImages.find(img => img.id === 'service-1')
  const service2Img = PlaceHolderImages.find(img => img.id === 'service-2')
  const service3Img = PlaceHolderImages.find(img => img.id === 'service-3')
  
  return (
    <div className="flex flex-col w-full bg-white">
      {/* --- REFINED HERO SECTION --- */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(var(--accent),0.05)_0%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Badge variant="secondary" className="bg-accent text-white hover:bg-accent border-none">Baru</Badge>
            <span className="text-xs font-semibold text-accent tracking-wide uppercase">Inovasi Digital Terdepan 2024</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-primary leading-[1.1] mb-8">
            Membangun Standar Baru <br className="hidden md:block" />
            <span className="text-accent">Dunia Digital.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
            Bisukma Digital adalah katalisator transformasi Anda. Kami menghadirkan solusi teknologi presisi tinggi untuk skala global.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button size="lg" className="h-14 px-8 rounded-full text-lg font-bold bg-primary hover:bg-primary/90 transition-transform hover:scale-105">
              Konsultasi Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg font-bold border-primary/10 hover:bg-primary/5">
              Lihat Katalog Produk
            </Button>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="container mx-auto px-4 mt-20 relative">
          <div className="relative max-w-5xl mx-auto aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
            {heroImg?.imageUrl && (
              <Image 
                src={heroImg.imageUrl} 
                alt="Digital Transformation" 
                fill 
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          {/* Decorative Floating Card */}
          <div className="absolute -bottom-10 -right-4 md:right-20 bg-white p-6 rounded-2xl shadow-xl hidden sm:block border max-w-[240px] animate-bounce-slow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-accent/20 p-2 rounded-lg text-accent">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-sm font-bold">Tim Ahli</div>
            </div>
            <p className="text-xs text-muted-foreground">50+ Insinyur berpengalaman siap mendukung pertumbuhan bisnis Anda.</p>
          </div>
        </div>
      </section>

      {/* --- CLIENT LOGOS --- */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50">
            {[1, 2, 3, 1, 2, 3].map((id, i) => {
              const partner = PlaceHolderImages.find(p => p.id === `partner-${id}`)
              return (
                <div key={i} className="flex items-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                  {partner?.imageUrl && (
                    <Image 
                      src={partner.imageUrl} 
                      alt="Partner" 
                      width={120} 
                      height={40} 
                      className="object-contain"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- FEATURE HIGHLIGHTS --- */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <Badge variant="outline" className="rounded-full px-4 py-1 text-accent border-accent/20 font-bold uppercase tracking-widest text-[10px]">Eksklusivitas</Badge>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Solusi yang Dirancang Khusus untuk Ambisi Anda.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Kami tidak percaya pada satu solusi untuk semua. Setiap baris kode yang kami tulis adalah cerminan dari kebutuhan unik bisnis Anda, memastikan performa maksimal dan efisiensi biaya.
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  { title: "Arsitektur Scalable", desc: "Sistem yang tumbuh seiring pertumbuhan pengguna Anda." },
                  { title: "Keamanan Militer", desc: "Perlindungan data end-to-end tanpa kompromi." },
                  { title: "Interface Intuitif", desc: "Desain yang memprioritaskan pengalaman pengguna." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 group">
                    <div className="mt-1 bg-accent/10 text-accent h-6 w-6 rounded-full flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <Button size="lg" variant="ghost" className="p-0 text-accent font-bold hover:bg-transparent group">
                  Pelajari Metodologi Kami <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square bg-muted rounded-[3rem] overflow-hidden shadow-xl border">
                {service2Img?.imageUrl && (
                  <Image 
                    src={service2Img.imageUrl} 
                    alt="Engineering Excellence" 
                    fill 
                    className="object-cover"
                  />
                )}
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -top-10 -left-10 bg-primary text-white p-8 rounded-3xl shadow-2xl hidden md:block">
                <div className="text-4xl font-bold mb-1">99.9%</div>
                <div className="text-xs uppercase tracking-widest opacity-60">Uptime Reliability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE SERVICES GRID --- */}
      <section className="py-32 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">Layanan Kami</h2>
            <p className="text-primary-foreground/60 text-lg leading-relaxed">
              Ekosistem layanan lengkap untuk mendukung setiap tahap transformasi digital Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Layout className="h-10 w-10" />, 
                title: "App Development", 
                desc: "Pengembangan aplikasi web dan mobile dengan performa tinggi menggunakan tech stack modern.",
                img: service1Img?.imageUrl 
              },
              { 
                icon: <Layers className="h-10 w-10" />, 
                title: "Cloud Migration", 
                desc: "Transisi aman ke infrastruktur cloud untuk skalabilitas tak terbatas dan efisiensi biaya.",
                img: service2Img?.imageUrl 
              },
              { 
                icon: <Monitor className="h-10 w-10" />, 
                title: "Consulting", 
                desc: "Strategi digital berbasis data untuk membantu Anda menavigasi pasar yang kompetitif.",
                img: service3Img?.imageUrl 
              }
            ].map((service, i) => (
              <Card key={i} className="bg-white/5 border-white/10 text-white overflow-hidden group hover:bg-white/10 transition-all duration-500 rounded-3xl">
                <CardContent className="p-0">
                  <div className="relative h-48 w-full opacity-60 group-hover:opacity-100 transition-opacity">
                    {service.img && <Image src={service.img} alt={service.title} fill className="object-cover" />}
                    <div className="absolute inset-0 bg-primary/40"></div>
                  </div>
                  <div className="p-10 space-y-4">
                    <div className="text-accent mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-primary-foreground/60 leading-relaxed text-sm">
                      {service.desc}
                    </p>
                    <Link href="/layanan" className="inline-flex items-center gap-2 text-accent font-bold pt-4 text-sm group-hover:gap-4 transition-all">
                      Detail Layanan <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATS & TRUST --- */}
      <section className="py-32 border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { label: "Puas Klien", val: "200+" },
              { label: "Proyek Selesai", val: "450+" },
              { label: "Negara", val: "12" },
              { label: "SLA Uptime", val: "99.9%" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-5xl font-black text-primary tracking-tighter">{stat.val}</div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL MINI --- */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="bg-muted/30 rounded-[3rem] p-10 md:p-20 text-center space-y-10">
            <div className="flex justify-center gap-1 text-accent">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
            <h3 className="text-2xl md:text-4xl font-serif italic text-primary leading-relaxed max-w-4xl mx-auto">
              "Bisukma Digital bukan sekadar vendor, mereka adalah mitra strategis yang benar-benar memahami visi bisnis kami dan menerjemahkannya ke dalam solusi digital yang brilian."
            </h3>
            <div className="space-y-1">
              <div className="font-bold text-lg">Hendra Kusuma</div>
              <p className="text-sm text-muted-foreground">CEO, Global Tech Solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 container mx-auto px-4">
        <div className="bg-accent rounded-[3rem] p-10 md:p-24 relative overflow-hidden text-white group">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
          <div className="relative z-10 max-w-4xl space-y-10">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              Wujudkan Masa Depan <br /> Digital Anda Sekarang.
            </h2>
            <p className="text-xl text-white/80 max-w-2xl">
              Jangan biarkan kompetitor melangkah lebih dulu. Mulai perjalanan transformasi digital Anda bersama tim ahli Bisukma hari ini.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-white text-accent hover:bg-white/90 h-16 px-10 rounded-full text-xl font-bold shadow-2xl">
                Mulai Kolaborasi
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-16 px-10 rounded-full text-xl font-bold backdrop-blur-sm">
                Hubungi Kami
              </Button>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[80px]"></div>
        </div>
      </section>
    </div>
  )
}
