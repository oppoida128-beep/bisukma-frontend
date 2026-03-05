import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Zap, Shield, Globe, Rocket, Monitor, Cpu, Sparkles, Layout, Layers, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero')
  const service1Img = PlaceHolderImages.find(img => img.id === 'service-1')
  const service2Img = PlaceHolderImages.find(img => img.id === 'service-2')
  
  return (
    <div className="flex flex-col w-full overflow-hidden bg-background">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          {heroImg?.imageUrl && (
            <Image 
              src={heroImg.imageUrl} 
              alt="Bisukma Digital Background" 
              fill 
              className="object-cover opacity-20 scale-105"
              priority
            />
          )}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_70%)]"></div>
          {/* Animated Glows */}
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-700">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Digital Evolution Partner</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
              ENGINEERING <br /> 
              <span className="text-accent italic font-serif">IMPOSSIBLE</span> <br />
              SOLUTIONS
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Bisukma Digital menggabungkan kreativitas tanpa batas dengan teknologi mutakhir untuk mengakselerasi ambisi bisnis Anda.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Button size="lg" className="h-16 px-10 rounded-2xl text-lg font-bold bg-accent hover:bg-accent/90 shadow-[0_20px_40px_-15px_rgba(var(--accent),0.3)] hover:scale-105 transition-all">
                Mulai Proyek Anda
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl text-lg font-bold border-white/10 hover:bg-white/5 backdrop-blur-sm">
                Lihat Ekosistem
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-foreground to-transparent"></div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        </div>
      </section>

      {/* --- TRUST BAR --- */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground mb-12">
            Dipercaya Oleh Pemimpin Industri Global
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-40 hover:opacity-100 transition-opacity">
            {[1, 2, 3, 1, 2, 3].map((id, i) => {
              const partner = PlaceHolderImages.find(p => p.id === `partner-${id}`)
              return (
                <div key={i} className="flex justify-center grayscale hover:grayscale-0 transition-all">
                  {partner?.imageUrl && (
                    <Image 
                      src={partner.imageUrl} 
                      alt="Partner Logo" 
                      width={120} 
                      height={40} 
                      className="object-contain"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- BENTO GRID SERVICES --- */}
      <section className="py-32 container mx-auto px-4">
        <div className="max-w-2xl mb-20 space-y-4">
          <Badge variant="outline" className="border-accent/30 text-accent rounded-sm px-3 py-1">Capabilities</Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            Kami Tidak Hanya Membangun Kode. Kami Membangun Masa Depan.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[900px]">
          {/* Main Bento Item */}
          <Card className="md:col-span-8 md:row-span-6 overflow-hidden border-none bg-accent text-white group relative">
            <div className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-700">
               {service2Img?.imageUrl && (
                 <Image src={service2Img.imageUrl} alt="Tech" fill className="object-cover" />
               )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/50 to-transparent"></div>
            <CardContent className="p-12 relative z-10 flex flex-col h-full justify-end">
              <Monitor className="h-16 w-16 mb-8 text-white/50" />
              <h3 className="text-4xl font-black mb-4">Enterprise Digital Backbone</h3>
              <p className="text-white/80 text-xl max-w-md leading-relaxed mb-8">
                Infrastruktur software skala raksasa yang dirancang untuk stabilitas mutlak dan skalabilitas tanpa batas.
              </p>
              <Button variant="secondary" className="w-fit rounded-full h-12 px-8 font-bold">
                Detail Layanan
              </Button>
            </CardContent>
          </Card>

          {/* Side Bento 1 */}
          <Card className="md:col-span-4 md:row-span-3 border-none bg-card hover:bg-muted/50 transition-colors group">
            <CardContent className="p-10 flex flex-col justify-between h-full">
              <Cpu className="h-12 w-12 text-accent mb-6" />
              <div>
                <h3 className="text-2xl font-bold mb-3">AI & Intelligence</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Integrasi LLM dan Predictive Analytics untuk mengotomatisasi kecerdasan bisnis Anda.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Side Bento 2 */}
          <Card className="md:col-span-4 md:row-span-3 border-none bg-primary text-white group overflow-hidden relative">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform">
              <Globe className="h-40 w-40" />
            </div>
            <CardContent className="p-10 flex flex-col justify-between h-full relative z-10">
              <Globe className="h-12 w-12 text-accent" />
              <div>
                <h3 className="text-2xl font-bold mb-3">Cloud Native</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Arsitektur cloud tanpa server yang menghemat biaya hingga 60% dan meningkatkan kecepatan hingga 200%.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Bottom Bento 1 */}
          <Card className="md:col-span-4 md:row-span-3 border-none bg-muted/30 hover:bg-muted/50 transition-colors">
            <CardContent className="p-10 flex flex-col items-center text-center justify-center h-full space-y-4">
              <Users className="h-10 w-10 text-accent" />
              <div className="text-4xl font-black tracking-tighter">99.9%</div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Client Success Rate</div>
            </CardContent>
          </Card>

          {/* Bottom Bento 2 */}
          <Card className="md:col-span-8 md:row-span-3 border-none bg-white shadow-2xl overflow-hidden group">
            <div className="grid md:grid-cols-2 h-full">
              <div className="p-10 flex flex-col justify-center">
                <Layout className="h-10 w-10 text-accent mb-6" />
                <h3 className="text-2xl font-bold mb-3">Next-Gen UX/UI</h3>
                <p className="text-muted-foreground text-sm">
                  Desain antarmuka yang tidak hanya indah, tapi juga intuitif dan berorientasi pada konversi maksimal.
                </p>
              </div>
              <div className="relative overflow-hidden">
                {service1Img?.imageUrl && (
                  <Image src={service1Img.imageUrl} alt="Design" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                )}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-primary py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
            {[
              { label: "Engineering Experts", value: "50+" },
              { label: "Global Deployments", value: "300+" },
              { label: "Innovation Awards", value: "12" },
              { label: "Uptime SLA", value: "99.9%" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2 border-l-2 border-accent pl-8">
                <div className="text-5xl md:text-7xl font-black tracking-tighter">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="py-32 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
            Bagaimana Kami Mengubah Ide Menjadi <span className="text-accent italic">Impact</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-dashed border-t-2 border-dashed border-accent/20 -z-10"></div>
          
          {[
            { step: "01", title: "Discovery & Strategy", desc: "Menganalisis DNA bisnis Anda untuk menemukan peluang transformasi yang paling berdampak.", icon: <Sparkles className="h-6 w-6" /> },
            { step: "02", title: "Agile Development", desc: "Membangun solusi dengan iterasi cepat, transparansi penuh, dan kualitas kode standar industri.", icon: <Layers className="h-6 w-6" /> },
            { step: "03", title: "Launch & Scale", desc: "Meluncurkan produk Anda ke pasar dan memberikan dukungan berkelanjutan untuk pertumbuhan jangka panjang.", icon: <Rocket className="h-6 w-6" /> }
          ].map((item, i) => (
            <div key={i} className="bg-card p-10 rounded-[2.5rem] border border-border/50 space-y-8 hover:-translate-y-2 transition-transform shadow-xl hover:shadow-accent/5">
              <div className="flex justify-between items-center">
                <div className="bg-accent text-white h-12 w-12 rounded-2xl flex items-center justify-center font-black text-xl">
                  {item.step}
                </div>
                <div className="text-accent/20">
                  {item.icon}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-bold tracking-tight">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="container mx-auto px-4 pb-32">
        <div className="bg-white rounded-[4rem] p-10 md:p-32 text-center relative overflow-hidden border shadow-[0_100px_100px_-50px_rgba(0,0,0,0.1)]">
          <div className="absolute top-0 right-0 p-8">
             <Zap className="h-20 w-20 text-accent/5" />
          </div>
          <div className="relative z-10 space-y-12">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] max-w-4xl mx-auto">
              SIAP UNTUK <br /> 
              MENJADI <span className="text-accent">LEGENDARIS</span>?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto font-medium">
              Jadwalkan sesi strategi digital gratis hari ini dan mari kita bangun masa depan bersama.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="h-16 px-12 rounded-2xl text-xl font-bold bg-accent hover:bg-accent/90 shadow-2xl hover:scale-105 transition-all">
                Mulai Konsultasi Gratis
              </Button>
              <Button size="lg" variant="ghost" className="h-16 px-10 rounded-2xl text-xl font-bold hover:bg-accent/5">
                Lihat Katalog Solusi
              </Button>
            </div>
          </div>
          
          {/* Decorative Orbs */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px]"></div>
        </div>
      </section>
    </div>
  )
}
