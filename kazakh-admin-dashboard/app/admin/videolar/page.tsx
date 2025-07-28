"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Calendar, User, Play, Trash2 } from "lucide-react"
import { useVideos, useDeleteVideo } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function VideosPage() {
  const { data: videos, isLoading, error } = useVideos();
  const deleteVideoMutation = useDeleteVideo();

  const handleDelete = async (id: string, title: string) => {
    try {
      await deleteVideoMutation.mutateAsync(id);
      toast({
        title: "Сәтті!",
        description: `"${title}" видеосы сәтті жойылды`,
      });
    } catch (error: any) {
      toast({
        title: "Қате!",
        description: error.message || "Видео жою кезінде қате орын алды",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="p-6">Жүктелуде...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-600">Қате: {error.message || "Видеоларды жүктеу кезінде қате орын алды"}</div>;
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
      {!videos || videos.length === 0 ? (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-lg text-gray-900">{video.title}</div>
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
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/videolar/${video.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Өңдеу
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Жою
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Видеоны жою</AlertDialogTitle>
                          <AlertDialogDescription>
                            Сіз шынымен "{video.title}" видеосын жойғыңыз келетініне сенімдісіз бе? 
                            Бұл әрекетті к geri алмайды.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Болдырмау</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(video.id.toString(), video.title)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Жою
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
