'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Calendar, User, Tag, ArrowLeft, Share2, Copy, Check } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { MorphButton } from "@/components/ui/morph-button"
import { SocialIcon } from "react-social-icons"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const articlesData = [
  {
    id: "news-1",
    title: "Masa depan AI dalam transformasi bisnis 2024",
    contentPart1: `Kecerdasan Buatan (AI) bukan lagi sekadar tren teknologi, melainkan fondasi baru bagi efisiensi operasional bisnis. Di tahun 2024, kita melihat pergeseran dari sekadar eksperimen menjadi integrasi penuh dalam proses pengambilan keputusan. 
    
    Bisukma Digital berkomitmen untuk menjembatani kesenjangan teknologi ini dengan menghadirkan solusi cerdas yang dapat diadaptasi oleh berbagai skala industri. Dengan pemanfaatan model bahasa besar dan analitik prediktif, perusahaan dapat menghemat waktu hingga 40% dalam tugas-tugas administratif yang repetitif.`,
    contentPart2: `Ke depannya, fokus utama akan beralih pada etika penggunaan AI dan keamanan data. Kami percaya bahwa transparansi adalah kunci dalam membangun kepercayaan antara penyedia teknologi dan pengguna akhir. Melalui pendekatan yang berpusat pada manusia, AI akan menjadi mitra pendamping yang memperkuat kapabilitas tim Anda, bukan menggantikannya.`,
    date: "12 Mei 2024",
    author: "Budi Santoso",
    category: "Teknologi",
    tags: ["Artificial Intelligence", "Digital Transformation", "Business Strategy"],
    mainImgId: "news-1",
    additionalImgId: "gallery-5"
  },
  {
    id: "news-2",
    title: "Strategi cloud computing untuk startup berkembang",
    contentPart1: "Memilih infrastruktur cloud yang tepat adalah kunci skalabilitas bagi startup yang baru memasuki pasar kompetitif. Dengan model pay-as-you-go, perusahaan baru dapat mengelola anggaran dengan lebih fleksibel tanpa mengorbankan performa sistem.",
    contentPart2: "Selain efisiensi biaya, keamanan data di cloud juga menjadi prioritas utama. Implementasi sistem backup otomatis dan enkripsi end-to-end akan memberikan rasa aman bagi pelanggan startup dalam menitipkan data mereka.",
    date: "10 Mei 2024",
    author: "Siti Aminah",
    category: "Infrastruktur",
    tags: ["Cloud", "AWS", "Startup"],
    mainImgId: "news-2",
    additionalImgId: "gallery-4"
  }
]

export default function BeritaDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [copied, setCopied] = React.useState(false)
  const [currentUrl, setCurrentUrl] = React.useState("")
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  React.useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const article = articlesData.find(a => a.id === id) || articlesData[0]
  const mainImage = PlaceHolderImages.find(img => img.id === article.mainImgId)
  const additionalImage = PlaceHolderImages.find(img => img.id === article.additionalImgId)

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: `Baca artikel menarik ini: ${article.title}`,
          url: currentUrl,
        })
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setIsDialogOpen(true)
        }
      }
    } else {
      setIsDialogOpen(true)
    }
  }

  const socialLinks = React.useMemo(() => [
    { network: "whatsapp", name: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(article.title + " " + currentUrl)}` },
    { network: "facebook", name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` },
    { network: "x", name: "X", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}` },
    { network: "linkedin", name: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}` },
  ], [article.title, currentUrl])

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header & Main Image */}
      <section className="container mx-auto px-4 pt-8 md:pt-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <Link href="/berita" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-accent transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke berita
          </Link>

          <div className="space-y-4">
            <Badge variant="outline" className="border-accent/30 text-accent font-semibold rounded-full px-4 py-1">
              {article.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-accent" />
                <span>Oleh {article.author}</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-video w-full rounded-xl md:rounded-2xl overflow-hidden bg-muted border shadow-sm">
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
        </motion.div>
      </section>

      {/* Article Content Area */}
      <section className="container mx-auto px-4 mt-8 md:mt-12">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-base md:text-lg"
          >
            {article.contentPart1}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-8 md:my-12 relative aspect-[16/10] w-full rounded-xl md:rounded-2xl overflow-hidden border bg-muted shadow-sm"
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
              <span className="text-sm font-semibold">Tags:</span>
            </div>
            {article.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-muted hover:bg-accent/10 hover:text-accent transition-colors border-none shadow-none font-medium px-3 py-1 text-[10px] md:text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="my-10 md:my-12" />

          {/* Footer Actions */}
          <div className="mt-12 pt-8 flex items-center justify-between gap-4">
            <div className="shrink-0">
              <MorphButton 
                text="Bagikan" 
                icon={Share2} 
                onClick={handleShare}
                className="text-muted-foreground border-none hover:text-accent"
              />

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md rounded-[2rem] bg-white p-0 overflow-hidden border-none shadow-2xl">
                  <div className="p-8 md:p-10 space-y-8">
                    <DialogHeader className="space-y-2">
                      <DialogTitle className="text-xl md:text-2xl font-extrabold text-primary">Bagikan artikel</DialogTitle>
                      <p className="text-muted-foreground text-sm font-medium">
                        Sebarkan wawasan ini ke jejaring sosial anda.
                      </p>
                    </DialogHeader>

                    <div className="grid grid-cols-4 gap-4">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.network}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex flex-col items-center gap-3 group"
                        >
                          <div className="relative">
                            <SocialIcon 
                              network={social.network} 
                              fgColor="#fff" 
                              style={{ height: 48, width: 48 }}
                              className="shadow-sm group-hover:shadow-md transition-shadow"
                              as="div"
                            />
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground group-hover:text-accent transition-colors">
                            {social.name}
                          </span>
                        </motion.a>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <Separator />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] font-bold text-muted-foreground/40 tracking-wider">atau salin tautan</span>
                      </div>

                      <div className="flex items-center gap-2 bg-muted/30 p-1.5 pl-4 rounded-2xl border group hover:border-accent/30 transition-all duration-300">
                        <p className="flex-1 text-xs text-muted-foreground truncate font-medium">
                          {currentUrl || 'memuat tautan...'}
                        </p>
                        <Button 
                          size="sm" 
                          onClick={handleCopyLink}
                          className={cn(
                            "rounded-xl transition-all duration-500 h-10 px-6 font-bold text-xs shadow-none border-none",
                            copied ? "bg-green-500 hover:bg-green-600 text-white" : "bg-accent hover:bg-accent/90 text-white"
                          )}
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.div 
                                key="check" 
                                initial={{ opacity: 0, scale: 0.8 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-2"
                              >
                                <Check className="h-3.5 w-3.5" /> tersalin
                              </motion.div>
                            ) : (
                              <motion.div 
                                key="copy" 
                                initial={{ opacity: 0, scale: 0.8 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-2"
                              >
                                <Copy className="h-3.5 w-3.5" /> salin
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center">
              <Link href="/berita">
                <Button variant="link" className="text-muted-foreground hover:text-accent hover:no-underline text-xs md:text-sm font-bold pr-0 h-auto p-0 transition-colors">
                  Berikutnya <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
