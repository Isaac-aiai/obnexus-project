import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "obnexus — AI-Powered OB/GYN Scheduling Assistant",
    description: "An AI assistant for OB/GYN nurses. Query ward status, predict length-of-stay, coordinate rooms, receive alerts, and place orders through natural conversation.",
    keywords: ["Healthcare AI", "OB/GYN", "Scheduling", "Hospital", "AI Agent"],
  }),
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
