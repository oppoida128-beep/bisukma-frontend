'use client'

import * as React from "react"
import Image from "next/image"
import { Target, Rocket, Zap, TrendingUp, Briefcase, Heart } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function VisiMisiPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  const heroImg = PlaceHolderImages.find(img => img.id === 'gallery-4')

  return (
    <div className="flex flex-col w-full bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-primary text-center">
        {/* Background Pattern with low opacity */}
        <div className="absolute inset-0 z-0 opacity-15 blur-[2px]">
          <Image 
            src="/layanan-assets/6.svg" 
            alt="Background Pattern" 
            fill 
            className="object-cover"
          />
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,hsl(var(--accent)/0.2)_0%,transparent_100%)] z-0"></div>
        
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="bg-accent/20 text-accent border-none mb-6 px-4 py-1 text-xs font-bold uppercase tracking-widest">
            Masa Depan Bangsa
          </Badge>
          <h1 className="scroll-m-20 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Visi & <span className="text-accent">Misi Pergerakan</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
            Menjadi katalisator utama dalam membentuk masyarakat yang mandiri, cerdas, dan berdaya saing global.
          </p>
        </motion.div>
      </section>

      {/* --- VISION SECTION --- */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div 
              className="space-y-8"
              {...fadeIn}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                Visi Organisasi
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-primary leading-tight">
                Membangun bangsa melalui pemberdayaan masyarakat yang mandiri, cerdas, dan berdaya saing tinggi.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Visi ini merupakan komitmen jangka panjang Bisukma Group untuk menciptakan ekosistem sosial dan ekonomi yang berkelanjutan di Indonesia, khususnya di wilayah Sumatera Utara.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-6 rounded-2xl bg-muted/30 border border-muted flex flex-col gap-3">
                  <div className="bg-accent text-white p-2 rounded-lg w-fit">
                    <Zap className="size-4" />
                  </div>
                  <p className="font-bold text-primary">Bisuk (Cerdas)</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Menekankan pada kecerdasan intelektual, emosional, dan spiritual.</p>
                </div>
                <div className="p-6 rounded-2xl bg-muted/30 border border-muted flex flex-col gap-3">
                  <div className="bg-accent text-white p-2 rounded-lg w-fit">
                    <Heart className="size-4" />
                  </div>
                  <p className="font-bold text-primary">Ma (Berdaya)</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">Menekankan pada keberdayaan ekonomi dan kemandirian sosial.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10 border-8 border-white bg-muted"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {heroImg?.imageUrl && (
                <Image 
                  src={heroImg.imageUrl} 
                  alt="Visi Bisukma" 
                  fill 
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </motion.div>
          </div>

          {/* --- MISSION SECTION --- */}
          <div className="space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                Misi Strategis
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Langkah Konkret Perubahan</h2>
              <p className="text-muted-foreground italic font-medium">"Kami menerjemahkan visi besar menjadi aksi nyata di lapangan."</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Briefcase className="h-10 w-10" />,
                  title: "Kualitas SDM",
                  desc: "Meningkatkan kualitas SDM melalui pelatihan vokasi dan teknologi untuk mencetak tenaga kerja yang kompetitif di era digital."
                },
                {
                  icon: <Target className="h-10 w-10" />,
                  title: "Ketahanan Pangan",
                  desc: "Mendukung ketahanan pangan melalui pendampingan intensif pada sektor pertanian dan peternakan rakyat secara modern."
                },
                {
                  icon: <Zap className="h-10 w-10" />,
                  title: "Pemenuhan Gizi",
                  desc: "Menjamin pemenuhan gizi generasi muda melalui program pangan yang berkelanjutan dan pengelolaan dapur umum yang higienis."
                }
              ].map((misi, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border border-muted-foreground/10 hover:border-accent/50 transition-all duration-300 group bg-white shadow-none rounded-[2rem]">
                    <CardContent className="p-10 space-y-6">
                      <div className="text-accent p-4 rounded-2xl bg-accent/5 inline-block group-hover:scale-110 transition-transform duration-500 shadow-sm">{misi.icon}</div>
                      <h3 className="text-2xl font-bold text-primary">{misi.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm font-medium">{misi.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
