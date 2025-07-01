import Link from "next/link"
import Image from "next/image"
import { ChevronRight, User, Calendar, Clock, ArrowLeft } from "lucide-react"
import { getInterviewBySlug } from "@/lib/api"

export default async function SuqbatDetailPage({ params }: { params: { slug: string } }) {
  let interview: any = null;
  try {
    interview = await getInterviewBySlug(params.slug);
  } catch (e) {
    // Можно добавить обработку ошибки
  }

  if (!interview) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Сұқбат табылмады</h1>
          <Link href="/suqbat" className="text-blue-600 hover:text-blue-800">
            Сұқбаттарға оралу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/suqbat" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Сұқбаттарға оралу
        </Link>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Басты бет
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/suqbat" className="hover:text-blue-600">
          Сұқбат
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{interview.title}</span>
      </nav>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{interview.title}</h1>

          <div className="flex items-center space-x-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {interview.interviewee || interview.author || "Сұқбаттасушы"}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {interview.createdAt ? new Date(interview.createdAt).toLocaleDateString() : ""}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {interview.duration || interview.readTime || "10 минут"}
            </div>
          </div>

          {interview.imageUrl && (
            <div className="relative h-64 md:h-96 mb-8">
              <Image
                src={interview.imageUrl}
                alt={interview.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: interview.content || interview.description || "" }} />
        </div>
      </article>
    </div>
  )
}
