'use client'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface SkillGapResult {
  score: number
  matched_skills: string[]
  missing_skills: string[]
}

export default function SkillGapPage() {

  const [skills, setSkills] = useState<string[]>([])
  const [analysis, setAnalysis] = useState<SkillGapResult | null>(null)
  const [role, setRole] = useState("data scientist")
  const [loading, setLoading] = useState(true)

  const fetchAnalysis = async (selectedRole: string) => {
    try {
      const storedSkills = localStorage.getItem("skills")
      if (!storedSkills) return

      const parsedSkills = JSON.parse(storedSkills)
      setSkills(parsedSkills)

      const res = await fetch("http://127.0.0.1:5000/skill-gap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          skills: parsedSkills,
          role: selectedRole
        })
      })

      const data = await res.json()
      setAnalysis(data)
      localStorage.setItem("missing_skills", JSON.stringify(data.missing_skills))

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const storedRole = localStorage.getItem("target_role")
    if (storedRole) {
      setRole(storedRole)
      fetchAnalysis(storedRole)
    } else {
      fetchAnalysis(role)
    }
  }, [])


  const chartData = analysis ? [
    { name: "Matched", value: analysis.matched_skills.length },
    { name: "Missing", value: analysis.missing_skills.length },
  ] : []

  const COLORS = ['#22c55e', '#ef4444']

  if (loading) return <p className="text-white p-6">Loading...</p>

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-3xl font-bold mb-6">Skill Gap Analysis</h1>

      {/* ROLE SELECTOR */}
      <div className="mb-8">
        <label className="block mb-2">Target Career</label>

        <select
          value={role}
          onChange={(e) => {
            const selected = e.target.value
            setRole(selected)
            localStorage.setItem("target_role", selected)
            fetchAnalysis(selected) 
          }}
          className="bg-slate-800 p-2 rounded border border-slate-600"
        >
          <option value="data scientist">data scientist</option>
          <option value="frontend developer">frontend developer</option>
          <option value="backend developer">backend developer</option>
          <option value="full stack developer">full stack developer</option>
          <option value="data analyst">data analyst</option>
          <option value="ml engineer">ml engineer</option>
          <option value="devops engineer">devops engineer</option>
        </select>
      </div>

      {/* SCORE */}
      {analysis && (
        <div className="mb-8 bg-slate-800 p-6 rounded-xl text-center">
          <h2 className="text-lg mb-2">Score</h2>
          <p className="text-4xl font-bold text-blue-400">{analysis.score}%</p>
        </div>
      )}

      {/* GRAPH */}
      {analysis && (
        <div className="mb-8 bg-slate-800 p-6 rounded-xl">
          <h2 className="mb-4">Skill Distribution</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={80}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* USER SKILLS */}
      {analysis && (
        <div className="mb-6">
          <h2 className="text-xl mb-2">Matched Skills</h2>
          <div className="flex flex-wrap gap-2">
            {analysis.matched_skills.map((s, i) => (
              <span key={i} className="bg-green-500 px-3 py-1 rounded">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* MISSING SKILLS */}
      {analysis && (
        <div>
          <h2 className="text-xl mb-2">Missing Skills</h2>
          <div className="flex flex-wrap gap-2">
            {analysis.missing_skills.map((s, i) => (
              <span key={i} className="bg-red-500 px-3 py-1 rounded">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}