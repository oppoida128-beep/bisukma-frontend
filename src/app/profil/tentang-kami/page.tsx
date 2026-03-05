'use client'

import * as React from "react"
import Image from "next/image"
import { Users, History, Globe, Award } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { motion } from "framer-motion"

export default function TentangKamiPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  const profileImg = PlaceHolderImages.find(img => img.id === 'profile')

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
            Tentang <span className="text-accent">Bisukma Digital</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Lebih dari sekadar agensi teknologi; kami adalah partner strategis Anda dalam mengarungi gelombang inovasi.
          </p>
        </motion.div>
      </section>

      {/* --- STORY SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {profileImg?.imageUrl && (
                <Image 
                  src={profileImg.imageUrl} 
                  alt="Office Bisukma" 
                  fill 
                  className="object-cover"
                />
              )}
            </motion.div>
            
            <motion.div 
              className="space-y-8"
              {...fadeIn}
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Cerita Perjalanan Kami</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Didirikan oleh sekelompok visioner teknologi, Bisukma Digital lahir dari keinginan untuk menutup celah antara ide bisnis yang brilian dan eksekusi teknis yang mumpuni. 
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Kami percaya bahwa setiap bisnis, terlepas dari ukurannya, berhak mendapatkan akses ke teknologi kelas dunia. Sejak awal, fokus kami adalah pada kualitas, transparansi, dan hasil yang dapat diukur.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-accent font-bold">
                    <Users className="h-5 w-5" />
                    <span>50+ Ahli</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Tim insinyur & desainer berdedikasi.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-accent font-bold">
                    <Globe className="h-5 w-5" />
                    <span>Global Impact</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Melayani klien dari berbagai benua.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <History className="h-6 w-6" />, label: "Tahun Berdiri", value: "2018" },
              { icon: <Award className="h-6 w-6" />, label: "Proyek Selesai", value: "200+" },
              { icon: <Users className="h-6 w-6" />, label: "Kepuasan Klien", value: "98%" },
              { icon: <Globe className="h-6 w-6" />, label: "Negara Dilayani", value: "12+" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="text-center space-y-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-sm text-accent mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
