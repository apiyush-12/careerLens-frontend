import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CareerLens - Decode Your Career Path",
  description:
    "Understand your career trajectory, identify skill gaps, and access personalized learning paths designed for your professional growth.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased dark`}>
        {children}
      </body>
    </html>
  )
}
