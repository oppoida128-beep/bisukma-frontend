'use client'

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { PendaftaranFormProvider } from "./components/form-provider"
import { Stepper } from "./components/Stepper"

export default function PendaftaranMitraPage() {
  // Mengambil gambar hero dari pustaka placeholder proyek
  const bgImg = PlaceHolderImages.find(img => img.id === 'hero')

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <section className="bg-primary py-12 md:py-16 text-white relative overflow-hidden">
        {/* Background Image Layer with low opacity */}
        <div className="absolute inset-0 z-0">
          {bgImg?.imageUrl && (
            <Image 
              src={bgImg.imageUrl} 
              alt="Pendaftaran Mitra Background" 
              fill 
              className="object-cover opacity-15 grayscale brightness-50"
              priority
              data-ai-hint="digital technology"
            />
          )}
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.1)_0%,transparent_70%)] opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link href="/mitra" className="inline-flex items-center text-xs font-bold text-white/40 hover:text-accent transition-colors mb-6 group">
            <ArrowLeft className="mr-2 h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </Link>
          <div className="max-w-2xl space-y-3">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight text-left">
              Pendaftaran Mitra <span className="text-accent italic font-medium">Strategis</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed max-w-lg text-left">
              Lengkapi formulir 3 tahap di bawah ini untuk bergabung dalam ekosistem kemandirian pangan Bisukma Group.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="max-w-4xl mx-auto">
          <PendaftaranFormProvider>
            <Stepper />
          </PendaftaranFormProvider>
        </div>
      </section>
    </div>
  )
}
