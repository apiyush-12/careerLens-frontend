'use client'

import { useEffect, useState } from "react"

export default function SkillGapPage() {
  const [skills, setSkills] = useState<string[]>([])
  const [role, setRole] = useState("data_scientist")
  const [missing, setMissing] = useState<string[]>([])
  const [strong, setStrong] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // Load extracted skills
  useEffect(() => {
    const stored = localStorage.getItem("skills")
    if (stored) {
      setSkills(JSON.parse(stored))
    }
  }, [])

  const analyzeGap = async () => {
    setLoading(true)

    const res = await fetch("http://127.0.0.1:5000/skill-gap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skills,
        role,
      }),
    })

    const data = await res.json()

    setMissing(data.missing_skills || [])
    setStrong(data.strong_skills || [])

    setLoading(false)
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Skill Gap Analysis</h1>

      {/* Role Selection */}
      <div className="mb-6">
        <label className="block mb-2">Select Target Career</label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2"
        >
          <option value="data_scientist">Data Scientist</option>
          <option value="frontend_developer">Frontend Developer</option>
          <option value="backend_developer">Backend Developer</option>
        </select>
      </div>

      <button
        onClick={analyzeGap}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Analyze Skill Gap"}
      </button>

      {/* Strong Skills */}
      {strong.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Your Strong Skills</h2>
          <ul className="mt-2">
            {strong.map((skill, i) => (
              <li key={i} className="text-green-600">
                ✔ {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Missing Skills */}
      {missing.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Missing Skills</h2>
          <ul className="mt-2">
            {missing.map((skill, i) => (
              <li key={i} className="text-red-600">
                ✖ {skill}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
