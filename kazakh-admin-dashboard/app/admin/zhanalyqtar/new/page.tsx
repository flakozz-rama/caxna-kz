"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Send } from "lucide-react"
import { useCreateNews } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

export default function NewNewsPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const router = useRouter()
  const createNews = useCreateNews();

  const handleSave = async () => {
    try {
      await createNews.mutateAsync({
        title,
        content,
        category: 'culture', // или выбери из формы
        status: "draft" as "draft",
        // другие нужные поля
      });
      toast({ title: "Сәтті!", description: "Жаңалық сәтті қосылды" });
      router.push("/admin/zhanalyqtar");
    } catch (error) {
      toast({ title: "Қате!", description: error?.message || "Жаңалық қосу кезінде қате орын алды", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/zhanalyqtar">
          <Button variant="ghost" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Жаңа жаңалық қосу</h1>
          <p className="text-gray-600 mt-1">Жаңалық ақпаратын толтырыңыз</p>
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
                  placeholder="Жаңалық атауын енгізіңіз"
                  className="text-base p-3 h-12"
                />
              </div>

              <div>
                <Label className="text-base font-medium mb-2 block">Мазмұны *</Label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Жаңалық мазмұнын жазыңыз..."
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
