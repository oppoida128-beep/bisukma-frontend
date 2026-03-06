'use client'

import * as React from "react"
import Image from "next/image"
import { Users, Briefcase, TrendingUp, Zap, ChevronRight, Mail, Linkedin } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function TentangKamiPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  const heroImg = PlaceHolderImages.find(img => img.id === 'tentang-kami-hero')

  const team = {
    founder: { imageUrl: "/jajaran/founder.svg" },
    deputies: [
      { 
        name: "D. Hardtaty Silaban, S.Psi.", 
        role: "deputi i", 
        imageUrl: "/jajaran/deputi-i.svg", 
        bio: "strategi & kemitraan pemerintah" 
      },
      { 
        name: "Nico Benedictus Sianipar", 
        role: "deputi ii", 
        imageUrl: "/jajaran/deputi-ii.svg", 
        bio: "operasional & pemberdayaan daerah" 
      },
    ],
    heads: [
      { 
        name: "Budi Santoso", 
        role: "kepala bag. sdm", 
        imageUrl: "/jajaran/kepala-bag-sdm.svg" 
      },
      { 
        name: "Bram H. S. Simorangkir", 
        role: "kepala bag. operasional", 
        imageUrl: "/jajaran/kepala-bag-operasional.svg" 
      },
      { 
        name: "Septina Purba", 
        role: "kepala bag. keuangan", 
        imageUrl: "/jajaran/kepala-bag-keuangan.svg" 
      },
    ]
  }

  return (
    <div className="flex flex-col w-full bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,hsl(var(--accent)/0.15)_0%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual Hero di Kiri */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/20">
                {heroImg?.imageUrl && (
                  <Image 
                    src={heroImg.imageUrl} 
                    alt="Bisukma Tentang Kami" 
                    fill 
                    className="object-cover"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </motion.div>

            {/* Teks Hero di Kanan */}
            <motion.div 
              className="text-left space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="outline" className="border-accent text-accent px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
                eksplorasi profil
              </Badge>
              <h1 className="scroll-m-20 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Membangun bangsa <br />
                <span className="text-accent italic">bersama Bisukma.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                lembaga strategis nasional yang berfokus pada pemberdayaan masyarakat mandiri, cerdas, dan berdaya saing global.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5 group hover:border-accent/30 transition-colors">
                  <p className="text-3xl font-bold text-accent">15+</p>
                  <p className="text-[10px] text-white/60 uppercase font-bold tracking-widest">tahun pengabdian</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5 group hover:border-accent/30 transition-colors">
                  <p className="text-3xl font-bold text-accent">6K+</p>
                  <p className="text-[10px] text-white/60 uppercase font-bold tracking-widest">masyarakat berdaya</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONTENT ACCORDION SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            className="space-y-12"
            {...fadeIn}
          >
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">eksplorasi dimensi kami</h2>
              <p className="text-muted-foreground text-lg">mengenal lebih dalam sejarah, identitas, dan pilar pergerakan bisukma group.</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="sejarah" className="border rounded-2xl px-8 bg-white shadow-none transition-all hover:border-accent/30">
                <AccordionTrigger className="hover:no-underline font-bold text-xl py-8 text-primary group">
                  <span className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs">01</span>
                    awal perjalanan & sejarah
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed space-y-4 pb-8 text-base">
                  <p>
                    <strong>awal berdiri (2009):</strong> bisukma mulai dikenal luas sejak tahun 2009 sebagai organisasi sosial yang digagas oleh erickson sianipar. fokus awalnya adalah pada dua sektor vital: pendidikan dan pertanian.
                  </p>
                  <p>
                    <strong>lembaga formal:</strong> yayasan bisukma bangun bangsa dibentuk sebagai payung hukum formal untuk menjalankan visi memajukan sdm (sumber daya manusia) dan ekonomi kerakyatan.
                  </p>
                  <p>
                    <strong>rekam jejak:</strong> hingga saat ini, kami telah melatih lebih dari 6.000 masyarakat, termasuk pelatihan teknologi informasi untuk petani agar bisa mengakses aplikasi pertanian dan peternakan modern.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="transformasi" className="border rounded-2xl px-8 bg-white shadow-none transition-all hover:border-accent/30">
                <AccordionTrigger className="hover:no-underline font-bold text-xl py-8 text-primary group">
                  <span className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs">02</span>
                    transformasi bisukma group
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed space-y-4 pb-8 text-base">
                  <p>
                    istilah "bisukma group" muncul seiring dengan perluasan skala gerakan kami. kini, kami beroperasi layaknya grup entitas yang mengelola berbagai program strategis nasional di daerah:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-4 pt-2">
                    <li className="p-4 rounded-xl bg-muted/30 border border-muted-foreground/10">
                      <p className="font-bold text-primary mb-1 text-sm">sektor gizi (mbg)</p>
                      <p className="text-xs">pelopor program makan bergizi gratis di tapanuli utara dan toba melalui sppg.</p>
                    </li>
                    <li className="p-4 rounded-xl bg-muted/30 border border-muted-foreground/10">
                      <p className="font-bold text-primary mb-1 text-sm">kemanusiaan</p>
                      <p className="text-xs">aktif dalam aksi tanggap darurat dan bantuan sosial kemanusiaan nasional.</p>
                    </li>
                    <li className="p-4 rounded-xl bg-muted/30 border border-muted-foreground/10">
                      <p className="font-bold text-primary mb-1 text-sm">vokasi (kemnaker)</p>
                      <p className="text-xs">kerja sama strategis dengan bbpvp medan untuk peningkatan keahlian kerja.</p>
                    </li>
                    <li className="p-4 rounded-xl bg-muted/30 border border-muted-foreground/10">
                      <p className="font-bold text-primary mb-1 text-sm">ketahanan pangan</p>
                      <p className="text-xs">sinergi bersama tni (kodim 0210/tu) dalam memajukan pertanian lokal.</p>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="identitas" className="border rounded-2xl px-8 bg-white shadow-none transition-all hover:border-accent/30">
                <AccordionTrigger className="hover:no-underline font-bold text-xl py-8 text-primary group">
                  <span className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs">03</span>
                    identitas & legalitas
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-8">
                  <div className="grid sm:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground/60 tracking-wide">nama resmi</p>
                      <p className="text-base font-semibold text-primary">yayasan bisukma bangun bangsa</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground/60 tracking-wide">founder / pendiri</p>
                      <p className="text-base font-semibold text-primary">erickson sianipar</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground/60 tracking-wide">kantor pusat</p>
                      <p className="text-base font-semibold text-primary">jl. hm joni no. 50 l, medan, sumut</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground/60 tracking-wide">wilayah kerja</p>
                      <p className="text-base font-semibold text-primary">sumatera utara (taput, toba, medan)</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pilar" className="border rounded-2xl px-8 bg-white shadow-none transition-all hover:border-accent/30">
                <AccordionTrigger className="hover:no-underline font-bold text-xl py-8 text-primary group">
                  <span className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs">04</span>
                    pilar program strategis
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-8">
                  <div className="grid gap-4 pt-4">
                    {[
                      { icon: <Briefcase className="size-5" />, title: "pendidikan & vokasi", desc: "pelatihan keterampilan industri 4.0 dan literasi digital masyarakat." },
                      { icon: <Zap className="size-5" />, title: "ketahanan gizi nasional", desc: "infrastruktur dapur umum mandiri untuk pemenuhan gizi anak bangsa." },
                      { icon: <TrendingUp className="size-5" />, title: "ekonomi masyarakat", desc: "digitalisasi sektor pertanian dan pemberdayaan umkm lokal secara masif." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-5 p-6 border rounded-2xl bg-muted/20 hover:bg-white hover:border-accent/40 transition-all duration-300">
                        <div className="bg-accent text-white p-3 rounded-xl h-fit shadow-lg shadow-accent/10">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-bold text-primary text-lg">{item.title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* --- ORGANIZATIONAL STRUCTURE SECTION --- */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Background Image with Low Opacity */}
        <div className="absolute inset-0 z-0 opacity-10">
          <Image 
            src="/layanan-assets/5.svg" 
            alt="background pattern" 
            fill 
            className="object-cover"
          />
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.05)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-20 space-y-4"
            {...fadeIn}
          >
            <Badge variant="outline" className="border-accent/30 text-accent mb-2">hierarki kepemimpinan</Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">struktur organisasi</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              sinergi tim kepemimpinan yang berdedikasi untuk mewujudkan visi kemandirian bangsa.
            </p>
          </motion.div>

          {/* Founder - Premium Card */}
          <div className="mb-24">
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="overflow-hidden border-none bg-black/20 backdrop-blur-md text-white shadow-2xl rounded-[2.5rem] relative group border border-white/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 items-center">
                    <div className="relative aspect-square md:aspect-auto md:h-full min-h-[400px]">
                      {team.founder?.imageUrl && (
                        <Image src={team.founder.imageUrl} alt="erickson sianipar" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      )}
                    </div>
                    <div className="p-10 md:p-16 space-y-6 relative">
                      <div className="space-y-2">
                        <p className="text-accent font-bold uppercase tracking-[0.2em] text-xs">the visionary</p>
                        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">erickson sianipar</h3>
                        <p className="text-accent-foreground/60 font-semibold text-lg italic uppercase">founder bisukma group</p>
                      </div>
                      <p className="text-primary-foreground/70 leading-relaxed text-sm">
                        "membangun bangsa dimulai dari kemandirian setiap individu. melalui pemberdayaan yang tepat, kita menciptakan masa depan yang lebih cerah bagi generasi mendatang."
                      </p>
                      <div className="flex gap-4 pt-4">
                        <button className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white">
                          <Linkedin className="size-4" />
                        </button>
                        <button className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white">
                          <Mail className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Deputies - Modern Grid */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {team.deputies.map((deputy, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Card className="border border-white/10 bg-white/5 backdrop-blur-sm rounded-[2rem] overflow-hidden group hover:border-accent/40 transition-all duration-500 shadow-none">
                    <CardContent className="p-8 flex items-center gap-6">
                      <div className="relative size-24 md:size-32 shrink-0 overflow-hidden rounded-2xl bg-white/10 border-2 border-accent/20">
                        {deputy.imageUrl && (
                          <Image src={deputy.imageUrl} alt={deputy.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-accent font-bold text-[10px] uppercase tracking-widest">{deputy.role}</p>
                        <h4 className="text-xl font-bold text-white leading-tight">{deputy.name}</h4>
                        <p className="text-xs text-white/60 font-medium">{deputy.bio}</p>
                        <div className="flex gap-2 pt-2">
                          <Linkedin className="size-3 text-white/40 hover:text-accent cursor-pointer transition-colors" />
                          <Mail className="size-3 text-white/40 hover:text-accent cursor-pointer transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Heads - Unified Minimalist Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.heads.map((head, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex items-center gap-4 group hover:border-accent/40 transition-all duration-300">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-white/10 border border-accent/10 group-hover:rotate-3 transition-transform">
                      {head.imageUrl && (
                        <Image src={head.imageUrl} alt={head.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="space-y-1 flex-1">
                      <p className="text-[10px] text-accent font-bold uppercase tracking-wider">{head.role}</p>
                      <h5 className="font-bold text-white text-sm group-hover:text-accent transition-colors leading-tight">{head.name}</h5>
                      <div className="flex gap-2 pt-1 opacity-40 group-hover:opacity-100 transition-opacity">
                        <Linkedin className="size-3 text-white hover:text-accent cursor-pointer transition-colors" />
                        <Mail className="size-3 text-white hover:text-accent cursor-pointer transition-colors" />
                      </div>
                    </div>
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
