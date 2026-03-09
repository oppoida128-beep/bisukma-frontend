
'use client'

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { motion } from "framer-motion"
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Send, Loader2, Camera, Calendar, Paperclip } from "lucide-react"
import { PendaftaranFormValues } from "../types/schema"

export function Step3Property({ onBack, isSubmitting }: { onBack: () => void, isSubmitting: boolean }) {
  const { control, watch } = useFormContext<PendaftaranFormValues>()
  const hasBuilding = watch("hasBuilding")
  const progressValue = parseInt(watch("progress") || "0")

  return (
    <motion.div
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
        <div className="space-y-8">
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-x-10 gap-y-6 items-start">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="buildingLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs text-muted-foreground">Panjang (m)</FormLabel>
                      <FormControl>
                        <Input placeholder="Panjang" type="number" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm shadow-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="buildingWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs text-muted-foreground">Lebar (m)</FormLabel>
                      <FormControl>
                        <Input placeholder="Lebar" type="number" className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm shadow-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="hidden md:block w-px bg-muted-foreground/10 self-stretch" />

            <div className="space-y-6">
              <FormField
                control={control}
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

          <div className="space-y-4">
            <h5 className="text-sm font-bold text-primary flex items-center gap-2">
              <Camera className="h-4 w-4 text-accent" /> Dokumentasi Bangunan
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="buildingPhoto"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-[10px] uppercase tracking-wider text-muted-foreground">Tampak Depan</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) onChange(file)
                        }} 
                        className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm pt-2" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="buildingPhotoBack"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-[10px] uppercase tracking-wider text-muted-foreground">Tampak Belakang</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) onChange(file)
                        }} 
                        className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm pt-2" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="buildingPhotoLeft"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-[10px] uppercase tracking-wider text-muted-foreground">Tampak Samping Kiri</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) onChange(file)
                        }} 
                        className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm pt-2" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="buildingPhotoRight"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-[10px] uppercase tracking-wider text-muted-foreground">Tampak Samping Kanan</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) onChange(file)
                        }} 
                        className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm pt-2" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormDescription className="text-[10px] pt-2">Unggah foto dari berbagai sisi bangunan untuk keperluan verifikasi kelayakan fasilitas.</FormDescription>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <FormField
            control={control}
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
              control={control}
              name="photo"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs text-muted-foreground flex items-center gap-2">
                    <Paperclip className="h-3.5 w-3.5 text-accent" /> Foto Lampiran Progres
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) onChange(file)
                      }} 
                      className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm pt-2" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription className="text-[10px]">Unggah foto lokasi terkini untuk verifikasi.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={control}
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

      <div className="flex items-center justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="rounded-xl font-bold h-10 px-4 bg-white"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Sebelumnya
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-accent hover:bg-accent/90 text-white rounded-xl font-bold h-10 px-6 shadow-lg shadow-accent/20 border-none"
        >
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengirim...</> : <><Send className="ml-2 h-3.5 w-3.5" /> Kirim Data Pendaftaran</>}
        </Button>
      </div>
    </motion.div>
  )
}
