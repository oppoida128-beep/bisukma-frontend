'use client';

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, AlertCircle, ChevronDown, ChevronUp, Calendar, ArrowRight, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { fetchExternalNews, triggerRefreshNews, type ExternalNewsOutput } from "@/ai/flows/external-news"
import { cn } from "@/lib/utils"

export function ExternalNewsSection() {
  const [news, setNews] = React.useState<ExternalNewsOutput['news']>([])
  const [loading, setLoading] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)

  const loadNews = async (isForced = false) => {
    if (isForced) setRefreshing(true);
    else setLoading(true);
    
    setError(false)
    try {
      if (isForced) {
        await triggerRefreshNews();
      }
      const data = await fetchExternalNews()
      if (data && data.news) {
        setNews(data.news)
      }
    } catch (err) {
      console.error("Failed to fetch external news:", err)
      setError(true)
    } finally {
      setLoading(false)
      setRefreshing(false)
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
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent font-bold tracking-wider text-sm">
              <Globe className="h-4 w-4" />
              Sorotan Media Luar
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-primary">
              Bisukma dalam Berita Nasional
            </h2>
            <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
              Berita terbaru mengenai Bisukma Group yang dikurasi secara otomatis dari portal media nasional terpercaya.
            </p>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => loadNews(true)}
            disabled={refreshing || loading}
            className="rounded-full font-bold text-xs bg-white shadow-sm hover:shadow-md transition-all h-10 px-6 border-muted-foreground/10 group"
          >
            <RefreshCw className={cn("mr-2 h-3.5 w-3.5 text-accent transition-transform duration-700", (refreshing || loading) && "animate-spin")} />
            {refreshing ? "Menyegarkan..." : "Segarkan berita"}
          </Button>
        </div>

        {loading && !refreshing ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border border-muted/60 shadow-none bg-white/50 animate-pulse h-[400px] rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="py-20 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="h-6 w-6" />
            </div>
            <p className="font-bold text-primary">Gagal memuat berita</p>
            <p className="text-sm text-muted-foreground">Terjadi kendala saat menghubungkan ke sumber berita.</p>
            <Button variant="link" onClick={() => loadNews()} className="text-accent font-bold">Coba lagi</Button>
          </div>
        ) : news.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white/50 rounded-2xl border border-dashed border-muted-foreground/20">
            <p className="text-muted-foreground italic">Belum ada berita terbaru yang ditemukan hari ini.</p>
            <Button variant="outline" onClick={() => loadNews(true)} className="rounded-full">Cari berita sekarang</Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {initialNews.map((item, i) => (
                <NewsCard key={i} item={item} index={i} />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-8">
                    {expandedNews.map((item, i) => (
                      <NewsCard key={i + 3} item={item} index={i + 3} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {news.length > 3 && (
              <div className="flex justify-center pt-12">
                <Button
                  variant="ghost"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="group text-accent font-bold hover:bg-accent/5 rounded-full px-8 h-12 transition-all border border-accent/20"
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

function NewsCard({ item, index }: { item: ExternalNewsOutput['news'][0], index: number }) {
  const formattedDate = React.useMemo(() => {
    try {
      const d = new Date(item.date);
      if (isNaN(d.getTime())) return item.date;
      return d.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    } catch {
      return item.date;
    }
  }, [item.date]);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
      className="h-full"
    >
      <Card className="overflow-hidden border border-muted/60 shadow-none group flex flex-col h-full bg-white hover:shadow-lg hover:shadow-accent/5 transition-all duration-500 rounded-2xl">
        <CardHeader className="p-0 relative h-32 md:h-40 overflow-hidden bg-accent/5 flex items-center justify-center">
          <Image
            src={item.thumbnailUrl}
            alt={item.source}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            priority={index < 3}
          />
          <Badge className="absolute top-4 left-4 bg-accent/10 text-accent hover:bg-accent/20 border-none px-3 py-1 font-bold text-[10px] rounded-full uppercase tracking-wider">
            {item.category}
          </Badge>
        </CardHeader>

        <CardContent className="p-6 md:p-8 space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p className="text-[10px] font-bold text-muted-foreground/60 flex items-center gap-1.5 uppercase tracking-wider">
              <Calendar className="h-3 w-3 text-accent" /> 
              {formattedDate}
            </p>
          </div>
          <h3 className="text-lg font-extrabold leading-tight group-hover:text-accent transition-colors line-clamp-2">
            {item.title}
          </h3>
          <p className="text-xs text-muted-foreground/80 line-clamp-3 leading-relaxed font-medium">
            {item.summary}
          </p>
          <div className="pt-2">
            <p className="text-[10px] font-bold text-accent/60 flex items-center gap-1.5">
              <Globe className="h-3 w-3" /> 
              {item.source}
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-6 md:p-8 pt-0">
          <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold flex items-center text-accent group/link"
          >
            Baca sumber asli 
            <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1.5 transition-transform" />
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  )
}