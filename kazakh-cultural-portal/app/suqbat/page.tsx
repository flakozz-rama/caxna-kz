import Link from "next/link"
import Image from "next/image"
import { ChevronRight, User, Clock } from "lucide-react"
import { getInterviews } from "@/lib/api"

export default async function SuqbatPage() {
  let interviews: any[] = [];
  try {
    interviews = await getInterviews();
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
        <span className="text-gray-900">Сұқбат</span>
      </nav>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Сұқбат</h1>

        {interviews.length === 0 ? (
          <div className="text-gray-500 text-center py-12">Сұқбаттар табылмады</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interviews.map((interview) => (
              <article
                key={interview.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/suqbat/${interview.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={interview.imageUrl || `/placeholder.svg?height=200&width=400`}
                      alt={interview.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-gray-900 mb-3">{interview.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{interview.excerpt || interview.description || ""}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {interview.interviewee || interview.author || "Сұқбаттасушы"}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {interview.duration || interview.readTime || "10 мин"}
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
