import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, User, ArrowLeft } from "lucide-react"
import { getArticleById } from "@/lib/api"

export default async function MaqalaDetailPage({ params }: { params: { id: string } }) {
  let article: any = null;
  try {
    article = await getArticleById(params.id);
  } catch (e) {
    // Можно добавить обработку ошибки
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Мақала табылмады</h1>
          <Link href="/maqala" className="text-blue-600 hover:text-blue-800">
            Мақалаларға оралу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/maqala" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Мақалаларға оралу
        </Link>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Басты бет
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/maqala" className="hover:text-blue-600">
          Мақала
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{article.title}</span>
      </nav>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

          <div className="flex items-center space-x-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {article.author || "Мақала авторы"}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : ""}
            </div>
          </div>

          {article.imageUrl && (
            <div className="relative h-64 md:h-96 mb-8">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content || article.description || "" }} />
        </div>
      </article>
    </div>
  )
}
