import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Card } from "@/components/ui/card"
import { ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

const galleryItems = [
  { id: "gallery-1", category: "Event" },
  { id: "gallery-2", category: "Office" },
  { id: "gallery-3", category: "Project" },
  { id: "gallery-4", category: "Tech" },
  { id: "gallery-5", category: "Design" },
  { id: "gallery-6", category: "Event" },
  { id: "news-1", category: "Tech" },
  { id: "news-2", category: "Office" },
  { id: "news-3", category: "Project" },
]

export default function GalleryPage() {
  return (
    <div className="pb-20">
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Gallery Bisukma</h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Melihat lebih dekat aktivitas, proyek, dan lingkungan kerja kami melalui lensa visual.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["Semua", "Event", "Office", "Project", "Tech"].map((cat, i) => (
            <button 
              key={i} 
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                cat === "Semua" ? "bg-accent text-white" : "bg-white text-muted-foreground hover:bg-muted shadow-sm"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => {
            const img = PlaceHolderImages.find(im => im.id === item.id)
            return (
              <Card key={i} className="group relative overflow-hidden rounded-xl border-none h-[300px] cursor-pointer shadow-md">
                {img?.imageUrl && (
                  <Image 
                    src={img.imageUrl} 
                    alt={img.description || "Gallery Item"} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white space-y-3">
                  <div className="bg-accent p-3 rounded-full">
                    <ZoomIn className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs uppercase tracking-widest font-bold opacity-80">{item.category}</span>
                    <h3 className="text-lg font-bold">{img?.description}</h3>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}
