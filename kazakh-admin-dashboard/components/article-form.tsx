"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X, Save, Send } from "lucide-react"

interface ArticleFormProps {
  type: string
  onBack: () => void
}

const typeLabels = {
  articles: "Мақала",
  news: "Жаңалық",
  interviews: "Сұхбат",
  projects: "Арнайы жоба",
}

const categories = ["Мәдениет", "Тарих", "Өнер", "Музыка", "Әдебиет", "Дәстүр", "Заманауи өмір"]

export function ArticleForm({ type, onBack }: ArticleFormProps) {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [content, setContent] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Жаңа {typeLabels[type as keyof typeof typeLabels]} қосу</h1>
          <p className="text-gray-600 mt-1">Барлық керекті ақпаратты толтырыңыз</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Негізгі ақпарат</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-base font-medium mb-2 block">
                  Атауы *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Мақала атауын енгізіңіз"
                  className="text-base p-3 h-12"
                />
              </div>

              {/* Category */}
              <div>
                <Label className="text-base font-medium mb-2 block">Санат таңдау *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="text-base p-3 h-12">
                    <SelectValue placeholder="Санатты таңдаңыз" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-base">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags */}
              <div>
                <Label className="text-base font-medium mb-2 block">Тегтер</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Тег енгізіңіз"
                    className="text-base"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button onClick={addTag} variant="outline" className="px-4">
                    Қосу
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-2 hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Content Editor */}
              <div>
                <Label className="text-base font-medium mb-2 block">Мазмұны *</Label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Мақала мазмұнын жазыңыз..."
                  className="min-h-[300px] text-base p-4"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Мәтінді пішімдеу үшін Markdown синтаксисін пайдалануға болады
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image Upload */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Сурет қосу</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setImagePreview(null)}
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

          {/* Video */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Видео қосу</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input placeholder="YouTube немесе Vimeo сілтемесі" className="text-base" />
                <p className="text-sm text-gray-500">Немесе видео файлын жүктеңіз</p>
                <input type="file" accept="video/*" className="hidden" id="video-upload" />
                <Label htmlFor="video-upload">
                  <Button variant="outline" className="w-full cursor-pointer" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Видео жүктеу
                    </span>
                  </Button>
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-3">
                  <Send className="w-4 h-4 mr-2" />
                  Жариялау
                </Button>
                <Button variant="outline" className="w-full text-base py-3">
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
