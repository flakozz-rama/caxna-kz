import Link from "next/link"
import Image from "next/image"
import { ChevronRight, User, Calendar, ArrowLeft } from "lucide-react"
import { getCommentById } from "@/lib/api"

export default async function PikirlersDetailPage({ params }: { params: { id: string } }) {
  let comment: any = null;
  try {
    comment = await getCommentById(params.id);
  } catch (e) {
    // Можно добавить обработку ошибки
  }

  if (!comment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Пікір табылмады</h1>
          <Link href="/pikirlers" className="text-blue-600 hover:text-blue-800">
            Пікірлерге оралу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/pikirlers" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Пікірлерге оралу
        </Link>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Басты бет
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/pikirlers" className="hover:text-blue-600">
          Пікірлер
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{comment.title}</span>
      </nav>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{comment.title}</h1>

          <div className="flex items-center space-x-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {comment.author || "Оқырман"}
            </div>
          </div>

          {comment.imageUrl && (
            <div className="relative h-64 md:h-96 mb-8">
              <Image
                src={comment.imageUrl}
                alt={comment.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: comment.content || comment.text || "" }} />
        </div>

        {/* Comments section */}
        <div className="border-t pt-8">
          <h3 className="text-xl font-semibold mb-6">Пікірлер</h3>
          {comment.comments && comment.comments.length > 0 ? (
            <div className="space-y-6">
              {comment.comments.map((comment: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="font-medium text-gray-900">{comment.author || `Оқырман ${index + 1}`}</div>
                    <div className="text-sm text-gray-500 ml-4">
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content || comment.text || ""}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">Пікірлер жоқ</div>
          )}
        </div>
      </article>
    </div>
  )
}
