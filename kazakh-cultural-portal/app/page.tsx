"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Eye, Play, ArrowRight } from "lucide-react"
import { useArticles, useNews, useVideos, useInterviews, useSpecialProjects } from "@/lib/api"

export default function HomePage() {
  const { data: articles, isLoading: articlesLoading } = useArticles()
  const { data: news, isLoading: newsLoading } = useNews()
  const { data: videos, isLoading: videosLoading } = useVideos()
  const { data: interviews, isLoading: interviewsLoading } = useInterviews()
  const { data: projects, isLoading: projectsLoading } = useSpecialProjects()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('kk-KZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Қазақ мәденитің порталы
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Қазақ халқының бай мәдени мұрасын, дәстүрлерін және заманауи өнерін зерттеуге арналған платформа
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/maqala">
              <Button size="lg" variant="secondary" className="text-blue-600">
                Мақалаларды оқу
              </Button>
            </Link>
            <Link href="/video">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Play className="w-4 h-4 mr-2" />
                Видеоларды көру
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Соңғы мақалалар</h2>
            <Link href="/maqala">
              <Button variant="outline">
                Барлығын көру
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          {articlesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(0, 6).map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  {article.imageUrl && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {article.category && (
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                      )}
                      <Badge variant={article.status === "published" ? "default" : "secondary"} className="text-xs">
                        {article.status === "published" ? "Жарияланған" : "Жоба"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {truncateText(article.content, 150)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {article.author || "Автор"}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(article.createdAt)}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href={`/maqala/${article.slug || article.id}`}>
                        <Button variant="outline" className="w-full">
                          Оқу
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Мақалалар табылмады</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Соңғы жаңалықтар</h2>
            <Link href="/zhanalyqtar">
              <Button variant="outline">
                Барлығын көру
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          {newsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : news && news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.slice(0, 3).map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  {item.imageUrl && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {truncateText(item.content, 120)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {item.author || "Автор"}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(item.createdAt)}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href={`/zhanalyqtar/${item.slug || item.id}`}>
                        <Button variant="outline" className="w-full">
                          Оқу
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Жаңалықтар табылмады</p>
            </div>
          )}
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Видеолар</h2>
            <Link href="/video">
              <Button variant="outline">
                Барлығын көру
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          {videosLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : videos && videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.slice(0, 3).map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-shadow">
                  {video.thumbnailUrl && (
                    <div className="aspect-video overflow-hidden rounded-t-lg relative">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-3">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {truncateText(video.description, 100)}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {video.author || "Автор"}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {video.views || 0} көрініс
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href={`/video/${video.id}`}>
                        <Button variant="outline" className="w-full">
                          Көру
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Видеолар табылмады</p>
            </div>
          )}
        </div>
      </section>

      {/* Special Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Арнайы жобалар</h2>
            <Link href="/arnaiy-zhobalar">
              <Button variant="outline">
                Барлығын көру
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.slice(0, 2).map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  {project.imageUrl && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={project.status === "active" ? "default" : "secondary"} className="text-xs">
                        {project.status === "active" ? "Белсенді" : 
                         project.status === "completed" ? "Аяқталған" : "Жоспарланған"}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {truncateText(project.content, 200)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        {project.author || "Автор"}
                      </div>
                      <Link href={`/arnaiy-zhobalar/${project.slug || project.id}`}>
                        <Button>
                          Толығырақ
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Арнайы жобалар табылмады</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
