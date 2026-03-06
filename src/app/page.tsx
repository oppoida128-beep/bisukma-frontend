'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Users, ArrowUpRight, Layout, Layers, Monitor, Calendar, ChevronRight, ExternalLink, Sparkles, Utensils, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item"
import { ExternalNewsSection } from "@/components/external-news-section"

export default function Home() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const heroImg = PlaceHolderImages.find(img => img.id === 'home-hero') || PlaceHolderImages.find(img => img.id === 'hero')
  const service1Img = PlaceHolderImages.find(img => img.id === 'service-1')
  const service2Img = PlaceHolderImages.find(img => img.id === 'service-2')
  const service3Img = PlaceHolderImages.find(img => img.id === 'service-3')
  
  const news1Img = PlaceHolderImages.find(img => img.id === 'news-1')
  const news2Img = PlaceHolderImages.find(img => img.id === 'news-2')
  const news3Img = PlaceHolderImages.find(img => img.id === 'news-3')

  const popularNews = [
    {
      title: "Pentingnya cybersecurity di era kerja remote",
      category: "Keamanan",
      img: news3Img?.imageUrl,
      excerpt: "Melindungi data sensitif perusahaan menjadi tantangan utama saat karyawan bekerja dari berbagai lokasi yang berbeda."
    },
    {
      title: "Masa depan AI dalam transformasi bisnis 2024",
      category: "Teknologi",
      img: news1Img?.imageUrl,
      excerpt: "Bagaimana kecerdasan buatan mengubah cara kita bekerja dan mengelola operasi bisnis secara otomatis."
    },
    {
      title: "Event Bisukma digital conference 2024",
      category: "Event",
      img: PlaceHolderImages.find(img => img.id === 'gallery-6')?.imageUrl,
      excerpt: "Rangkuman keseruan acara tahunan kami yang dihadiri oleh ratusan pemimpin industri."
    }
  ]

  const recentlyAddedNews = [
    {
      title: "Strategi cloud computing untuk startup berkembang",
      date: "10 mei 2024",
      category: "Infrastruktur",
      img: news2Img?.imageUrl,
      excerpt: "Memilih infrastruktur cloud yang tepat adalah kunci skalabilitas bagi startup yang baru..."
    },
    {
      title: "Trend desain UI/UX yang dominan di tahun ini",
      date: "01 mei 2024",
      category: "Desain",
      img: PlaceHolderImages.find(img => img.id === 'gallery-5')?.imageUrl,
      excerpt: "Eksplorasi estetika desain minimalis and fungsional yang memberikan pengalaman terbaik..."
    },
    {
      title: "Implementasi blockchain untuk supply chain",
      date: "28 april 2024",
      category: "Teknologi",
      img: PlaceHolderImages.find(img => img.id === 'gallery-4')?.imageUrl,
      excerpt: "Transparansi dan pelacakan aset menjadi lebih mudah and aman dengan teknologi blockchain."
    }
  ]

  const programs = [
    {
      id: "prog-1",
      title: "Generasi emas 2045",
      desc: "Membangun fondasi masa depan Indonesia melalui pemenuhan gizi yang berkualitas sejak dini. Program ini mendukung terciptanya generasi sehat, cerdas, dan produktif sebagai pilar pembangunan menuju Indonesia 2045.",
      img: PlaceHolderImages.find(img => img.id === 'flip-1')?.imageUrl
    },
    {
      id: "prog-2",
      title: "Gizi untuk pelajar",
      desc: "Pemenuhan gizi yang baik membantu meningkatkan konsentrasi belajar, kesehatan, serta perkembangan fisik dan mental bagi siswa dari tingkat TK hingga SMA.",
      img: PlaceHolderImages.find(img => img.id === 'flip-2')?.imageUrl
    },
    {
      id: "prog-3",
      title: "Awal kehidupan sehat",
      desc: "Dukungan gizi bagi ibu hamil dan balita menjadi kunci tumbuh kembang optimal, sekaligus mencegah risiko stunting serta meningkatkan kualitas kesehatan generasi mendatang.",
      img: PlaceHolderImages.find(img => img.id === 'flip-3')?.imageUrl
    },
    {
      id: "prog-4",
      title: "Penguatan ekonomi lokal",
      desc: "Program ini turut mendorong pertumbuhan ekonomi masyarakat dengan melibatkan UMKM dan petani lokal sebagai bagian dari rantai pasok pangan yang berkelanjutan.",
      img: PlaceHolderImages.find(img => img.id === 'flip-4')?.imageUrl
    }
  ]

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: "easeOut" }
  }

  return (
    <div className="flex flex-col w-full bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-16 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,hsl(var(--accent)/0.05)_0%,transparent_100%)]"></div>
        <motion.div 
          className="container mx-auto px-4 relative z-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="scroll-m-20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary mb-6 leading-tight">
            Membangun standar baru <br className="hidden md:block" />
            <span className="text-accent">Dunia digital.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed px-4">
            Bisukma Digital adalah katalisator transformasi Anda. Kami menghadirkan solusi teknologi presisi tinggi untuk skala global.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Button size="lg" className="bg-accent hover:bg-accent/90 h-12 px-8 rounded-full font-semibold group border-none shadow-none w-full sm:w-auto transition-all">
              Konsultasi gratis
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link href="/layanan" className="text-sm font-medium leading-none text-muted-foreground cursor-pointer hover:text-primary transition-all border-b border-transparent hover:border-muted-foreground pb-1">
              Lihat katalog produk
            </Link>
          </div>
        </motion.div>

        <motion.div 
          className="container mx-auto px-4 mt-12 md:mt-16 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="relative max-w-4xl mx-auto aspect-[16/9] rounded-xl md:rounded-[1.5rem] overflow-hidden border bg-muted shadow-sm">
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
        </motion.div>
      </section>

      {/* --- NEWS SECTION --- */}
      <motion.section 
        className="py-16 md:py-24 border-t bg-white"
        {...fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col mb-10 md:mb-12 gap-2 text-center md:text-left">
            <p className="text-sm font-bold text-accent">Berita & wawasan</p>
            <h2 className="scroll-m-20 text-2xl md:text-3xl font-extrabold tracking-tight text-primary">Eksplorasi tren digital</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <Carousel 
                setApi={setApi} 
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 5000 })]}
                className="w-full relative overflow-hidden rounded-xl md:rounded-2xl"
              >
                <CarouselContent>
                  {popularNews.map((post, i) => (
                    <CarouselItem key={i}>
                      <Link href="/berita" className="group relative block aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden shadow-sm">
                        {post.img && (
                          <Image 
                            src={post.img} 
                            alt={post.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            data-ai-hint="digital innovation"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 md:p-12 md:pl-16 pb-12 md:pb-16 space-y-3 md:space-y-4 max-w-2xl">
                          <Badge className="bg-accent hover:bg-accent border-none text-[10px] font-bold">{post.category}</Badge>
                          <h3 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-white/80 text-xs md:text-sm line-clamp-2 leading-relaxed hidden sm:block">
                            {post.excerpt}
                          </p>
                          <div className="pt-2 flex items-center gap-2 text-white font-bold text-xs md:text-sm">
                            Baca artikel <ArrowUpRight className="h-4 w-4" />
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <CarouselPrevious className="left-2 bg-black/20 border-none text-white hover:bg-black/40 hover:text-white h-8 w-8" variant="ghost" />
                <CarouselNext className="right-2 bg-black/20 border-none text-white hover:bg-black/40 hover:text-white h-8 w-8" variant="ghost" />

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex justify-center gap-1.5 md:gap-2">
                  {Array.from({ length: count }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => api?.scrollTo(i)}
                      className={cn(
                        "h-1 md:h-1.5 rounded-full transition-all duration-300",
                        current === i ? "w-6 md:w-8 bg-accent" : "w-1 md:w-1.5 bg-white/40 hover:bg-white/60"
                      )}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </Carousel>
            </div>

            <div className="lg:col-span-4 space-y-6 md:space-y-8">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-sm px-2 py-0.5 text-[10px] font-bold">Terbaru</Badge>
              </div>
              
              <div className="flex flex-col gap-5 md:gap-6">
                {recentlyAddedNews.map((post, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href="/berita" className="group flex gap-3 md:gap-4 items-start">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg md:rounded-xl overflow-hidden bg-muted border">
                        {post.img && (
                          <Image 
                            src={post.img} 
                            alt={post.title} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5 md:gap-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-accent font-semibold text-[10px] md:text-xs">{post.category}</span>
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Calendar className="h-3 w-3" /> {post.date}</span>
                        </div>
                        <h3 className="text-sm md:text-base font-bold leading-tight group-hover:text-accent transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-[10px] text-muted-foreground line-clamp-1 opacity-90 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="pt-2">
                <Button variant="link" className="p-0 h-auto text-accent font-bold group/more text-sm" asChild>
                  <Link href="/berita">
                    Lihat berita lainnya <ArrowUpRight className="ml-1 h-4 w-4 group-hover/more:translate-x-0.5 group-hover/more:-translate-y-0.5 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- EXTERNAL NEWS SECTION --- */}
      <ExternalNewsSection />

      {/* --- FEATURED PROGRAMS SECTION (WITH FLIP EFFECT) --- */}
      <motion.section 
        className="py-16 md:py-24 bg-muted/30 overflow-hidden"
        {...fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col mb-10 md:mb-12 gap-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-accent font-bold text-sm">
              <Sparkles className="h-4 w-4" />
              Program unggulan
            </div>
            <h2 className="scroll-m-20 text-2xl md:text-4xl font-extrabold tracking-tight text-primary">Langkah nyata membangun bangsa</h2>
            <p className="text-muted-foreground max-w-2xl text-sm md:text-base font-medium">
              Langkah nyata Bisukma Group dalam membangun kemandirian dan kecerdasan bangsa melalui pilar-pilar strategis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {programs.map((prog, i) => (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group h-[400px] w-full [perspective:1000px]"
              >
                <motion.div 
                  className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 h-full w-full rounded-xl overflow-hidden [backface-visibility:hidden]">
                    {prog.img && (
                      <Image 
                        src={prog.img} 
                        alt={prog.title} 
                        fill 
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 space-y-2">
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {prog.title}
                      </h3>
                      <div className="flex items-center gap-2 text-accent text-xs font-bold tracking-widest">
                        Detail <ChevronRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 h-full w-full rounded-xl bg-accent p-8 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center text-center space-y-6">
                    <h3 className="text-2xl font-bold border-b border-white/30 pb-2 w-full">
                      {prog.title}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-90">
                      {prog.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- CORE SERVICES --- */}
      <motion.section 
        className="py-16 md:py-24 bg-accent text-white"
        {...fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col mb-10 md:mb-12 gap-2 text-center md:text-left">
            <p className="text-sm font-bold text-white/80">Layanan unggulan</p>
            <h2 className="scroll-m-20 text-2xl md:text-3xl font-extrabold tracking-tight">Solusi strategis kami</h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl">
              Dukungan penuh untuk keberhasilan pengelolaan dapur makan bergizi gratis (MBG).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                icon: <Layout className="h-6 w-6 md:h-8 md:w-8" />, 
                title: "Perencanaan dapur", 
                desc: "Studi kelayakan, perhitungan kapasitas, dan desain blueprint layout dapur standar MBG.",
                img: service1Img?.imageUrl 
              },
              { 
                icon: <Utensils className="h-6 w-6 md:h-8 md:w-8" />, 
                title: "Setup operasional", 
                desc: "Pendampingan pengadaan alat profesional and penyusunan SOP keamanan pangan.",
                img: service2Img?.imageUrl 
              },
              { 
                icon: <Users className="h-6 w-6 md:h-8 md:w-8" />, 
                title: "Pelatihan & gizi", 
                desc: "Pelatihan juru masak dan manajer dapur mengenai standar gizi serta food safety.",
                img: service3Img?.imageUrl 
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(i === 2 && "sm:col-span-2 lg:col-span-1")}
              >
                <Card className="bg-white/10 border-white/20 text-white overflow-hidden group hover:bg-white/20 transition-all duration-300 rounded-xl md:rounded-2xl shadow-none h-full flex flex-col">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative h-32 md:h-40 w-full opacity-40 group-hover:opacity-100 transition-opacity">
                      {service.img && <Image src={service.img} alt={service.title} fill className="object-cover" data-ai-hint="kitchen planning" />}
                      <div className="absolute inset-0 bg-accent/40"></div>
                    </div>
                    <div className="p-6 md:p-8 space-y-3 md:space-y-4 flex-1 flex flex-col">
                      <div className="text-white mb-1 md:mb-2">{service.icon}</div>
                      <p className="text-lg md:text-xl font-bold">{service.title}</p>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed flex-1">
                        {service.desc}
                      </p>
                      <div className="pt-4">
                        <Link href="/layanan" className="inline-flex items-center gap-2 text-white font-bold text-xs md:text-sm border border-white/40 px-4 py-1.5 rounded-full hover:bg-white/20 transition-all group/btn">
                          Detail layanan <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- ABOUT US SECTION --- */}
      <motion.section 
        className="py-16 md:py-24"
        {...fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-muted/30 rounded-2xl md:rounded-[2rem] p-6 md:p-10 overflow-hidden max-w-6xl mx-auto">
            <motion.div 
              className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer border bg-black/5 w-full shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster={PlaceHolderImages.find(img => img.id === 'profile')?.imageUrl}
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black/10"></div>
            </motion.div>

            <motion.div 
              className="space-y-4 md:space-y-6 max-w-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-1 md:space-y-2">
                <p className="text-[10px] md:text-xs font-bold text-accent">Tentang kami</p>
                <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight md:text-2xl lg:text-3xl text-primary">Katalis inovasi digital Anda</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-xs md:text-sm font-medium">
                Bisukma Digital adalah mitra transformasi teknologi yang berfokus pada inovasi dan kualitas. Kami membantu bisnis dari berbagai skala untuk tumbuh di era digital melalui solusi perangkat lunak yang cerdas dan infrastruktur cloud yang andal.
              </p>
              <p className="text-muted-foreground leading-relaxed text-[11px] md:text-xs hidden sm:block">
                Dengan tim ahli yang berdedikasi, kami menerjemahkan visi bisnis Anda menjadi kenyataan digital yang kompetitif dan skalabel.
              </p>
              
              <div className="flex w-full flex-col gap-3 pt-2">
                <Item asChild variant="default" className="p-3 hover:bg-accent/5 transition-colors">
                  <Link href="/profil/tentang-kami">
                    <ItemContent>
                      <ItemTitle className="text-xs md:text-sm">Kunjungi dokumentasi profil</ItemTitle>
                      <ItemDescription className="text-[10px] md:text-xs">
                        Pelajari bagaimana kami memulai dan nilai-nilai inti kami.
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <ChevronRight className="size-4" />
                    </ItemActions>
                  </Link>
                </Item>
                <Item variant="outline" asChild className="p-3 hover:bg-accent/5 transition-colors">
                  <a href="/layanan" target="_blank" rel="noopener noreferrer">
                    <ItemContent>
                      <ItemTitle className="text-xs md:text-sm">Sumber daya eksternal</ItemTitle>
                      <ItemDescription className="text-[10px] md:text-xs">
                        Lihat katalog layanan lengkap kami di tab baru.
                      </ItemDescription>                     </ItemContent>
                    <ItemActions>
                      <ExternalLink className="size-4" />
                    </ItemActions>
                  </a>
                </Item>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
