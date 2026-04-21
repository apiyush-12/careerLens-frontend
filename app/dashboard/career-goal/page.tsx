'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { BarChart3, ArrowLeft, Target } from "lucide-react"
import Link from "next/link"

export default function CareerGoalsPage() {

  const router = useRouter()

  const roles = [
    "frontend developer",
    "backend developer",
    "full stack developer",
    "devops engineer",
    "data scientist",
    "ml engineer",
    "data analyst"
  ]

  const [role, setRole] = useState("")
  const [isLoading, setIsLoading] = useState(true)

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

  const saveRole = () => {
    if (!role) return

    localStorage.setItem("target_role", role)

    router.push("/dashboard")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-300">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
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
            <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">
              Set Your Career Goal
            </h1>
            <p className="text-slate-400 text-lg">
              Choose your target career to get personalized insights and roadmap
            </p>
          </div>

          {/* Card */}
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-10 text-center">

            <Target className="w-14 h-14 text-blue-400 mx-auto mb-6" />

            <p className="text-slate-300 mb-6">
              Select your desired career path
            </p>

            {/* Dropdown */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 text-white p-3 rounded-lg mb-6 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Career Role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {/* Button */}
            <button
              onClick={saveRole}
              className="w-full bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-lg text-white font-semibold"
            >
              Save Career Goal
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}