"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Play, Upload, Search, Filter, Edit, Trash2 } from "lucide-react"
import { getVideos } from "@/lib/api"
import { useEffect, useState } from "react"

export function VideoManagement() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        setVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {videos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Видеолар табылмады</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Видео қосу
          </Button>
        </div>
      ) : (
        videos.map((video) => (
          <Card key={video.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <Play className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{video.title}</h3>
                    <p className="text-sm text-gray-600">{video.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={video.status === "published" ? "default" : "secondary"}>
                        {video.status === "published" ? "Жарияланған" : 
                         video.status === "draft" ? "Жоба" : "Жариялау күтуде"}
                      </Badge>
                      <span className="text-sm text-gray-500">{video.duration || "00:00"}</span>
                      <span className="text-sm text-gray-500">{video.views || 0} көрініс</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Өңдеу
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Жою
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

function VideoForm({ onBack, onCancel }: { onBack: () => void; onCancel: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [embedLink, setEmbedLink] = useState("")

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Жаңа видео қосу</h1>
          <p className="text-gray-600 mt-1">Видео ақпаратын толтырыңыз</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="video-title" className="text-base font-medium mb-2 block">
              Атауы *
            </Label>
            <Input
              id="video-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Видео атауын енгізіңіз"
              className="text-base p-3 h-12"
            />
          </div>

          <div>
            <Label htmlFor="video-description" className="text-base font-medium mb-2 block">
              Сипаттама
            </Label>
            <Textarea
              id="video-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Видео сипаттамасын жазыңыз..."
              className="min-h-[120px] text-base p-3"
            />
          </div>

          <div>
            <Label htmlFor="embed-link" className="text-base font-medium mb-2 block">
              Видео сілтемесі
            </Label>
            <Input
              id="embed-link"
              value={embedLink}
              onChange={(e) => setEmbedLink(e.target.value)}
              placeholder="YouTube, Vimeo немесе басқа сілтеме"
              className="text-base p-3 h-12"
            />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-3">Немесе видео файлын жүктеңіз</p>
            <input type="file" accept="video/*" className="hidden" id="video-file-upload" />
            <Label htmlFor="video-file-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>Файл таңдау</span>
              </Button>
            </Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-base py-3">Сақтау</Button>
            <Button variant="outline" onClick={onCancel} className="flex-1 text-base py-3">
              Болдырмау
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
