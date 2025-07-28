import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function BizTuralyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Басты бет
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">Біз туралы</span>
      </nav>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Біз туралы</h1>

        <div className="prose prose-lg max-w-none">
          <h2>«Caxna.kz» сайты</h2>
          <p>
            «Caxna.kz» сайты – бұл қазақ сахнасындағы қойылымдарды бір алаңға тоғыстырған бірегей ақпарат көзі. 
            Шығармашалық орта қалыптастырудың жаңа деңгейі. Мұнда біз театр әлеміндегі тың жаңалықтар мен өзекті тақырыптарды көтереміз! 
            Отандық авторлардың туындыларымен таныстырып, олардың айтқысы келген ой-толғамдарын ортаға саламыз! 
            Көрермен мен театр арасындағы шымылдықты түріп, ашық байланыс орнатамыз!
          </p>
          
          <p>
            Олай болса, театр сүйер қауым, төрлетіңіз!
          </p>

          <h2>Бас редактор</h2>
          <p>
            <strong>Тулакова Альбина Разванқызы</strong>, театртанушы
          </p>

          <h2>Редактор</h2>
          <p>
            <strong>Тулакова Ұлбосын Разванқызы</strong>, өнертану ғылымының магистрі, театртанушы, бас редактордың орынбасары
          </p>

          <h2>Біздің мекен-жайымыз</h2>
          <p>
            <a href="mailto:Saxna.kz@mail.ru" className="text-blue-600 hover:text-blue-800">
              Saxna.kz@mail.ru
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
