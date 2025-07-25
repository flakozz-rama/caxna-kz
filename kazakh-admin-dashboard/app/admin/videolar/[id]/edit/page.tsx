"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Send } from "lucide-react"
import { useVideo, useUpdateVideo } from "@/lib/api"

export default function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use<{ id: string }>(params);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { data: video, isLoading: isLoadingVideo } = useVideo(id);

  useEffect(() => {
    if (id === "admin") {
      router.replace("/admin/videolar");
    }
  }, [id, router]);

  useEffect(() => {
    if (video) {
      setTitle(video.title || "");
      setUrl(video.url || "");
      setDescription(video.description || "");
    }
  }, [video]);

  const handleSave = () => {
    router.push("/admin/videolar")
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/videolar">
          <Button variant="ghost" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Видеоны өңдеу</h1>
          <p className="text-gray-600 mt-1">Видео #{id}</p>
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
                  className="text-base p-3 h-12"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-medium mb-2 block">
                  Сипаттама
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] text-base p-3"
                />
              </div>

              <div>
                <Label htmlFor="embed-link" className="text-base font-medium mb-2 block">
                  Видео сілтемесі
                </Label>
                <Input
                  id="embed-link"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="text-base p-3 h-12"
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
                Жаңарту
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
