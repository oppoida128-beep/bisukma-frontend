'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { MorphButton } from "@/components/ui/morph-button"

// Data dummy yang lebih terstruktur untuk mensimulasikan output CMS
const articlesData = [
  {
    id: "news-1",
    title: "Masa Depan AI dalam Transformasi Bisnis 2024",
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
    title: "Strategi Cloud Computing untuk Startup Berkembang",
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

  // Mencari artikel berdasarkan ID, jika tidak ketemu ambil news-1 sebagai fallback
  const article = articlesData.find(a => a.id === id) || articlesData[0]
  const mainImage = PlaceHolderImages.find(img => img.id === article.mainImgId)
  const additionalImage = PlaceHolderImages.find(img => img.id === article.additionalImgId)

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header & Main Image */}
      <section className="container mx-auto px-4 pt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
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
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
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

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted border shadow-sm">
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
      <section className="container mx-auto px-4 mt-12">
        <div className="max-w-3xl mx-auto">
          {/* Paragraf 1 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-lg"
          >
            {article.contentPart1}
          </motion.div>

          {/* Foto Tambahan (Disisipkan di tengah artikel) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="my-10 relative aspect-[16/10] w-full rounded-2xl overflow-hidden border bg-muted shadow-sm"
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

          {/* Paragraf 2 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-lg"
          >
            {article.contentPart2}
          </motion.div>

          {/* Tags Section */}
          <div className="mt-12 flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2 mr-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
            </div>
            {article.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-muted hover:bg-accent/10 hover:text-accent transition-colors border-none shadow-none font-medium px-3 py-1 text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="my-12" />

          {/* Footer Actions */}
          <div className="mt-16 pt-8 border-t flex items-center justify-between">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.5 
              }}
            >
              <MorphButton 
                text="Bagikan artikel" 
                icon={Share2} 
                className="h-10 bg-white text-muted-foreground border border-muted-foreground/20 hover:text-accent hover:border-accent"
              />
            </motion.div>
            <div className="flex gap-2">
              <Link href="/berita">
                <Button variant="ghost" className="text-muted-foreground hover:text-accent">
                  Artikel berikutnya
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
