import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Zap, Shield, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero')
  
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center overflow-hidden">
        {heroImg?.imageUrl && (
          <Image 
            src={heroImg.imageUrl} 
            alt={heroImg.description || "Hero"} 
            fill 
            className="object-cover brightness-50"
            priority
            data-ai-hint="digital technology"
          />
        )}
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-accent border border-accent/30 backdrop-blur-sm">
              <Zap className="mr-2 h-4 w-4" />
              Inovasi Tanpa Batas
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Masa Depan Digital Anda Dimulai <span className="text-accent">Disini</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-lg">
              Kami membantu bisnis Anda berkembang pesat di era digital dengan solusi teknologi yang cerdas, efisien, dan modern.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                Mulai Sekarang
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Lihat Layanan
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Quick Info */}
      <section className="container mx-auto px-4 -mt-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Proyek Selesai", value: "500+" },
            { label: "Klien Puas", value: "200+" },
            { label: "Tenaga Ahli", value: "50+" },
            { label: "Tahun Pengalaman", value: "10+" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-xl bg-card">
              <CardContent className="p-8 text-center space-y-2">
                <div className="text-4xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Layanan Unggulan Kami</h2>
          <p className="text-muted-foreground">
            Kami menawarkan berbagai solusi teknologi yang disesuaikan dengan kebutuhan spesifik bisnis Anda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Software Development", 
              desc: "Pengembangan aplikasi web dan mobile kustom dengan performa tinggi.",
              icon: <Zap className="h-10 w-10 text-accent" />
            },
            { 
              title: "Digital Transformation", 
              desc: "Migrasi sistem konvensional Anda ke ekosistem digital yang modern.",
              icon: <Globe className="h-10 w-10 text-accent" />
            },
            { 
              title: "Keamanan Cyber", 
              desc: "Perlindungan data menyeluruh untuk aset digital berharga perusahaan Anda.",
              icon: <Shield className="h-10 w-10 text-accent" />
            },
          ].map((service, i) => (
            <Card key={i} className="group hover:shadow-2xl transition-all duration-300 border-none bg-white">
              <CardContent className="p-10 space-y-6">
                <div className="bg-accent/5 p-4 rounded-2xl inline-block group-hover:bg-accent/10 transition-colors">
                  {service.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
                <Link href="/layanan" className="inline-flex items-center text-sm font-bold text-accent group-hover:gap-2 transition-all">
                  Pelajari Lebih Lanjut <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Content Section - CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-primary rounded-[2rem] overflow-hidden relative min-h-[400px] flex items-center">
          <div className="absolute inset-0 bg-accent/10 pointer-events-none"></div>
          <div className="grid md:grid-cols-2 gap-12 items-center p-8 md:p-16 relative z-10">
            <div className="text-white space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">Siap Untuk Meningkatkan Bisnis Anda?</h2>
              <p className="text-gray-300 text-lg">
                Konsultasikan kebutuhan digital Anda dengan tim ahli kami dan temukan cara terbaik untuk tumbuh lebih cepat.
              </p>
              <div className="space-y-4">
                {[
                  "Konsultasi Gratis Selama 30 Menit",
                  "Analisis Kebutuhan Bisnis Mendalam",
                  "Estimasi Biaya Transparan"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white mt-4">
                Hubungi Kami Sekarang
              </Button>
            </div>
            <div className="hidden md:block relative h-full min-h-[300px]">
               {PlaceHolderImages.find(img => img.id === 'service-2')?.imageUrl && (
                 <Image 
                  src={PlaceHolderImages.find(img => img.id === 'service-2')!.imageUrl} 
                  alt="Working" 
                  fill 
                  className="object-cover rounded-2xl shadow-2xl"
                />
               )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
