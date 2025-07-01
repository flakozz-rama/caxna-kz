import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, User, Eye } from "lucide-react"
import { getArticles } from "@/lib/api"

export default async function MaqalaPage() {
  let articles: any[] = [];
  try {
    articles = await getArticles();
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
        <span className="text-gray-900">Мақала</span>
      </nav>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Мақала</h1>

        {articles.length === 0 ? (
          <div className="text-gray-500 text-center py-12">Мақалалар табылмады</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/maqala/${article.slug || article.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={article.imageUrl || "/placeholder.svg?height=200&width=300"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-gray-900 mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt || article.description || ""}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {article.author || "Автор"}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views ?? 0}
                      </div>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : ""}
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
