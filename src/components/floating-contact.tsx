'use client'

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MessageCircle, Send, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import { motion, AnimatePresence } from "framer-motion"

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
      const subject = encodeURIComponent(`Kontak dari ${data.fullName}`)
      const body = encodeURIComponent(`Nama: ${data.fullName}\nEmail: ${data.email}\n\nPesan:\n${data.message}`)
      const mailtoLink = `mailto:bisukmafoundation@gmail.com?subject=${subject}&body=${body}`
      
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
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
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
        </PopoverTrigger>
        <PopoverContent 
          align="end" 
          side="top" 
          sideOffset={16}
          className="w-[90vw] sm:w-[400px] p-0 rounded-[2rem] border-none shadow-2xl bg-white overflow-hidden"
        >
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-black tracking-tight text-primary">Hubungi Kami</h3>
                <p className="text-xs text-muted-foreground font-medium">
                  Sampaikan aspirasi Anda kepada tim Bisukma.
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-8 w-8 text-muted-foreground" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama lengkap Anda" className="rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white h-11 text-sm" {...field} />
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
                        <Input placeholder="nama@email.com" type="email" className="rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white h-11 text-sm" {...field} />
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
                          className="min-h-[100px] rounded-xl border-muted-foreground/10 bg-muted/30 focus:bg-white resize-none text-sm" 
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
                  className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white rounded-xl font-bold h-12 shadow-lg shadow-blue-600/20 transition-all text-xs uppercase tracking-wider border-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      Kirim Pesan
                      <Send className="ml-2 h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
