
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Everguard Group | Specialist Private Investigation & Intelligence Services Australia',
  description: 'Licensed private investigation and intelligence agency providing surveillance, factual investigations, corporate intelligence, and background checks across Australia. Discreet, professional, court-ready.',
  keywords: 'private investigator, surveillance, insurance investigations, factual investigations, corporate intelligence, background checks, due diligence, Australia investigator, licensed investigator',
  authors: [{ name: 'Everguard Group' }],
  openGraph: {
    title: 'Everguard Group | Specialist Private Investigation & Intelligence Services Australia',
    description: 'Licensed private investigation and intelligence agency providing discreet surveillance, factual investigations, and corporate intelligence across Australia.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
