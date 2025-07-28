"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Send, Upload, X } from "lucide-react"
import { usePlay, useUpdatePlay, useUploadFile } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

const statusOptions = [
  { value: 'draft', label: 'Жоба' },
  { value: 'published', label: 'Жарияланған' },
  { value: 'pending', label: 'Жариялау күтуде' },
]

export default function EditPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use<{ id: string }>(params);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "pending">("draft");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { data: play, isLoading: isLoadingPlay } = usePlay(id);
  const updatePlayMutation = useUpdatePlay();
  const uploadFileMutation = useUploadFile();

  useEffect(() => {
    if (id === "admin") {
      router.replace("/admin/piesa");
    }
  }, [id, router]);

  useEffect(() => {
    if (play) {
      setTitle(play.title || "");
      setContent(play.content || "");
      setStatus(play.status || "draft");
      setImageUrl(play.imageUrl || "");
      setImagePreview(play.imageUrl || null);
    }
  }, [play]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setImageUrl("")
  }

  const handleSave = async () => {
    try {
      let finalImageUrl = imageUrl
      
      // Загружаем файл если есть новый
      if (imageFile) {
        const uploadResult = await uploadFileMutation.mutateAsync(imageFile)
        finalImageUrl = uploadResult.url
      }

      const playData = {
        title,
        content,
        status,
        imageUrl: finalImageUrl,
      }

      await updatePlayMutation.mutateAsync({ id: id, data: playData })
      
      toast({
        title: "Сәтті!",
        description: "Пьеса сәтті жаңартылды",
      })
      
      router.push("/admin/piesa")
    } catch (error: any) {
      toast({
        title: "Қате!",
        description: error.message || "Пьеса жаңарту кезінде қате орын алды",
        variant: "destructive",
      })
    }
  }

  if (isLoadingPlay) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" className="p-2" disabled>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Пьесаны өңдеу</h1>
            <p className="text-gray-600 mt-1">Жүктелуде...</p>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!play) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Пьеса табылмады</p>
          <Link href="/admin/piesa">
            <Button>Артқа қайту</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/piesa">
          <Button variant="ghost" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Пьесаны өңдеу</h1>
          <p className="text-gray-600 mt-1">Пьеса #{id}</p>
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
                  <Label className="text-base font-medium mb-2 block">Мазмұны *</Label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[300px] text-base p-4"
                  />
                </div>
                
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Image Upload */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Сурет</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-3">Сурет қосу</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload">
                      <Button variant="outline" className="cursor-pointer" asChild>
                        <span>Сурет таңдау</span>
                      </Button>
                    </Label>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button 
                  onClick={handleSave} 
                  disabled={updatePlayMutation.isPending || uploadFileMutation.isPending || !title || !content}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-3"
                >
                  {updatePlayMutation.isPending || uploadFileMutation.isPending ? "Сақталуда..." : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Жаңарту
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-base py-3"
                  disabled={updatePlayMutation.isPending || uploadFileMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Жоба ретінде сақтау
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 