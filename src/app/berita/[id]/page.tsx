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

// Data dummy untuk detail artikel (dalam production, ini diambil dari API/Database)
const articlesData = [
  {
    id: "news-1",
    title: "Masa Depan AI dalam Transformasi Bisnis 2024",
    content: `Kecerdasan Buatan (AI) bukan lagi sekadar tren teknologi, melainkan fondasi baru bagi efisiensi operasional bisnis. Di tahun 2024, kita melihat pergeseran dari sekadar eksperimen menjadi integrasi penuh dalam proses pengambilan keputusan. 
    
    Bisukma Digital berkomitmen untuk menjembatani kesenjangan teknologi ini dengan menghadirkan solusi cerdas yang dapat diadaptasi oleh berbagai skala industri. Dengan pemanfaatan model bahasa besar dan analitik prediktif, perusahaan dapat menghemat waktu hingga 40% dalam tugas-tugas administratif yang repetitif.
    
    Ke depannya, fokus utama akan beralih pada etika penggunaan AI dan keamanan data. Kami percaya bahwa transparansi adalah kunci dalam membangun kepercayaan antara penyedia teknologi dan pengguna akhir.`,
    date: "12 Mei 2024",
    author: "Budi Santoso",
    category: "Teknologi",
    tags: ["Artificial Intelligence", "Digital Transformation", "Business Strategy"],
    mainImgId: "news-1",
    gallery: ["gallery-1", "gallery-5"]
  },
  {
    id: "news-2",
    title: "Strategi Cloud Computing untuk Startup Berkembang",
    content: "Memilih infrastruktur cloud yang tepat adalah kunci skalabilitas bagi startup yang baru memasuki pasar kompetitif. Dengan model pay-as-you-go, perusahaan baru dapat mengelola anggaran dengan lebih fleksibel tanpa mengorbankan performa sistem.",
    date: "10 Mei 2024",
    author: "Siti Aminah",
    category: "Infrastruktur",
    tags: ["Cloud", "AWS", "Startup"],
    mainImgId: "news-2",
    gallery: ["gallery-4", "gallery-2"]
  }
]

export default function BeritaDetailPage() {
  const params = useParams()
  const id = params.id as string

  // Mencari artikel berdasarkan ID, jika tidak ketemu ambil news-1 sebagai fallback demo
  const article = articlesData.find(a => a.id === id) || articlesData[0]
  const mainImage = PlaceHolderImages.find(img => img.id === article.mainImgId)

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
            Kembali ke Berita
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

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted shadow-none border">
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

      {/* Article Content */}
      <section className="container mx-auto px-4 mt-12">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="prose prose-lg max-w-none prose-slate"
          >
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
              {article.content}
            </div>
          </motion.div>

          {/* Tags */}
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

          {/* Additional Photos Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">Foto Tambahan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.gallery.map((imgId, index) => {
                const img = PlaceHolderImages.find(i => i.id === imgId)
                return (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted border"
                  >
                    {img?.imageUrl && (
                      <Image 
                        src={img.imageUrl} 
                        alt={`Additional view ${index + 1}`} 
                        fill 
                        className="object-cover"
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-16 pt-8 border-t flex items-center justify-between">
            <Button variant="outline" className="rounded-full gap-2 border-muted-foreground/20">
              <Share2 className="h-4 w-4" />
              Bagikan Artikel
            </Button>
            <div className="flex gap-2">
              <Link href="/berita">
                <Button variant="ghost" className="text-muted-foreground hover:text-accent">
                  Artikel Berikutnya
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
