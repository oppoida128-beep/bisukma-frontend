'use client'

import * as React from "react"
import Image from "next/image"
import { Award, Shield, Users, Target, Zap, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function NilaiIntiPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  const values = [
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Inovasi Tanpa Batas",
      desc: "Kami tidak pernah berhenti mengeksplorasi teknologi baru untuk memberikan keunggulan kompetitif bagi klien kami.",
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Integritas & Kepercayaan",
      desc: "Kepercayaan adalah fondasi hubungan kami. Kami bekerja dengan transparansi penuh dan standar etika tertinggi.",
      color: "bg-green-500/10 text-green-500"
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Kolaborasi Radikal",
      desc: "Kami percaya bahwa hasil terbaik datang dari kerja sama tim yang erat, baik secara internal maupun dengan klien kami.",
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      icon: <Target className="h-10 w-10" />,
      title: "Kualitas Tanpa Kompromi",
      desc: "Setiap baris kode dan setiap elemen desain harus memenuhi standar kualitas yang ketat sebelum dirilis.",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Keunggulan Operasional",
      desc: "Kami mengoptimalkan proses kerja untuk memastikan pengiriman proyek yang tepat waktu dan efisien.",
      color: "bg-orange-500/10 text-orange-500"
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: "Empati Pengguna",
      desc: "Kami membangun teknologi dengan memikirkan manusia di baliknya, menciptakan pengalaman yang intuitif dan bermakna.",
      color: "bg-red-500/10 text-red-500"
    }
  ]

  return (
    <div className="flex flex-col w-full bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-primary">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <Image 
            src="/layanan-assets/6.svg" 
            alt="Pattern" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,hsl(var(--accent)/0.15)_0%,transparent_100%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="border-accent text-accent px-4 py-1 text-xs font-bold tracking-widest rounded-full uppercase">
                Budaya Organisasi
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="scroll-m-20 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Nilai Inti <span className="text-accent">BISUKMA GROUP</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Prinsip-prinsip yang membentuk cara kami bekerja, berinovasi, dan melayani mitra kami setiap harinya untuk membangun bangsa yang mandiri.
            </motion.p>
          </div>
        </div>
      </section>

      {/* --- VALUES GRID --- */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border border-muted shadow-none hover:border-accent/40 transition-all duration-500 group rounded-[2rem] bg-white overflow-hidden">
                  <CardContent className="p-10 space-y-6">
                    <div className={cn("inline-flex p-4 rounded-2xl transition-transform group-hover:scale-110 duration-500", val.color)}>
                      {val.icon}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-primary tracking-tight">{val.title}</h3>
                      <p className="text-muted-foreground leading-relaxed font-medium text-sm md:text-base">
                        {val.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CULTURE SECTION --- */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-8 md:p-20 shadow-2xl shadow-primary/5 border border-white flex flex-col md:flex-row items-center gap-12">
            <div className="relative size-48 md:size-64 shrink-0">
              <Image 
                src="/layanan-assets/2.svg" 
                alt="Culture Visual" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tight">Lebih dari Sekadar Kode</h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                Di Bisukma Group, nilai-nilai ini bukanlah sekadar teks di dinding kantor. Mereka adalah DNA yang mengalir dalam setiap proyek dan keputusan yang kami ambil. Kami bangga membangun tempat kerja yang inklusif, inovatif, dan penuh integritas.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-accent"></div>
                  <span className="text-xs font-bold text-primary/60">Transparansi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-accent"></div>
                  <span className="text-xs font-bold text-primary/60">Dedikasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-accent"></div>
                  <span className="text-xs font-bold text-primary/60">Empati</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
