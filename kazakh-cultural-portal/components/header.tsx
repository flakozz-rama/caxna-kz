"use client"

import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "./language-toggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Басты бет" },
    { href: "/biz-turaly", label: "Біз туралы" },
    { href: "/maqala", label: "Мақалалар" },
    { href: "/zhanalyqtar", label: "Жаңалықтар" },
    { href: "/video", label: "Видеолар" },
    { href: "/suqbat", label: "Сұқбаттар" },
    { href: "/arnaiy-zhobalar", label: "Арнайы жобалар" },
  ]

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Қ</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Мәдени портал</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Link href="/search">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Search className="w-4 h-4 mr-2" />
                Іздеу
              </Button>
            </Link>

            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 py-2 flex items-center space-x-4">
                <Link href="/search">
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Іздеу
                  </Button>
                </Link>
                <LanguageToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
