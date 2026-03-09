'use client'

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Send, 
  Loader2, 
  ArrowLeft, 
  CheckCircle2, 
  Building2, 
  Mail, 
  Phone, 
  User,
  MapPin,
  Home,
  Paperclip,
  ChevronRight,
  ChevronLeft,
  Calendar
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
  FormDescription,
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
import { cn } from "@/lib/utils"

const pendaftaranSchema = z.object({
  // Step 1: Data Diri
  fullName: z.string().min(2, { message: "Nama lengkap minimal 2 karakter." }),
  companyName: z.string().min(2, { message: "Nama perusahaan minimal 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  phone: z.string().min(10, { message: "Nomor telepon tidak valid." }),
  
  // Step 2: Lokasi
  province: z.string().min(1, { message: "Pilih provinsi." }),
  city: z.string().min(1, { message: "Pilih kota/kabupaten." }),
  district: z.string().min(1, { message: "Pilih kecamatan." }),
  village: z.string().min(1, { message: "Pilih desa/kelurahan." }),
  hasBuilding: z.string().min(1, { message: "Pilih status bangunan." }),

  // Step 3: Detail Bangunan (Conditional)
  buildingSize: z.string().optional(),
  buildingType: z.string().optional(),
  progress: z.string().optional(),
  estimation: z.string().optional(),
  photo: z.any().optional(),
})

type PendaftaranFormValues = z.infer<typeof pendaftaranSchema>

const steps = [
  { id: 1, title: "Data Diri", icon: User },
  { id: 2, title: "Lokasi Tanah", icon: MapPin },
  { id: 3, title: "Detail Bangunan", icon: Home },
]

export default function PendaftaranMitraPage() {
  const [currentStep, setCurrentStep] = React.useState(1)
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
      province: "",
      city: "",
      district: "",
      village: "",
      hasBuilding: "",
      buildingSize: "",
      buildingType: "",
      progress: "0",
      estimation: "",
    },
  })

  const hasBuilding = form.watch("hasBuilding")
  const progressValue = parseInt(form.watch("progress") || "0")

  function nextStep() {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  function prevStep() {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  function onSubmit(data: PendaftaranFormValues) {
    setIsSubmitting(true)
    
    setTimeout(() => {
      console.log("Partner Registration Full Data:", data)
      setIsSubmitting(false)
      setIsSuccess(true)
      
      toast({
        title: "Pendaftaran Berhasil Terkirim",
        description: "Data kemitraan strategis Anda telah kami terima.",
      })
    }, 2000)
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
          <Button asChild className="bg-accent hover:bg-accent/90 text-white rounded-xl font-bold px-8 h-10 border-none">
            <Link href="/mitra">Kembali ke halaman mitra</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <section className="bg-primary py-12 md:py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.1)_0%,transparent_70%)] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/mitra" className="inline-flex items-center text-xs font-bold text-white/40 hover:text-accent transition-colors mb-6 group">
            <ArrowLeft className="mr-2 h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </Link>
          <div className="max-w-2xl space-y-3">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Pendaftaran Mitra <span className="text-accent italic font-medium">Strategis</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed max-w-lg">
              Bergabunglah dalam ekosistem digital Bisukma Group. Silakan lengkapi formulir pendaftaran 3 tahap di bawah ini.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Professional Redesigned Progress Indicator */}
          <div className="mb-16">
            <div className="flex items-start justify-between max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  {/* Step Item */}
                  <div className="flex flex-col items-center gap-3 relative group">
                    <motion.div
                      initial={false}
                      animate={{
                        backgroundColor: currentStep >= step.id ? "hsl(var(--accent))" : "white",
                        borderColor: currentStep >= step.id ? "hsl(var(--accent))" : "hsl(var(--muted))",
                        scale: currentStep === step.id ? 1.1 : 1,
                      }}
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-sm z-10 relative",
                        currentStep === step.id && "shadow-lg shadow-accent/20"
                      )}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      ) : (
                        <step.icon className={cn(
                          "h-5 w-5 transition-colors duration-500",
                          currentStep >= step.id ? "text-white" : "text-muted-foreground"
                        )} />
                      )}

                      {/* Pulse effect for active step */}
                      {currentStep === step.id && (
                        <motion.div
                          layoutId="activeGlow"
                          className="absolute inset-0 rounded-full bg-accent/20 -z-10"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.4, opacity: 1 }}
                          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                        />
                      )}
                    </motion.div>
                    
                    <span className={cn(
                      "text-xs font-medium transition-colors duration-500",
                      currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                    )}>
                      {step.title}
                    </span>
                  </div>

                  {/* Modern Disconnected Line Segment - Symmetrically centered with icons */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4 md:mx-8 h-[2px] bg-muted rounded-full overflow-hidden relative min-w-[40px] mt-6">
                      <motion.div
                        initial={false}
                        animate={{
                          width: currentStep > step.id ? "100%" : "0%"
                        }}
                        className="absolute top-0 left-0 h-full bg-accent"
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <Card className="border border-muted-foreground/10 shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardContent className="p-6 md:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-x-10 gap-y-6 items-start">
                          <div className="space-y-6">
                            <FormField
                              control={form.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">
                                    Nama Lengkap
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="Nama lengkap Anda" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus-visible:ring-accent shadow-none" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">
                                    Email Resmi
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="email@lembaga.com" type="email" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus-visible:ring-accent shadow-none" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="hidden md:block w-px bg-muted-foreground/10 self-stretch" />

                          <div className="space-y-6">
                            <FormField
                              control={form.control}
                              name="companyName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">
                                    Nama Perusahaan
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="Nama lembaga Anda" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus-visible:ring-accent shadow-none" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">
                                    No. Telepon
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="0812xxxx" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus-visible:ring-accent shadow-none" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-x-10 gap-y-6 items-start">
                          <div className="space-y-6">
                            <FormField
                              control={form.control}
                              name="province"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">
                                    Provinsi
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus:ring-accent focus:ring-2 shadow-none">
                                        <SelectValue placeholder="Pilih Provinsi" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="sumut">Sumatera Utara</SelectItem>
                                      <SelectItem value="jakarta">DKI Jakarta</SelectItem>
                                      <SelectItem value="jabar">Jawa Barat</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="district"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">
                                    Kecamatan
                                  </FormLabel>
                                  <Input placeholder="Nama Kecamatan" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus-visible:ring-accent shadow-none" {...field} />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="hidden md:block w-px bg-muted-foreground/10 self-stretch" />

                          <div className="space-y-6">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">
                                    Kota/Kabupaten
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus:ring-accent focus:ring-2 shadow-none">
                                        <SelectValue placeholder="Pilih Kota/Kabupaten" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="medan">Medan</SelectItem>
                                      <SelectItem value="taput">Tapanuli Utara</SelectItem>
                                      <SelectItem value="toba">Toba</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="village"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">
                                    Desa/Kelurahan
                                  </FormLabel>
                                  <Input placeholder="Nama Desa/Kelurahan" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus-visible:ring-accent shadow-none" {...field} />
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="hasBuilding"
                          render={({ field }) => (
                            <FormItem className="pt-4">
                              <FormLabel className="font-semibold text-xs text-muted-foreground">
                                Status Lahan
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus:ring-accent focus:ring-2 shadow-none">
                                    <SelectValue placeholder="Apakah sudah ada bangunan di lahan tersebut?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Sudah ada bangunan</SelectItem>
                                  <SelectItem value="no">Belum ada bangunan / Tanah kosong</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        {hasBuilding === "yes" ? (
                          <div className="space-y-6">
                            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-x-10 gap-y-6 items-start">
                              <div className="space-y-6">
                                <FormField
                                  control={form.control}
                                  name="buildingSize"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="font-semibold text-xs text-muted-foreground">Ukuran Bangunan (m2)</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Contoh: 150" type="number" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm shadow-none" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="hidden md:block w-px bg-muted-foreground/10 self-stretch" />

                              <div className="space-y-6">
                                <FormField
                                  control={form.control}
                                  name="buildingType"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="font-semibold text-xs text-muted-foreground">Jenis Bangunan</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus:ring-accent focus:ring-2 shadow-none">
                                            <SelectValue placeholder="Pilih tipe" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="ruko">Ruko / Toko</SelectItem>
                                          <SelectItem value="rumah">Rumah Tinggal</SelectItem>
                                          <SelectItem value="gudang">Gudang / Pabrik</SelectItem>
                                          <SelectItem value="kantor">Kantor</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            <FormField
                              control={form.control}
                              name="photo"
                              render={({ field: { value, onChange, ...field } }) => (
                                <FormItem className="pt-4">
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">
                                    Foto Bangunan
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="file" 
                                      accept="image/*"
                                      onChange={(e) => onChange(e.target.files?.[0])}
                                      className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm cursor-pointer pt-2 shadow-none" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormDescription className="text-[10px]">Silakan unggah foto tampak depan bangunan Anda.</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <FormField
                              control={form.control}
                              name="progress"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex justify-between items-center mb-2">
                                    <FormLabel className="font-semibold text-xs text-muted-foreground">Progres Pembangunan (%)</FormLabel>
                                    <span className="text-xs font-bold text-accent">{field.value}%</span>
                                  </div>
                                  <FormControl>
                                    <Input 
                                      type="range" 
                                      min="0" 
                                      max="100" 
                                      step="5"
                                      className="h-2 bg-muted rounded-full appearance-none cursor-pointer accent-accent"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormDescription className="text-[10px]">Geser untuk menentukan sejauh mana progres bangunan Anda.</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {progressValue > 0 ? (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                <FormField
                                  control={form.control}
                                  name="photo"
                                  render={({ field: { value, onChange, ...field } }) => (
                                    <FormItem>
                                      <FormLabel className="font-semibold text-xs text-muted-foreground flex items-center gap-2">
                                        <Paperclip className="h-3.5 w-3.5 text-accent" />
                                        Lampirkan Foto Progres
                                      </FormLabel>
                                      <FormControl>
                                        <Input 
                                          type="file" 
                                          accept="image/*"
                                          onChange={(e) => onChange(e.target.files?.[0])}
                                          className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm cursor-pointer pt-2 shadow-none" 
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                <FormField
                                  control={form.control}
                                  name="estimation"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="font-semibold text-xs text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-3.5 w-3.5 text-accent" />
                                        Estimasi Pembangunan
                                      </FormLabel>
                                      <FormControl>
                                        <Input placeholder="Kapan rencana mulai dibangun? (Contoh: Kuartal 3 2024)" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus-visible:ring-accent shadow-none" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </motion.div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between pt-6 border-t border-muted/50">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={cn(
                        "rounded-xl font-bold h-10 px-4 bg-white",
                        currentStep === 1 && "opacity-0 pointer-events-none"
                      )}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Sebelumnya
                    </Button>

                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-primary hover:bg-primary/90 text-white rounded-xl font-bold h-10 px-5"
                      >
                        Selanjutnya
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-accent hover:bg-accent/90 text-white rounded-xl font-bold h-10 px-6 shadow-lg shadow-accent/20 border-none"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            Kirim Pendaftaran
                            <Send className="ml-2 h-3.5 w-3.5" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
