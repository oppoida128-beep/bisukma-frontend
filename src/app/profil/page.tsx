'use client'

import Image from "next/image"
import { Shield, Target, Award, Users } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function ProfilPage() {
  const profileImg = PlaceHolderImages.find(img => img.id === 'profile')

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-primary py-24 text-white">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-center">Profil Bisukma Digital</h1>
          <p className="text-center mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Mengenal lebih dekat visi kami untuk merevolusi ekosistem digital di Indonesia.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 -mt-12">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 md:p-16 space-y-16"
          {...fadeIn}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {profileImg?.imageUrl && (
                <Image 
                  src={profileImg.imageUrl} 
                  alt="Profile Office" 
                  fill 
                  className="object-cover"
                />
              )}
            </motion.div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Tentang Kami</h2>
              <p className="text-muted-foreground leading-relaxed">
                Didirikan dengan semangat inovasi, Bisukma Digital telah tumbuh menjadi salah satu penyedia solusi IT terkemuka. Kami percaya bahwa teknologi harus menjadi enabler bagi pertumbuhan bisnis, bukan hambatan.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Tim kami terdiri dari para profesional yang berdedikasi tinggi, mulai dari software architect, developer, hingga UX designer, yang siap membantu mewujudkan ide-ide brilian Anda menjadi kenyataan digital.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }} 
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-none bg-accent/5 p-8 h-full">
                <CardContent className="p-0 space-y-4">
                  <div className="bg-accent/20 p-3 rounded-xl inline-block">
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold">Visi Kami</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Menjadi mitra teknologi pilihan utama yang mendorong transformasi digital berkelanjutan dan inklusif bagi bisnis dari segala skala.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }} 
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-none bg-primary/5 p-8 h-full">
                <CardContent className="p-0 space-y-4">
                  <div className="bg-primary/20 p-3 rounded-xl inline-block">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Misi Kami</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Memberikan solusi teknologi berkualitas tinggi yang inovatif, aman, dan efisien untuk membantu klien mencapai keunggulan kompetitif.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-10">
            <h2 className="text-3xl font-bold text-center">Nilai-Nilai Inti Kami</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Inovasi", icon: <Award className="h-6 w-6" />, desc: "Terus mencari cara baru dan lebih baik." },
                { title: "Integritas", icon: <Shield className="h-6 w-6" />, desc: "Bertindak jujur dan transparan dalam setiap proyek." },
                { title: "Kolaborasi", icon: <Users className="h-6 w-6" />, desc: "Bekerja sebagai tim untuk kesuksesan bersama." },
                { title: "Kualitas", icon: <Target className="h-6 w-6" />, desc: "Standar tinggi dalam setiap baris kode yang kami buat." },
              ].map((val, i) => (
                <motion.div 
                  key={i} 
                  className="text-center space-y-3 p-6 rounded-xl hover:bg-muted transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex justify-center text-accent">{val.icon}</div>
                  <h4 className="font-bold text-lg">{val.title}</h4>
                  <p className="text-sm text-muted-foreground">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
