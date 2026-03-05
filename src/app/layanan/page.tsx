
'use client'

import Image from "next/image"
import { CheckCircle2, Code, Database, Globe, Smartphone, Cloud, Search } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const services = [
  {
    title: "Software Development",
    icon: <Code className="h-8 w-8" />,
    img: "service-2",
    features: ["Aplikasi Web Kustom", "Enterprise Software", "Integrasi API", "Modernisasi Legacy App"]
  },
  {
    title: "Mobile App Development",
    icon: <Smartphone className="h-8 w-8" />,
    img: "service-1",
    features: ["iOS & Android Native", "Cross-Platform (Flutter/React Native)", "UI/UX Mobile Design", "Maintenance & Update"]
  },
  {
    title: "Cloud Infrastructure",
    icon: <Cloud className="h-8 w-8" />,
    img: "gallery-4",
    features: ["Migrasi Cloud", "AWS/Azure/GCP Setup", "DevOps Automation", "24/7 Monitoring"]
  },
  {
    title: "Data Analytics",
    icon: <Database className="h-8 w-8" />,
    img: "gallery-5",
    features: ["Business Intelligence", "Visualisasi Data", "Data Warehousing", "Predictive Analytics"]
  },
  {
    title: "Digital Strategy",
    icon: <Globe className="h-8 w-8" />,
    img: "service-3",
    features: ["IT Consulting", "Digital Roadmap", "Business Process Optimization", "Change Management"]
  },
  {
    title: "SEO & Digital Presence",
    icon: <Search className="h-8 w-8" />,
    img: "news-1",
    features: ["SEO Optimization", "Social Media Management", "Content Strategy", "Performance Marketing"]
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
    <div className="pb-20">
      <section className="bg-primary py-24 text-white">
        <motion.div 
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold">Layanan Kami</h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Solusi digital end-to-end yang dirancang untuk mempercepat pertumbuhan bisnis Anda.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <Card className="overflow-hidden border-none shadow-lg bg-white flex flex-col h-full hover:shadow-2xl transition-all duration-300 group">
                  <div className="relative h-48 w-full">
                    {img?.imageUrl && (
                      <Image 
                        src={img.imageUrl} 
                        alt={service.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" className="bg-white text-primary">Detail Layanan</Button>
                    </div>
                  </div>
                  <CardContent className="p-8 space-y-6 flex-1">
                    <div className="flex items-center gap-4">
                      <div className="bg-accent/10 p-3 rounded-xl text-accent">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {service.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
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

      <motion.section 
        className="container mx-auto px-4 mt-32"
        {...fadeIn}
      >
        <div className="bg-muted rounded-[2rem] p-8 md:p-16 text-center max-w-4xl mx-auto space-y-8 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold">Butuh Solusi Kustom?</h2>
          <p className="text-muted-foreground text-lg">
            Setiap bisnis memiliki tantangan unik. Kami siap mendiskusikan kebutuhan spesifik Anda dan membangun solusi yang benar-benar pas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90">Hubungi Konsultan Kami</Button>
            <Button size="lg" variant="outline">Lihat Portfolio Kami</Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
