import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { QueryProvider } from "@/lib/providers"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata = {
  title: "Caxna.kz - Қазақ театр порталы",
  description: "Қазақстанның мәдени өмірі туралы ақпарат порталы",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kk">
      <body className={inter.className}>
        <QueryProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
