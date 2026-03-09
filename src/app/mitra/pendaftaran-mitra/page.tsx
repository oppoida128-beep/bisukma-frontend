
'use client'

import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PendaftaranFormProvider } from "./components/form-provider"
import { Stepper } from "./components/Stepper"

export default function PendaftaranMitraPage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <section className="bg-primary py-12 md:py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.1)_0%,transparent:70%)] opacity-30"></div>
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
