import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-xl">Caxna.kz</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Құрметті, театр сүйер қауым!<br/>
              Біздің сайтқа қош келдіңіздер! Бұл жерде Сіз театр өнеріне деген ШЫНАЙЫ құрмет, ШЫНАЙЫ баға, ШЫНАЙЫ көзқарасты табасыз! Талғамыңыз бен талабыңыздан шығуға әзірміз!
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Жылдам сілтемелер</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Басты бет
                </Link>
              </li>
              <li>
                <Link href="/biz-turaly" className="text-gray-300 hover:text-white transition-colors">
                  Біз туралы
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-300 hover:text-white transition-colors">
                  Іздеу
                </Link>
              </li>
              <li>
                <Link href="/video" className="text-gray-300 hover:text-white transition-colors">
                  Видео
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Санаттар</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/maqala" className="text-gray-300 hover:text-white transition-colors">
                  Мақала
                </Link>
              </li>
              <li>
                <Link href="/suqbat" className="text-gray-300 hover:text-white transition-colors">
                  Сұқбат
                </Link>
              </li>
              <li>
                <Link href="/piesa" className="text-gray-300 hover:text-white transition-colors">
                  Пьеса
                </Link>
              </li>
              <li>
                <Link href="/zhanalyqtar" className="text-gray-300 hover:text-white transition-colors">
                  Жаңалықтар
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Caxna.kz. Барлық құқықтар қорғалған.</p>
        </div>
      </div>
    </footer>
  )
}
