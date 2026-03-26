'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

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

  const saveRole = () => {

    if (!role) return

    // ⭐ Save role
    localStorage.setItem("target_role", role)

    alert("Career goal saved!")

    router.push("/dashboard")

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        Set Career Goal
      </h1>

      <p className="text-slate-400 mb-6">
        Choose your target career so we can analyze your resume better.
      </p>

      <select
        className="bg-slate-800 p-3 rounded-lg"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >

        <option value="">Select Career Role</option>

        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}

      </select>

      <div className="mt-6">

        <button
          onClick={saveRole}
          className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Save Career Goal
        </button>

      </div>

    </div>

  )
}