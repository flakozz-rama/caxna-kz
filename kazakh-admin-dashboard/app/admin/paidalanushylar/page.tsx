import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, User } from "lucide-react"
import { getUsers } from "@/lib/api"

export default async function UsersPage() {
  let users: any[] = [];
  try {
    users = await getUsers();
  } catch (e) {
    // Можно добавить обработку ошибки
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Пайдаланушылар</h1>
          <p className="text-gray-600 mt-1">Жүйе пайдаланушыларын басқару</p>
        </div>
        <Link href="/admin/paidalanushylar/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base">
            <Plus className="w-5 h-5 mr-2" />
            Жаңа пайдаланушы
          </Button>
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Пайдаланушылар табылмады</p>
          <Link href="/admin/paidalanushylar/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Бірінші пайдаланушыны қосу
            </Button>
          </Link>
        </div>
      ) : (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-900">Пайдаланушы</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Рөлі</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Соңғы кіруі</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Күйі</th>
                    <th className="text-left p-4 font-semibold text-gray-900">Әрекеттер</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{user.name || user.email}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                          {user.role === "admin" ? "Админ" : "Автор"}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-600">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : "Ешқашан"}
                      </td>
                      <td className="p-4">
                        <Badge variant={user.isActive ? "default" : "secondary"}>
                          {user.isActive ? "Белсенді" : "Белсенді емес"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Link href={`/admin/paidalanushylar/${user.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Өңдеу
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Жою
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
