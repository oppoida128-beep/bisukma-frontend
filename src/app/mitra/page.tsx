
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent } from "@/components/ui/card"

const partners = [
  { name: "Global Tech Inc", sector: "Infrastruktur", logo: "partner-1" },
  { name: "Future Finance", sector: "Fintech", logo: "partner-2" },
  { name: "Health Connect", sector: "Healthtech", logo: "partner-3" },
  { name: "Cloud Solutions", sector: "SaaS", logo: "partner-1" },
  { name: "EduGrow", sector: "Edutech", logo: "partner-2" },
  { name: "Retail Pro", sector: "E-commerce", logo: "partner-3" },
]

export default function MitraPage() {
  return (
    <div className="pb-20">
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Mitra Kami</h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Kami bangga telah bekerja sama dengan berbagai organisasi inovatif untuk menciptakan dampak digital yang nyata.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-16 space-y-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            {partners.map((p, i) => {
              const img = PlaceHolderImages.find(im => im.id === p.logo)
              return (
                <div key={i} className="grayscale hover:grayscale-0 transition-all duration-300">
                  <Image 
                    src={img?.imageUrl || ""} 
                    alt={p.name} 
                    width={150} 
                    height={80} 
                    className="object-contain"
                  />
                </div>
              )
            })}
          </div>

          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold">Kategori Kemitraan</h2>
              <p className="text-muted-foreground">Kami membangun ekosistem kolaboratif lintas industri untuk memperluas jangkauan inovasi kami.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Partner Strategis", desc: "Kolaborasi jangka panjang dalam pengembangan produk dan riset teknologi terbaru." },
                { title: "Partner Teknologi", desc: "Integrasi platform dan penyediaan infrastruktur IT terbaik untuk klien kami." },
                { title: "Partner Bisnis", desc: "Jaringan pemasaran dan distribusi solusi digital ke berbagai sektor industri." }
              ].map((item, i) => (
                <Card key={i} className="border-none bg-muted/50 p-8 text-center hover:bg-accent/5 transition-colors">
                  <CardContent className="p-0 space-y-4">
                    <h3 className="text-xl font-bold text-accent">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-primary rounded-2xl p-10 text-white text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Tertarik Menjadi Mitra Kami?</h2>
            <p className="text-gray-300 max-w-xl mx-auto">
              Kami selalu terbuka untuk kolaborasi baru yang saling menguntungkan. Mari tumbuh bersama dalam ekosistem digital Bisukma.
            </p>
            <button className="bg-accent text-white px-8 py-3 rounded-md font-bold hover:bg-accent/90 transition-colors">
              Hubungi Tim Partnership
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
