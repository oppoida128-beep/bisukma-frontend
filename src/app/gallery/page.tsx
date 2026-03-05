
'use client'

import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card } from "@/components/ui/card"
import { ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const galleryItems = [
  { id: "gallery-1", category: "Event" },
  { id: "gallery-2", category: "Office" },
  { id: "gallery-3", category: "Project" },
  { id: "gallery-4", category: "Tech" },
  { id: "gallery-5", category: "Design" },
  { id: "gallery-6", category: "Event" },
  { id: "news-1", category: "Tech" },
  { id: "news-2", category: "Office" },
  { id: "news-3", category: "Project" },
]

export default function GalleryPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  return (
    <div className="pb-20">
      <section className="bg-primary py-24 text-white">
        <motion.div 
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Gallery Bisukma</h1>
          <p className="mt-6 text-xl text-primary-foreground/60 max-w-2xl mx-auto leading-7">
            Melihat lebih dekat aktivitas, proyek, dan lingkungan kerja kami melalui lensa visual.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {["Semua", "Event", "Office", "Project", "Tech"].map((cat, i) => (
            <button 
              key={i} 
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all shadow-none",
                cat === "Semua" ? "bg-accent text-white" : "bg-white text-muted-foreground hover:bg-muted border"
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => {
            const img = PlaceHolderImages.find(im => im.id === item.id)
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="group relative overflow-hidden rounded-xl border-none h-[300px] cursor-pointer shadow-none bg-muted">
                  {img?.imageUrl && (
                    <Image 
                      src={img.imageUrl} 
                      alt={img.description || "Gallery Item"} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white space-y-3">
                    <motion.div 
                      className="bg-accent p-3 rounded-full"
                      whileHover={{ scale: 1.2 }}
                    >
                      <ZoomIn className="h-6 w-6" />
                    </motion.div>
                    <div className="text-center">
                      <p className="text-xs tracking-wide font-medium opacity-80">{item.category}</p>
                      <h3 className="text-lg font-bold">{img?.description}</h3>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
