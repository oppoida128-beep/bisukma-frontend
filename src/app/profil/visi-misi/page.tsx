'use client'

import * as React from "react"
import Image from "next/image"
import { Target, Shield, Rocket, Heart, Zap, TrendingUp, Briefcase } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

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
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,hsl(var(--accent)/0.15)_0%,transparent_100%)]"></div>
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="scroll-m-20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Visi & <span className="text-accent">Misi Kami</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Membangun bangsa melalui pemberdayaan masyarakat yang mandiri, cerdas, dan berdaya saing tinggi.
          </p>
        </motion.div>
      </section>

      {/* --- CONTENT SECTION --- */}
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
                Membangun bangsa melalui pemberdayaan masyarakat yang mandiri, cerdas (bisuk), dan berdaya saing tinggi.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Visi ini menjadi kompas bagi Bisukma Group untuk menciptakan ekosistem sosial dan ekonomi yang berkelanjutan, di mana setiap individu memiliki kesempatan untuk tumbuh dan berkontribusi secara cerdas bagi kemajuan nasional.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="bg-accent p-4 rounded-2xl text-white shadow-lg shadow-accent/20">
                  <Rocket className="h-7 w-7" />
                </div>
                <div>
                  <p className="font-bold text-xl text-primary">Mandiri & Cerdas</p>
                  <p className="text-sm text-muted-foreground">Filosofi Bisuk (Cerdas) dan Ma (Berdaya).</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="relative aspect-square rounded-3xl overflow-hidden shadow-none border bg-muted"
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

          <div className="space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                Misi Strategis
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Tiga Pilar Utama Pergerakan</h2>
              <p className="text-muted-foreground italic">"Langkah konkret kami dalam mewujudkan visi kemandirian bangsa."</p>
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
                  <Card className="h-full border border-muted-foreground/10 hover:border-accent/50 transition-all duration-300 group bg-white shadow-none">
                    <CardContent className="p-10 space-y-6">
                      <div className="text-accent p-3 rounded-2xl bg-accent/5 inline-block group-hover:scale-110 transition-transform">{misi.icon}</div>
                      <h3 className="text-2xl font-bold text-primary">{misi.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{misi.desc}</p>
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
