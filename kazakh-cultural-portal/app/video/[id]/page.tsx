import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, Eye, Play, ArrowLeft } from "lucide-react"
import { getVideoById, getVideos } from "@/lib/api"

export default async function VideoDetailPage({ params }: { params: { id: string } }) {
  let video: any = null;
  let relatedVideos: any[] = [];
  
  try {
    video = await getVideoById(params.id);
    // Получаем похожие видео (первые 5)
    const allVideos = await getVideos();
    relatedVideos = allVideos.filter((v: any) => v.id !== video?.id).slice(0, 5);
  } catch (e) {
    // Можно добавить обработку ошибки
  }

  if (!video) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Видео табылмады</h1>
          <Link href="/video" className="text-blue-600 hover:text-blue-800">
            Видеоларға оралу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/video" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Видеоларға оралу
        </Link>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Басты бет
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/video" className="hover:text-blue-600">
          Видео
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{video.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main video content */}
        <div className="lg:col-span-2">
          {/* Video player */}
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6">
            <Image 
              src={video.thumbnailUrl || video.imageUrl || "/placeholder.svg?height=400&width=800"} 
              alt={video.title} 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-gray-900 ml-1" />
              </div>
            </div>
          </div>

          {/* Video info */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{video.title}</h1>

            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                {video.views || 0} көрініс
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : ""}
              </div>
            </div>

            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold mb-2">Сипаттама</h2>
              <div className="text-gray-700 leading-relaxed">
                {video.description || video.excerpt || "Сипаттама жоқ"}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar with related videos */}
        <div className="lg:col-span-1">
          <h3 className="text-xl font-semibold mb-4">Ұқсас видеолар</h3>
          {relatedVideos.length === 0 ? (
            <div className="text-gray-500 text-sm">Ұқсас видеолар жоқ</div>
          ) : (
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <Link
                  key={relatedVideo.id}
                  href={`/video/${relatedVideo.id}`}
                  className="flex space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="relative w-32 h-20 flex-shrink-0">
                    <Image
                      src={relatedVideo.thumbnailUrl || relatedVideo.imageUrl || `/placeholder.svg?height=80&width=120`}
                      alt={relatedVideo.title}
                      fill
                      className="object-cover rounded"
                    />
                    {relatedVideo.duration && (
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {relatedVideo.duration}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 line-clamp-2 text-sm">{relatedVideo.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{relatedVideo.views || 0} көрініс</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
