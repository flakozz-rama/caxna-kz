import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, Clock, ArrowLeft } from "lucide-react"
import { getNewsBySlug } from "@/lib/api"

export default async function ZhanalyqDetailPage({ params }: { params: { slug: string } }) {
  let news: any = null;
  try {
    news = await getNewsBySlug(params.slug);
  } catch (e) {
    // Можно добавить обработку ошибки
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Жаңалық табылмады</h1>
          <Link href="/zhanalyqtar" className="text-blue-600 hover:text-blue-800">
            Жаңалықтарға оралу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/zhanalyqtar" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Жаңалықтарға оралу
        </Link>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Басты бет
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/zhanalyqtar" className="hover:text-blue-600">
          Жаңалықтар
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{news.title}</span>
      </nav>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{news.title}</h1>

          <div className="flex items-center space-x-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {news.createdAt ? new Date(news.createdAt).toLocaleDateString() : ""}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {news.readTime || "5 минут"}
            </div>
          </div>

          {news.imageUrl && (
            <div className="relative h-64 md:h-96 mb-8">
              <Image
                src={news.imageUrl}
                alt={news.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: news.content || news.description || "" }} />
        </div>
      </article>
    </div>
  )
}
