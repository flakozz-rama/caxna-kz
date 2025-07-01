"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useQueryClient } from "@tanstack/react-query"

export function LanguageToggle() {
  const [language, setLanguage] = useState("kaz")
  const queryClient = useQueryClient()

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "kaz"
    setLanguage(savedLang)
  }, [])

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang)
    localStorage.setItem("language", newLang)
    
    // Инвалидируем все кэшированные запросы для обновления данных с новым языком
    queryClient.invalidateQueries()
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === "kaz" ? "default" : "outline"}
        size="sm"
        onClick={() => handleLanguageChange("kaz")}
        className="text-sm"
      >
        Қазақша
      </Button>
      <Button
        variant={language === "qaz" ? "default" : "outline"}
        size="sm"
        onClick={() => handleLanguageChange("qaz")}
        className="text-sm"
      >
        Qazaqşa
      </Button>
    </div>
  )
} 