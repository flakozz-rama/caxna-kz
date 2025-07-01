"use client"

import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Бет табылмады</h2>
          <p className="text-gray-600 mb-8">
            Кешіріңіз, сіз іздеген бет табылмады. Бет жойылған, атауы өзгертілген немесе уақытша қолжетімсіз болуы
            мүмкін.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full" size="lg">
              <Home className="w-5 h-5 mr-2" />
              Басты бетке оралу
            </Button>
          </Link>

          <Link href="/search">
            <Button variant="outline" className="w-full" size="lg">
              <Search className="w-5 h-5 mr-2" />
              Іздеу
            </Button>
          </Link>

          <Button variant="ghost" className="w-full" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Артқа қайту
          </Button>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Танымал бөлімдер</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link href="/music" className="text-blue-600 hover:text-blue-800">
              Музыка
            </Link>
            <Link href="/theater" className="text-blue-600 hover:text-blue-800">
              Театр
            </Link>
            <Link href="/cinema" className="text-blue-600 hover:text-blue-800">
              Кино
            </Link>
            <Link href="/visual-arts" className="text-blue-600 hover:text-blue-800">
              Бейнелеу өнері
            </Link>
            <Link href="/photography" className="text-blue-600 hover:text-blue-800">
              Фото өнері
            </Link>
            <Link href="/dance" className="text-blue-600 hover:text-blue-800">
              Би өнері
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
