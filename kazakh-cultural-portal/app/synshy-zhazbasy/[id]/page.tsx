import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, User, Star, ArrowLeft } from "lucide-react"
import { getReviewById } from "@/lib/api"

export default async function SynshyZhazbasDetailPage({ params }: { params: { id: string } }) {
  let review: any = null;
  try {
    review = await getReviewById(params.id);
  } catch (e) {
    // Можно добавить обработку ошибки
  }

  if (!review) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Сыншы жазбасы табылмады</h1>
          <Link href="/synshy-zhazbasy" className="text-blue-600 hover:text-blue-800">
            Сыншы жазбаларына оралу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/synshy-zhazbasy" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Сыншы жазбаларына оралу
        </Link>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Басты бет
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/synshy-zhazbasy" className="hover:text-blue-600">
          Сыншы жазбасы
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{review.title}</span>
      </nav>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{review.title}</h1>

          <div className="flex items-center space-x-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {review.author || "Сыншы авторы"}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
            </div>
            {review.rating && (
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                {review.rating}/5 баға
              </div>
            )}
          </div>

          {review.imageUrl && (
            <div className="relative h-64 md:h-96 mb-8">
              <Image
                src={review.imageUrl}
                alt={review.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: review.content || review.description || "" }} />
        </div>
      </article>
    </div>
  )
}
