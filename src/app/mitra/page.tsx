
'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Handshake, 
  Building2, 
  Cpu, 
  Sprout, 
  ArrowRight,
  CheckCircle2
} from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const partnerLogos = [
  { id: "partner-1", name: "Tech Partner" },
  { id: "partner-2", name: "Agri Solutions" },
  { id: "partner-3", name: "Logistic Pro" },
  { id: "partner-1", name: "Digital Innovation" },
  { id: "partner-2", name: "Supply Chain Co" },
  { id: "partner-3", name: "Local Farmers Alliance" },
]

const categories = [
  {
    title: "Pemasok Pangan Lokal",
    description: "Bekerja sama dengan petani, peternak, dan UMKM daerah untuk menjamin ketersediaan bahan pangan berkualitas.",
    icon: <Sprout className="h-8 w-8" />,
    color: "bg-green-500/10 text-green-600"
  },
  {
    title: "Mitra Teknologi & Inovasi",
    description: "Kolaborasi dengan perusahaan teknologi untuk digitalisasi operasional dapur dan monitoring gizi secara presisi.",
    icon: <Cpu className="h-8 w-8" />,
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    title: "Lembaga Pemerintah & Sosial",
    description: "Sinergi bersama instansi pemerintah and organisasi non-profit dalam menyukseskan program strategis nasional.",
    icon: <Building2 className="h-8 w-8" />,
    color: "bg-accent/10 text-accent"
  }
]

const benefits = [
  "Akses ke jaringan pasar yang luas",
  "Sistem pembayaran yang transparan",
  "Pendampingan standarisasi kualitas",
  "Dukungan digitalisasi bisnis",
  "Kontribusi nyata pada gizi nasional",
  "Peluang ekspansi skala nasional"
]

export default function MitraPage() {
  return (
    <div className="flex flex-col w-full bg-white pb-24">
      <section className="relative py-24 md:py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.15)_0%,transparent_70%)] opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6"
          >
            <Badge variant="outline" className="border-accent/50 text-accent px-4 py-1.5 rounded-full text-xs font-bold">
              Kolaborasi Strategis
            </Badge>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6"
          >
            Membangun Masa Depan <br />
            <span className="text-accent italic">Bersama Mitra Terpercaya.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium mb-10"
          >
            Jalin sinergi dalam ekosistem pangan dan teknologi untuk menciptakan dampak positif bagi kemandirian bangsa.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full font-bold px-10 h-14 text-base border-none shadow-xl shadow-accent/20" asChild>
              <Link href="/mitra/pendaftaran-mitra">
                Daftar Jadi Mitra Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-muted-foreground mb-2">Telah Berkolaborasi Bersama</p>
            <h2 className="text-2xl font-extrabold text-primary">Jaringan Kemitraan Kami</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partnerLogos.map((partner, i) => {
              const img = PlaceHolderImages.find(item => item.id === partner.id)
              return (
                <div key={i} className="flex justify-center group opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                  <div className="relative w-32 h-16">
                    {img?.imageUrl && (
                      <Image src={img.imageUrl} alt={partner.name} fill className="object-contain" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tight">Kategori Kemitraan Strategis</h2>
            <p className="text-muted-foreground font-medium">Kami membuka peluang kerja sama secara luas pada berbagai sektor untuk mendukung keberhasilan program nasional.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <Card key={i} className="h-full border-none shadow-none bg-white rounded-[2rem] overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                <CardContent className="p-10 space-y-6">
                  <div className={cn("inline-flex p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500", cat.color)}>
                    {cat.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-extrabold text-primary leading-tight">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {cat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-accent/10 text-accent border-none px-4 py-1 text-xs font-bold">Manfaat Kemitraan</Badge>
                <h2 className="text-3xl md:text-5xl font-black text-primary leading-tight">Mengapa Menjadi Mitra <br /><span className="text-accent">Bisukma Digital?</span></h2>
                <p className="text-muted-foreground text-lg font-medium leading-relaxed">Kami memberikan dukungan penuh bagi setiap mitra untuk tumbuh dan berkembang bersama dalam ekosistem yang sehat.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-accent/10 p-1 rounded-full text-accent">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold text-primary/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10 border-8 border-white bg-muted">
              <Image 
                src="https://picsum.photos/seed/mitra-collaboration/1000/1000" 
                alt="Mitra Kolaborasi" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="bg-accent p-3 rounded-xl text-white">
                    <Handshake className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground">Bergabung Sekarang</p>
                    <p className="text-lg font-black text-primary">Jadilah Bagian Dari Perubahan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
