import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Calendar, User, Play } from "lucide-react"
import { getVideos } from "@/lib/api"

export default async function VideosPage() {
  let videos: any[] = [];
  try {
    videos = await getVideos();
  } catch (e) {
    // Можно добавить обработку ошибки
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Видеолар</h1>
          <p className="text-gray-600 mt-1">Барлық видеоларды басқару</p>
        </div>
        <Link href="/admin/videolar/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base">
            <Plus className="w-5 h-5 mr-2" />
            Жаңа видео
          </Button>
        </Link>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Видеолар табылмады</p>
          <Link href="/admin/videolar/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Бірінші видеоны қосу
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {videos.map((video) => (
            <Card key={video.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
                      <Badge
                        variant={video.status === "published" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {video.status === "published" ? "Жарияланған" : 
                         video.status === "draft" ? "Жоба" : "Жариялау күтуде"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {video.author || "Автор"}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : ""}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {video.views || 0} көрініс
                      </div>
                      <div className="flex items-center">
                        <Play className="w-4 h-4 mr-1" />
                        {video.duration || "00:00"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/videolar/${video.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Өңдеу
                      </Button>
                    </Link>
                    <Link href={`/video/${video.id}`} target="_blank">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Көру
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
