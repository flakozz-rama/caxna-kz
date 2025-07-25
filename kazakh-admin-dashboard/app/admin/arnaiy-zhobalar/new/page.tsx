"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Send } from "lucide-react"
import { useCreateSpecialProject } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

const statuses = ["Жоспарлануда", "Белсенді", "Аяқталған", "Тоқтатылған"]

export default function NewProjectPage() {
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("")
  const [description, setDescription] = useState("")
  const router = useRouter()
  const createSpecialProject = useCreateSpecialProject();

  const handleSave = async () => {
    try {
      await createSpecialProject.mutateAsync({
        title,
        description,
        status: "draft" as "draft",
        // другие нужные поля
      });
      toast({ title: "Сәтті!", description: "Жоба сәтті қосылды" });
      router.push("/admin/arnaiy-zhobalar");
    } catch (error) {
      toast({ title: "Қате!", description: error?.message || "Жоба қосу кезінде қате орын алды", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/arnaiy-zhobalar">
          <Button variant="ghost" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Жаңа жоба қосу</h1>
          <p className="text-gray-600 mt-1">Жоба ақпаратын толтырыңыз</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Негізгі ақпарат</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-base font-medium mb-2 block">
                  Атауы *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Жоба атауын енгізіңіз"
                  className="text-base p-3 h-12"
                />
              </div>

              <div>
                <Label className="text-base font-medium mb-2 block">Күйі *</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="text-base p-3 h-12">
                    <SelectValue placeholder="Күйді таңдаңыз" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((stat) => (
                      <SelectItem key={stat} value={stat}>
                        {stat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-medium mb-2 block">Сипаттама *</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Жоба сипаттамасын жазыңыз..."
                  className="min-h-[300px] text-base p-4"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6 space-y-3">
              <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-3">
                <Send className="w-4 h-4 mr-2" />
                Жариялау
              </Button>
              <Button variant="outline" className="w-full text-base py-3">
                <Save className="w-4 h-4 mr-2" />
                Жоба ретінде сақтау
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
