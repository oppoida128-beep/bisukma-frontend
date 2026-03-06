'use client'

import * as React from "react"
import Image from "next/image"
import {
  CheckCircle2,
  Layout,
  FileText,
  Utensils,
  Users,
  Sprout,
  Activity,
  ArrowRight,
  Target
} from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

const services = [
  {
    title: "Layanan perencanaan dapur MBG",
    subtitle: "Bisukma kitchen planning service",
    icon: <Layout className="h-6 w-6 md:h-8 md:w-8" />,
    img: "service-2",
    description: "Membantu calon pemilik dapur dalam tahap awal perancangan strategis dan teknis.",
    features: [
      "Studi kelayakan dapur",
      "Perhitungan kapasitas produksi",
      "Desain layout dapur MBG",
      "Estimasi investasi"
    ],
    output: "Blueprint dapur, estimasi biaya operasional, dan standar fasilitas dapur."
  },
  {
    title: "Layanan registrasi & legalitas MBG",
    subtitle: "Bisukma compliance service",
    icon: <FileText className="h-6 w-6 md:h-8 md:w-8" />,
    img: "news-3",
    description: "Pendampingan administrasi penuh untuk memastikan kepatuhan hukum dan kemitraan.",
    features: [
      "Registrasi mitra MBG",
      "Administrasi badan usaha",
      "Pengajuan kemitraan ke BGN",
      "Penyusunan dokumen operasional"
    ],
    output: "Dapur siap terdaftar secara resmi as mitra MBG."
  },
  {
    title: "Layanan setup operasional dapur",
    subtitle: "Bisukma kitchen setup service",
    icon: <Utensils className="h-6 w-6 md:h-8 md:w-8" />,
    img: "/layanan-assets/Layanan setup operasional dapur.svg",
    description: "Pendampingan teknis membangun infrastruktur dapur hingga siap beroperasi penuh.",
    features: [
      "Implementasi standar dapur",
      "Pengadaan alat dapur profesional",
      "Penyusunan SOP operasional",
      "Standar keamanan pangan"
    ],
    output: "Fasilitas dapur yang siap untuk produksi massal."
  },
  {
    title: "Layanan rekrutmen & pelatihan SDM",
    subtitle: "Bisukma human capital program",
    icon: <Users className="h-6 w-6 md:h-8 md:w-8" />,
    img: "/layanan-assets/Layanan rekrutmen & pelatihan SDM.svg",
    description: "Program pengembangan kapasitas untuk menciptakan tim dapur yang kompeten.",
    features: [
      "Pelatihan juru masak & manajer",
      "Manajemen dapur massal",
      "Edukasi standar gizi",
      "Pelatihan food safety"
    ],
    output: "SDM kompeten yang siap mengelola operasional harian."
  },
  {
    title: "Layanan rantai pasok pangan lokal",
    subtitle: "Bisukma local food supply network",
    icon: <Sprout className="h-6 w-6 md:h-8 md:w-8" />,
    img: "gallery-4",
    description: "Menghubungkan dapur dengan ekosistem pangan lokal yang berkelanjutan.",
    features: [
      "Akses petani & peternak lokal",
      "Koneksi UMKM pangan daerah",
      "Sinergi koperasi desa",
      "Stabilitas harga bahan"
    ],
    output: "Jaminan bahan pangan lokal dan stabilitas rantai pasok."
  },
  {
    title: "Layanan monitoring & evaluasi",
    subtitle: "Bisukma impact monitoring service",
    icon: <Activity className="h-6 w-6 md:h-8 md:w-8" />,
    img: "gallery-5",
    description: "Sistem pengawasan kualitas dan pelaporan dampak sosial yang transparan.",
    features: [
      "Monitoring kualitas makanan",
      "Evaluasi sistem distribusi",
      "Pelaporan rutin ke pemerintah",
      "Analisis dampak sosial & gizi"
    ],
    output: "Laporan operasional transparan dan akuntabel."
  }
]

export default function LayananPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  const heroImg = PlaceHolderImages.find(img => img.id === 'layanan-hero')

  return (
    <div className="pb-20 bg-white">
      {/* Minimalist Hero Section */}
      <section className="bg-white pt-8 md:pt-16 pb-12 text-primary overflow-hidden border-b border-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-left tracking-tight leading-tight">
                  Layanan <span className="text-accent">kami</span>
                </h1>
                <p className="text-left text-base md:text-xl text-muted-foreground font-medium max-w-xl leading-relaxed">
                  6 Layanan strategis Bisukma Digital untuk mendukung calon pemilik dapur MBG dalam membangun ekosistem pangan yang mandiri.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full font-bold px-8 h-12">
                  Konsultasi kemitraan
                </Button>
                <Button variant="outline" size="lg" className="rounded-full font-bold px-8 h-12 border-muted-foreground/20 text-muted-foreground">
                  Pelajari program
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-video w-full rounded-2xl md:rounded-[2rem] overflow-hidden border shadow-2xl shadow-accent/5"
            >
              {heroImg?.imageUrl && (
                <Image
                  src={heroImg.imageUrl}
                  alt="Bisukma Digital Hero"
                  fill
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => {
            const imageUrl = service.img.startsWith('/')
              ? service.img
              : PlaceHolderImages.find(im => im.id === service.img)?.imageUrl;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="overflow-hidden border border-muted shadow-none bg-white flex flex-col h-full hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 rounded-[1.5rem] group">
                  <div className="relative h-48 md:h-56 w-full overflow-hidden">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-accent shadow-xl">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="space-y-4 mb-6">
                      <div className="space-y-1">
                        <div className="text-accent mb-2">
                          {service.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight leading-tight">{service.title}</h3>
                        <p className="text-xs font-bold text-muted-foreground/60 italic tracking-wider">{service.subtitle}</p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="space-y-4 flex-1">
                      <ul className="space-y-3">
                        {service.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground font-medium">
                            <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-muted/50">
                      <div className="flex items-start gap-3">
                        <div className="bg-accent/10 p-1.5 rounded-lg text-accent shrink-0 mt-0.5">
                          <Target className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Output utama</p>
                          <p className="text-xs md:text-sm font-semibold text-primary/80 leading-relaxed">
                            {service.output}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="container mx-auto px-4 mt-24 md:mt-32"
        {...fadeIn}
      >
        <div className="bg-muted/20 rounded-[2.5rem] border border-muted-foreground/5 p-8 md:p-20 text-center max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight">Siap membangun kemandirian pangan?</h2>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              Kami siap mendampingi Anda dari tahap perencanaan hingga dapur MBG Anda beroperasi penuh. Mari berkolaborasi untuk gizi anak bangsa yang lebih baik.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full font-bold px-8 h-12">
              Jadwalkan konsultasi
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full font-bold px-8 h-12 border-muted-foreground/20 text-muted-foreground hover:bg-white">
              Unduh brosur program
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
