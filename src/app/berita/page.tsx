'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Search as SearchIcon, ChevronRight, X } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/hooks/use-mobile"
import articles from "@/data/articles.json"

const categories = ["Semua", "Teknologi", "Infrastruktur", "Keamanan", "Desain", "Event"]

export default function BeritaPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const isMobile = useIsMobile()

  // Solusi Paling Stabil untuk Next.js 15: Konversi proxy langsung di bodi komponen
  const rawParams = React.use(searchParams)
  const resolvedParams = Object.fromEntries(
    Object.entries(rawParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : (value ?? ""),
    ])
  )

  // Ambil kategori awal dari query string atau default ke "Semua"
  const categoryFromQuery = resolvedParams.category || "Semua"

  const [activeCategory, setActiveCategory] = React.useState(categoryFromQuery)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isExpanded, setIsExpanded] = React.useState(false)

  // Sinkronisasi state jika URL berubah secara eksternal
  React.useEffect(() => {
    if (categoryFromQuery) {
      setActiveCategory(categoryFromQuery)
    }
  }, [categoryFromQuery])

  const filteredArticles = React.useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = activeCategory === "Semua" || article.category === activeCategory
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const visibleCategories = isMobile ? categories.slice(0, 3) : categories
  const hiddenCategories = isMobile ? categories.slice(3) : []

  return (
    <div className="pb-20 bg-white">
      {/* Header Halaman */}
      <section className="bg-white pt-8 md:pt-12 pb-4">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl space-y-4 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary">
              Berita & <span className="text-accent">Update</span>
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed mx-auto md:mx-0">
              Wawasan terbaru seputar teknologi, tren industri, dan kabar terkini dari Bisukma Digital.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 mt-6">
        {/* Kontrol Navigasi Kategori & Pencarian */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <Tabs 
              value={activeCategory} 
              onValueChange={setActiveCategory}
              className="w-full md:w-auto"
            >
              <TabsList className="flex flex-wrap h-auto bg-transparent gap-2 p-0 justify-center md:justify-start">
                {visibleCategories.map((cat) => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat} 
                    className="rounded-full px-5 py-2 data-[state=active]:bg-accent data-[state=active]:text-white border border-muted-foreground/10 font-bold text-xs transition-all shadow-none"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
                
                <AnimatePresence>
                  {isExpanded && isMobile && hiddenCategories.map((cat) => (
                    <motion.div
                      key={cat}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <TabsTrigger 
                        value={cat} 
                        className="rounded-full px-5 py-2 data-[state=active]:bg-accent data-[state=active]:text-white border border-muted-foreground/10 font-bold text-xs transition-all shadow-none"
                      >
                        {cat}
                      </TabsTrigger>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs font-bold text-accent hover:bg-accent/5 rounded-full px-4 h-9"
                  >
                    {isExpanded ? "Tutup" : "Lainnya"}
                  </Button>
                )}
              </TabsList>
            </Tabs>
          </div>

          <div className="relative max-w-md w-full mx-auto md:mx-0">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari artikel berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-10 h-11 w-full rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white transition-all font-medium text-sm shadow-none"
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

        {/* Grid Daftar Berita */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article) => {
              const img = PlaceHolderImages.find(item => item.id === article.mainImgId)
              return (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden border border-muted/60 shadow-none group flex flex-col h-full bg-white hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 rounded-2xl">
                    <CardHeader className="p-0 relative h-52 overflow-hidden">
                      {img?.imageUrl && (
                        <Image 
                          src={img.imageUrl} 
                          alt={article.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      <Badge className="absolute top-4 left-4 bg-accent/90 border-none px-3 py-1 font-bold text-[10px] rounded-full text-white">
                        {article.category}
                      </Badge>
                    </CardHeader>
                    
                    <CardContent className="p-6 space-y-3 flex-1">
                      <h3 className="text-lg md:text-xl font-extrabold leading-tight group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground/80 line-clamp-3 leading-relaxed font-medium">
                        {article.excerpt}
                      </p>
                    </CardContent>

                    <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-muted/30 mt-4 pt-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 text-accent/70" /> {article.date}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3.5 w-3.5 text-accent/70" /> {article.author}
                        </div>
                      </div>
                      <Link 
                        href={`/berita/${article.id}`} 
                        className="bg-accent/10 hover:bg-accent text-accent hover:text-white p-2.5 rounded-xl transition-all duration-300"
                        aria-label="Baca selengkapnya"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
        
        {/* State Kosong */}
        {filteredArticles.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center space-y-4"
          >
            <div className="inline-flex p-6 rounded-full bg-muted/50 mb-2">
              <SearchIcon className="h-6 w-6 text-muted-foreground/40" />
            </div>
            <p className="text-lg font-bold text-primary">Tidak ada hasil ditemukan</p>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">Kami tidak dapat menemukan berita yang cocok dengan kriteria pencarian Anda.</p>
            <Button 
              variant="outline" 
              onClick={() => {setSearchQuery(""); setActiveCategory("Semua")}} 
              className="rounded-full mt-2 text-xs font-bold border-muted-foreground/20"
            >
              Atur ulang filter
            </Button>
          </motion.div>
        )}
      </section>
    </div>
  )
}
