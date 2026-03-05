
'use client'

import * as React from "react"
import Image from "next/image"
import { Users, History, Globe, Award, Briefcase, TrendingUp, ShieldCheck } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function TentangKamiPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  const profileImg = PlaceHolderImages.find(img => img.id === 'profile')
  
  const team = {
    founder: PlaceHolderImages.find(img => img.id === 'team-founder'),
    deputies: [
      { name: "Andi Pratama", role: "Deputi I", img: PlaceHolderImages.find(img => img.id === 'team-deputy1') },
      { name: "Siti Rahma", role: "Deputi II", img: PlaceHolderImages.find(img => img.id === 'team-deputy2') },
    ],
    heads: [
      { name: "Budi Santoso", role: "Kepala Bag. SDM", img: PlaceHolderImages.find(img => img.id === 'team-sdm') },
      { name: "Reza Fahlevi", role: "Kepala Bag. Operasional", img: PlaceHolderImages.find(img => img.id === 'team-ops') },
      { name: "Dewi Lestari", role: "Kepala Bag. Keuangan", img: PlaceHolderImages.find(img => img.id === 'team-finance') },
    ]
  }

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
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border bg-muted"
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
                  data-ai-hint="modern office"
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

      {/* --- ORGANIZATIONAL STRUCTURE --- */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16 space-y-4"
            {...fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Struktur Organisasi</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tim kepemimpinan kami membawa pengalaman bertahun-tahun dalam industri teknologi untuk membimbing Bisukma Digital.
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* Founder Level */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center space-y-4 max-w-sm group">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-accent/20 group-hover:border-accent transition-colors duration-500">
                  {team.founder?.imageUrl && (
                    <Image src={team.founder.imageUrl} alt="Founder" fill className="object-cover" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">Rahmat Hidayat</h3>
                  <p className="text-accent font-semibold uppercase tracking-wider text-xs">Founder & CEO</p>
                </div>
              </div>
            </motion.div>

            {/* Deputies Level */}
            <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
              {team.deputies.map((deputy, i) => (
                <motion.div 
                  key={i}
                  className="text-center space-y-4 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-muted group-hover:border-accent/50 transition-colors duration-500">
                    {deputy.img?.imageUrl && (
                      <Image src={deputy.img.imageUrl} alt={deputy.name} fill className="object-cover" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary">{deputy.name}</h4>
                    <p className="text-muted-foreground font-medium text-sm">{deputy.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Heads Level */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.heads.map((head, i) => (
                <motion.div 
                  key={i}
                  className="text-center space-y-4 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-muted group-hover:border-accent/30 transition-colors duration-500">
                    {head.img?.imageUrl && (
                      <Image src={head.img.imageUrl} alt={head.name} fill className="object-cover" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-primary">{head.name}</h5>
                    <p className="text-xs text-muted-foreground font-medium">{head.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 bg-primary text-white">
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
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/10 text-accent mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-extrabold">{stat.value}</div>
                <p className="text-sm font-medium text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
