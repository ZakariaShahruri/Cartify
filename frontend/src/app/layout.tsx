import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'

const geistSans = GeistSans
const geistMono = GeistMono

export const metadata: Metadata = {
  title: 'Cartify — Shop Everything',
  description: 'A modern, full-stack e-commerce platform.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-ink-50 font-sans antialiased">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="mt-16 border-t border-ink-200 bg-ink-900 text-white/60">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-center text-sm">
            © {new Date().getFullYear()} Cartify. Built with Next.js & Spring Boot.
          </div>
        </footer>
      </body>
    </html>
  )
}
