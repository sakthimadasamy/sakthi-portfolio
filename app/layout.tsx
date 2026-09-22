import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sakthi Madasamy | ECE Engineer, IoT & AI Developer',
  description:
    'Portfolio of Sakthi Madasamy, an Electronics and Communication Engineering student specializing in Embedded Systems, IoT, AI/ML, PCB Design and Software Development.',
  generator: 'v0.app',
  keywords: [
    'Sakthi Madasamy',
    'ECE',
    'Embedded Systems',
    'IoT',
    'AI',
    'Machine Learning',
    'PCB Design',
    'Portfolio',
  ],
  authors: [{ name: 'Sakthi Madasamy' }],
  openGraph: {
    title: 'Sakthi Madasamy | ECE Engineer, IoT & AI Developer',
    description:
      'Embedded Systems, IoT, AI/ML, PCB Design and Software Development portfolio.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a1828',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
