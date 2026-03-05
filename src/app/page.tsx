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
      {/* --- HERO SECTION --- */}
      <section className="relative pt-8 pb-12 md:pt-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(var(--accent),0.05)_0%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Typography H1 */}
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary leading-[1.2] mb-4">
            Membangun standar baru <br className="hidden md:block" />
            <span className="text-accent">dunia digital.</span>
          </h1>
          
          {/* Typography Lead */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Bisukma Digital adalah katalisator transformasi Anda. Kami menghadirkan solusi teknologi presisi tinggi untuk skala global.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            {/* Typography Small (tanpa uppercase) */}
            <p className="text-sm font-medium leading-none text-accent cursor-pointer hover:underline transition-all flex items-center gap-2">
              Konsultasi gratis
              <ArrowRight className="h-4 w-4" />
            </p>
            <p className="text-sm font-medium leading-none text-muted-foreground cursor-pointer hover:text-primary transition-all">
              Lihat katalog produk
            </p>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="container mx-auto px-4 mt-12 relative">
          <div className="relative max-w-4xl mx-auto aspect-[16/9] rounded-[1.5rem] overflow-hidden shadow-2xl border">
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
          {/* Decorative Floating Card - Typography Large & Small */}
          <div className="absolute -bottom-8 -right-4 md:right-32 bg-white p-5 rounded-xl shadow-xl hidden sm:block border max-w-[220px] animate-bounce-slow">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-accent/20 p-1.5 rounded-lg text-accent">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-semibold leading-none">Tim ahli kami</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              50+ Insinyur berpengalaman siap mendukung pertumbuhan bisnis Anda secara eksklusif.
            </p>
          </div>
        </div>
      </section>

      {/* --- CLIENT LOGOS --- */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            {[1, 2, 3, 1, 2, 3].map((id, i) => {
              const partner = PlaceHolderImages.find(p => p.id === `partner-${id}`)
              return (
                <div key={i} className="flex items-center hover:grayscale-0 transition-all cursor-pointer">
                  {partner?.imageUrl && (
                    <Image 
                      src={partner.imageUrl} 
                      alt="Partner" 
                      width={100} 
                      height={30} 
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
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              {/* Typography Small */}
              <p className="text-sm font-medium leading-none text-accent">Eksklusivitas teknologi</p>
              
              {/* Typography H2 */}
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Solusi yang dirancang khusus untuk ambisi Anda.
              </h2>
              
              {/* Typography P */}
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                Kami tidak percaya pada satu solusi untuk semua. Setiap baris kode yang kami tulis adalah cerminan dari kebutuhan unik bisnis Anda, memastikan performa maksimal dan efisiensi biaya.
              </p>
              
              {/* Typography List style */}
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2 space-y-4 pt-2 list-none ml-0">
                {[
                  { title: "Arsitektur scalable", desc: "Sistem yang tumbuh seiring pertumbuhan pengguna Anda." },
                  { title: "Keamanan militer", desc: "Perlindungan data end-to-end tanpa kompromi." },
                  { title: "Interface intuitif", desc: "Desain yang memprioritaskan pengalaman pengguna." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 group">
                    <div className="mt-1 bg-accent/10 text-accent h-5 w-5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <div>
                      {/* Typography Large */}
                      <p className="text-lg font-semibold">{item.title}</p>
                      {/* Typography Muted */}
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Button variant="ghost" className="p-0 text-accent font-bold hover:bg-transparent group h-auto">
                  Pelajari metodologi kami <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square bg-muted rounded-[2.5rem] overflow-hidden shadow-xl border max-w-md mx-auto">
                {service2Img?.imageUrl && (
                  <Image 
                    src={service2Img.imageUrl} 
                    alt="Engineering Excellence" 
                    fill 
                    className="object-cover"
                  />
                )}
              </div>
              {/* Typography Large & Small stat card */}
              <div className="absolute -top-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-2xl hidden md:block">
                <p className="text-3xl font-bold mb-1">99.9%</p>
                <p className="text-xs font-medium opacity-70">Keandalan waktu operasional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE SERVICES --- */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            {/* Typography H2 */}
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight border-none">Layanan kami</h2>
            {/* Typography Lead */}
            <p className="text-xl text-primary-foreground/60">
              Ekosistem layanan lengkap untuk mendukung setiap tahap transformasi digital Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Layout className="h-8 w-8" />, 
                title: "App development", 
                desc: "Pengembangan aplikasi web dan mobile dengan performa tinggi menggunakan stack modern.",
                img: service1Img?.imageUrl 
              },
              { 
                icon: <Layers className="h-8 w-8" />, 
                title: "Cloud migration", 
                desc: "Transisi aman ke infrastruktur cloud untuk skalabilitas tak terbatas dan efisiensi biaya.",
                img: service2Img?.imageUrl 
              },
              { 
                icon: <Monitor className="h-8 w-8" />, 
                title: "Consulting", 
                desc: "Strategi digital berbasis data untuk membantu Anda menavigasi pasar yang kompetitif.",
                img: service3Img?.imageUrl 
              }
            ].map((service, i) => (
              <Card key={i} className="bg-white/5 border-white/10 text-white overflow-hidden group hover:bg-white/10 transition-all duration-500 rounded-2xl">
                <CardContent className="p-0">
                  <div className="relative h-40 w-full opacity-60 group-hover:opacity-100 transition-opacity">
                    {service.img && <Image src={service.img} alt={service.title} fill className="object-cover" />}
                    <div className="absolute inset-0 bg-primary/40"></div>
                  </div>
                  <div className="p-8 space-y-3">
                    <div className="text-accent mb-2">{service.icon}</div>
                    {/* Typography Large */}
                    <p className="text-xl font-bold">{service.title}</p>
                    {/* Typography Muted style (white opacity) */}
                    <p className="text-sm text-primary-foreground/60 leading-relaxed">
                      {service.desc}
                    </p>
                    <Link href="/layanan" className="inline-flex items-center gap-2 text-accent font-bold pt-2 text-sm group-hover:gap-3 transition-all">
                      Detail layanan <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4 text-center">
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { label: "Klien puas", val: "200+" },
              { label: "Proyek selesai", val: "450+" },
              { label: "Negara", val: "12" },
              { label: "SLA uptime", val: "99.9%" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-4xl font-extrabold tracking-tight text-primary">{stat.val}</p>
                <p className="text-xs font-semibold text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL --- */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-muted/30 rounded-[2.5rem] p-8 md:p-16 text-center space-y-8">
            <div className="flex justify-center gap-1 text-accent">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            {/* Typography Blockquote */}
            <blockquote className="mt-6 border-l-2 border-accent pl-6 italic text-xl md:text-3xl text-primary leading-relaxed max-w-4xl mx-auto border-none">
              "Bisukma Digital bukan sekadar vendor, mereka adalah mitra strategis yang benar-benar memahami visi bisnis kami dan menerjemahkannya ke dalam solusi digital yang brilian."
            </blockquote>
            <div className="space-y-1">
              <p className="text-lg font-semibold">Hendra Kusuma</p>
              <p className="text-sm text-muted-foreground">CEO, Global Tech Solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 container mx-auto px-4">
        <div className="bg-accent rounded-[2.5rem] p-8 md:p-20 relative overflow-hidden text-white group">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
          <div className="relative z-10 max-w-3xl space-y-8">
            {/* Typography H1 (CTA style) */}
            <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl leading-[1.1]">
              Wujudkan masa depan <br /> digital Anda sekarang.
            </h2>
            {/* Typography P */}
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              Jangan biarkan kompetitor melangkah lebih dulu. Mulai perjalanan transformasi digital Anda bersama tim ahli Bisukma hari ini dengan konsultasi tanpa biaya.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="bg-white text-accent hover:bg-white/90 h-14 px-8 rounded-full text-lg font-bold shadow-2xl">
                Mulai kolaborasi
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-14 px-8 rounded-full text-lg font-bold backdrop-blur-sm">
                Hubungi kami
              </Button>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-[60px]"></div>
        </div>
      </section>
    </div>
  )
}
