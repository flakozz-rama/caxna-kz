import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Calendar, User } from "lucide-react"
import { getSpecialProjects } from "@/lib/api"

export default async function ProjectsPage() {
  let projects: any[] = [];
  try {
    projects = await getSpecialProjects();
  } catch (e) {
    // Можно добавить обработку ошибки
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Арнайы жобалар</h1>
          <p className="text-gray-600 mt-1">Барлық арнайы жобаларды басқару</p>
        </div>
        <Link href="/admin/arnaiy-zhobalar/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base">
            <Plus className="w-5 h-5 mr-2" />
            Жаңа жоба
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Арнайы жобалар табылмады</p>
          <Link href="/admin/arnaiy-zhobalar/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Бірінші жобаны қосу
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                      <Badge
                        variant={project.status === "active" ? "default" : 
                                project.status === "completed" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {project.status === "active" ? "Белсенді" : 
                         project.status === "completed" ? "Аяқталған" : 
                         project.status === "planned" ? "Жоспарлануда" : "Белгісіз"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {project.author || "Автор"}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : ""}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {project.views || 0} көрініс
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/arnaiy-zhobalar/${project.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Өңдеу
                      </Button>
                    </Link>
                    <Link href={`/arnaiy-zhobalar/${project.slug || project.id}`} target="_blank">
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
