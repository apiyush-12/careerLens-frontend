'use client'

import React, { useState } from "react"
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BarChart3, ArrowLeft, Eye, EyeOff } from 'lucide-react'

type View = 'login' | 'forgot' | 'forgot-sent'

export default function Page() {
  const [view, setView] = useState<View>('login')

  // Login state
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Forgot password state
  const [forgotEmail, setForgotEmail]       = useState('')
  const [forgotError, setForgotError]       = useState<string | null>(null)
  const [forgotLoading, setForgotLoading]   = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    const supabase = createClient()
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push('/dashboard')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotLoading(true)
    setForgotError(null)
    const supabase = createClient()
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: process.env.NEXT_PUBLIC_SITE_URL + '/auth/reset-password'
      })
      if (error) throw error
      setView('forgot-sent')
    } catch (error: unknown) {
      setForgotError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div className="min-h-svh w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-3xl" />

      <div className="w-full max-w-sm relative">
        <div className="flex flex-col gap-6">

          {/* Logo */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CareerLens</span>
            </div>
          </div>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">

            {/* ── LOGIN VIEW ──────────────────────────────────────── */}
            {view === 'login' && (
              <>
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
                  <CardDescription className="text-slate-400">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className="flex flex-col gap-6">

                      <div className="grid gap-2">
                        <Label htmlFor="email" className="text-slate-200">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                        />
                      </div>

                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-slate-200">Password</Label>
                          <button
                            type="button"
                            onClick={() => { setView('forgot'); setForgotEmail(email) }}
                            className="text-xs text-blue-400 hover:text-blue-300 transition"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {error && <p className="text-sm text-red-400">{error}</p>}

                      <Button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Logging in...' : 'Login'}
                      </Button>
                    </div>

                    <div className="mt-4 text-center text-sm text-slate-400">
                      Don&apos;t have an account?{' '}
                      <Link href="/auth/sign-up" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition">
                        Sign up
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </>
            )}

            {/* ── FORGOT PASSWORD VIEW ────────────────────────────── */}
            {view === 'forgot' && (
              <>
                <CardHeader>
                  <button
                    onClick={() => setView('login')}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition text-sm mb-2 w-fit"
                  >
                    <ArrowLeft size={14} /> Back to login
                  </button>
                  <CardTitle className="text-2xl text-white">Reset password</CardTitle>
                  <CardDescription className="text-slate-400">
                    Enter your email and we'll send you a reset link
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleForgotPassword}>
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="forgot-email" className="text-slate-200">Email</Label>
                        <Input
                          id="forgot-email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                        />
                      </div>

                      {forgotError && <p className="text-sm text-red-400">{forgotError}</p>}

                      <Button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
                        disabled={forgotLoading}
                      >
                        {forgotLoading ? 'Sending...' : 'Send reset link'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </>
            )}

            {/* ── EMAIL SENT VIEW ─────────────────────────────────── */}
            {view === 'forgot-sent' && (
              <>
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-emerald-400 text-xl">✓</span>
                  </div>
                  <CardTitle className="text-2xl text-white">Check your email</CardTitle>
                  <CardDescription className="text-slate-400">
                    We sent a password reset link to{' '}
                    <span className="text-slate-200 font-medium">{forgotEmail}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 mb-6">
                    Didn't receive it? Check your spam folder or{' '}
                    <button
                      onClick={() => setView('forgot')}
                      className="text-blue-400 hover:text-blue-300 transition underline underline-offset-4"
                    >
                      try again
                    </button>
                  </p>
                  <Button
                    onClick={() => setView('login')}
                    variant="outline"
                    className="w-full border-slate-600 text-slate-200 hover:bg-slate-700"
                  >
                    Back to login
                  </Button>
                </CardContent>
              </>
            )}

          </Card>
        </div>
      </div>
    </div>
  )
}