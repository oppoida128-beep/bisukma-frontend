import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const articles = [
  {
    id: "news-1",
    title: "Masa Depan AI dalam Transformasi Bisnis 2024",
    excerpt: "Bagaimana kecerdasan buatan mengubah cara kita bekerja dan mengelola operasi bisnis sehari-hari secara otomatis.",
    date: "12 Mei 2024",
    author: "Budi Santoso",
    category: "Teknologi",
    imgId: "news-1"
  },
  {
    id: "news-2",
    title: "Strategi Cloud Computing untuk Startup Berkembang",
    excerpt: "Memilih infrastruktur cloud yang tepat adalah kunci skalabilitas bagi startup yang baru memasuki pasar kompetitif.",
    date: "10 Mei 2024",
    author: "Siti Aminah",
    category: "Infrastruktur",
    imgId: "news-2"
  },
  {
    id: "news-3",
    title: "Pentingnya Cybersecurity di Era Kerja Remote",
    excerpt: "Melindungi data sensitif perusahaan menjadi tantangan utama saat karyawan bekerja dari berbagai lokasi yang berbeda.",
    date: "05 Mei 2024",
    author: "Andi Wijaya",
    category: "Keamanan",
    imgId: "news-3"
  },
  {
    id: "news-4",
    title: "Trend Desain UI/UX yang Dominan di Tahun Ini",
    excerpt: "Eksplorasi estetika desain minimalis dan fungsional yang memberikan pengalaman pengguna terbaik di perangkat mobile.",
    date: "01 Mei 2024",
    author: "Dewi Lestari",
    category: "Desain",
    imgId: "gallery-5"
  },
  {
    id: "news-5",
    title: "Implementasi Blockchain untuk Supply Chain",
    excerpt: "Transparansi dan pelacakan aset menjadi lebih mudah dan aman dengan pemanfaatan teknologi buku besar terdistribusi.",
    date: "28 April 2024",
    author: "Reza Fahlevi",
    category: "Teknologi",
    imgId: "gallery-4"
  },
  {
    id: "news-6",
    title: "Event Bisukma Digital Conference 2024",
    excerpt: "Rangkuman keseruan acara tahunan kami yang dihadiri oleh ratusan pemimpin industri dan pakar teknologi ternama.",
    date: "20 April 2024",
    author: "Admin Bisukma",
    category: "Event",
    imgId: "gallery-6"
  }
]

export default function BeritaPage() {
  return (
    <div className="pb-20">
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center">Berita & Update</h1>
          <p className="text-center mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Wawasan terbaru seputar teknologi, tren industri, dan kabar terkini dari Bisukma Digital.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const img = PlaceHolderImages.find(i => i.id === article.imgId)
            return (
              <Card key={article.id} className="overflow-hidden border-none shadow-lg group flex flex-col h-full bg-white">
                <CardHeader className="p-0 relative h-56">
                  {img?.imageUrl && (
                    <Image 
                      src={img.imageUrl} 
                      alt={article.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <Badge className="absolute top-4 left-4 bg-accent hover:bg-accent/90">
                    {article.category}
                  </Badge>
                </CardHeader>
                <CardContent className="p-6 space-y-4 flex-1">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.date}</span>
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {article.author}</span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link href={`/berita/${article.id}`} className="text-sm font-bold flex items-center text-accent">
                    Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="flex gap-2">
            {[1, 2, 3].map(n => (
              <button key={n} className={cn(
                "w-10 h-10 rounded-md border text-sm font-medium transition-colors",
                n === 1 ? "bg-accent text-white border-accent" : "bg-white hover:bg-muted"
              )}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
