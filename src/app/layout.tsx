import './globals.css'
import type { Metadata } from 'next'
import ClientLayout from '@/components/layout/ClientLayout'

export const metadata: Metadata = {
  title: 'SEVÁN AI PERFUMES - E-commerce',
  description: 'Tienda de perfumes con inteligencia artificial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}