'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { BarChart3, ArrowLeft, BookOpen, Clock, CheckCircle2, ExternalLink } from 'lucide-react'
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

  const learningPath: LearningModule[] = [
    {
      id: '1',
      title: 'System Design Fundamentals',
      description: 'Learn core concepts of system architecture and design patterns',
      duration: '4 weeks',
      difficulty: 'Intermediate',
      phase: 1,
      completed: false,
      resources: [
        {
          name: 'Designing Data-Intensive Applications',
          type: 'Book',
          url: '#',
        },
        { name: 'System Design Primer', type: 'Course', url: '#' },
        {
          name: 'Architecture Patterns Course',
          type: 'Video Course',
          url: '#',
        },
      ],
    },
    {
      id: '2',
      title: 'Scalability and Distributed Systems',
      description: 'Deep dive into building scalable systems',
      duration: '3 weeks',
      difficulty: 'Advanced',
      phase: 1,
      completed: false,
      resources: [
        {
          name: 'Distributed Systems Course',
          type: 'Video Course',
          url: '#',
        },
        {
          name: 'Scalability Workshop',
          type: 'Workshop',
          url: '#',
        },
      ],
    },
    {
      id: '3',
      title: 'Advanced TypeScript',
      description: 'Master advanced TypeScript patterns and types',
      duration: '2 weeks',
      difficulty: 'Advanced',
      phase: 1,
      completed: false,
      resources: [
        {
          name: 'Advanced TypeScript Course',
          type: 'Video Course',
          url: '#',
        },
        { name: 'TypeScript Handbook', type: 'Documentation', url: '#' },
      ],
    },
    {
      id: '4',
      title: 'Leadership Fundamentals',
      description: 'Build foundational leadership and communication skills',
      duration: '4 weeks',
      difficulty: 'Beginner',
      phase: 2,
      completed: false,
      resources: [
        {
          name: 'Leaders Eat Last',
          type: 'Book',
          url: '#',
        },
        {
          name: 'Leadership Course',
          type: 'Video Course',
          url: '#',
        },
        { name: 'Communication Workshop', type: 'Workshop', url: '#' },
      ],
    },
    {
      id: '5',
      title: 'Technical Communication',
      description: 'Learn to communicate technical concepts effectively',
      duration: '2 weeks',
      difficulty: 'Intermediate',
      phase: 2,
      completed: false,
      resources: [
        { name: 'Tech Writing Course', type: 'Course', url: '#' },
        {
          name: 'Presentation Skills Workshop',
          type: 'Workshop',
          url: '#',
        },
      ],
    },
    {
      id: '6',
      title: 'Project Management Mastery',
      description: 'Learn agile methodologies and team coordination',
      duration: '3 weeks',
      difficulty: 'Intermediate',
      phase: 2,
      completed: false,
      resources: [
        {
          name: 'Agile Methodology Course',
          type: 'Video Course',
          url: '#',
        },
        { name: 'Scrum Master Guide', type: 'Book', url: '#' },
        {
          name: 'Team Leadership Workshop',
          type: 'Workshop',
          url: '#',
        },
      ],
    },
  ]

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
        <div className="text-slate-300">Loading...</div>
      </div>
    )
  }

  const renderPhase = (modules: LearningModule[], phaseNumber: number) => (
    <div key={phaseNumber} className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">
        Phase {phaseNumber}: {phaseNumber === 1 ? 'Technical Skills' : 'Leadership & Management'}
      </h2>
      <p className="text-slate-400 mb-6">
        {phaseNumber === 1
          ? 'Build core technical competencies for senior engineering roles'
          : 'Develop leadership and people management skills'}
      </p>

      <div className="space-y-4">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className="border border-slate-700 rounded-xl bg-slate-800/50 overflow-hidden hover:bg-slate-800 transition"
          >
            <button
              onClick={() =>
                setExpandedModule(expandedModule === module.id ? null : module.id)
              }
              className="w-full p-6 flex items-center gap-4 cursor-pointer text-left"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${
                      difficultyColor[module.difficulty]
                    }`}
                  >
                    {module.difficulty}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">{module.description}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{module.duration}</span>
                </div>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform ${
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
                  Recommended Resources
                </h4>
                <div className="space-y-3">
                  {module.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-600 bg-slate-700/50 hover:bg-slate-600 transition cursor-pointer"
                    >
                      <div>
                        <p className="text-white font-medium">{resource.name}</p>
                        <p className="text-slate-400 text-xs">{resource.type}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </a>
                  ))}
                </div>
                <button className="w-full mt-4 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition">
                  Start Learning
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

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
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/dashboard" asChild>
            <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Your Learning Roadmap</h1>
            <p className="text-slate-400 text-lg">
              A personalized 6-month path to become a Senior Software Engineer
            </p>
          </div>

          {/* Progress Overview */}
          <div className="mb-12 p-8 rounded-xl border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-800/20">
            <h2 className="text-xl font-bold text-white mb-6">Overall Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Completion</span>
                  <span className="text-blue-400 font-semibold">0%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div className="bg-blue-500 h-full w-0 transition-all duration-500" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <p className="text-slate-400 text-sm">Modules</p>
                  <p className="text-2xl font-bold text-white">0 / 6</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Total Duration</p>
                  <p className="text-2xl font-bold text-white">18 weeks</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Estimated Completion</p>
                  <p className="text-2xl font-bold text-white">6 months</p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Modules */}
          {renderPhase(phase1Modules, 1)}
          {renderPhase(phase2Modules, 2)}

          {/* Additional Resources */}
          <div className="p-8 rounded-xl border border-slate-700 bg-slate-800/50">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
              Additional Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-slate-600 bg-slate-700/50">
                <h4 className="text-white font-semibold mb-2">1-on-1 Mentorship</h4>
                <p className="text-slate-400 text-sm mb-4">
                  Connect with experienced senior engineers for guidance
                </p>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm">
                  Find Mentor
                </Button>
              </div>
              <div className="p-4 rounded-lg border border-slate-600 bg-slate-700/50">
                <h4 className="text-white font-semibold mb-2">Community Forum</h4>
                <p className="text-slate-400 text-sm mb-4">
                  Join discussions with others on the same learning path
                </p>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm">
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
