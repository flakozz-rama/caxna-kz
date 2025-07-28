import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, Clock } from "lucide-react"
import { getNews } from "@/lib/api"

export default async function ZhanalyqtarPage() {
  let news: any[] = [];
  try {
    news = await getNews();
  } catch (e) {
    // Можно добавить обработку ошибки
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Басты бет
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">Жаңалықтар</span>
      </nav>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Жаңалықтар</h1>

        {news.length === 0 ? (
          <div className="text-gray-500 text-center py-12">Жаңалықтар табылмады</div>
        ) : (
          <div className="space-y-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/zhanalyqtar/${item.id}`} className="block">
                  <div className="flex gap-6 p-6">
                    <div className="relative w-48 h-32 flex-shrink-0">
                      <Image
                        src={item.imageUrl || `/placeholder.svg?height=150&width=200`}
                        alt={item.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{item.excerpt || item.description || ""}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.readTime || "5 минут"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
