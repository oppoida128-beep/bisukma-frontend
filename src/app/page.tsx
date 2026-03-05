import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Zap, Shield, Globe, Rocket, Monitor, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero')
  const service2Img = PlaceHolderImages.find(img => img.id === 'service-2')
  
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          {heroImg?.imageUrl && (
            <Image 
              src={heroImg.imageUrl} 
              alt={heroImg.description || "Hero"} 
              fill 
              className="object-cover brightness-[0.3]"
              priority
              data-ai-hint="digital technology"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent border border-accent/20 backdrop-blur-md">
              <Rocket className="h-4 w-4" />
              <span>Partner Transformasi Digital Anda</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter">
              Build the <span className="text-accent">Future</span> <br />
              of Your Business
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Bisukma Digital menghadirkan solusi teknologi mutakhir untuk membantu perusahaan Anda beradaptasi dan mendominasi pasar di era digital.
            </p>
            
            <div className="flex flex-wrap gap-5 pt-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 h-14 text-lg rounded-xl shadow-lg shadow-accent/20 transition-all hover:scale-105">
                Mulai Konsultasi
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-white/20 hover:bg-white/5 backdrop-blur-sm transition-all">
                Pelajari Layanan
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-accent/50 to-transparent hidden md:block"></div>
      </section>

      {/* Stats Section - Floating Design */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-card border border-border/50 shadow-2xl rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl">
          {[
            { label: "Proyek Sukses", value: "500+", icon: <Zap className="h-5 w-5" /> },
            { label: "Klien Global", value: "200+", icon: <Globe className="h-5 w-5" /> },
            { label: "Tech Experts", value: "50+", icon: <Cpu className="h-5 w-5" /> },
            { label: "Tahun Berdiri", value: "10+", icon: <Shield className="h-5 w-5" /> },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left group cursor-default">
              <div className="text-accent bg-accent/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black tracking-tight">{stat.value}</div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="container mx-auto px-4 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-accent font-bold tracking-[0.2em] uppercase text-sm">Layanan Kami</h2>
            <h3 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
              Solusi Digital yang Dirancang Untuk Skalabilitas
            </h3>
          </div>
          <Button variant="link" className="text-accent p-0 font-bold text-lg group">
            Lihat Semua Layanan 
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              title: "Enterprise Software", 
              desc: "Membangun ekosistem aplikasi internal yang efisien untuk operasional skala besar.",
              icon: <Monitor className="h-12 w-12 text-accent" />,
              accent: "bg-blue-500/5"
            },
            { 
              title: "Cloud Architecture", 
              desc: "Infrastruktur cloud yang aman, andal, dan siap menangani jutaan pengguna secara real-time.",
              icon: <Globe className="h-12 w-12 text-accent" />,
              accent: "bg-accent/5"
            },
            { 
              title: "Data Intelligence", 
              desc: "Mengubah data mentah menjadi wawasan bisnis strategis dengan bantuan AI dan analytics.",
              icon: <Cpu className="h-12 w-12 text-accent" />,
              accent: "bg-purple-500/5"
            },
          ].map((service, i) => (
            <Card key={i} className="group relative overflow-hidden border-none bg-card hover:bg-muted/50 transition-all duration-500 rounded-[2rem]">
              <CardContent className="p-12 space-y-8 relative z-10">
                <div className={`${service.accent} w-20 h-20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500`}>
                  {service.icon}
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-black tracking-tight">{service.title}</h4>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {service.desc}
                  </p>
                </div>
                <Link href="/layanan" className="inline-flex items-center font-bold text-accent">
                  Detail Layanan
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </CardContent>
              {/* Decorative Background Icon */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                {service.icon}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section - Modern Dark Design */}
      <section className="container mx-auto px-4 pb-32">
        <div className="bg-primary rounded-[3.5rem] overflow-hidden relative min-h-[500px] flex items-center shadow-3xl shadow-primary/20">
          {/* Decorative mesh gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--accent),0.15),transparent)] pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid md:grid-cols-2 gap-20 items-center p-10 md:p-24 relative z-10 w-full">
            <div className="text-white space-y-10">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-7xl font-black leading-[1.05] tracking-tighter">
                  Siap Melangkah Lebih <span className="text-accent underline decoration-4 underline-offset-8">Jauh</span>?
                </h2>
                <p className="text-gray-300 text-xl max-w-md leading-relaxed">
                  Mari diskusikan bagaimana kami bisa membantu akselerasi pertumbuhan bisnis Anda melalui teknologi.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Strategi Digital End-to-End",
                  "Optimasi Biaya Infrastruktur",
                  "Dukungan Teknis 24/7",
                  "Keamanan Data Standar Global"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-accent/20 rounded-full p-1">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white h-14 px-10 rounded-xl text-lg font-bold transition-all hover:scale-105">
                  Hubungi Tim Kami
                </Button>
                <Button size="lg" variant="ghost" className="text-white h-14 px-8 text-lg font-bold hover:bg-white/5">
                  Lihat Portfolio
                </Button>
              </div>
            </div>

            <div className="hidden md:block relative group">
              <div className="absolute -inset-4 bg-accent/20 rounded-[2.5rem] blur-2xl group-hover:bg-accent/30 transition-all duration-700"></div>
              <div className="relative aspect-square w-full max-w-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                 {service2Img?.imageUrl && (
                   <Image 
                    src={service2Img.imageUrl} 
                    alt="Digital Workplace" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                 )}
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl animate-bounce duration-[3000ms]">
                <div className="text-primary font-black text-2xl">99.9%</div>
                <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">Uptime Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
