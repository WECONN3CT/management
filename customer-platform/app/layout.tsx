import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

// const inter = Inter({ subsets: ['latin'] })
// Note: Inter font from Google Fonts is commented out due to network restrictions
// In production, uncomment the above lines to use Google Fonts

export const metadata: Metadata = {
  title: 'Customer Management Platform',
  description: 'Manage your customers, projects, and workflows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("font-sans antialiased")}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
