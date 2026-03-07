'use client'

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"

type NewsItem = {
  id: string
  title: string
  date: string
  category: string
  mainImgId: string
}

export default function RecentNews({ recentNews }: { recentNews: NewsItem[] }) {
  return (
    <div className="sticky top-24">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h2 className="text-xl font-extrabold tracking-tight text-primary">Berita Terbaru</h2>
        <Link href="/berita" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
          Lihat Semua
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        {recentNews.map((recent) => {
          const img = PlaceHolderImages.find(item => item.id === recent.mainImgId)
          return (
            <motion.div
              key={recent.id}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={`/berita/${recent.id}`} className="group flex gap-4 items-start">
                <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-muted border">
                  {img?.imageUrl && (
                    <Image 
                      src={img.imageUrl} 
                      alt={recent.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold text-[10px] tracking-wider">{recent.category}</span>
                  </div>
                  <h3 className="text-sm font-bold leading-snug group-hover:text-accent transition-colors line-clamp-2">
                    {recent.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground/60">
                    <Calendar className="h-3 w-3" /> {recent.date}
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-muted/30 border border-muted-foreground/5 space-y-4">
        <h3 className="text-sm font-bold text-primary">Dapatkan Update Mingguan</h3>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
          Berlangganan buletin kami untuk mendapatkan wawasan teknologi terbaru langsung di email Anda.
        </p>
        <div className="space-y-2">
          <input 
            type="email" 
            placeholder="Email Anda" 
            className="w-full bg-white border-muted-foreground/10 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold h-9 border-none">
            Berlangganan
          </Button>
        </div>
      </div>
    </div>
  )
}
