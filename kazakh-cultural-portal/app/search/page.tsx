"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Calendar, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ValidationError } from "@/components/ui/validation-error"
import { searchSchema } from "@/lib/validation"
import { useValidation } from "@/hooks/use-validation"
import { useSearch } from "@/lib/api"

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  type: string;
  image: string;
  date: string;
  views: string;
  href: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  const { validate, getFieldError, clearErrors } = useValidation(searchSchema)
  const searchMutation = useSearch(query)

  const handleSearch = async () => {
    clearErrors()

    const validation = validate({ query })
    if (!validation.isValid) {
      return
    }

    if (!query.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      // Здесь можно реализовать поиск по всем типам контента
      // Пока что возвращаем пустой массив
      setResults([])
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (query.trim()) {
      const timeoutId = setTimeout(handleSearch, 500)
      return () => clearTimeout(timeoutId)
    } else {
      setResults([])
    }
  }, [query])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Іздеу</h1>

        {/* Search form */}
        <div className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Іздеу сөздерін енгізіңіз..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ValidationError error={getFieldError('query')} />
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "Іздеуде..." : "Іздеу"}
            </Button>
          </div>
        </div>

        {/* Results */}
        {query && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {loading ? "Іздеуде..." : `${results.length} нәтиже табылды`}
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Сұрыптау
              </Button>
            </div>

            {results.length === 0 && !loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Нәтиже табылмады</p>
                <p className="text-sm text-gray-400">Басқа сөздермен іздеп көріңіз</p>
              </div>
            ) : (
              <div className="space-y-6">
                {results.map((result) => (
                  <article
                    key={result.id}
                    className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <Link href={result.href} className="block">
                      <div className="flex gap-6 p-6">
                        <div className="relative w-48 h-32 flex-shrink-0">
                          <Image
                            src={result.image}
                            alt={result.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                              {result.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.title}</h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">{result.excerpt}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {result.date}
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {result.views}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
