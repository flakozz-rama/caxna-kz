import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, MapPin, Users, ArrowLeft } from "lucide-react"
import { getPlayBySlug } from "@/lib/api"

export default async function PiesaDetailPage({ params }: { params: { slug: string } }) {
  let play: any = null;
  try {
    play = await getPlayBySlug(params.slug);
  } catch (e) {
    // Можно добавить обработку ошибки
  }

  if (!play) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Пьеса табылмады</h1>
          <Link href="/piesa" className="text-blue-600 hover:text-blue-800">
            Пьесаларға оралу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/piesa" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Пьесаларға оралу
        </Link>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Басты бет
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/piesa" className="hover:text-blue-600">
          Пьеса
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{play.title}</span>
      </nav>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{play.title}</h1>

          <div className="flex items-center space-x-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {play.theater || play.location || "Театр"}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {play.createdAt ? new Date(play.createdAt).toLocaleDateString() : ""}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              {play.actorsCount || play.castSize || "5"} актер
            </div>
          </div>

          {play.imageUrl && (
            <div className="relative h-64 md:h-96 mb-8">
              <Image
                src={play.imageUrl}
                alt={play.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: play.content || play.description || "" }} />
        </div>
      </article>
    </div>
  )
}
