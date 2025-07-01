import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, MapPin, Users } from "lucide-react"
import { getPlays } from "@/lib/api"

export default async function PiesaPage() {
  let plays: any[] = [];
  try {
    plays = await getPlays();
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
        <span className="text-gray-900">Пьеса</span>
      </nav>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Пьеса</h1>

        {plays.length === 0 ? (
          <div className="text-gray-500 text-center py-12">Пьесалар табылмады</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plays.map((play) => (
              <article
                key={play.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/piesa/${play.slug || play.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={play.imageUrl || `/placeholder.svg?height=200&width=300`}
                      alt={play.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-gray-900 mb-3">{play.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{play.excerpt || play.description || ""}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {play.theater || play.location || "Театр"}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {play.createdAt ? new Date(play.createdAt).toLocaleDateString() : ""}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {play.actorsCount || play.castSize || "5"} актер
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
