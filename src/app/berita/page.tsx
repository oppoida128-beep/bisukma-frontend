'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const articles = [
  {
    id: "news-1",
    title: "Masa Depan AI dalam Transformasi Bisnis 2024",
    excerpt: "Bagaimana kecerdasan buatan mengubah cara kita bekerja dan mengelola operasi bisnis sehari-hari secara otomatis.",
    date: "12 Mei 2024",
    author: "Budi Santoso",
    category: "Teknologi",
    imgId: "news-1"
  },
  {
    id: "news-2",
    title: "Strategi Cloud Computing untuk Startup Berkembang",
    excerpt: "Memilih infrastruktur cloud yang tepat adalah kunci skalabilitas bagi startup yang baru memasuki pasar kompetitif.",
    date: "10 Mei 2024",
    author: "Siti Aminah",
    category: "Infrastruktur",
    imgId: "news-2"
  },
  {
    id: "news-3",
    title: "Pentingnya Cybersecurity di Era Kerja Remote",
    excerpt: "Melindungi data sensitif perusahaan menjadi tantangan utama saat karyawan bekerja dari berbagai lokasi yang berbeda.",
    date: "05 Mei 2024",
    author: "Andi Wijaya",
    category: "Keamanan",
    imgId: "news-3"
  },
  {
    id: "news-4",
    title: "Trend Desain UI/UX yang Dominan di Tahun Ini",
    excerpt: "Eksplorasi estetika desain minimalis dan fungsional yang memberikan pengalaman pengguna terbaik di perangkat mobile.",
    date: "01 Mei 2024",
    author: "Dewi Lestari",
    category: "Desain",
    imgId: "gallery-5"
  },
  {
    id: "news-5",
    title: "Implementasi Blockchain untuk Supply Chain",
    excerpt: "Transparansi dan pelacakan aset menjadi lebih mudah dan aman dengan pemanfaatan teknologi buku besar terdistribusi.",
    date: "28 April 2024",
    author: "Reza Fahlevi",
    category: "Teknologi",
    imgId: "gallery-4"
  },
  {
    id: "news-6",
    title: "Event Bisukma Digital Conference 2024",
    excerpt: "Rangkuman keseruan acara tahunan kami yang dihadiri oleh ratusan pemimpin industri dan pakar teknologi ternama.",
    date: "20 April 2024",
    author: "Admin Bisukma",
    category: "Event",
    imgId: "gallery-6"
  }
]

const categories = ["Semua", "Teknologi", "Infrastruktur", "Keamanan", "Desain", "Event"]

export default function BeritaPage() {
  const [activeCategory, setActiveCategory] = React.useState("Semua")

  const filteredArticles = activeCategory === "Semua" 
    ? articles 
    : articles.filter(article => article.category === activeCategory)

  return (
    <div className="pb-20 bg-white">
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.1)_0%,transparent_70%)]"></div>
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-center tracking-tight">Berita & Update</h1>
          <p className="text-center mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Wawasan terbaru seputar teknologi, tren industri, dan kabar terkini dari Bisukma Digital.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-12">
          <Tabs 
            defaultValue="Semua" 
            value={activeCategory} 
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <div className="overflow-x-auto no-scrollbar pb-1">
              <TabsList variant="line" className="w-full flex">
                {categories.map((cat) => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat} 
                    variant="line"
                    className="flex-shrink-0 text-xs md:text-sm font-bold uppercase tracking-wider"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, i) => {
              const img = PlaceHolderImages.find(item => item.id === article.imgId)
              return (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden border-none shadow-lg group flex flex-col h-full bg-white hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-0 relative h-56">
                      {img?.imageUrl && (
                        <Image 
                          src={img.imageUrl} 
                          alt={article.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      <Badge className="absolute top-4 left-4 bg-accent hover:bg-accent/90 border-none px-3 py-1 font-bold text-[10px] uppercase">
                        {article.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4 flex-1">
                      <div className="flex items-center gap-4 text-[10px] md:text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-accent" /> {article.date}</span>
                        <span className="flex items-center gap-1.5"><User className="h-3 w-3 text-accent" /> {article.author}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-extrabold leading-tight group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Link href={`/berita/${article.id}`} className="text-xs md:text-sm font-bold flex items-center text-accent group/link">
                        Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
        
        {filteredArticles.length > 0 && (
          <motion.div 
            className="mt-16 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex gap-2">
              {[1, 2, 3].map(n => (
                <button key={n} className={cn(
                  "w-10 h-10 rounded-lg border text-xs font-bold transition-all",
                  n === 1 ? "bg-accent text-white border-accent shadow-lg shadow-accent/20" : "bg-white hover:bg-muted text-muted-foreground"
                )}>
                  {n}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {filteredArticles.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">Tidak ada berita dalam kategori ini.</p>
          </div>
        )}
      </section>
    </div>
  )
}
