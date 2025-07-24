"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Calendar, User } from "lucide-react"
import { useInterviews } from "@/lib/api"

export default function InterviewsPage() {
  const { data: interviews, isLoading, error } = useInterviews();

  if (isLoading) {
    return <div className="p-6">Жүктелуде...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-600">Қате: {error.message || "Сұқбаттарды жүктеу кезінде қате орын алды"}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Сұқбаттар</h1>
          <p className="text-gray-600 mt-1">Барлық сұқбаттарды басқару</p>
        </div>
        <Link href="/admin/suqbattar/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base">
            <Plus className="w-5 h-5 mr-2" />
            Жаңа сұқбат
          </Button>
        </Link>
      </div>
      {!interviews || interviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Сұқбаттар табылмады</p>
          <Link href="/admin/suqbattar/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Бірінші сұқбатты қосу
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((item) => (
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
                    <Link href={`/admin/suqbattar/${item.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Өңдеу
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
