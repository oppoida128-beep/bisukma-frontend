
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
import articles from "@/data/articles.json"

const categories = ["Semua", "Teknologi", "Infrastruktur", "Keamanan", "Desain", "Event"]

export default function BeritaPage() {
  const [activeCategory, setActiveCategory] = React.useState("Semua")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isExpanded, setIsExpanded] = React.useState(false)
  const isMobile = useIsMobile()

  const filteredArticles = React.useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = activeCategory === "Semua" || article.category === activeCategory
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const visibleCategories = isMobile ? categories.slice(0, 3) : categories
  const hiddenCategories = isMobile ? categories.slice(3) : []

  return (
    <div className="pb-20 bg-white">
      {/* Minimalist Header */}
      <section className="bg-white pt-8 md:pt-12 pb-4 text-primary">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-black text-left tracking-tight">
              Berita & <span className="text-accent">Update</span>
            </h1>
            <p className="text-left text-sm md:text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Wawasan terbaru seputar teknologi, tren industri, dan kabar terkini dari Bisukma Digital.
            </p>

            {/* Search Input Group */}
            <div className="relative max-w-md pt-2">
              <div className="relative group">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-accent" />
                <Input
                  type="text"
                  placeholder="Cari artikel berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-10 h-10 w-full rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white transition-all font-medium text-sm"
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

      <section className="container mx-auto px-4 mt-6">
        {/* Category Navigation Area */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className="flex-1 overflow-hidden">
              <Tabs 
                value={activeCategory} 
                onValueChange={setActiveCategory}
                className="w-full"
              >
                <div className="overflow-x-auto no-scrollbar">
                  <TabsList variant="line" className="justify-start gap-4 md:gap-8 border-none h-auto p-0">
                    {visibleCategories.map((cat) => (
                      <TabsTrigger 
                        key={cat} 
                        value={cat} 
                        variant="line"
                        className="text-sm md:text-base font-bold tracking-tight whitespace-nowrap pb-2 pt-0"
                      >
                        {cat}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </Tabs>
            </div>

            {isMobile && (
              <Button 
                variant={isExpanded ? "default" : "outline"} 
                size="icon" 
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                  "rounded-full shrink-0 h-9 w-9 transition-all duration-300",
                  isExpanded ? "bg-accent border-accent text-white" : "border-muted-foreground/20 text-muted-foreground"
                )}
              >
                <Plus className={cn("h-4 w-4 transition-transform duration-300", isExpanded && "rotate-45")} />
              </Button>
            )}
          </div>

          {/* Collapsible Content with Framer Motion for Smoothness */}
          <AnimatePresence>
            {isExpanded && isMobile && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-4 pb-2">
                  {hiddenCategories.map((cat) => (
                    <Button
                      key={cat}
                      variant={activeCategory === cat ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "rounded-full text-xs font-bold transition-all",
                        activeCategory === cat ? "bg-accent border-accent text-white" : "border-muted-foreground/10 text-muted-foreground hover:border-accent/30"
                      )}
                      onClick={() => {
                        setActiveCategory(cat)
                        setIsExpanded(false)
                      }}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
                  transition={{ duration: 0.4 }}
                >
                  <Card className="overflow-hidden border border-muted/60 shadow-none group flex flex-col h-full bg-white hover:shadow-lg hover:shadow-accent/5 transition-all duration-500 rounded-2xl">
                    <CardHeader className="p-0 relative h-52 md:h-60 overflow-hidden">
                      {img?.imageUrl && (
                        <Image 
                          src={img.imageUrl} 
                          alt={article.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      <Badge className="absolute top-4 left-4 bg-accent/90 hover:bg-accent border-none px-3 py-1 font-bold text-[10px] rounded-full">
                        {article.category}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8 space-y-4 flex-1">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-accent" /> {article.date}</span>
                        <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-accent" /> {article.author}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-extrabold leading-tight group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground/80 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="p-6 md:p-8 pt-0">
                      <Link href={`/berita/${article.id}`} className="text-xs md:text-sm font-bold flex items-center text-accent group/link">
                        Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1.5 transition-transform" />
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
        
        {filteredArticles.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center space-y-4"
          >
            <div className="inline-flex p-6 rounded-full bg-muted/50 mb-2">
              <SearchIcon className="h-6 w-6 text-muted-foreground/40" />
            </div>
            <p className="text-lg font-bold text-primary">Tidak Ada Hasil Ditemukan</p>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">Kami tidak dapat menemukan berita yang cocok dengan kriteria pencarian Anda.</p>
            <Button variant="outline" onClick={() => {setSearchQuery(""); setActiveCategory("Semua")}} className="rounded-full mt-2 text-xs">
              Atur Ulang Filter
            </Button>
          </motion.div>
        )}
      </section>
    </div>
  )
}
