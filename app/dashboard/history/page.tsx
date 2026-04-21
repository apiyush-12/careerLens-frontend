'use client'

import { useEffect, useState } from "react"

export default function ResumeHistory() {

  const [history, setHistory] = useState([])

  useEffect(() => {
    fetch("https://careerlens-backend-r5hy.onrender.com/resume/history")
      .then(res => res.json())
      .then(data => setHistory(data))
  }, [])

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Resume History
      </h1>

      {history.length === 0 && (
        <p>No resumes uploaded yet.</p>
      )}

      {history.map((item:any) => (

        <div
          key={item.id}
          className="border border-slate-700 rounded-lg p-4 mb-4"
        >

          <p className="font-semibold">
            {item.file_name}
          </p>

          <p className="text-sm text-slate-400">
            Uploaded: {item.created_at}
          </p>

          <p className="mt-2">
            Skills:
          </p>

          <div className="flex gap-2 flex-wrap mt-1">

            {item.extracted_skills?.map((skill:string) => (
              <span
                key={skill}
                className="bg-blue-500 px-2 py-1 rounded text-sm"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

      ))}

    </div>
  )
}
