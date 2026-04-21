'use client'

import React from "react"

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BarChart3, Upload, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function ResumeUploadPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return


    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setError('Please upload a PDF file')
      return
    }

    setError(null)
    setIsUploading(true)
    setFileName(file.name)

    try {
      const supabase = createClient()

      // Get Supabase session token
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token

      if (!token) {
        throw new Error("User not authenticated")
      }

      // Prepare file
      const formData = new FormData()
      formData.append("file", file)

      // Send to Flask backend
      const res = await fetch("https://careerlens-backend-r5hy.onrender.com/resume/upload", {
        method: "POST",
        
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      const data = await res.json()
      console.log("Backend response:", data)

      // Store skills for next page
      if (data.skills) {
        localStorage.setItem("skills", JSON.stringify(data.skills))
      }

      // Show success UI
      setUploadSuccess(true)

      // Redirect after processing
      setTimeout(() => {
        router.push('/dashboard/resume-analysis')
      }, 2000)

    } catch (err) {
      console.error(err)
      setError('Failed to upload resume. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-slate-300">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CareerLens</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-2xl mx-auto">

          {/* Back Button */}
          <Link href="/dashboard">
            <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Upload Your Resume</h1>
            <p className="text-slate-400 text-lg">
              Get AI-powered insights into your resume and understand how to improve it
            </p>
          </div>

          {/* Upload Area */}
          <div className="rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/50 p-12 text-center mb-8 hover:border-blue-500/50 transition">
            {uploadSuccess ? (
              <div className="space-y-4">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Resume Uploaded!</h3>
                <p className="text-slate-400">Analyzing your resume...</p>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-full w-full animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 text-blue-400 mx-auto" />
                <div>
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <span className="text-white font-semibold hover:underline">Click to upload</span>
                    <span className="text-slate-400"> or drag and drop</span>
                  </label>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </div>
                <p className="text-slate-400 text-sm">PDF files only (Max 10MB)</p>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {fileName && !uploadSuccess && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-8">
              <p className="text-slate-300">
                <span className="font-semibold">Selected file:</span> {fileName}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
