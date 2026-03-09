
'use client'

import * as React from "react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card } from "@/components/ui/card"
import { ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = ["Semua", "Penerima Manfaat", "Bisukma Group", "Kolaborasi"]

const galleryItems = [
  { id: "gallery-1", category: "Penerima Manfaat" },
  { id: "gallery-2", category: "Bisukma Group" },
  { id: "gallery-3", category: "Kolaborasi" },
  { id: "gallery-4", category: "Penerima Manfaat" },
  { id: "gallery-5", category: "Bisukma Group" },
  { id: "gallery-6", category: "Kolaborasi" },
  { id: "news-1", category: "Penerima Manfaat" },
  { id: "news-2", category: "Bisukma Group" },
  { id: "news-3", category: "Kolaborasi" },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = React.useState("Semua")

  const filteredItems = React.useMemo(() => {
    if (activeCategory === "Semua") return galleryItems
    return galleryItems.filter(item => item.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="pb-20 bg-white">
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.15)_0%,transparent_70%)] opacity-50"></div>
        <motion.div 
          className="container mx-auto px-4 text-center relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl mb-6">Galeri Dokumentasi</h1>
          <p className="text-lg md:text-xl text-primary-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Jejak langkah Bisukma Group dalam membangun kemandirian bangsa melalui pemberdayaan dan kolaborasi nyata.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 mt-12 relative z-20">
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Tabs 
            defaultValue="Semua" 
            value={activeCategory} 
            onValueChange={setActiveCategory}
            className="w-full max-w-xl"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto p-1 bg-white border shadow-sm rounded-xl md:rounded-full">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="rounded-lg md:rounded-full py-1.5 data-[state=active]:bg-accent data-[state=active]:text-white text-muted-foreground transition-all shadow-none"
                >
                  <p className="text-[10px] md:text-xs font-bold m-0">{cat}</p>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => {
              const img = PlaceHolderImages.find(im => im.id === item.id)
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                >
                  <Card className="group relative overflow-hidden rounded-3xl border-none h-[350px] cursor-pointer shadow-none bg-muted shadow-lg shadow-primary/5">
                    {img?.imageUrl && (
                      <Image 
                        src={img.imageUrl} 
                        alt={img.description || "Gallery Item"} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-4 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <motion.div 
                        className="bg-accent p-4 rounded-2xl shadow-xl"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ZoomIn className="h-6 w-6" />
                      </motion.div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-black text-accent mb-2">{item.category}</p>
                      <h3 className="text-xl font-bold leading-tight line-clamp-2">{img?.description}</h3>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-muted-foreground font-medium italic">Belum ada foto dalam kategori ini.</p>
          </div>
        )}
      </section>
    </div>
  )
}
