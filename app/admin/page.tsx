'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Users,
  TrendingUp,
  Activity,
  FileText,
  AlertCircle,
  LogOut,
  Settings,
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalUsers: number
  activeToday: number
  avgCompletionRate: number
  totalAnalyses: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeToday: 0,
    avgCompletionRate: 0,
    totalAnalyses: 0,
  })

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
      }

      // Mock data for admin dashboard
      setStats({
        totalUsers: 2847,
        activeToday: 342,
        avgCompletionRate: 68,
        totalAnalyses: 12450,
      })

      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-slate-300">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CareerLens Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/settings" asChild>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="ghost" className="text-slate-400 hover:text-white" onClick={handleLogout}>
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400 text-lg">Platform overview and management</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 rounded-xl border border-slate-700 bg-slate-800/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 text-sm font-medium">Total Users</h3>
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-slate-400 text-sm mt-2">+12% this month</p>
            </div>

            <div className="p-6 rounded-xl border border-slate-700 bg-slate-800/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 text-sm font-medium">Active Today</h3>
                <Activity className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-white">{stats.activeToday.toLocaleString()}</p>
              <p className="text-slate-400 text-sm mt-2">12% of total users</p>
            </div>

            <div className="p-6 rounded-xl border border-slate-700 bg-slate-800/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 text-sm font-medium">Avg Completion Rate</h3>
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-white">{stats.avgCompletionRate}%</p>
              <p className="text-slate-400 text-sm mt-2">+5% from last week</p>
            </div>

            <div className="p-6 rounded-xl border border-slate-700 bg-slate-800/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 text-sm font-medium">Total Analyses</h3>
                <FileText className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-3xl font-bold text-white">{stats.totalAnalyses.toLocaleString()}</p>
              <p className="text-slate-400 text-sm mt-2">Resumes processed</p>
            </div>
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* User Management */}
            <div className="p-8 rounded-xl border border-slate-700 bg-slate-800/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-400" />
                User Management
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-700/50">
                  <div>
                    <p className="text-white font-medium">Total Registrations</p>
                    <p className="text-slate-400 text-sm">{stats.totalUsers} users</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">{stats.totalUsers}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-700/50">
                  <div>
                    <p className="text-white font-medium">Active Users (7d)</p>
                    <p className="text-slate-400 text-sm">Last 7 days</p>
                  </div>
                  <span className="text-2xl font-bold text-green-400">847</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-700/50">
                  <div>
                    <p className="text-white font-medium">Premium Subscribers</p>
                    <p className="text-slate-400 text-sm">Active subscriptions</p>
                  </div>
                  <span className="text-2xl font-bold text-purple-400">342</span>
                </div>
              </div>
              <Link href="/admin/users" asChild>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  View All Users
                </Button>
              </Link>
            </div>

            {/* Analytics Overview */}
            <div className="p-8 rounded-xl border border-slate-700 bg-slate-800/50">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                Analytics
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-700/50">
                  <div>
                    <p className="text-white font-medium">Resume Analyses</p>
                    <p className="text-slate-400 text-sm">This month</p>
                  </div>
                  <span className="text-2xl font-bold text-amber-400">3,421</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-700/50">
                  <div>
                    <p className="text-white font-medium">Learning Paths Started</p>
                    <p className="text-slate-400 text-sm">This month</p>
                  </div>
                  <span className="text-2xl font-bold text-green-400">847</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-700/50">
                  <div>
                    <p className="text-white font-medium">Avg Session Duration</p>
                    <p className="text-slate-400 text-sm">All users</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">18m</span>
                </div>
              </div>
              <Link href="/admin/analytics" asChild>
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  View Analytics
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-8 rounded-xl border border-slate-700 bg-slate-800/50">
            <h2 className="text-2xl font-bold text-white mb-6">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-700 bg-slate-700/50">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white font-medium">API Services</p>
                  <p className="text-slate-400 text-sm">All systems operational</p>
                </div>
                <span className="text-green-400 text-sm font-medium">100%</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-700 bg-slate-700/50">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white font-medium">Database Performance</p>
                  <p className="text-slate-400 text-sm">Response time: 45ms</p>
                </div>
                <span className="text-green-400 text-sm font-medium">Healthy</span>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-700 bg-slate-700/50">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white font-medium">Authentication</p>
                  <p className="text-slate-400 text-sm">All auth providers active</p>
                </div>
                <span className="text-green-400 text-sm font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
