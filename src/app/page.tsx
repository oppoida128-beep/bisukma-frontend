
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Users, Star, ArrowUpRight, Layout, Layers, Monitor, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero')
  const service1Img = PlaceHolderImages.find(img => img.id === 'service-1')
  const service2Img = PlaceHolderImages.find(img => img.id === 'service-2')
  const service3Img = PlaceHolderImages.find(img => img.id === 'service-3')
  
  const news1Img = PlaceHolderImages.find(img => img.id === 'news-1')
  const news2Img = PlaceHolderImages.find(img => img.id === 'news-2')
  const news3Img = PlaceHolderImages.find(img => img.id === 'news-3')

  const popularNews = [
    {
      title: "Pentingnya Cybersecurity di Era Kerja Remote",
      category: "Keamanan",
      img: news3Img?.imageUrl,
      excerpt: "Melindungi data sensitif perusahaan menjadi tantangan utama saat karyawan bekerja dari berbagai lokasi yang berbeda."
    },
    {
      title: "Masa Depan AI dalam Transformasi Bisnis 2024",
      category: "Teknologi",
      img: news1Img?.imageUrl,
      excerpt: "Bagaimana kecerdasan buatan mengubah cara kita bekerja dan mengelola operasi bisnis secara otomatis."
    }
  ]

  const recentlyAddedNews = [
    {
      title: "Strategi Cloud Computing untuk Startup Berkembang",
      date: "10 Mei 2024",
      category: "Infrastruktur",
      img: news2Img?.imageUrl,
      excerpt: "Memilih infrastruktur cloud yang tepat adalah kunci skalabilitas bagi startup yang baru..."
    },
    {
      title: "Trend Desain UI/UX yang Dominan di Tahun Ini",
      date: "01 Mei 2024",
      category: "Desain",
      img: PlaceHolderImages.find(img => img.id === 'gallery-5')?.imageUrl,
      excerpt: "Eksplorasi estetika desain minimalis dan fungsional yang memberikan pengalaman terbaik..."
    },
    {
      title: "Implementasi Blockchain untuk Supply Chain",
      date: "28 April 2024",
      category: "Teknologi",
      img: PlaceHolderImages.find(img => img.id === 'gallery-4')?.imageUrl,
      excerpt: "Transparansi dan pelacakan aset menjadi lebih mudah dan aman dengan teknologi blockchain."
    }
  ]

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
                data-ai-hint="digital technology"
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

      {/* --- NEWS SECTION --- */}
      <section className="py-24 border-t bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-accent tracking-wider leading-7">Berita & Wawasan</p>
              <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight">Eksplorasi Tren Digital</h2>
            </div>
            <Link href="/berita" className="text-sm font-bold flex items-center text-accent hover:underline leading-7">
              Lihat Semua Berita <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: Popular News (Carousel) */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-6">
                <Badge variant="outline" className="rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Terpopuler</Badge>
              </div>
              
              <Carousel className="w-full">
                <CarouselContent>
                  {popularNews.map((post, i) => (
                    <CarouselItem key={i}>
                      <Link href="/berita" className="group relative block aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-sm">
                        {post.img && (
                          <Image 
                            src={post.img} 
                            alt={post.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            data-ai-hint="digital innovation"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-12 md:p-16 md:pl-20 space-y-4 max-w-2xl">
                          <Badge className="bg-accent hover:bg-accent border-none text-[10px] font-bold uppercase">{post.category}</Badge>
                          <h3 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-white/80 text-sm md:text-base line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                          <div className="pt-4 flex items-center gap-2 text-white font-bold text-sm">
                            Baca Artikel <ArrowUpRight className="h-4 w-4" />
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>

            {/* Right: Recently Added (List with Photos) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="flex items-center gap-2 mb-6">
                <Badge variant="outline" className="rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Terbaru</Badge>
              </div>
              
              <div className="flex flex-col gap-6">
                {recentlyAddedNews.map((post, i) => (
                  <Link key={i} href="/berita" className="group flex gap-4 items-start">
                    <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-muted border">
                      {post.img && (
                        <Image 
                          src={post.img} 
                          alt={post.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="text-accent font-semibold">{post.category}</span>
                        <span className="flex items-center gap-1 opacity-80"><Calendar className="h-3 w-3" /> {post.date}</span>
                      </div>
                      <h3 className="text-base font-bold leading-tight group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed opacity-90">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link href="/berita" className="inline-block w-full text-center py-4 border-2 border-dashed border-muted rounded-xl text-sm font-semibold text-muted-foreground hover:text-primary hover:border-accent transition-all">
                Lihat berita lainnya
              </Link>
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
                    {service.img && <Image src={service.img} alt={service.title} fill className="object-cover" data-ai-hint="software development" />}
                    <div className="absolute inset-0 bg-primary/40"></div>
                  </div>
                  <div className="p-8 space-y-3">
                    <div className="text-accent mb-2">{service.icon}</div>
                    <p className="text-xl font-bold">{service.title}</p>
                    <p className="text-sm text-primary-foreground/60 leading-7">
                      {service.desc}
                    </p>
                    <Link href="/layanan" className="inline-flex items-center gap-2 text-accent font-bold pt-2 text-sm group-hover:gap-3 transition-all leading-7">
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
            <blockquote className="mt-6 italic text-xl md:text-3xl text-primary leading-7 max-w-4xl mx-auto border-none">
              "Bisukma Digital bukan sekadar vendor, mereka adalah mitra strategis yang benar-benar memahami visi bisnis kami dan menerjemahkannya ke dalam solusi digital yang brilian."
            </blockquote>
            <div className="space-y-1">
              <p className="text-lg font-semibold leading-7">Hendra Kusuma</p>
              <p className="text-sm text-muted-foreground leading-7">CEO, Global Tech Solutions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
