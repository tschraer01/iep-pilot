'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Mail, Lock, User, Building2, UserCheck } from 'lucide-react'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    schoolDistrict: '',
    role: 'teacher',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      // Implement Supabase signup here
      // const { error } = await supabase.auth.signUp({
      //   email: formData.email,
      //   password: formData.password,
      //   options: {
      //     data: {
      //       name: formData.name,
      //       school_district: formData.schoolDistrict,
      //       role: formData.role,
      //     },
      //   },
      // })
      // if (error) setError(error.message)
      // else setSuccess(true)
      console.log('Signup attempt:', formData)
      setSuccess(true)
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a confirmation link to {formData.email}. Click the link to verify your account.
            </p>
            <Link href="/auth/login" className="text-brand-500 hover:text-brand-600 font-medium">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    )
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600 mb-6">Start your free 14-day trial</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="teacher@school.edu"
                />
              </div>
            </div>

            {/* School District Field */}
            <div>
              <label htmlFor="schoolDistrict" className="block text-sm font-medium text-gray-700 mb-2">
                School District
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="schoolDistrict"
                  type="text"
                  name="schoolDistrict"
                  value={formData.schoolDistrict}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Your School District"
                />
              </div>
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="teacher">Special Education Teacher</option>
                <option value="admin">School Administrator</option>
                <option value="coordinator">IEP Coordinator</option>
              </select>
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-brand-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-brand-500 hover:text-brand-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By creating an account, you agree to our{' '}
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
