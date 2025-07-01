import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Calendar, User } from "lucide-react"
import { getInterviews } from "@/lib/api"

export default async function InterviewsPage() {
  let interviews: any[] = [];
  try {
    interviews = await getInterviews();
  } catch (e) {
    // Можно добавить обработку ошибки
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

      {interviews.length === 0 ? (
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
        <div className="space-y-4">
          {interviews.map((interview) => (
            <Card key={interview.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{interview.title}</h3>
                      <Badge
                        variant={interview.status === "published" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {interview.status === "published" ? "Жарияланған" : 
                         interview.status === "draft" ? "Жоба" : "Жариялау күтуде"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {interview.interviewee || interview.author || "Сұқбаттасушы"}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {interview.createdAt ? new Date(interview.createdAt).toLocaleDateString() : ""}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {interview.views || 0} көрініс
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/suqbattar/${interview.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Өңдеу
                      </Button>
                    </Link>
                    <Link href={`/suqbat/${interview.slug || interview.id}`} target="_blank">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Көру
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
