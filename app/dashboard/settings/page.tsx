'use client'

import React from "react"

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BarChart3, ArrowLeft, LogOut, Save, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

interface UserSettings {
  email: string
  fullName: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
      } else {
        setEmail(user.email || '')
        setFullName(user.user_metadata?.full_name || '')
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      })

      if (error) throw error
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to update profile',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }

    setIsSaving(true)
    setMessage(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error
      setMessage({ type: 'success', text: 'Password changed successfully!' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to change password',
      })
    } finally {
      setIsSaving(false)
    }
  }

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
            <span className="text-xl font-bold text-white">CareerLens</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link href="/dashboard" asChild>
            <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
            <p className="text-slate-400 text-lg">Manage your account and preferences</p>
          </div>

          {/* Profile Section */}
          <div className="mb-8 p-8 rounded-xl border border-slate-700 bg-slate-800/50">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>

            {message && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-slate-200 mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-slate-700/50 border-slate-600 text-slate-400 cursor-not-allowed"
                />
                <p className="text-slate-400 text-sm mt-2">
                  Contact support to change your email address
                </p>
              </div>

              <div>
                <Label htmlFor="fullName" className="text-slate-200 mb-2 block">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isSaving}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </div>

          {/* Password Section */}
          <div className="mb-8 p-8 rounded-xl border border-slate-700 bg-slate-800/50">
            <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>

            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <Label htmlFor="newPassword" className="text-slate-200 mb-2 block">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 pr-10"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-slate-200 mb-2 block">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  placeholder="Confirm new password"
                />
              </div>

              <Button
                type="submit"
                disabled={isSaving || !newPassword}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="p-8 rounded-xl border border-red-500/30 bg-red-500/5">
            <h2 className="text-2xl font-bold text-red-400 mb-6">Danger Zone</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Logout</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Sign out of your account on this device
                </p>
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
