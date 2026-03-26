'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { BarChart3, FileText, Target, BookOpen, LogOut, Settings, Upload } from 'lucide-react'
import Link from 'next/link'

interface UserProfile {
  id: string
  full_name?: string
  email?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
      } else {
        setUser({
          id: user.id,
          full_name: user.user_metadata?.full_name || 'User',
          email: user.email,
        })
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
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
          <div className="flex items-center gap-4">
            <Link href="/dashboard/settings" asChild>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" className="text-slate-400 hover:text-white" onClick={handleLogout}>
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
              Welcome back, {user?.full_name || 'User'}!
            </h1>
            <p className="text-slate-400 text-lg">Let's continue your career growth journey</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link href="/dashboard/upload" asChild>
              <button className="group p-8 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-blue-500/50 transition duration-300 cursor-pointer text-left">
                <Upload className="w-12 h-12 text-blue-400 mb-4 group-hover:text-blue-300 transition" />
                <h3 className="text-xl font-semibold text-white mb-2">Upload Resume</h3>
                <p className="text-slate-400">Get AI-powered insights into your resume</p>
              </button>
            </Link>

            <Link href="/dashboard/career-goal" asChild>
              <button className="group p-8 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-blue-500/50 transition duration-300 cursor-pointer text-left">
                <Target className="w-12 h-12 text-blue-400 mb-4 group-hover:text-blue-300 transition" />
                <h3 className="text-xl font-semibold text-white mb-2">Set Career Goals</h3>
                <p className="text-slate-400">Define your target roles and aspirations</p>
              </button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">Your Career Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition">
                <FileText className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Resume Analysis</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Understand what's working in your resume and what needs improvement.
                </p>
                <Link href="/dashboard/resume-analysis" asChild>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    View Analysis
                  </Button>
                </Link>
              </div>

              <div className="p-8 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition">
                <BarChart3 className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Skill Gap Analysis</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Identify the skills you need to advance in your target career.
                </p>
                <Link href="/dashboard/skill-gap" asChild>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    View Gaps
                  </Button>
                </Link>
              </div>

              <div className="p-8 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition">
                <BookOpen className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Learning Roadmap</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Get a personalized learning path designed for your career goals.
                </p>
                <Link href="/dashboard/learning-path" asChild>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    View Roadmap
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-8 rounded-xl border border-slate-700 bg-slate-800/50">
            <h2 className="text-2xl font-bold text-white mb-6">Getting Started</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <p className="text-white font-semibold">Upload your resume</p>
                  <p className="text-slate-400 text-sm">Start by uploading your current resume for analysis</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <p className="text-white font-semibold">Define your career goals</p>
                  <p className="text-slate-400 text-sm">Tell us about your target roles and career aspirations</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <p className="text-white font-semibold">Get personalized insights</p>
                  <p className="text-slate-400 text-sm">Receive recommendations tailored to your career path</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
