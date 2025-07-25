"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { useCreateUser } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

export default function NewUserPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const createUser = useCreateUser();

  const handleSave = async () => {
    try {
      await createUser.mutateAsync({
        name,
        email,
        password,
        role,
      });
      toast({ title: "Сәтті!", description: "Пайдаланушы сәтті қосылды" });
      router.push("/admin/paidalanushylar");
    } catch (error) {
      toast({ title: "Қате!", description: error?.message || "Пайдаланушы қосу кезінде қате орын алды", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/paidalanushylar">
          <Button variant="ghost" className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Жаңа пайдаланушы қосу</h1>
          <p className="text-gray-600 mt-1">Пайдаланушы ақпаратын толтырыңыз</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Негізгі ақпарат</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-base font-medium mb-2 block">
              Аты-жөні *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Толық аты-жөнін енгізіңіз"
              className="text-base p-3 h-12"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-base font-medium mb-2 block">
              Электрондық пошта *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="text-base p-3 h-12"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-base font-medium mb-2 block">
              Құпия сөз *
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Құпия сөзді енгізіңіз"
              className="text-base p-3 h-12"
            />
          </div>

          <div>
            <Label className="text-base font-medium mb-2 block">Рөлі *</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="text-base p-3 h-12">
                <SelectValue placeholder="Рөлді таңдаңыз" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Админ</SelectItem>
                <SelectItem value="author">Автор</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-base py-3">
              <Save className="w-4 h-4 mr-2" />
              Сақтау
            </Button>
            <Link href="/admin/paidalanushylar">
              <Button variant="outline" className="flex-1 text-base py-3">
                Болдырмау
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
