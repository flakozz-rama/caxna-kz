import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, Clock, Play } from "lucide-react"
import { getVideos } from "@/lib/api"

export default async function VideoPage() {
  let videos: any[] = [];
  try {
    videos = await getVideos();
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
        <span className="text-gray-900">Видео</span>
      </nav>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Видео</h1>

        {videos.length === 0 ? (
          <div className="text-gray-500 text-center py-12">Видеолар табылмады</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <article
                key={video.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/video/${video.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={video.thumbnailUrl || video.imageUrl || "/placeholder.svg?height=200&width=300"}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-gray-900 ml-1" />
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-gray-900 mb-3">{video.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{video.description || video.excerpt || ""}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : ""}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {video.duration || "5:00"}
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
