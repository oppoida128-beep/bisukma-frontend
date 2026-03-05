import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Users, Star, ArrowUpRight, Layout, Layers, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero')
  const service1Img = PlaceHolderImages.find(img => img.id === 'service-1')
  const service2Img = PlaceHolderImages.find(img => img.id === 'service-2')
  const service3Img = PlaceHolderImages.find(img => img.id === 'service-3')
  
  return (
    <div className="flex flex-col w-full bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-16 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,hsl(var(--accent)/0.05)_0%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary mb-6">
            Membangun standar baru <br className="hidden md:block" />
            <span className="text-accent">dunia digital.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-7">
            Bisukma Digital adalah katalisator transformasi Anda. Kami menghadirkan solusi teknologi presisi tinggi untuk skala global.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Button size="lg" className="bg-accent hover:bg-accent/90 h-12 px-8 rounded-full font-semibold group border-none shadow-none">
              Konsultasi gratis
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm font-medium leading-none text-muted-foreground cursor-pointer hover:text-primary transition-all border-b border-transparent hover:border-muted-foreground pb-1">
              Lihat katalog produk
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-16 relative">
          <div className="relative max-w-4xl mx-auto aspect-[16/9] rounded-[1.5rem] overflow-hidden border bg-muted">
            {heroImg?.imageUrl && (
              <Image 
                src={heroImg.imageUrl} 
                alt="Digital Transformation" 
                fill 
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <div className="absolute -bottom-8 -right-4 md:right-32 bg-white p-6 rounded-xl shadow-xl hidden sm:block border max-w-[240px] animate-bounce-slow">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-accent/10 p-2 rounded-lg text-accent">
                <Users className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold leading-none">Tim ahli kami</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              50+ Insinyur berpengalaman siap mendukung pertumbuhan bisnis Anda secara eksklusif.
            </p>
          </div>
        </div>
      </section>

      {/* --- FEATURE HIGHLIGHTS --- */}
      <section className="py-24 border-t">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-sm font-medium leading-none text-accent">Eksklusivitas teknologi</p>
              
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Solusi yang dirancang khusus untuk ambisi Anda.
              </h2>
              
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                Kami tidak percaya pada satu solusi untuk semua. Setiap baris kode yang kami tulis adalah cerminan dari kebutuhan unik bisnis Anda, memastikan performa maksimal dan efisiensi biaya.
              </p>
              
              <ul className="my-6 space-y-4 pt-2">
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
                      <p className="text-lg font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Button variant="ghost" className="p-0 text-accent font-bold hover:bg-transparent group h-auto shadow-none">
                  Pelajari metodologi kami <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square bg-muted rounded-[2rem] overflow-hidden border max-w-md mx-auto">
                {service2Img?.imageUrl && (
                  <Image 
                    src={service2Img.imageUrl} 
                    alt="Engineering Excellence" 
                    fill 
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE SERVICES --- */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">Layanan kami</h2>
            <p className="text-xl text-primary-foreground/60 leading-7">
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
              <Card key={i} className="bg-white/5 border-white/10 text-white overflow-hidden group hover:bg-white/10 transition-all duration-500 rounded-2xl shadow-none">
                <CardContent className="p-0">
                  <div className="relative h-40 w-full opacity-40 group-hover:opacity-100 transition-opacity">
                    {service.img && <Image src={service.img} alt={service.title} fill className="object-cover" />}
                    <div className="absolute inset-0 bg-primary/40"></div>
                  </div>
                  <div className="p-8 space-y-3">
                    <div className="text-accent mb-2">{service.icon}</div>
                    <p className="text-xl font-bold">{service.title}</p>
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

      {/* --- TESTIMONIAL --- */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-muted/30 rounded-[2.5rem] p-8 md:p-16 text-center space-y-8">
            <div className="flex justify-center gap-1 text-accent">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="mt-6 italic text-xl md:text-3xl text-primary leading-relaxed max-w-4xl mx-auto border-none">
              "Bisukma Digital bukan sekadar vendor, mereka adalah mitra strategis yang benar-benar memahami visi bisnis kami dan menerjemahkannya ke dalam solusi digital yang brilian."
            </blockquote>
            <div className="space-y-1">
              <p className="text-lg font-semibold">Hendra Kusuma</p>
              <p className="text-sm text-muted-foreground">CEO, Global Tech Solutions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
