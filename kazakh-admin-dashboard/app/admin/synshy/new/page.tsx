"use client"

import dynamic from 'next/dynamic'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ValidationError } from "@/components/ui/validation-error"
import { ArrowLeft, Save, Send, Upload, X } from "lucide-react"
import { useCreateReview, useUploadFile } from "@/lib/api"
import { createReviewSchema } from "@/lib/validation"
import { useValidation } from "@/hooks/use-validation"
import { toast } from "@/hooks/use-toast"

const categories = [
  { value: 'literature', label: 'Әдебиет' },
  { value: 'theater', label: 'Театр' },
  { value: 'cinema', label: 'Кино' },
  { value: 'music', label: 'Музыка' },
  { value: 'art', label: 'Өнер' },
  { value: 'culture', label: 'Мәдениет' },
  { value: 'exhibition', label: 'Көрме' },
  { value: 'performance', label: 'Перформанс' },
]

const statusOptions = [
  { value: 'draft', label: 'Жоба' },
  { value: 'published', label: 'Жарияланған' },
  { value: 'pending', label: 'Жариялау күтуде' },
]

function NewReviewForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState<"draft" | "published" | "pending">("draft")
  const [imageUrl, setImageUrl] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  
  const router = useRouter()
  
  const createReviewMutation = useCreateReview()
  const uploadFileMutation = useUploadFile()
  const { validate, getFieldError, clearErrors } = useValidation(createReviewSchema)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && typeof window !== 'undefined') {
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

  const handlePublish = async () => {
    clearErrors();
    const reviewData = {
      title,
      content,
      category: category || undefined,
      status: "published" as "published",
      imageUrl: imageUrl || undefined,
    };
    const validation = validate(reviewData);
    if (!validation.isValid) {
      toast({ title: "Қате!", description: "Деректерді тексеріңіз", variant: "destructive" });
      return;
    }
    try {
      let finalImageUrl = imageUrl;
      if (imageFile && typeof window !== 'undefined') {
        const uploadResult = await uploadFileMutation.mutateAsync(imageFile);
        finalImageUrl = uploadResult.url;
      }
      const finalReviewData = { ...reviewData, imageUrl: finalImageUrl || undefined };
      await createReviewMutation.mutateAsync(finalReviewData);
      toast({ title: "Сәтті!", description: "Рецензия сәтті жарияланды" });
      router.push("/admin/synshy");
    } catch (error: any) {
      toast({ title: "Қате!", description: error.message || "Рецензия жариялау кезінде қате орын алды", variant: "destructive" });
    }
  };

  const handleSaveDraft = async () => {
    clearErrors();
    const reviewData = {
      title,
      content,
      category: category || undefined,
      status: "draft" as "draft",
      imageUrl: imageUrl || undefined,
    };
    const validation = validate(reviewData);
    if (!validation.isValid) {
      toast({ title: "Қате!", description: "Деректерді тексеріңіз", variant: "destructive" });
      return;
    }
    try {
      let finalImageUrl = imageUrl;
      if (imageFile && typeof window !== 'undefined') {
        const uploadResult = await uploadFileMutation.mutateAsync(imageFile);
        finalImageUrl = uploadResult.url;
      }
      const finalReviewData = { ...reviewData, imageUrl: finalImageUrl || undefined };
      await createReviewMutation.mutateAsync(finalReviewData);
      toast({ title: "Сәтті!", description: "Рецензия жоба ретінде сақталды" });
      router.push("/admin/synshy");
    } catch (error: any) {
      toast({ title: "Қате!", description: error.message || "Рецензияны сақтау кезінде қате орын алды", variant: "destructive" });
    }
  };

  const isLoading = createReviewMutation.isPending || uploadFileMutation.isPending

  // Не рендерим форму до монтирования компонента
  if (!mounted) {
    return null
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/synshy">
          <Button variant="ghost" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Жаңа рецензия қосу</h1>
          <p className="text-gray-600 mt-1">Рецензия ақпаратын толтырыңыз</p>
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
                    placeholder="Рецензия атауын енгізіңіз"
                    className="text-base p-3 h-12"
                  />
                  <ValidationError error={getFieldError('title')} />
                </div>

                <div>
                  <Label className="text-base font-medium mb-2 block">Мазмұны *</Label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Рецензия мазмұнын жазыңыз..."
                    className="min-h-[300px] text-base p-4"
                  />
                  <ValidationError error={getFieldError('content')} />
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Сурет қосу</CardTitle>
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
                    <p className="text-sm text-gray-600 mb-3">Суретті осы жерге тартып апарыңыз немесе таңдаңыз</p>
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

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button 
                  onClick={handlePublish}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-3"
                  disabled={isLoading}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isLoading ? "Сақтауда..." : "Жариялау"}
                </Button>
                <Button variant="outline" className="w-full text-base py-3" onClick={handleSaveDraft} disabled={isLoading}>
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

// Экспортируем с динамическим импортом
export default dynamic(() => Promise.resolve(NewReviewForm), {
  ssr: false,
}) 