
'use client'

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { motion } from "framer-motion"
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { PendaftaranFormValues } from "../types/schema"

export function Step1Identity({ onNext }: { onNext: () => void }) {
  const { control, trigger } = useFormContext<PendaftaranFormValues>()

  const handleNext = async () => {
    const isValid = await trigger(["fullName", "email", "phone"])
    if (isValid) onNext()
  }

  return (
    <motion.div
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
            control={control}
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
            control={control}
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
            control={control}
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

      <div className="flex justify-end pt-6">
        <Button
          type="button"
          onClick={handleNext}
          className="bg-primary hover:bg-primary/90 text-white rounded-xl font-bold h-10 px-5"
        >
          Lanjutkan <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}
