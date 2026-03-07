'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Tag, ArrowLeft, Share2, Copy, Check, ArrowRight, Clock } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { MorphButton } from "@/components/ui/morph-button"
import { SocialIcon } from "react-social-icons"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const articlesData = [
  {
    id: "news-1",
    title: "Masa Depan AI Dalam Transformasi Bisnis 2024",
    excerpt: "Bagaimana kecerdasan buatan mengubah cara kita bekerja dan mengelola operasi bisnis sehari-hari secara otomatis.",
    contentPart1: `Kecerdasan Buatan (AI) bukan lagi sekadar tren teknologi, melainkan fondasi baru bagi efisiensi operasional bisnis. Di tahun 2024, kita melihat pergeseran dari sekadar eksperimen menjadi integrasi penuh dalam proses pengambilan keputusan. 
    
    Bisukma Digital berkomitmen untuk menjembatani kesenjangan teknologi ini dengan menghadirkan solusi cerdas yang dapat diadaptasi oleh berbagai skala industri. Dengan pemanfaatan model bahasa besar dan analitik prediktif, perusahaan dapat menghemat waktu hingga 40% dalam tugas-tugas administratif yang repetitif.`,
    contentPart2: `Ke depannya, fokus utama akan beralih pada etika penggunaan AI dan keamanan data. Kami percaya bahwa transparansi adalah kunci dalam membangun kepercayaan antara penyedia teknologi and pengguna akhir. Melalui pendekatan yang berpusat pada manusia, AI akan menjadi mitra pendamping yang memperkuat kapabilitas tim Anda, bukan menggantikannya.`,
    date: "12 Mei 2024",
    author: "Budi Santoso",
    category: "Teknologi",
    tags: ["Artificial Intelligence", "Digital Transformation", "Business Strategy"],
    mainImgId: "news-1",
    additionalImgId: "gallery-5"
  },
  {
    id: "news-2",
    title: "Strategi Cloud Computing Untuk Startup Berkembang",
    excerpt: "Memilih infrastruktur cloud yang tepat adalah kunci skalabilitas bagi startup yang baru memasuki pasar kompetitif.",
    contentPart1: "Memilih infrastruktur cloud yang tepat adalah kunci skalabilitas bagi startup yang baru memasuki pasar kompetitif. Dengan model pay-as-you-go, perusahaan baru dapat mengelola anggaran dengan lebih fleksibel tanpa mengorbankan performa sistem.",
    contentPart2: "Selain efisiensi biaya, keamanan data di cloud juga menjadi prioritas utama. Implementasi sistem backup otomatis dan enkripsi end-to-end akan memberikan rasa aman bagi pelanggan startup dalam menitipkan data mereka.",
    date: "10 Mei 2024",
    author: "Siti Aminah",
    category: "Infrastruktur",
    tags: ["Cloud", "AWS", "Startup"],
    mainImgId: "news-2",
    additionalImgId: "gallery-4"
  },
  {
    id: "news-3",
    title: "Pentingnya Cybersecurity Di Era Kerja Remote",
    excerpt: "Melindungi data sensitif perusahaan menjadi tantangan utama saat karyawan bekerja dari berbagai lokasi yang berbeda.",
    contentPart1: "Di era digital saat ini, keamanan siber bukan lagi pilihan melainkan keharusan. Bekerja secara remote memberikan fleksibilitas, namun juga membuka celah keamanan baru bagi infrastruktur perusahaan.",
    contentPart2: "Kami menyarankan implementasi Zero Trust Architecture untuk memastikan setiap akses ke data perusahaan terverifikasi dengan ketat, terlepas dari mana pun lokasi karyawan berada.",
    date: "05 Mei 2024",
    author: "Andi Wijaya",
    category: "Keamanan",
    tags: ["Cybersecurity", "Remote Work", "Data Protection"],
    mainImgId: "news-3",
    additionalImgId: "gallery-3"
  },
  {
    id: "news-4",
    title: "Trend Desain UI/UX Yang Dominan Di Tahun Ini",
    excerpt: "Eksplorasi estetika desain minimalis and fungsional yang memberikan pengalaman pengguna terbaik di perangkat mobile.",
    contentPart1: "Desain yang baik adalah desain yang tidak terlihat. Tahun ini, fokus utama UI/UX adalah pada inklusivitas dan aksesibilitas, memastikan aplikasi dapat digunakan oleh siapa saja dengan mudah.",
    contentPart2: "Penggunaan mikro-interaksi yang halus dan tipografi yang berani menjadi kunci untuk menarik perhatian pengguna tanpa membuat mereka merasa kewalahan.",
    date: "01 Mei 2024",
    author: "Dewi Lestari",
    category: "Desain",
    tags: ["UI/UX", "Mobile App", "Design Trends"],
    mainImgId: "gallery-5",
    additionalImgId: "gallery-2"
  },
  {
    id: "news-5",
    title: "Implementasi Blockchain Untuk Supply Chain",
    excerpt: "Transparansi dan pelacakan aset menjadi lebih mudah and aman dengan pemanfaatan teknologi buku besar terdistribusi.",
    contentPart1: "Blockchain memberikan tingkat transparansi yang belum pernah ada sebelumnya dalam rantai pasok global. Setiap perpindahan barang tercatat secara permanen dan tidak dapat diubah.",
    contentPart2: "Ini membantu produsen dan konsumen untuk melacak asal-usul produk mereka, memastikan keaslian, dan meningkatkan kepercayaan di seluruh ekosistem bisnis.",
    date: "28 April 2024",
    author: "Reza Fahlevi",
    category: "Teknologi",
    tags: ["Blockchain", "Supply Chain", "Technology"],
    mainImgId: "gallery-4",
    additionalImgId: "gallery-1"
  },
  {
    id: "news-6",
    title: "Event Bisukma Digital Conference 2024",
    excerpt: "Rangkuman keseruan acara tahunan kami yang dihadiri oleh ratusan pemimpin industri dan pakar teknologi ternama.",
    contentPart1: "Konferensi tahun ini merupakan yang terbesar sepanjang sejarah Bisukma. Kami menghadirkan lebih dari 20 pembicara internasional yang berbagi wawasan tentang masa depan teknologi di Indonesia.",
    contentPart2: "Terima kasih kepada seluruh mitra and peserta yang telah hadir. Kami berharap wawasan yang didapatkan dapat menjadi katalisator bagi transformasi digital di perusahaan masing-masing.",
    date: "20 April 2024",
    author: "Admin Bisukma",
    category: "Event",
    tags: ["Conference", "Tech Event", "Networking"],
    mainImgId: "gallery-6",
    additionalImgId: "gallery-5"
  }
]

export default function BeritaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [copied, setCopied] = React.useState(false)
  const [currentUrl, setCurrentUrl] = React.useState("")

  React.useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const article = React.useMemo(() => {
    return articlesData.find(a => a.id === id) || articlesData[0]
  }, [id])

  const mainImage = PlaceHolderImages.find(img => img.id === article.mainImgId)
  const additionalImage = PlaceHolderImages.find(img => img.id === article.additionalImgId)

  const recentNews = React.useMemo(() => {
    return articlesData.filter(a => a.id !== id).slice(0, 4)
  }, [id])

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const socialLinks = React.useMemo(() => [
    { network: "whatsapp", name: "whatsapp", url: `https://wa.me/?text=${encodeURIComponent(article.title + " " + currentUrl)}` },
    { network: "facebook", name: "facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` },
    { network: "x", name: "x (twitter)", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}` },
    { network: "linkedin", name: "linkedin", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}` },
  ], [article.title, currentUrl])

  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="container mx-auto px-4 pt-8 md:pt-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          <Link href="/berita" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-accent transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Kembali Ke Berita
          </Link>

          <div className="space-y-4">
            <Badge variant="outline" className="border-accent/30 text-accent font-semibold rounded-full px-4 py-1">
              {article.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary leading-tight max-w-4xl">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-accent" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <User className="h-3.5 w-3.5 text-accent" />
                <span>Oleh {article.author}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-accent" />
                <span>5 Menit Baca</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 mt-8 md:mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="relative aspect-video w-full rounded-xl md:rounded-2xl overflow-hidden bg-muted border shadow-sm mb-10">
                {mainImage?.imageUrl && (
                  <Image 
                    src={mainImage.imageUrl} 
                    alt={article.title} 
                    fill 
                    className="object-cover"
                    priority
                  />
                )}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-base md:text-lg mb-8"
              >
                {article.contentPart1}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="my-8 md:my-10 relative aspect-[16/10] w-full rounded-xl md:rounded-2xl overflow-hidden border bg-muted shadow-sm"
              >
                {additionalImage?.imageUrl && (
                  <Image 
                    src={additionalImage.imageUrl} 
                    alt="Detail tambahan artikel" 
                    fill 
                    className="object-cover"
                  />
                )}
                {additionalImage?.description && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-xs font-medium opacity-90">{additionalImage.description}</p>
                  </div>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-base md:text-lg"
              >
                {article.contentPart2}
              </motion.div>

              <div className="mt-12 flex flex-wrap gap-2 items-center">
                <div className="flex items-center gap-2 mr-2 text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm font-semibold">Tag:</span>
                </div>
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-muted hover:bg-accent/10 hover:text-accent transition-colors border-none shadow-none font-medium px-3 py-1 text-[10px] md:text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator className="my-10" />

              <div className="flex items-center justify-between gap-4">
                <div className="shrink-0">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div>
                        <MorphButton 
                          text="Bagikan Artikel" 
                          icon={Share2} 
                          className="text-muted-foreground border-none hover:text-accent font-bold"
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-80 p-0 rounded-2xl border-none shadow-2xl bg-white overflow-hidden">
                      <div className="p-6 space-y-6">
                        <div className="space-y-1">
                          <h4 className="font-bold text-primary">Bagikan Artikel</h4>
                          <p className="text-xs text-muted-foreground font-medium">Sebarkan wawasan ini ke jejaring Anda.</p>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-2">
                          {socialLinks.map((social) => (
                            <a
                              key={social.network}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center gap-2 group p-2 rounded-xl hover:bg-muted/50 transition-colors"
                            >
                              <SocialIcon 
                                network={social.network} 
                                fgColor="#fff" 
                                style={{ height: 32, width: 32 }}
                                as="div"
                              />
                              <span className="text-[9px] font-bold text-muted-foreground group-hover:text-accent transition-colors">
                                {social.network}
                              </span>
                            </a>
                          ))}
                        </div>

                        <div className="space-y-3 pt-2">
                          <div className="relative">
                            <Separator />
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[9px] font-bold text-muted-foreground/40">Atau Salin Tautan</span>
                          </div>
                          <div className="flex items-center gap-2 bg-muted/40 p-1 pl-3 rounded-xl border border-border/50">
                            <p className="flex-1 text-[10px] text-muted-foreground truncate font-medium">
                              {currentUrl}
                            </p>
                            <Button 
                              size="sm" 
                              onClick={handleCopyLink}
                              className={cn(
                                "h-7 px-3 rounded-lg text-[10px] font-bold shadow-none transition-all duration-300",
                                copied ? "bg-green-500 text-white" : "bg-accent text-white"
                              )}
                            >
                              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                              {copied ? "Tersalin" : "Salin"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-8">
              <div className="sticky top-24">
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                  <h2 className="text-xl font-extrabold tracking-tight text-primary">Berita Terbaru</h2>
                  <Link href="/berita" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                    Lihat Semua
                  </Link>
                </div>

                <div className="flex flex-col gap-6">
                  {recentNews.map((recent) => {
                    const img = PlaceHolderImages.find(item => item.id === recent.mainImgId)
                    return (
                      <motion.div
                        key={recent.id}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link href={`/berita/${recent.id}`} className="group flex gap-4 items-start">
                          <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-muted border">
                            {img?.imageUrl && (
                              <Image 
                                src={img.imageUrl} 
                                alt={recent.title} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            )}
                          </div>
                          <div className="flex flex-col gap-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-accent font-bold text-[10px] tracking-wider">{recent.category}</span>
                            </div>
                            <h3 className="text-sm font-bold leading-snug group-hover:text-accent transition-colors line-clamp-2">
                              {recent.title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground/60">
                              <Calendar className="h-3 w-3" /> {recent.date}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="mt-12 p-6 rounded-2xl bg-muted/30 border border-muted-foreground/5 space-y-4">
                  <h3 className="text-sm font-bold text-primary">Dapatkan Update Mingguan</h3>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    Berlangganan buletin kami untuk mendapatkan wawasan teknologi terbaru langsung di email Anda.
                  </p>
                  <div className="space-y-2">
                    <input 
                      type="email" 
                      placeholder="Email Anda" 
                      className="w-full bg-white border-muted-foreground/10 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold h-9">
                      Berlangganan
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
