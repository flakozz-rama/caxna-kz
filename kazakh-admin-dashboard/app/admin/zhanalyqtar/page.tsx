"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Calendar, User, Trash2 } from "lucide-react"
import { useNews, useDeleteNews } from "@/lib/api"
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

export default function NewsPage() {
  const { data: news, isLoading, error } = useNews();
  const deleteNewsMutation = useDeleteNews();

  const handleDelete = async (id: string, title: string) => {
    try {
      await deleteNewsMutation.mutateAsync(id);
      toast({
        title: "Сәтті!",
        description: `"${title}" жаңалығы сәтті жойылды`,
      });
    } catch (error: any) {
      toast({
        title: "Қате!",
        description: error.message || "Жаңалық жою кезінде қате орын алды",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="p-6">Жүктелуде...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-600">Қате: {error.message || "Жаңалықтарды жүктеу кезінде қате орын алды"}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Жаңалықтар</h1>
          <p className="text-gray-600 mt-1">Барлық жаңалықтарды басқару</p>
        </div>
        <Link href="/admin/zhanalyqtar/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base">
            <Plus className="w-5 h-5 mr-2" />
            Жаңа жаңалық
          </Button>
        </Link>
      </div>
      {!news || news.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Жаңалықтар табылмады</p>
          <Link href="/admin/zhanalyqtar/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Бірінші жаңалықты қосу
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-lg text-gray-900">{item.title}</div>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {item.author || "Автор"}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {item.views || 0} көрініс
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/zhanalyqtar/${item.id}/edit`}>
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
                          <AlertDialogTitle>Жаңалықты жою</AlertDialogTitle>
                          <AlertDialogDescription>
                            Сіз шынымен "{item.title}" жаңалығын жойғыңыз келетініне сенімдісіз бе? 
                            Бұл әрекетті к geri алмайды.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Болдырмау</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(item.id.toString(), item.title)}
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
