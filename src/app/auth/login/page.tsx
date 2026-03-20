'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Mail, Lock, LogIn } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Implement Supabase login here
      // const { error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // })
      // if (error) setError(error.message)
      // else redirect('/dashboard')
      console.log('Login attempt:', { email, password })
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold">
            IP
          </div>
          <span className="font-bold text-xl text-gray-900">IEP Pilot</span>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h1>
          <p className="text-gray-600 mb-6">Enter your credentials to access your account</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="teacher@school.edu"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link href="/auth/forgot-password" className="text-sm text-brand-500 hover:text-brand-600 font-medium">
                Forgot your password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 btn-brand-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!isLoading && <LogIn className="w-5 h-5" />}
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200" />
            <span className="px-2 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-brand-500 hover:text-brand-600 font-medium">
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="text-brand-500 hover:text-brand-600">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-brand-500 hover:text-brand-600">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
