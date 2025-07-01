import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/lib/providers'

export const metadata: Metadata = {
  title: 'Қазақ мәдениеті - Басқару панелі',
  description: 'Қазақ мәдениеті порталының басқару панелі',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kk">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
