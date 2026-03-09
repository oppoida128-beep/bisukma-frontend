
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { PendaftaranFormValues } from "../types/schema"

export function Step2Location({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  const { control, trigger, watch, setValue } = useFormContext<PendaftaranFormValues>()

  const [allProvinces, setAllProvinces] = React.useState<any[]>([])
  const [allCities, setAllCities] = React.useState<any[]>([])
  const [allDistricts, setAllDistricts] = React.useState<any[]>([])
  const [allVillages, setAllVillages] = React.useState<any[]>([])

  const selectedProvince = watch("province")
  const selectedCity = watch("city")
  const selectedDistrict = watch("district")

  const normalizeData = (data: any[]) => {
    if (!Array.isArray(data)) return []
    return data.map(item => ({
      ...item,
      id: String(item.id || item.kode || ""),
      name: String(item.name || item.nama || item.nama_wilayah || "")
    }))
  }

  React.useEffect(() => {
    fetch("/data_wilayah/provinsi.json")
      .then(res => res.json())
      .then(data => setAllProvinces(normalizeData(data)))
  }, [])

  React.useEffect(() => {
    if (selectedProvince && allCities.length === 0) {
      fetch("/data_wilayah/kabupaten_kota.json")
        .then(res => res.json())
        .then(data => setAllCities(normalizeData(data)))
    }
  }, [selectedProvince, allCities.length])

  React.useEffect(() => {
    if (selectedCity && allDistricts.length === 0) {
      fetch("/data_wilayah/kecamatan.json")
        .then(res => res.json())
        .then(data => setAllDistricts(normalizeData(data)))
    }
  }, [selectedCity, allDistricts.length])

  React.useEffect(() => {
    if (selectedDistrict && allVillages.length === 0) {
      fetch("/data_wilayah/kelurahan.json")
        .then(res => res.json())
        .then(data => setAllVillages(normalizeData(data)))
    }
  }, [selectedDistrict, allVillages.length])

  const cities = React.useMemo(() => {
    if (!selectedProvince) return []
    return allCities.filter(item => item.id.startsWith(selectedProvince))
  }, [allCities, selectedProvince])

  const districts = React.useMemo(() => {
    if (!selectedCity) return []
    return allDistricts.filter(item => item.id.startsWith(selectedCity))
  }, [allDistricts, selectedCity])

  const villages = React.useMemo(() => {
    if (!selectedDistrict) return []
    return allVillages.filter(item => item.id.startsWith(selectedDistrict))
  }, [allVillages, selectedDistrict])

  React.useEffect(() => { setValue("city", ""); setValue("district", ""); setValue("village", "") }, [selectedProvince, setValue])
  React.useEffect(() => { setValue("district", ""); setValue("village", "") }, [selectedCity, setValue])
  React.useEffect(() => { setValue("village", "") }, [selectedDistrict, setValue])

  const handleNext = async () => {
    const isValid = await trigger(["province", "city", "district", "village", "hasBuilding"])
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
        <h4 className="text-lg font-bold text-primary">Detail Lokasi Kemitraan</h4>
        <p className="text-sm text-muted-foreground">Tentukan lokasi geografis tempat operasional dapur atau lahan berada.</p>
      </div>

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-x-10 gap-y-6 items-start">
        <div className="space-y-6">
          <FormField
            control={control}
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
                    {allProvinces.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-xs text-muted-foreground">Kecamatan</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCity}>
                  <FormControl>
                    <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus:ring-accent shadow-none">
                      <SelectValue placeholder={allDistricts.length === 0 && selectedCity ? "Memuat..." : "Pilih Kecamatan"} />
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
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-xs text-muted-foreground">Kota/Kabupaten</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={!selectedProvince}>
                  <FormControl>
                    <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus:ring-accent shadow-none">
                      <SelectValue placeholder={allCities.length === 0 && selectedProvince ? "Memuat..." : "Pilih Kota/Kabupaten"} />
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
            control={control}
            name="village"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-xs text-muted-foreground">Desa/Kelurahan</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDistrict}>
                  <FormControl>
                    <SelectTrigger className="rounded-xl border-muted-foreground/10 bg-white h-10 text-sm focus:ring-accent shadow-none">
                      <SelectValue placeholder={allVillages.length === 0 && selectedDistrict ? "Memuat..." : "Pilih Desa/Kelurahan"} />
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
        control={control}
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
