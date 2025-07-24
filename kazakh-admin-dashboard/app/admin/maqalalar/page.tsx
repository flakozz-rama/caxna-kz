"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Calendar, User, Trash2 } from "lucide-react"
import { useArticles, useDeleteArticle } from "@/lib/api"
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

export default function ArticlesPage() {
  const { data: articles, isLoading, error } = useArticles();
  const deleteArticleMutation = useDeleteArticle();

  const handleDelete = async (id: string, title: string) => {
    try {
      await deleteArticleMutation.mutateAsync(id);
      toast({
        title: "Сәтті!",
        description: `"${title}" мақаласы сәтті жойылды`,
      });
    } catch (error: any) {
      toast({
        title: "Қате!",
        description: error.message || "Мақала жою кезінде қате орын алды",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Мақалалар</h1>
            <p className="text-gray-600 mt-1">Барлық мақалаларды басқару</p>
          </div>
        </div>
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Мақалаларды жүктеу кезінде қате орын алды</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Қайталау
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Мақалалар</h1>
          <p className="text-gray-600 mt-1">Барлық мақалаларды басқару</p>
        </div>
        <Link href="/admin/maqalalar/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base">
            <Plus className="w-5 h-5 mr-2" />
            Жаңа мақала
          </Button>
        </Link>
      </div>

      {!articles || articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Мақалалар табылмады</p>
          <Link href="/admin/maqalalar/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Бірінші мақаланы қосу
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                      <Badge
                        variant={article.status === "published" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {article.status === "published" ? "Жарияланған" : 
                         article.status === "draft" ? "Жоба" : "Жариялау күтуде"}
                      </Badge>
                      {article.category && (
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {article.author || "Автор"}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : ""}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views || 0} көрініс
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/maqalalar/${article.id}/edit`}>
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
                          <AlertDialogTitle>Мақаланы жою</AlertDialogTitle>
                          <AlertDialogDescription>
                            Сіз шынымен "{article.title}" мақаласын жойғыңыз келетініне сенімдісіз бе? 
                            Бұл әрекетті к geri алмайды.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Болдырмау</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(article.id.toString(), article.title)}
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
