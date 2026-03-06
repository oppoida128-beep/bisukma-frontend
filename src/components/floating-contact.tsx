'use client'

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MessageCircle, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

const contactSchema = z.object({
  fullName: z.string().min(2, { message: "Nama lengkap minimal 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  message: z.string().min(10, { message: "Pesan minimal 10 karakter." }),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function FloatingContact() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { toast } = useToast()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    
    // Simulasi pengiriman data
    setTimeout(() => {
      // Konstruksi tautan mailto
      const subject = encodeURIComponent(`Kontak dari ${data.fullName}`)
      const body = encodeURIComponent(`Nama: ${data.fullName}\nEmail: ${data.email}\n\nPesan:\n${data.message}`)
      const mailtoLink = `mailto:bisukmafoundation@gmail.com?subject=${subject}&body=${body}`
      
      // Buka klien email
      if (typeof window !== 'undefined') {
        window.location.href = mailtoLink
      }
      
      setIsSubmitting(false)
      setIsOpen(false)
      form.reset()
      
      toast({
        title: "Pesan Siap Dikirim",
        description: "Email Anda telah disiapkan. Silakan tekan 'Kirim' pada aplikasi email Anda.",
      })
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#1877F2] text-white p-4 rounded-full shadow-2xl shadow-blue-600/30 hover:bg-[#1877F2]/90 transition-all flex items-center justify-center group border-none outline-none"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap text-sm font-bold">
              Hubungi Kami
            </span>
          </motion.button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem] border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tight text-primary">Hubungi Kami</DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium">
              Silakan sampaikan pertanyaan atau aspirasi Anda kepada tim Bisukma Foundation.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan Nama Lengkap Anda" className="rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white h-11" {...field} />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Alamat Email</FormLabel>
                    <FormControl>
                      <Input placeholder="nama@email.com" type="email" className="rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white h-11" {...field} />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Isi Pesan</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tuliskan pesan Anda di sini..." 
                        className="min-h-[120px] rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white resize-none" 
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
                className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white rounded-xl font-bold h-12 shadow-lg shadow-blue-600/20 transition-all text-sm uppercase tracking-wider border-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Kirim Pesan Sekarang
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
