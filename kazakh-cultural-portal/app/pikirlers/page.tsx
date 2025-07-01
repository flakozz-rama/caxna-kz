import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, MessageCircle } from "lucide-react"
import { getOpinions } from "@/lib/api"

export default async function PikirlerPage() {
  let opinions: any[] = [];
  try {
    opinions = await getOpinions();
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
        <span className="text-gray-900">Пікірлер</span>
      </nav>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Пікірлер</h1>

        {opinions.length === 0 ? (
          <div className="text-gray-500 text-center py-12">Пікірлер табылмады</div>
        ) : (
          <div className="space-y-6">
            {opinions.map((opinion) => (
              <article
                key={opinion.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/pikirlers/${opinion.slug || opinion.id}`} className="block">
                  <div className="flex gap-6 p-6">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <Image
                        src={opinion.imageUrl || `/placeholder.svg?height=100&width=150`}
                        alt={opinion.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{opinion.title}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{opinion.excerpt || opinion.description || ""}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {opinion.createdAt ? new Date(opinion.createdAt).toLocaleDateString() : ""}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {opinion.commentsCount || 0} пікір
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
