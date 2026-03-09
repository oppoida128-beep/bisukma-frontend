
'use client'

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CheckCircle2, 
  User,
  MapPin,
  Home,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { PendaftaranFormValues } from "../types/schema"
import { Step1Identity } from "./Step1Identity"
import { Step2Location } from "./Step2Location"
import { Step3Property } from "./Step3Property"

const steps = [
  { id: 1, title: "Data Diri", icon: User },
  { id: 2, title: "Lokasi Tanah", icon: MapPin },
  { id: 3, title: "Detail Bangunan", icon: Home },
]

export function Stepper() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const { toast } = useToast()
  const { handleSubmit } = useFormContext<PendaftaranFormValues>()

  const onSubmit = (data: PendaftaranFormValues) => {
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
      <div className="min-h-[60vh] flex items-center justify-center p-4">
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
    <>
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
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2, 
                        repeatType: "reverse"
                      }}
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
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault()
            }}
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <Step1Identity key="step1" onNext={() => setCurrentStep(2)} />
              )}
              {currentStep === 2 && (
                <Step2Location 
                  key="step2" 
                  onNext={() => setCurrentStep(3)} 
                  onBack={() => setCurrentStep(1)} 
                />
              )}
              {currentStep === 3 && (
                <Step3Property 
                  key="step3" 
                  onBack={() => setCurrentStep(2)} 
                  isSubmitting={isSubmitting}
                />
              )}
            </AnimatePresence>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
