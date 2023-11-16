import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Motto AI - Create motivational quotes !',
  description: 'by Allengl',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
