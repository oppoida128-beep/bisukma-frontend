'use client'

import * as React from "react"
import { Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MorphButton } from "@/components/ui/morph-button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { SocialIcon } from "react-social-icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = React.useState(false)
  const [currentUrl, setCurrentUrl] = React.useState("")

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const socialLinks = React.useMemo(() => [
    { network: "whatsapp", name: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(title + " " + currentUrl)}` },
    { network: "facebook", name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}` },
    { network: "x", name: "X (Twitter)", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}` },
    { network: "linkedin", name: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}` },
  ], [title, currentUrl])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <MorphButton 
            text="Bagikan Artikel" 
            icon={Share2} 
            className="text-muted-foreground border-none hover:text-accent font-bold"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 p-0 rounded-2xl border-none shadow-2xl bg-white overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h4 className="font-bold text-primary">Bagikan Artikel</h4>
            <p className="text-xs text-muted-foreground font-medium">Sebarkan wawasan ini ke jejaring Anda.</p>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.network}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group p-2 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <SocialIcon 
                  network={social.network} 
                  fgColor="#fff" 
                  style={{ height: 32, width: 32 }}
                  as="div"
                />
                <span className="text-[9px] font-bold text-muted-foreground group-hover:text-accent transition-colors">
                  {social.name}
                </span>
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[9px] font-bold text-muted-foreground/40">Atau Salin Tautan</span>
            </div>
            <div className="flex items-center gap-2 bg-muted/40 p-1 pl-3 rounded-xl border border-border/50">
              <p className="flex-1 text-[10px] text-muted-foreground truncate font-medium">
                {currentUrl}
              </p>
              <Button 
                size="sm" 
                onClick={handleCopyLink}
                className={cn(
                  "h-7 px-3 rounded-lg text-[10px] font-bold shadow-none transition-all duration-300",
                  copied ? "bg-green-500 text-white" : "bg-accent text-white"
                )}
              >
                {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                {copied ? "Tersalin" : "Salin"}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
