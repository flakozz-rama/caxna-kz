"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Video, MessageCircle, Eye } from "lucide-react"
import { useDashboardStats } from "@/lib/api"

export default function AdminDashboard() {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Басты бет</h1>
          <p className="text-gray-600 mt-1">Мәдени портал басқару панелі</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
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
          <p className="text-red-600 mb-4">Деректерді жүктеу кезінде қате орын алды</p>
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

  const statsData = [
    { title: "Барлық мақалалар", value: stats?.articlesCount.toString() || "0", icon: FileText, color: "bg-blue-500" },
    { title: "Видеолар", value: stats?.videosCount.toString() || "0", icon: Video, color: "bg-green-500" },
    { title: "Сұқбаттар", value: stats?.interviewsCount.toString() || "0", icon: MessageCircle, color: "bg-purple-500" },
    { title: "Жалпы көрулер", value: stats?.totalViews.toLocaleString() || "0", icon: Eye, color: "bg-orange-500" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Басты бет</h1>
        <p className="text-gray-600 mt-1">Мәдени портал басқару панелі</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Жуықтағы белсенділік</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>Жуықтағы белсенділік мәліметтері жүктелуде...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
