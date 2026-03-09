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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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

// Schema validasi
const pendaftaranSchema = z.object({
  fullName: z.string().min(2, { message: "Nama lengkap minimal 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  phone: z.string().min(10, { message: "Nomor telepon tidak valid." }),
  province: z.string().min(1, { message: "Pilih provinsi." }),
  city: z.string().min(1, { message: "Pilih kota/kabupaten." }),
  district: z.string().min(1, { message: "Pilih kecamatan." }),
  village: z.string().min(1, { message: "Pilih desa/kelurahan." }),
  hasBuilding: z.string().min(1, { message: "Pilih status lahan." }),
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

  // State untuk data wilayah
  const [provinces, setProvinces] = React.useState<any[]>([])
  const [cities, setCities] = React.useState<any[]>([])
  const [districts, setDistricts] = React.useState<any[]>([])
  const [villages, setVillages] = React.useState<any[]>([])

  const form = useForm<PendaftaranFormValues>({
    resolver: zodResolver(pendaftaranSchema),
    defaultValues: {
      fullName: "",
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
  const selectedProvince = form.watch("province")
  const selectedCity = form.watch("city")
  const selectedDistrict = form.watch("district")

  // Load Provinsi
  React.useEffect(() => {
    fetch("/data_wilayah/provinsi.json")
      .then(res => res.ok ? res.json() : Promise.reject("Gagal memuat provinsi"))
      .then(data => setProvinces(data))
      .catch(err => console.error(err))
  }, [])

  // Load Kota/Kabupaten berdasarkan Provinsi
  React.useEffect(() => {
    if (selectedProvince) {
      fetch("/data_wilayah/kabupaten_kota.json")
        .then(res => res.ok ? res.json() : Promise.reject("Gagal memuat kota"))
        .then(data => {
          const filtered = data.filter((item: any) => String(item.province_id) === String(selectedProvince))
          setCities(filtered)
        })
        .catch(() => setCities([]))
    } else {
      setCities([])
    }
    form.setValue("city", "")
    form.setValue("district", "")
    form.setValue("village", "")
  }, [selectedProvince, form])

  // Load Kecamatan berdasarkan Kota
  React.useEffect(() => {
    if (selectedCity) {
      fetch("/data_wilayah/kecamatan.json")
        .then(res => res.ok ? res.json() : Promise.reject("Gagal memuat kecamatan"))
        .then(data => {
          const filtered = data.filter((item: any) => String(item.regency_id) === String(selectedCity))
          setDistricts(filtered)
        })
        .catch(() => setDistricts([]))
    } else {
      setDistricts([])
    }
    form.setValue("district", "")
    form.setValue("village", "")
  }, [selectedCity, form])

  // Load Kelurahan berdasarkan Kecamatan
  React.useEffect(() => {
    if (selectedDistrict) {
      fetch("/data_wilayah/kelurahan.json")
        .then(res => res.ok ? res.json() : Promise.reject("Gagal memuat kelurahan"))
        .then(data => {
          const filtered = data.filter((item: any) => String(item.district_id) === String(selectedDistrict))
          setVillages(filtered)
        })
        .catch(() => setVillages([]))
    } else {
      setVillages([])
    }
    form.setValue("village", "")
  }, [selectedDistrict, form])

  function nextStep() {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  function prevStep() {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  function onSubmit(data: PendaftaranFormValues) {
    setIsSubmitting(true)
    setTimeout(() => {
      console.log("Registration Data:", data)
      setIsSubmitting(false)
      setIsSuccess(true)
      toast({
        title: "Pendaftaran Berhasil",
        description: "Data kemitraan Anda telah kami terima.",
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
            <p className="text-muted-foreground font-medium text-sm">Pendaftaran kemitraan Anda telah kami terima. Tim Bisukma akan segera menghubungi Anda melalui kontak yang terdaftar.</p>
          </div>
          <Button asChild className="bg-accent hover:bg-accent/90 text-white rounded-xl font-bold px-8 h-10 border-none">
            <Link href="/mitra">Kembali ke Halaman Mitra</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Header */}
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

      <section className="container mx-auto px-4 mt-12 md:mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Custom Animated Progress Indicator */}
          <div className="mb-16">
            <div className="flex items-center justify-between max-w-2xl mx-auto relative">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center gap-3 relative z-10">
                    <div className="relative">
                      <motion.div
                        animate={{
                          backgroundColor: currentStep >= step.id ? "hsl(var(--accent))" : "white",
                          borderColor: currentStep >= step.id ? "hsl(var(--accent))" : "hsl(var(--muted))",
                        }}
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-sm",
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
                      </motion.div>
                      
                      {currentStep === step.id && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-accent/20 -z-10"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.4, opacity: 1 }}
                          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                        />
                      )}
                    </div>
                    <span className={cn(
                      "text-[10px] md:text-xs font-medium transition-colors duration-500",
                      currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                    )}>
                      {step.title}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4 h-[2px] bg-muted rounded-full overflow-hidden relative self-center -mt-6">
                      <motion.div
                        initial={false}
                        animate={{ width: currentStep > step.id ? "100%" : "0%" }}
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
                        <div className="space-y-1 mb-8">
                          <h4 className="text-lg font-bold text-primary">Informasi Identitas</h4>
                          <p className="text-sm text-muted-foreground">Masukkan data diri dan kontak resmi Anda untuk keperluan korespondensi.</p>
                        </div>

                        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-x-10 gap-y-6 items-start">
                          <div className="space-y-6">
                            <FormField
                              control={form.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">Nama Lengkap</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Nama sesuai KTP" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus-visible:ring-accent shadow-none" {...field} />
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
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">Email Resmi</FormLabel>
                                  <FormControl>
                                    <Input placeholder="email@domain.com" type="email" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus-visible:ring-accent shadow-none" {...field} />
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
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">No. WhatsApp/Telepon</FormLabel>
                                  <FormControl>
                                    <Input placeholder="08xxxxxxxx" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus-visible:ring-accent shadow-none" {...field} />
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
                        <div className="space-y-1 mb-8">
                          <h4 className="text-lg font-bold text-primary">Detail Lokasi Kemitraan</h4>
                          <p className="text-sm text-muted-foreground">Tentukan lokasi geografis tempat operasional dapur atau lahan berada.</p>
                        </div>

                        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-x-10 gap-y-6 items-start">
                          <div className="space-y-6">
                            <FormField
                              control={form.control}
                              name="province"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">Provinsi</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus:ring-accent shadow-none">
                                        <SelectValue placeholder="Pilih Provinsi" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {provinces.map((p) => (
                                        <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                                      ))}
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
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">Kecamatan</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCity}>
                                    <FormControl>
                                      <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus:ring-accent shadow-none">
                                        <SelectValue placeholder="Pilih Kecamatan" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {districts.map((d) => (
                                        <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
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
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">Kota/Kabupaten</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedProvince}>
                                    <FormControl>
                                      <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus:ring-accent shadow-none">
                                        <SelectValue placeholder="Pilih Kota/Kabupaten" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {cities.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                                      ))}
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
                                  <FormLabel className="font-semibold text-xs text-muted-foreground">Desa/Kelurahan</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDistrict}>
                                    <FormControl>
                                      <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus:ring-accent shadow-none">
                                        <SelectValue placeholder="Pilih Desa/Kelurahan" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {villages.map((v) => (
                                        <SelectItem key={v.id} value={String(v.id)}>{v.name}</SelectItem>
                                      ))}
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
                          name="hasBuilding"
                          render={({ field }) => (
                            <FormItem className="pt-4">
                              <FormLabel className="font-semibold text-xs text-muted-foreground">Status Bangunan</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus:ring-accent shadow-none">
                                    <SelectValue placeholder="Apakah lokasi sudah memiliki bangunan?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Sudah ada bangunan permanen</SelectItem>
                                  <SelectItem value="no">Lahan kosong (perlu pembangunan)</SelectItem>
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
                        <div className="space-y-1 mb-8">
                          <h4 className="text-lg font-bold text-primary">Detail Teknis Properti</h4>
                          <p className="text-sm text-muted-foreground">Berikan rincian spesifikasi atau estimasi progres properti Anda.</p>
                        </div>

                        {hasBuilding === "yes" ? (
                          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-x-10 gap-y-6 items-start">
                            <div className="space-y-6">
                              <FormField
                                control={form.control}
                                name="buildingSize"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="font-semibold text-xs text-muted-foreground">Estimasi Luas (m2)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Misal: 250" type="number" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm shadow-none" {...field} />
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
                                    <FormLabel className="font-semibold text-xs text-muted-foreground">Tipe Fasilitas</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus:ring-accent shadow-none">
                                          <SelectValue placeholder="Pilih tipe" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="ruko">Ruko / Shophouse</SelectItem>
                                        <SelectItem value="rumah">Rumah Tinggal</SelectItem>
                                        <SelectItem value="gudang">Gudang / Workshop</SelectItem>
                                        <SelectItem value="tanah_desa">Fasilitas Desa</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <FormField
                              control={form.control}
                              name="progress"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex justify-between items-center mb-2">
                                    <FormLabel className="font-semibold text-xs text-muted-foreground">Kesiapan Lahan/Pembangunan (%)</FormLabel>
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
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {progressValue > 0 ? (
                              <FormField
                                control={form.control}
                                name="photo"
                                render={({ field: { value, onChange, ...field } }) => (
                                  <FormItem>
                                    <FormLabel className="font-semibold text-xs text-muted-foreground flex items-center gap-2">
                                      <Paperclip className="h-3.5 w-3.5 text-accent" /> Foto Lampiran Progres
                                    </FormLabel>
                                    <FormControl>
                                      <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0])} className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm pt-2" {...field} />
                                    </FormControl>
                                    <FormDescription className="text-[10px]">Unggah foto lokasi terkini untuk verifikasi.</FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            ) : (
                              <FormField
                                control={form.control}
                                name="estimation"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="font-semibold text-xs text-muted-foreground flex items-center gap-2">
                                      <Calendar className="h-3.5 w-3.5 text-accent" /> Estimasi Kapan Siap Digunakan
                                    </FormLabel>
                                    <FormControl>
                                      <Input placeholder="Contoh: Akhir Tahun 2024" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm shadow-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6">
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
                      <ChevronLeft className="mr-2 h-4 w-4" /> Sebelumnya
                    </Button>

                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-primary hover:bg-primary/90 text-white rounded-xl font-bold h-10 px-5"
                      >
                        Lanjutkan <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-accent hover:bg-accent/90 text-white rounded-xl font-bold h-10 px-6 shadow-lg shadow-accent/20 border-none"
                      >
                        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengirim...</> : <><Send className="ml-2 h-3.5 w-3.5" /> Kirim Data Pendaftaran</>}
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
