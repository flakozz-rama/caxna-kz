"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Video, MessageCircle, Eye, Calendar } from "lucide-react"
import { getDashboardStats } from "@/lib/api"
import { useEffect, useState } from "react"

interface DashboardOverviewProps {
  onNavigate: (page: string) => void
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const [stats, setStats] = useState({
    articlesCount: 0,
    newsCount: 0,
    videosCount: 0,
    interviewsCount: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    { title: "Барлық мақалалар", value: stats.articlesCount.toString(), icon: FileText, color: "bg-blue-500" },
    { title: "Видеолар", value: stats.videosCount.toString(), icon: Video, color: "bg-green-500" },
    { title: "Сұқбаттар", value: stats.interviewsCount.toString(), icon: MessageCircle, color: "bg-purple-500" },
    { title: "Жалпы көрулер", value: stats.totalViews.toLocaleString(), icon: Eye, color: "bg-orange-500" },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
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

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Жылдам әрекеттер</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => onNavigate("maqalalar")}
              variant="outline"
              className="w-full justify-start"
            >
              <Plus className="w-4 h-4 mr-2" />
              Жаңа мақала қосу
            </Button>
            <Button
              onClick={() => onNavigate("videolar")}
              variant="outline"
              className="w-full justify-start"
            >
              <Plus className="w-4 h-4 mr-2" />
              Жаңа видео қосу
            </Button>
            <Button
              onClick={() => onNavigate("suqbattar")}
              variant="outline"
              className="w-full justify-start"
            >
              <Plus className="w-4 h-4 mr-2" />
              Жаңа сұқбат қосу
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Жүйе ақпараты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Жаңалықтар саны:</span>
              <Badge variant="outline">{stats.newsCount}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Жалпы контент:</span>
              <Badge variant="outline">{stats.articlesCount + stats.videosCount + stats.interviewsCount + stats.newsCount}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Орташа көрулер:</span>
              <Badge variant="outline">
                {stats.totalViews > 0 ? Math.round(stats.totalViews / (stats.articlesCount + stats.videosCount + stats.interviewsCount + stats.newsCount)) : 0}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
