'use client'

import * as React from "react"
import Image from "next/image"
import { Users, History, Globe, Award, Briefcase, TrendingUp, ShieldCheck, MapPin, Target, Zap, LayoutGrid } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function TentangKamiPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  const carouselImages = [
    PlaceHolderImages.find(img => img.id === 'profile'),
    PlaceHolderImages.find(img => img.id === 'gallery-6'),
    PlaceHolderImages.find(img => img.id === 'gallery-3'),
  ]

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
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,hsl(var(--accent)/0.15)_0%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Carousel di Kiri */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Carousel 
                plugins={[Autoplay({ delay: 4000 })]}
                className="w-full rounded-2xl overflow-hidden border border-white/10"
              >
                <CarouselContent>
                  {carouselImages.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-[4/3] w-full">
                        {img?.imageUrl && (
                          <Image 
                            src={img.imageUrl} 
                            alt={`Slide ${index}`} 
                            fill 
                            className="object-cover"
                          />
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-black/20 border-none text-white hover:bg-black/40" />
                <CarouselNext className="right-4 bg-black/20 border-none text-white hover:bg-black/40" />
              </Carousel>
            </motion.div>

            {/* Teks Hero di Kanan */}
            <motion.div 
              className="text-left space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="scroll-m-20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Membangun Bangsa <br />
                Bersama <span className="text-accent">Bisukma Group</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                Yayasan Bisukma Bangun Bangsa hadir sebagai partner strategis nasional untuk pemberdayaan masyarakat yang mandiri dan berdaya saing.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                  <p className="text-2xl font-bold text-accent">15+</p>
                  <p className="text-xs text-white/60">Tahun Dedikasi</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                  <p className="text-2xl font-bold text-accent">6K+</p>
                  <p className="text-xs text-white/60">Masyarakat Dilatih</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONTENT ACCORDION SECTION --- */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            className="space-y-8"
            {...fadeIn}
          >
            <div className="text-center space-y-2 mb-12">
              <h2 className="text-3xl font-extrabold text-primary">Profil Mendalam</h2>
              <p className="text-muted-foreground">Eksplorasi setiap dimensi perjuangan dan visi kami.</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="sejarah" className="border rounded-xl px-6 bg-white shadow-none">
                <AccordionTrigger className="hover:no-underline font-bold text-lg py-6">
                  Awal Perjalanan & Sejarah
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed space-y-4 pb-6">
                  <p>
                    <strong>Awal Berdiri (2009):</strong> Bisukma mulai dikenal luas sejak tahun 2009 sebagai organisasi sosial yang digagas oleh Erickson Sianipar. Fokus awalnya adalah pada dua sektor vital: Pendidikan dan Pertanian.
                  </p>
                  <p>
                    <strong>Lembaga Formal:</strong> Yayasan Bisukma Bangun Bangsa dibentuk sebagai payung hukum formal untuk menjalankan visi memajukan SDM (Sumber Daya Manusia) dan ekonomi kerakyatan.
                  </p>
                  <p>
                    <strong>Rekam Jejak:</strong> Hingga saat ini, kami telah melatih lebih dari 6.000 masyarakat, termasuk pelatihan teknologi informasi untuk petani agar bisa mengakses aplikasi pertanian dan peternakan modern.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="transformasi" className="border rounded-xl px-6 bg-white shadow-none">
                <AccordionTrigger className="hover:no-underline font-bold text-lg py-6">
                  Transformasi Menjadi Bisukma Group
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed space-y-4 pb-6">
                  <p>
                    Istilah "Bisukma Group" muncul seiring dengan perluasan skala gerakan kami. Kini, kami beroperasi layaknya grup entitas yang mengelola berbagai program strategis nasional di daerah:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Sektor Gizi (Program MBG):</strong> Menjadi pelopor dalam implementasi program Makan Bergizi Gratis (MBG) di Tapanuli Utara dan Toba melalui Satuan Pelayanan Pemenuhan Gizi (SPPG).</li>
                    <li><strong>Kemanusiaan & Sosial:</strong> Aktif dalam aksi tanggap darurat dan bantuan kemanusiaan.</li>
                    <li><strong>Kemitraan Strategis:</strong> Bekerja sama dengan Kemnaker (BBPVP Medan) untuk pelatihan vokasi, serta TNI (Kodim 0210/TU) untuk ketahanan pangan.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="identitas" className="border rounded-xl px-6 bg-white shadow-none">
                <AccordionTrigger className="hover:no-underline font-bold text-lg py-6">
                  Identitas & Profil Organisasi
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-accent uppercase tracking-wider">Nama Resmi</p>
                      <p className="text-sm font-medium">Yayasan Bisukma Bangun Bangsa</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-accent uppercase tracking-wider">Pendiri</p>
                      <p className="text-sm font-medium">Erickson Sianipar</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-accent uppercase tracking-wider">Kantor Pusat</p>
                      <p className="text-sm font-medium">Jl. HM Joni No. 50 L, Medan, Sumut</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-accent uppercase tracking-wider">Wilayah Operasional</p>
                      <p className="text-sm font-medium">Tapanuli Utara, Toba, dan Medan</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pilar" className="border rounded-xl px-6 bg-white shadow-none">
                <AccordionTrigger className="hover:no-underline font-bold text-lg py-6">
                  Pilar Program & Fokus Utama
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="grid gap-4 pt-2">
                    <div className="flex gap-4 p-4 border rounded-xl hover:bg-muted/50 transition-colors">
                      <Briefcase className="h-6 w-6 text-accent shrink-0" />
                      <div>
                        <p className="font-bold text-primary">Pendidikan & Vokasi</p>
                        <p className="text-sm text-muted-foreground">Kerja sama pelatihan keterampilan industri dan teknologi digital.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 border rounded-xl hover:bg-muted/50 transition-colors">
                      <Zap className="h-6 w-6 text-accent shrink-0" />
                      <div>
                        <p className="font-bold text-primary">Ketahanan Gizi</p>
                        <p className="text-sm text-muted-foreground">Pengelolaan dapur umum untuk Program Makan Bergizi Gratis (MBG).</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 border rounded-xl hover:bg-muted/50 transition-colors">
                      <TrendingUp className="h-6 w-6 text-accent shrink-0" />
                      <div>
                        <p className="font-bold text-primary">Ekonomi Kerakyatan</p>
                        <p className="text-sm text-muted-foreground">Modernisasi pertanian dan pemberdayaan UMKM lokal sebagai pemasok bahan baku pangan.</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
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
              Tim kepemimpinan kami membawa pengalaman bertahun-tahun untuk membimbing Bisukma Group.
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
                  <h3 className="text-xl font-bold text-primary">Erickson Sianipar</h3>
                  <p className="text-accent font-semibold uppercase tracking-wider text-xs">Founder</p>
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
    </div>
  )
}
