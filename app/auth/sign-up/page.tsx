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
import { BarChart3, Eye, EyeOff } from 'lucide-react'
import { evaluatePassword, isPasswordAcceptable } from '@/lib/passwordstrength'

// ── Strength bar config ────────────────────────────────────────────────────
const STRENGTH_CONFIG = {
  empty:          { segments: 0, color: '',                  text: '',           textColor: '' },
  weak:           { segments: 1, color: 'bg-red-500',        text: 'Weak',       textColor: 'text-red-400' },
  fair:           { segments: 2, color: 'bg-orange-400',     text: 'Fair',       textColor: 'text-orange-400' },
  strong:         { segments: 3, color: 'bg-emerald-400',    text: 'Strong',     textColor: 'text-emerald-400' },
  'very-strong':  { segments: 4, color: 'bg-emerald-500',    text: 'Very Strong',textColor: 'text-emerald-400' },
}

const CRITERIA_LABELS = [
  { key: 'minLength',    label: '8+ characters'      },
  { key: 'hasUppercase', label: 'Uppercase letter'   },
  { key: 'hasLowercase', label: 'Lowercase letter'   },
  { key: 'hasNumber',    label: 'Number'             },
  { key: 'hasSpecial',   label: 'Special character'  },
]

export default function Page() {
  const [email, setEmail]               = useState('')
  const [password, setPassword]         = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError]               = useState<string | null>(null)
  const [isLoading, setIsLoading]       = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeat, setShowRepeat]     = useState(false)
  const [pwTouched, setPwTouched]       = useState(false)
  const router = useRouter()

  const strength = evaluatePassword(password)
  const config   = STRENGTH_CONFIG[strength.level]
  const showStrength = pwTouched && password.length > 0

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!isPasswordAcceptable(password)) {
      setError('Please choose a stronger password (Strong or better)')
      return
    }
    if (password !== repeatPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
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
            <CardHeader>
              <CardTitle className="text-2xl text-white">Create account</CardTitle>
              <CardDescription className="text-slate-400">Start your career growth journey</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-6">

                  {/* Email */}
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

                  {/* Password + strength */}
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-slate-200">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onFocus={() => setPwTouched(true)}
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

                    {/* Strength bar */}
                    {showStrength && (
                      <div className="flex flex-col gap-2 mt-1">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-1 gap-1">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                  i < config.segments ? config.color : 'bg-slate-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`text-xs font-semibold w-16 text-right ${config.textColor}`}>
                            {config.text}
                          </span>
                        </div>

                        {/* Criteria checklist */}
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1">
                          {CRITERIA_LABELS.map(({ key, label }) => {
                            const passed = strength.criteria[key as keyof typeof strength.criteria]
                            return (
                              <div key={key} className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${
                                passed ? 'text-emerald-400' : 'text-slate-500'
                              }`}>
                                <span className={`inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                                  passed ? 'bg-emerald-900 text-emerald-400' : 'bg-slate-700 text-slate-500'
                                }`}>
                                  {passed ? '✓' : '·'}
                                </span>
                                {label}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div className="grid gap-2">
                    <Label htmlFor="repeat-password" className="text-slate-200">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="repeat-password"
                        type={showRepeat ? 'text' : 'password'}
                        required
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRepeat(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                        aria-label={showRepeat ? 'Hide password' : 'Show password'}
                      >
                        {showRepeat ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {/* Confirm match indicator */}
                    {repeatPassword.length > 0 && (
                      <p className={`text-xs mt-0.5 ${
                        password === repeatPassword ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {password === repeatPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                      </p>
                    )}
                  </div>

                  {error && <p className="text-sm text-red-400">{error}</p>}

                  <Button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create account'}
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm text-slate-400">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition">
                    Log in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}