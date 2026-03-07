'use client'

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { 
  Send, 
  Loader2, 
  ArrowLeft, 
  CheckCircle2, 
  Building2, 
  Mail, 
  Phone, 
  User,
  LayoutGrid
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"

const pendaftaranSchema = z.object({
  fullName: z.string().min(2, { message: "Nama lengkap minimal 2 karakter." }),
  companyName: z.string().min(2, { message: "Nama perusahaan minimal 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  phone: z.string().min(10, { message: "Nomor telepon tidak valid." }),
  category: z.string().min(1, { message: "Silakan pilih kategori kemitraan." }),
  message: z.string().min(10, { message: "Pesan minimal 10 karakter." }),
})

type PendaftaranFormValues = z.infer<typeof pendaftaranSchema>

export default function PendaftaranMitraPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const { toast } = useToast()

  const form = useForm<PendaftaranFormValues>({
    resolver: zodResolver(pendaftaranSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      category: "",
      message: "",
    },
  })

  function onSubmit(data: PendaftaranFormValues) {
    setIsSubmitting(true)
    
    setTimeout(() => {
      console.log("Partner Registration Data:", data)
      setIsSubmitting(false)
      setIsSuccess(true)
      
      toast({
        title: "Pendaftaran Berhasil Terkirim",
        description: "Terima kasih telah mendaftar. Tim kami akan segera menghubungi Anda.",
      })
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="inline-flex p-6 rounded-full bg-green-500/10 text-green-600 mb-2">
            <CheckCircle2 className="h-16 w-16" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-primary tracking-tight">Terima Kasih!</h1>
            <p className="text-muted-foreground font-medium">Pendaftaran kemitraan Anda telah kami terima. Mohon tunggu kabar selanjutnya dari tim strategis Bisukma.</p>
          </div>
          <Button asChild className="bg-accent hover:bg-accent/90 text-white rounded-xl font-bold px-8 h-12 border-none">
            <Link href="/mitra">Kembali ke halaman mitra</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <section className="bg-primary py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.15)_0%,transparent_70%)] opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/mitra" className="inline-flex items-center text-sm font-bold text-white/60 hover:text-accent transition-colors mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke informasi mitra
          </Link>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Pendaftaran <span className="text-accent italic">Mitra Strategis.</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed">
              Lengkapi formulir di bawah ini untuk menjadi bagian dari ekosistem digital dan kemandirian pangan Bisukma Group.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <Card className="border-none shadow-2xl shadow-primary/5 rounded-[2.5rem] bg-white overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-xs text-muted-foreground flex items-center gap-2">
                              <User className="h-3.5 w-3.5" /> Nama Lengkap
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Nama lengkap Anda" className="rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white h-12 text-sm" {...field} />
                            </FormControl>
                            <FormMessage className="text-[10px]" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-xs text-muted-foreground flex items-center gap-2">
                              <Building2 className="h-3.5 w-3.5" /> Nama Perusahaan / Instansi
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Nama lembaga Anda" className="rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white h-12 text-sm" {...field} />
                            </FormControl>
                            <FormMessage className="text-[10px]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-xs text-muted-foreground flex items-center gap-2">
                              <Mail className="h-3.5 w-3.5" /> Alamat Email Resmi
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="email@lembaga.com" type="email" className="rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white h-12 text-sm" {...field} />
                            </FormControl>
                            <FormMessage className="text-[10px]" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-xs text-muted-foreground flex items-center gap-2">
                              <Phone className="h-3.5 w-3.5" /> Nomor Telepon / WhatsApp
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="0812xxxx" className="rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white h-12 text-sm" {...field} />
                            </FormControl>
                            <FormMessage className="text-[10px]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-xs text-muted-foreground flex items-center gap-2">
                            <LayoutGrid className="h-3.5 w-3.5" /> Kategori Kemitraan
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white h-12 text-sm">
                                <SelectValue placeholder="Pilih kategori kerja sama" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border-none shadow-2xl">
                              <SelectItem value="pangan">Pemasok Pangan Lokal (Petani/Peternak)</SelectItem>
                              <SelectItem value="teknologi">Mitra Teknologi & Digitalisasi</SelectItem>
                              <SelectItem value="logistik">Layanan Logistik & Distribusi</SelectItem>
                              <SelectItem value="pemerintah">Lembaga Pemerintah / CSR</SelectItem>
                              <SelectItem value="umkm">Pemberdayaan UMKM Daerah</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-xs text-muted-foreground">Deskripsi Rencana Kolaborasi</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Ceritakan singkat rencana kerja sama Anda dengan Bisukma Digital..." 
                              className="min-h-[150px] rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white resize-none text-sm p-4" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent/90 text-white rounded-xl font-bold h-14 shadow-xl shadow-accent/20 transition-all text-sm border-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Memproses pendaftaran...
                        </>
                      ) : (
                        <>
                          Kirim Formulir Pendaftaran
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          <aside className="lg:col-span-5 space-y-8 lg:pt-16">
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-primary tracking-tight">Persyaratan Umum</h2>
              <div className="space-y-4">
                {[
                  "Lembaga atau perorangan memiliki legalitas yang jelas.",
                  "Memiliki komitmen tinggi terhadap kualitas dan integritas.",
                  "Mendukung program kemandirian pangan nasional.",
                  "Bersedia mengikuti standar operasional Bisukma Group.",
                  "Terbuka terhadap sistem digitalisasi dan transparansi."
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start p-4 rounded-2xl bg-muted/30 border border-muted-foreground/5">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-primary/80 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-accent/5 border border-accent/10 space-y-4">
              <h3 className="text-lg font-black text-primary">Butuh Bantuan Cepat?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                Jika Anda mengalami kendala dalam proses pendaftaran online, silakan hubungi tim kemitraan kami melalui email resmi.
              </p>
              <div className="pt-2">
                <p className="text-xs font-bold text-accent">Email kemitraan</p>
                <p className="text-primary font-extrabold">bisukmafoundation@gmail.com</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
