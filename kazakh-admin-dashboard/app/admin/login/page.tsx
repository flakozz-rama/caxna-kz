"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ValidationError } from "@/components/ui/validation-error"
import { authApi } from "@/lib/api"
import { loginSchema } from "@/lib/validation"
import { useValidation } from "@/hooks/use-validation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState("")
  const router = useRouter()

  const { validate, getFieldError, clearErrors } = useValidation(loginSchema)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setServerError("")
    clearErrors()

    const formData = { email, password }
    const validation = validate(formData)

    if (!validation.isValid) {
      setLoading(false)
      return
    }

    try {
      const response = await authApi.login(email, password)
      
      // Сохраняем токен в localStorage
      if (response.access_token) {
        localStorage.setItem('admin_token', response.access_token)
        router.push("/admin")
      } else {
        setServerError("Кіру сәтсіз болды")
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setServerError(err?.response?.data?.message || err.message || "Кіру сәтсіз болды. Электрондық пошта мен құпия сөзді тексеріңіз.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">Қ</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Жүйеге кіру</CardTitle>
          <p className="text-gray-600">Басқару панеліне кіру үшін тіркелгі мәліметтерін енгізіңіз</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {serverError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{serverError}</p>
              </div>
            )}
            <div>
              <Label htmlFor="email" className="text-base font-medium mb-2 block">
                Электрондық пошта
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="text-base p-3 h-12"
                required
                disabled={loading}
              />
              <ValidationError error={getFieldError('email')} />
            </div>
            <div>
              <Label htmlFor="password" className="text-base font-medium mb-2 block">
                Құпия сөз
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Құпия сөзді енгізіңіз"
                className="text-base p-3 h-12"
                required
                disabled={loading}
              />
              <ValidationError error={getFieldError('password')} />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base py-3 h-12"
              disabled={loading}
            >
              {loading ? "Кіру..." : "Кіру"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
