import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const role = searchParams.get('role') || 'frontend'

    let roadmap: any = {}

    // ✅ Role-based roadmap (clean & reliable)
    if (role === 'frontend') {
      roadmap = {
        nodes: {
          html: { title: "HTML", description: "Structure of web pages" },
          css: { title: "CSS", description: "Styling and layouts" },
          js: { title: "JavaScript", description: "Core programming" },
          react: { title: "React", description: "Frontend library" },
          next: { title: "Next.js", description: "Fullstack framework" },
          git: { title: "Git & GitHub", description: "Version control" },
          api: { title: "REST APIs", description: "Backend communication" },
          performance: { title: "Performance Optimization", description: "Improve speed" },
        }
      }
    } 
    
    else if (role === 'backend') {
      roadmap = {
        nodes: {
          node: { title: "Node.js", description: "Runtime environment" },
          express: { title: "Express.js", description: "Backend framework" },
          db: { title: "Databases", description: "MongoDB / SQL" },
          api: { title: "REST API", description: "Build APIs" },
          auth: { title: "Authentication", description: "JWT / OAuth" },
        }
      }
    }

    else {
      roadmap = {
        nodes: {
          basics: { title: "Programming Basics", description: "Start here" },
          dsa: { title: "DSA", description: "Problem solving" },
          projects: { title: "Projects", description: "Build real apps" },
        }
      }
    }

    return NextResponse.json(roadmap)

  } catch (error) {
    console.error("API ERROR:", error)

    return NextResponse.json(
      { error: 'Failed to generate roadmap' },
      { status: 500 }
    )
  }
}