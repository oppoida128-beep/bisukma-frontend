'use client'

import * as React from "react"
import Image from "next/image"
import { CheckCircle2, Code, Database, Globe, Smartphone, Cloud, Search, ArrowRight } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const services = [
  {
    title: "Software development",
    icon: <Code className="h-6 w-6 md:h-8 md:w-8" />,
    img: "service-2",
    features: ["Aplikasi web kustom", "Enterprise software", "Integrasi API", "Modernisasi legacy app"]
  },
  {
    title: "Mobile app development",
    icon: <Smartphone className="h-6 w-6 md:h-8 md:w-8" />,
    img: "service-1",
    features: ["iOS & android native", "Cross-platform (Flutter/React Native)", "UI/UX mobile design", "Maintenance & update"]
  },
  {
    title: "Cloud infrastructure",
    icon: <Cloud className="h-6 w-6 md:h-8 md:w-8" />,
    img: "gallery-4",
    features: ["Migrasi cloud", "AWS/Azure/GCP setup", "DevOps automation", "24/7 Monitoring"]
  },
  {
    title: "Data analytics",
    icon: <Database className="h-6 w-6 md:h-8 md:w-8" />,
    img: "gallery-5",
    features: ["Business intelligence", "Visualisasi data", "Data warehousing", "Predictive analytics"]
  },
  {
    title: "Digital strategy",
    icon: <Globe className="h-6 w-6 md:h-8 md:w-8" />,
    img: "service-3",
    features: ["IT consulting", "Digital roadmap", "Business process optimization", "Change management"]
  },
  {
    title: "SEO & digital presence",
    icon: <Search className="h-6 w-6 md:h-8 md:w-8" />,
    img: "news-1",
    features: ["SEO optimization", "Social media management", "Content strategy", "Performance marketing"]
  }
]

export default function LayananPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  return (
    <div className="pb-20 bg-white">
      {/* Minimalist Header */}
      <section className="bg-white pt-8 md:pt-12 pb-6 text-primary">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-black text-left tracking-tight">
              Layanan <span className="text-accent">kami</span>
            </h1>
            <p className="text-left text-sm md:text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Solusi digital end-to-end yang dirancang untuk mempercepat pertumbuhan bisnis Anda dengan teknologi presisi tinggi.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 mt-8 md:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => {
            const img = PlaceHolderImages.find(im => im.id === service.img)
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="overflow-hidden border border-muted/60 shadow-none bg-white flex flex-col h-full hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 rounded-2xl group">
                  <div className="relative h-48 md:h-56 w-full overflow-hidden">
                    {img?.imageUrl && (
                      <Image 
                        src={img.imageUrl} 
                        alt={service.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Button variant="secondary" className="bg-white text-primary rounded-full font-bold text-xs h-9 px-6 shadow-xl">
                        Lihat detail
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6 md:p-8 space-y-6 flex-1">
                    <div className="space-y-3">
                      <div className="text-accent">
                        {service.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{service.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {service.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3 text-xs md:text-sm text-muted-foreground font-medium">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
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
        <div className="bg-muted/30 rounded-[2rem] border border-muted-foreground/5 p-8 md:p-20 text-center max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight">Butuh solusi kustom?</h2>
            <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              Setiap bisnis memiliki tantangan unik. Kami siap mendiskusikan kebutuhan spesifik Anda dan membangun solusi yang benar-benar pas untuk masa depan digital Anda.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full font-bold px-8 h-12">
              Hubungi konsultan kami
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full font-bold px-8 h-12 border-muted-foreground/20 text-muted-foreground hover:bg-white">
              Lihat portofolio
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
