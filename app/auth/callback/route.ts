import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type')          // ← "recovery" for password reset
  const error = searchParams.get('error')

  // Handle auth errors
  if (error) {
    const errorDescription = searchParams.get('error_description') || 'An error occurred during authentication'
    return NextResponse.redirect(
      new URL(`/auth/error?error=${encodeURIComponent(errorDescription)}`, request.url)
    )
  }

  if (code) {
    const supabase = await createClient()
    try {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        return NextResponse.redirect(
          new URL(`/auth/error?error=${encodeURIComponent(exchangeError.message)}`, request.url)
        )
      }

      // ← If it's a password recovery, go to reset-password page
      if (type === 'recovery') {
        return NextResponse.redirect(new URL('/auth/reset-password', request.url))
      }

      // Otherwise normal login/signup → dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred'
      return NextResponse.redirect(
        new URL(`/auth/error?error=${encodeURIComponent(errorMsg)}`, request.url)
      )
    }
  }

  // No code or error provided
  return NextResponse.redirect(new URL('/auth/error?error=Invalid+request', request.url))
}