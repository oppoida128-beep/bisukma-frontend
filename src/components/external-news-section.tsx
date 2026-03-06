'use client';

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Globe, RefreshCw, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { fetchExternalNews, type ExternalNewsOutput } from "@/ai/flows/external-news"
import { cn } from "@/lib/utils"

export function ExternalNewsSection() {
  const [news, setNews] = React.useState<ExternalNewsOutput['news']>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)

  const loadNews = async () => {
    setLoading(true)
    setError(false)
    try {
      const data = await fetchExternalNews()
      if (data && data.news) {
        setNews(data.news)
      }
    } catch (err) {
      console.error("Failed to fetch external news:", err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    loadNews()
  }, [])

  const initialNews = news.slice(0, 3)
  const expandedNews = news.slice(3, 6)

  return (
    <section className="py-16 md:py-24 bg-muted/20 border-t border-b overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent font-bold tracking-wider text-sm">
              <Globe className="h-4 w-4" />
              Wawasan Bisukma di Media Luar
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-primary">
              Sorotan Berita Nyata (Real-time)
            </h2>
            <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
              Integrasi langsung dengan Google News untuk menyajikan kabar terkini mengenai pergerakan Bisukma di kancah nasional.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadNews} 
            disabled={loading}
            className="rounded-full font-bold text-xs bg-white shadow-sm hover:shadow-md transition-all"
          >
            {loading ? (
              <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-3 w-3 mr-2" />
            )}
            Segarkan data RSS
          </Button>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-none shadow-none bg-white/50 animate-pulse h-96 rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="py-20 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="h-6 w-6" />
            </div>
            <p className="font-bold text-primary">Gagal memuat berita luar</p>
            <p className="text-sm text-muted-foreground">Terjadi kendala saat mengambil data RSS Google News.</p>
            <Button variant="link" onClick={loadNews} className="text-accent font-bold">Coba lagi</Button>
          </div>
        ) : news.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white/50 rounded-2xl border border-dashed">
            <p className="text-muted-foreground italic">Belum ada berita terbaru yang ditemukan di Google News hari ini.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {initialNews.map((item, i) => (
                <NewsCard key={i} item={item} index={i} priority={i === 0} />
              ))}
            </div>

            <AnimatePresence>
              {isExpanded && expandedNews.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-8">
                    {expandedNews.map((item, i) => (
                      <NewsCard key={i + 3} item={item} index={i + 3} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {news.length > 3 && (
              <div className="flex justify-center pt-8">
                <Button
                  variant="ghost"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="group text-accent font-bold hover:bg-accent/5 rounded-full px-8 h-12"
                >
                  {isExpanded ? (
                    <>
                      Tampilkan lebih sedikit <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Lihat berita lainnya <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function NewsCard({ item, index, priority = false }: { item: ExternalNewsOutput['news'][0], index: number, priority?: boolean }) {
  const [imgSrc, setImgSrc] = React.useState(item.thumbnailUrl || `https://picsum.photos/seed/bisukma-news-${index}/800/600`)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1 }}
      className="h-full"
    >
      <Card className="h-full border border-muted-foreground/10 shadow-none hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 group bg-white rounded-2xl flex flex-col overflow-hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <Image
            src={imgSrc}
            alt={item.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            onError={() => setImgSrc(`https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop`)}
          />
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-white/95 backdrop-blur-sm text-accent hover:bg-white border-none text-[10px] font-bold px-3 py-1 shadow-sm rounded-full">
              {item.category}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <CardContent className="p-6 md:p-8 flex flex-col h-full flex-1">
          <div className="flex justify-between items-center mb-5 text-[10px] font-bold text-muted-foreground/50 tracking-widest uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {item.source}
            </span>
            <span>{item.date}</span>
          </div>
          
          <div className="flex-1 space-y-3">
            <h3 className="font-extrabold text-primary leading-tight group-hover:text-accent transition-colors line-clamp-2 text-base md:text-lg">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-3 font-medium">
              {item.summary}
            </p>
          </div>

          <div className="mt-8 pt-5 border-t border-muted/50 flex items-center justify-end">
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-all flex items-center gap-2 text-xs font-bold group/link"
            >
              Baca sumber asli
              <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
