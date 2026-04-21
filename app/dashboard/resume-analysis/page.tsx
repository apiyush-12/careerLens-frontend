'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BarChart3, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface SkillGapResult {
  score: number
  matched_skills: string[]
  missing_skills: string[]
  required_skills: string[]
}

export default function ResumeAnalysisPage() {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [skills, setSkills] = useState<string[]>([])
  const [analysis, setAnalysis] = useState<SkillGapResult | null>(null)

  useEffect(() => {

    const checkAuth = async () => {

      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      const storedSkills = localStorage.getItem("skills")
      const storedRole = localStorage.getItem("target_role")

      const role = storedRole || "data scientist"

      if (storedSkills) {

        const parsedSkills = JSON.parse(storedSkills)
        setSkills(parsedSkills)

        const res = await fetch("https://careerlens-backend-r5hy.onrender.com/skill-gap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            skills: parsedSkills,
            role: role
          })
        })

        const data = await res.json()

        setAnalysis(data)

      }

      setIsLoading(false)

    }

    checkAuth()

  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-300">Loading...</div>
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          <div className="flex items-center gap-2">

            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white"/>
            </div>

            <span className="text-xl font-bold text-white">
              CareerLens
            </span>

          </div>

        </div>

      </nav>

      <div className="pt-20 px-6 pb-20 max-w-4xl mx-auto">

        <Link href="/dashboard">

          <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">

            <ArrowLeft className="w-5 h-5"/>

            Back to Dashboard

          </button>

        </Link>

        <h1 className="text-4xl font-bold text-white mb-2">
          Resume Analysis
        </h1>

        <p className="text-slate-400 mb-10">
          Here's what we found in your resume
        </p>

        {skills.length > 0 && (

          <div className="mb-10 p-6 border border-slate-700 rounded-xl bg-slate-800/50">

            <h2 className="text-xl font-bold text-white mb-4">
              Extracted Skills
            </h2>

            <div className="flex flex-wrap gap-2">

              {skills.map((skill, index) => (

                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                >

                  {skill}

                </span>

              ))}

            </div>

          </div>

        )}

        {analysis && (

          <div className="mb-10 p-8 border border-slate-700 rounded-xl bg-slate-800/50">

            <p className="text-slate-400 text-sm mb-2">
              Overall Resume Score
            </p>

            <h2 className="text-5xl font-bold text-white">
              {analysis.score}
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              out of 100
            </p>

          </div>

        )}

        {analysis && (

          <div className="mb-10">

            <h2 className="text-2xl font-bold text-white mb-4">
              Matched Skills
            </h2>

            <div className="flex flex-wrap gap-2">

              {analysis.matched_skills.map((skill, i) => (

                <span
                  key={i}
                  className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm"
                >

                  {skill}

                </span>

              ))}

            </div>

          </div>

        )}

        {analysis && (

          <div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Missing Skills
            </h2>

            <div className="flex flex-wrap gap-2">

              {analysis.missing_skills.map((skill, i) => (

                <span
                  key={i}
                  className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm"
                >

                  {skill}

                </span>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>

  )

}
