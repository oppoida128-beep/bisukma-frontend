
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Clock, ArrowLeft } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import ShareButton from "./ShareButton"
import RecentNews from "./RecentNews"
import articlesData from "@/data/articles.json"

export default async function BeritaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const article = articlesData.find(a => a.id === id) || articlesData[0]
  const mainImage = PlaceHolderImages.find(img => img.id === article.mainImgId)
  const additionalImage = PlaceHolderImages.find(img => img.id === article.additionalImgId)
  const recentNewsItems = articlesData.filter(a => a.id !== id).slice(0, 4)

  return (
    <div className="bg-white min-h-screen pb-20">
      <section className="container mx-auto px-4 pt-8 md:pt-12">
        <div className="max-w-6xl mx-auto space-y-6">
          <Link href="/berita" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-accent transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke berita
          </Link>

          <div className="space-y-4">
            <Badge variant="outline" className="border-accent/30 text-accent font-semibold rounded-full px-4 py-1">
              {article.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary leading-tight max-w-4xl">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground font-medium">
                <Calendar className="h-3.5 w-3.5 text-accent" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground font-medium">
                <User className="h-3.5 w-3.5 text-accent" />
                <span>Oleh {article.author}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground font-medium">
                <Clock className="h-3.5 w-3.5 text-accent" />
                <span>5 Menit baca</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 mt-8 md:mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="space-y-3 mb-10">
                <div className="relative aspect-video w-full rounded-xl md:rounded-2xl overflow-hidden bg-muted border shadow-sm">
                  {mainImage?.imageUrl && (
                    <Image 
                      src={mainImage.imageUrl} 
                      alt={article.title} 
                      fill 
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
                {article.mainImgCaption && (
                  <p className="text-[11px] md:text-xs text-muted-foreground italic font-medium leading-relaxed px-1">
                    {article.mainImgCaption}
                  </p>
                )}
              </div>

              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-base md:text-lg mb-8">
                {article.contentPart1}
              </div>

              <div className="space-y-3 my-8 md:my-10">
                <div className="relative aspect-[16/10] w-full rounded-xl md:rounded-2xl overflow-hidden border bg-muted shadow-sm">
                  {additionalImage?.imageUrl && (
                    <Image 
                      src={additionalImage.imageUrl} 
                      alt="Detail tambahan artikel" 
                      fill 
                      className="object-cover"
                    />
                  )}
                </div>
                {(article.additionalImgCaption || additionalImage?.description) && (
                  <p className="text-[11px] md:text-xs text-muted-foreground italic font-medium leading-relaxed px-1">
                    {article.additionalImgCaption || additionalImage?.description}
                  </p>
                )}
              </div>

              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line text-base md:text-lg">
                {article.contentPart2}
              </div>

              <div className="mt-12 flex flex-wrap gap-2 items-center">
                <div className="flex items-center gap-2 mr-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="text-xs font-semibold">Tag:</span>
                </div>
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-muted hover:bg-accent/10 hover:text-accent transition-colors border-none shadow-none font-medium px-3 py-1 text-[10px] md:text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator className="my-10" />

              <div className="flex items-center justify-between gap-4">
                <ShareButton title={article.title} />
              </div>
            </div>

            <aside className="lg:col-span-4">
              <RecentNews recentNews={recentNewsItems} />
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
