'use client'

import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const partners = [
  { name: "Global Tech Inc", sector: "Infrastruktur", logo: "partner-1" },
  { name: "Future Finance", sector: "Fintech", logo: "partner-2" },
  { name: "Health Connect", sector: "Healthtech", logo: "partner-3" },
  { name: "Cloud Solutions", sector: "SaaS", logo: "partner-1" },
  { name: "EduGrow", sector: "Edutech", logo: "partner-2" },
  { name: "Retail Pro", sector: "E-commerce", logo: "partner-3" },
]

export default function MitraPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  return (
    <div className="pb-20">
      <section className="bg-primary py-24 text-white">
        <motion.div 
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold">Mitra Kami</h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Kami bangga telah bekerja sama dengan berbagai organisasi inovatif untuk menciptakan dampak digital yang nyata.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 md:p-16 space-y-20"
          {...fadeIn}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map((p, i) => {
              const img = PlaceHolderImages.find(im => im.id === p.logo)
              return (
                <motion.div 
                  key={i} 
                  className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {img?.imageUrl && (
                    <Image 
                      src={img.imageUrl} 
                      alt={p.name} 
                      width={150} 
                      height={80} 
                      className="object-contain"
                    />
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold">Kategori Kemitraan</h2>
              <p className="text-muted-foreground">Kami membangun ekosistem kolaboratif lintas industri untuk memperluas jangkauan inovasi kami.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Partner Strategis", desc: "Kolaborasi jangka panjang dalam pengembangan produk dan riset teknologi terbaru." },
                { title: "Partner Teknologi", desc: "Integrasi platform dan penyediaan infrastruktur IT terbaik untuk klien kami." },
                { title: "Partner Bisnis", desc: "Jaringan pemasaran dan distribusi solusi digital ke berbagai sektor industri." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-none bg-muted/50 p-8 text-center hover:bg-accent/5 transition-colors h-full">
                    <CardContent className="p-0 space-y-4">
                      <h3 className="text-xl font-bold text-accent">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="bg-primary rounded-2xl p-10 text-white text-center space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold">Tertarik Menjadi Mitra Kami?</h2>
            <p className="text-gray-300 max-w-xl mx-auto">
              Kami selalu terbuka untuk kolaborasi baru yang saling menguntungkan. Mari tumbuh bersama dalam ekosistem digital Bisukma.
            </p>
            <button className="bg-accent text-white px-8 py-3 rounded-md font-bold hover:bg-accent/90 transition-colors">
              Hubungi Tim Partnership
            </button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
