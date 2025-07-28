"use client"

import { use } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Calendar, Eye, User } from "lucide-react"
import { usePlay } from "@/lib/api"

export default function PlayDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use<{ id: string }>(params);
  const { data: play, isLoading, error } = usePlay(id);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" disabled>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Артқа
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Пьеса</h1>
            <p className="text-gray-600 mt-1">Жүктелуде...</p>
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !play) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/piesa">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Артқа
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Пьеса табылмады</h1>
            <p className="text-gray-600 mt-1">Пьеса жүктеу кезінде қате орын алды</p>
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Пьеса табылмады немесе жойылған</p>
          <Link href="/admin/piesa">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Пьесалар тізіміне оралу
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      draft: { label: "Жоба", variant: "secondary" as const },
      published: { label: "Жарияланған", variant: "default" as const },
      pending: { label: "Күтуде", variant: "outline" as const },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.draft;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/piesa">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Артқа
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{play.title}</h1>
            <p className="text-gray-600 mt-1">Пьеса ақпараты</p>
          </div>
        </div>
        <Link href={`/admin/piesa/${play.id}/edit`}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Edit className="w-4 h-4 mr-2" />
            Өңдеу
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Пьеса мазмұны</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {play.content}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Пьеса ақпараты</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Күй</span>
                {getStatusBadge(play.status)}
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {new Date(play.createdAt).toLocaleDateString('kk-KZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {play.views || 0} көрілім
                </span>
              </div>

              {play.authorId && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {play.authorId}
                  </span>
                </div>
              )}

              {play.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Жарияланған: {new Date(play.publishedAt).toLocaleDateString('kk-KZ')}
                  </span>
                </div>
              )}

              {play.slug && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500">Slug:</span>
                  <span className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                    {play.slug}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {play.imageUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Сурет</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={play.imageUrl} 
                  alt={play.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          )}

          {play.tags && play.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Тегтер</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {play.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 