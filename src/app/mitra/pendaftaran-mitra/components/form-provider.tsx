
'use client'

import * as React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { pendaftaranSchema, PendaftaranFormValues } from "../types/schema"

export function PendaftaranFormProvider({ children }: { children: React.ReactNode }) {
  const methods = useForm<PendaftaranFormValues>({
    resolver: zodResolver(pendaftaranSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      province: "",
      city: "",
      district: "",
      village: "",
      hasBuilding: "",
      buildingLength: "",
      buildingWidth: "",
      buildingType: "",
      buildingPhoto: null,
      buildingPhotoLeft: null,
      buildingPhotoRight: null,
      buildingPhotoBack: null,
      progress: "0",
      estimation: "",
      photo: null,
    },
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
