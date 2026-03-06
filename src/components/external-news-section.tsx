'use client';

import * as React from "react"
import { motion } from "framer-motion"
import { ExternalLink, Globe, RefreshCw, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { fetchExternalNews, type ExternalNewsOutput } from "@/ai/flows/external-news"

export function ExternalNewsSection() {
  const [news, setNews] = React.useState<ExternalNewsOutput['news']>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const loadNews = async () => {
    setLoading(true)
    setError(false)
    try {
      const data = await fetchExternalNews()
      setNews(data.news)
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

  return (
    <section className="py-16 md:py-24 bg-muted/20 border-t border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent font-bold tracking-wider text-sm">
              <Globe className="h-4 w-4" />
              Wawasan Global & Nasional
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-primary">
              Berita Eksternal Terpilih
            </h2>
            <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
              Kumpulan berita terkini dari berbagai sumber terpercaya mengenai transformasi digital dan inisiatif gizi nasional.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadNews} 
            disabled={loading}
            className="rounded-full font-bold text-xs"
          >
            {loading ? (
              <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-3 w-3 mr-2" />
            )}
            Segarkan berita
          </Button>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-none shadow-none bg-white/50 animate-pulse h-48 rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="py-20 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="h-6 w-6" />
            </div>
            <p className="font-bold">Gagal memuat berita luar</p>
            <p className="text-sm text-muted-foreground">Terjadi kendala koneksi dengan AI penyedia berita.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {news.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border border-muted-foreground/10 shadow-none hover:border-accent/30 transition-all duration-300 group bg-white rounded-2xl flex flex-col">
                  <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-none text-[10px] font-bold px-2.5">
                        {item.category}
                      </Badge>
                      <span className="text-[10px] font-bold text-muted-foreground/60">{item.date}</span>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <h3 className="font-bold text-primary leading-tight group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {item.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-muted flex items-center justify-between">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {item.source}
                      </span>
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 transition-colors p-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
