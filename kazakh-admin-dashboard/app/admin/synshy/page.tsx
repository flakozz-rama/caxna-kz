"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Calendar, User, Trash2 } from "lucide-react"
import { useReviews, useDeleteReview } from "@/lib/api"
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

export default function ReviewsPage() {
  const { data: reviews, isLoading, error } = useReviews();
  const deleteReviewMutation = useDeleteReview();

  const handleDelete = async (id: string, title: string) => {
    try {
      await deleteReviewMutation.mutateAsync(id);
      toast({
        title: "Сәтті!",
        description: `"${title}" рецензиясы сәтті жойылды`,
      });
    } catch (error: any) {
      toast({
        title: "Қате!",
        description: error.message || "Рецензия жою кезінде қате орын алды",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Сыншы жазбашылар</h1>
            <p className="text-gray-600 mt-1">Барлық рецензияларды басқару</p>
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
          <p className="text-red-600 mb-4">Рецензияларды жүктеу кезінде қате орын алды</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Сыншы жазбашылар</h1>
          <p className="text-gray-600 mt-1">Барлық рецензияларды басқару</p>
        </div>
        <Link href="/admin/synshy/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base">
            <Plus className="w-5 h-5 mr-2" />
            Жаңа рецензия
          </Button>
        </Link>
      </div>

      {!reviews || reviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Рецензиялар табылмады</p>
          <Link href="/admin/synshy/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-5 h-5 mr-2" />
              Бірінші рецензияны қосу
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
                      <Badge 
                        variant={review.status === 'published' ? 'default' : review.status === 'pending' ? 'outline' : 'secondary'}
                        className="text-xs"
                      >
                        {review.status === 'published' ? 'Жарияланған' : 
                         review.status === 'pending' ? 'Күтуде' : 'Жоба'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {review.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(review.createdAt).toLocaleDateString('kk-KZ')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {review.views || 0} көрілім
                      </div>
                      {review.authorId && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {review.authorId}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Link href={`/admin/synshy/${review.id}/edit`}>
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
                          <AlertDialogTitle>Рецензияны жою</AlertDialogTitle>
                          <AlertDialogDescription>
                            Бұл рецензияны жоюға сенімдісіз бе? Бұл әрекетті к geri алмауға болады.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Болдырмау</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(review.id, review.title)}
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