'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { BarChart3, ArrowLeft, Wrench, Trash2, Plus } from 'lucide-react'
import Link from 'next/link'

export default function SkillsPage() {

  const router = useRouter()

  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')
  const [loading, setLoading] = useState(true)

  // 🔐 Auth check
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

      fetchSkills()
    }

    init()
  }, [router])

  // Fetch skills
  const fetchSkills = async () => {
    try {
      const res = await fetch('https://careerlens-backend-r5hy.onrender.com/skills')
      const data = await res.json()

      setSkills(data.skills || [])
    } catch (err) {
      console.error("Error fetching skills:", err)
    } finally {
      setLoading(false)
    }
  }

  //Save skills
  const saveSkillsToBackend = async (updated: string[]) => {
    try {
      await fetch('http://127.0.0.1:5000/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: updated })
      })
    } catch (err) {
      console.error("Error saving skills:", err)
    }
  }

  const addSkill = () => {
    if (!newSkill.trim()) return

    const updated = [...skills, newSkill.trim()]
    setSkills(updated)
    setNewSkill('')
    saveSkillsToBackend(updated)
  }

  const deleteSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index)
    setSkills(updated)
    saveSkillsToBackend(updated)
  }

  const editSkill = (index: number, value: string) => {
    const updated = [...skills]
    updated[index] = value
    setSkills(updated)
    saveSkillsToBackend(updated)
  }

  if (loading) {
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

      {/* Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-2xl mx-auto">

          {/* Back */}
          <Link href="/dashboard">
            <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8">
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </Link>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">
              Manage Your Skills
            </h1>
            <p className="text-slate-400 text-lg">
              Add, edit or remove skills to improve your analysis accuracy
            </p>
          </div>

          {/* Card */}
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-8">

            {/* Add Skill */}
            <div className="flex gap-2 mb-6">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter new skill"
                className="flex-1 p-3 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:border-blue-500"
              />

              <button
                onClick={addSkill}
                className="bg-blue-500 hover:bg-blue-600 px-4 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {/* Skills List */}
            <div className="space-y-3">
              {skills.length === 0 ? (
                <p className="text-slate-400">No skills added yet</p>
              ) : (
                skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-slate-900 border border-slate-700 p-3 rounded-lg"
                  >

                    <input
                      value={skill}
                      onChange={(e) => editSkill(index, e.target.value)}
                      className="flex-1 bg-transparent outline-none text-white"
                    />

                    <button
                      onClick={() => deleteSkill(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                ))
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
