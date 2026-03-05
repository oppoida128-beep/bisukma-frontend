'use client'

import * as React from "react"
import { Award, Shield, Users, Target, Zap, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

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
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-primary text-center">
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,hsl(var(--accent)/0.15)_0%,transparent_100%)]"></div>
        <motion.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="scroll-m-20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Nilai Inti <span className="text-accent">Budaya Kami</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Prinsip-prinsip yang membentuk cara kami bekerja, berinovasi, dan melayani mitra kami setiap harinya.
          </p>
        </motion.div>
      </section>

      {/* --- VALUES GRID --- */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border border-muted-foreground/10 shadow-none hover:border-accent/50 transition-all duration-300 group">
                  <CardContent className="p-10 space-y-6">
                    <div className={cn("inline-flex p-4 rounded-2xl transition-transform group-hover:scale-110 duration-300", val.color)}>
                      {val.icon}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-primary">{val.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
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
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">Lebih dari Sekadar Kode</h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Di Bisukma Digital, nilai-nilai ini bukanlah sekadar teks di dinding kantor. Mereka adalah DNA yang mengalir dalam setiap proyek dan keputusan yang kami ambil. Kami bangga membangun tempat kerja yang inklusif, inovatif, dan penuh integritas.
          </p>
        </div>
      </section>
    </div>
  )
}
