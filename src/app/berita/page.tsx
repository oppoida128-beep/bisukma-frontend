'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight, Plus, X, Search as SearchIcon } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/hooks/use-mobile"

const articles = [
  {
    id: "news-1",
    title: "Masa depan AI dalam transformasi bisnis 2024",
    excerpt: "Bagaimana kecerdasan buatan mengubah cara kita bekerja dan mengelola operasi bisnis sehari-hari secara otomatis.",
    date: "12 Mei 2024",
    author: "Budi Santoso",
    category: "Teknologi",
    imgId: "news-1"
  },
  {
    id: "news-2",
    title: "Strategi cloud computing untuk startup berkembang",
    excerpt: "Memilih infrastruktur cloud yang tepat adalah kunci skalabilitas bagi startup yang baru memasuki pasar kompetitif.",
    date: "10 Mei 2024",
    author: "Siti Aminah",
    category: "Infrastruktur",
    imgId: "news-2"
  },
  {
    id: "news-3",
    title: "Pentingnya cybersecurity di era kerja remote",
    excerpt: "Melindungi data sensitif perusahaan menjadi tantangan utama saat karyawan bekerja dari berbagai lokasi yang berbeda.",
    date: "05 Mei 2024",
    author: "Andi Wijaya",
    category: "Keamanan",
    imgId: "news-3"
  },
  {
    id: "news-4",
    title: "Trend desain UI/UX yang dominan di tahun ini",
    excerpt: "Eksplorasi estetika desain minimalis dan fungsional yang memberikan pengalaman pengguna terbaik di perangkat mobile.",
    date: "01 Mei 2024",
    author: "Dewi Lestari",
    category: "Desain",
    imgId: "gallery-5"
  },
  {
    id: "news-5",
    title: "Implementasi blockchain untuk supply chain",
    excerpt: "Transparansi dan pelacakan aset menjadi lebih mudah dan aman dengan pemanfaatan teknologi buku besar terdistribusi.",
    date: "28 April 2024",
    author: "Reza Fahlevi",
    category: "Teknologi",
    imgId: "gallery-4"
  },
  {
    id: "news-6",
    title: "Event Bisukma digital conference 2024",
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
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showAllCategories, setShowAllCategories] = React.useState(false)
  const isMobile = useIsMobile()

  const filteredArticles = React.useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = activeCategory === "Semua" || article.category === activeCategory
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // On mobile, if not showing all, just show the first few
  const visibleCategories = isMobile && !showAllCategories 
    ? categories.slice(0, 3) 
    : categories

  return (
    <div className="pb-20 bg-white">
      {/* Minimalist Header */}
      <section className="bg-white pt-8 md:pt-14 pb-6 text-primary border-none">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-left tracking-tight text-primary">
              Berita & <span className="text-accent">update</span>
            </h1>
            <p className="text-left text-base md:text-xl text-muted-foreground/80 font-medium leading-relaxed max-w-2xl">
              Wawasan terbaru seputar teknologi, tren industri, dan kabar terkini dari Bisukma Digital.
            </p>

            {/* Search Input Group */}
            <div className="relative max-w-md pt-4">
              <div className="relative group">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-accent" />
                <Input
                  type="text"
                  placeholder="Cari artikel berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-10 h-12 w-full rounded-2xl border-muted-foreground/10 bg-muted/30 focus:bg-white focus:ring-accent transition-all duration-300 font-medium"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 mt-4">
        {/* Category Navigation Area */}
        <div className="mb-10 relative">
          <div className="flex items-center gap-4">
            <div className="flex-1 overflow-hidden">
              <Tabs 
                defaultValue="Semua" 
                value={activeCategory} 
                onValueChange={setActiveCategory}
                className="w-full"
              >
                <div className={cn(
                  "overflow-x-auto no-scrollbar",
                  showAllCategories && isMobile ? "hidden" : "block"
                )}>
                  <TabsList variant="line" className="flex flex-nowrap w-full justify-start border-none">
                    {visibleCategories.map((cat) => (
                      <TabsTrigger 
                        key={cat} 
                        value={cat} 
                        variant="line"
                        className="flex-shrink-0 text-sm md:text-base font-bold tracking-tight whitespace-nowrap transition-all duration-300"
                      >
                        {cat}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </Tabs>
              
              {/* Vertical Stack for mobile when showAll is true */}
              <AnimatePresence>
                {showAllCategories && isMobile && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex flex-wrap gap-2 py-6"
                  >
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        variant={activeCategory === cat ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "rounded-full text-xs font-bold transition-all duration-300",
                          activeCategory === cat ? "bg-accent border-accent text-white" : "border-muted-foreground/10 text-muted-foreground hover:border-accent/30"
                        )}
                        onClick={() => {
                          setActiveCategory(cat)
                          setShowAllCategories(false)
                        }}
                      >
                        {cat}
                      </Button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Plus / Expand Button */}
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "rounded-full shrink-0 border-muted-foreground/10 hover:border-accent/30 hover:text-accent transition-all duration-500 h-10 w-10",
                showAllCategories && "rotate-45"
              )}
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article) => {
              const img = PlaceHolderImages.find(item => item.id === article.imgId)
              return (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Card className="overflow-hidden border border-muted/60 shadow-none group flex flex-col h-full bg-white hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 rounded-2xl">
                    <CardHeader className="p-0 relative h-60 overflow-hidden">
                      {img?.imageUrl && (
                        <Image 
                          src={img.imageUrl} 
                          alt={article.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Badge className="absolute top-4 left-4 bg-accent/90 hover:bg-accent border-none px-4 py-1 font-bold text-[10px] rounded-full shadow-lg backdrop-blur-md">
                        {article.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4 flex-1">
                      <div className="flex items-center gap-4 text-[10px] md:text-xs font-bold text-muted-foreground/60 tracking-wider">
                        <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-accent" /> {article.date}</span>
                        <span className="flex items-center gap-1.5"><User className="h-3 w-3 text-accent" /> {article.author}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-extrabold leading-tight group-hover:text-accent transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground/80 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="p-8 pt-0">
                      <Link href={`/berita/${article.id}`} className="text-xs md:text-sm font-bold flex items-center text-accent group/link">
                        Baca selengkapnya <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1.5 transition-transform duration-300" />
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
        
        {filteredArticles.length > 0 && !searchQuery && (
          <motion.div 
            className="mt-20 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex gap-3">
              {[1, 2, 3].map(n => (
                <button key={n} className={cn(
                  "w-11 h-11 rounded-xl border text-sm font-bold transition-all duration-300",
                  n === 1 ? "bg-accent text-white border-accent shadow-xl shadow-accent/20" : "bg-white hover:bg-muted text-muted-foreground border-muted-foreground/10"
                )}>
                  {n}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {filteredArticles.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center space-y-4"
          >
            <div className="inline-flex p-6 rounded-full bg-muted/50 mb-4">
              <SearchIcon className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <p className="text-xl font-bold text-primary">Tidak ada hasil ditemukan</p>
            <p className="text-muted-foreground max-w-xs mx-auto">Kami tidak dapat menemukan berita yang cocok dengan kriteria pencarian Anda.</p>
            <Button variant="outline" onClick={() => {setSearchQuery(""); setActiveCategory("Semua")}} className="rounded-full mt-4">
              Atur ulang filter
            </Button>
          </motion.div>
        )}
      </section>
    </div>
  )
}
