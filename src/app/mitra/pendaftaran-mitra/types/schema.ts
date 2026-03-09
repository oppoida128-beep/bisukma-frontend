
import * as z from "zod"

export const pendaftaranSchema = z.object({
  fullName: z.string().min(2, { message: "Nama lengkap minimal 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  phone: z.string().min(10, { message: "Nomor telepon tidak valid." }),
  province: z.string().min(1, { message: "Pilih provinsi." }),
  city: z.string().min(1, { message: "Pilih kota/kabupaten." }),
  district: z.string().min(1, { message: "Pilih kecamatan." }),
  village: z.string().min(1, { message: "Pilih desa/kelurahan." }),
  hasBuilding: z.string().min(1, { message: "Pilih status lahan." }),
  buildingLength: z.string().optional(),
  buildingWidth: z.string().optional(),
  buildingType: z.string().optional(),
  buildingPhoto: z.any().optional(),
  buildingPhotoLeft: z.any().optional(),
  buildingPhotoRight: z.any().optional(),
  buildingPhotoBack: z.any().optional(),
  progress: z.string().optional(),
  estimation: z.string().optional(),
  photo: z.any().optional(),
})

export type PendaftaranFormValues = z.infer<typeof pendaftaranSchema>
