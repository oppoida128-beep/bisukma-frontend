'use client'

import * as React from "react"
import Image from "next/image"
import { Target, Shield, Rocket, Heart } from "lucide-react"
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
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,hsl(var(--accent)/0.15)_0%,transparent_100%)]"></div>
        <motion.div 
          className="container mx-auto px-4 relative z-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="scroll-m-20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Visi & <span className="text-accent">Misi Kami</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Menjadi kompas bagi transformasi digital yang berkelanjutan dan bermakna.
          </p>
        </motion.div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div 
              className="space-y-6"
              {...fadeIn}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                Our Vision
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Menjadi katalis utama dunia digital global.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Visi kami adalah merevolusi cara bisnis berinteraksi dengan teknologi. Kami ingin menciptakan ekosistem di mana inovasi digital dapat diakses oleh semua skala bisnis, mendorong efisiensi tanpa batas, dan menciptakan nilai yang melampaui ekspektasi.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="bg-accent p-3 rounded-2xl text-white">
                  <Rocket className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-primary">Inovasi Berkelanjutan</p>
                  <p className="text-sm text-muted-foreground">Membangun masa depan hari ini.</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
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
            </motion.div>
          </div>

          <div className="space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Langkah nyata kami untuk masa depan.</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Target className="h-8 w-8" />,
                  title: "Solusi Presisi",
                  desc: "Memberikan solusi teknologi yang tepat sasaran untuk setiap tantangan bisnis yang unik."
                },
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: "Keamanan Terjamin",
                  desc: "Memprioritaskan keamanan data dan integritas sistem dalam setiap baris kode yang kami buat."
                },
                {
                  icon: <Heart className="h-8 w-8" />,
                  title: "Pemberdayaan Bisnis",
                  desc: "Membantu mitra kami tumbuh dan berkembang melalui adopsi teknologi yang cerdas dan efisien."
                }
              ].map((misi, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-none bg-muted/30 hover:bg-white hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8 space-y-4">
                      <div className="text-accent">{misi.icon}</div>
                      <h3 className="text-xl font-bold text-primary">{misi.title}</h3>
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
