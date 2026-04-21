'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'


import {
  BarChart3,
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'

interface LearningModule {
  id: string
  title: string
  description: string
  duration: string
  resources: { name: string; type: string; url: string }[]
  completed: boolean
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  phase: number
}

export default function LearningPathPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [learningPath, setLearningPath] = useState<LearningModule[]>([])

  useEffect(() => {
    const init = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

try {
  const storedMissing = localStorage.getItem("missing_skills")

console.log("Stored Missing:", storedMissing)

if (!storedMissing) {
  console.warn("No missing skills found")
  setIsLoading(false)
  return
}

const missingSkills = JSON.parse(storedMissing)

const res = await fetch("https://careerlens-backend-r5hy.onrender.com/roadmap", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    missing_skills: missingSkills
  })
})

const roadmapData = await res.json()

console.log("Roadmap Data:", roadmapData)

let extracted: any[] = []

if (roadmapData?.nodes) {
  extracted = roadmapData.nodes.map((node: any) => ({
    title: node.title,
    description: node.description,
    phase: node.phase
  }))
}

console.log("Extracted Modules:", extracted)

// Convert to proper LearningModule format
const modules: LearningModule[] = extracted.map((item, index) => ({
  id: `node-${index}`,
  title: item.title,
  description: item.description,
  duration: '1-2 weeks',
  difficulty:
    index < 2
      ? 'Beginner'
      : index < 4
      ? 'Intermediate'
      : 'Advanced',
  phase: Number(item.phase), 
  completed: false,
  resources: [
    {
      name: `Learn ${item.title}`,
      type: 'YouTube',
      url: `https://www.youtube.com/results?search_query=${item.title}`
    },
  ],
}))

console.log("FINAL MODULES:", modules)

setLearningPath(modules)

} catch (error) {
  console.error('Error fetching roadmap:', error)
}

      setIsLoading(false)
    }

    init()
  }, [router])

  const phase1Modules = learningPath.filter((m) => m.phase === 1)
  const phase2Modules = learningPath.filter((m) => m.phase === 2)

  const difficultyColor = {
    Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    Intermediate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-slate-300">Loading roadmap...</div>
      </div>
    )
  }

  const renderPhase = (modules: LearningModule[], phaseNumber: number) => (
    <div key={phaseNumber} className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">
        Phase {phaseNumber}:{' '}
        {phaseNumber === 1 ? 'Technical Skills' : 'Advanced Growth'}
      </h2>

      {modules.length === 0 ? (
        <p className="text-slate-400">No modules found</p>
      ) : (
        <div className="space-y-4">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className="border border-slate-700 rounded-xl bg-slate-800/50 overflow-hidden hover:bg-slate-800 transition"
            >
              <button
                onClick={() =>
                  setExpandedModule(
                    expandedModule === module.id ? null : module.id
                  )
                }
                className="w-full p-6 flex items-center gap-4 text-left"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-white">
                      {module.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${
                        difficultyColor[module.difficulty]
                      }`}
                    >
                      {module.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">
                    {module.description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{module.duration}</span>
                  </div>

                  <svg
                    className={`w-5 h-5 transition-transform ${
                      expandedModule === module.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </button>

              {expandedModule === module.id && (
                <div className="border-t border-slate-700 p-6 bg-slate-700/20">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    Resources
                  </h4>

                  {module.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      className="flex justify-between p-3 rounded-lg border border-slate-600 hover:bg-slate-600"
                    >
                      <div>
                        <p className="text-white">{res.name}</p>
                        <p className="text-slate-400 text-xs">{res.type}</p>
                      </div>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}

                  <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 p-2 rounded text-white">
                    Start Learning
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-slate-950/80 border-b border-slate-800 h-16 flex items-center px-6">
        <BarChart3 className="text-blue-400 mr-2" />
        <span className="text-white font-bold text-lg">CareerLens</span>
      </nav>

      <div className="pt-20 px-6 max-w-4xl mx-auto">
        <Link href="/dashboard">
          <button className="flex items-center gap-2 text-blue-400 mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </Link>

        <h1 className="text-3xl font-bold text-white mb-8">
          Your Learning Roadmap
        </h1>

        {renderPhase(phase1Modules, 1)}
        {renderPhase(phase2Modules, 2)}

        <div className="mt-12 p-6 border border-slate-700 rounded-xl">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-green-400" />
            Keep Going 
          </h2>
          <p className="text-slate-400">
            Track your progress and stay consistent to complete your roadmap.
          </p>
        </div>
      </div>
    </div>
  )
}
