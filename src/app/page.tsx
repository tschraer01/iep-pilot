import Link from 'next/link'
import { CheckCircle2, Brain, BookOpen, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold">
                IP
              </div>
              <span className="font-bold text-lg text-gray-900">IEP Pilot</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-gray-700 hover:text-gray-900 font-medium">
                Sign In
              </Link>
              <Link href="/auth/signup" className="btn-brand">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Write IEPs in 10 Minutes,
            <br />
            <span className="text-brand-500">Not 3 Hours</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            IEP Pilot harnesses Claude AI to generate comprehensive Individualized Education Programs instantly. Save countless hours and focus on what matters most—your students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="btn-brand-lg">
              Start Free Trial
            </Link>
            <button className="btn-secondary text-lg px-6 py-3">
              Watch Demo
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required. 14-day free trial for all features.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for IEP Excellence
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to create data-driven, compliant IEPs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Generator</h3>
              <p className="text-gray-600 mb-4">
                Claude AI analyzes student data and generates customized present levels, goals, and services in seconds.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                  <span>SMART Goals aligned to standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                  <span>Accommodation suggestions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                  <span>Compliant with IDEA requirements</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Goal Bank</h3>
              <p className="text-gray-600 mb-4">
                Access a comprehensive library of evidence-based goals across all grade levels and disability categories.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                  <span>5,000+ pre-written goals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                  <span>Customizable for each student</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                  <span>Regularly updated library</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Progress Monitoring</h3>
              <p className="text-gray-600 mb-4">
                Track progress toward IEP goals with built-in monitoring tools and progress reporting.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                  <span>Data collection templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                  <span>Automated progress reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                  <span>Visual progress analytics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Choose the plan that works for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Individual Plan */}
          <div className="border border-gray-200 rounded-lg p-8 hover:border-brand-500 transition-colors">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Individual</h3>
            <p className="text-gray-600 mb-6">For individual special education teachers</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$79</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Unlimited IEP generation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Goal bank access</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Progress monitoring</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Export to PDF/Word</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Email support</span>
              </li>
            </ul>
            <Link href="/auth/signup" className="w-full btn-brand block text-center">
              Start Free Trial
            </Link>
          </div>

          {/* District Plan */}
          <div className="border-2 border-brand-500 rounded-lg p-8 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">District</h3>
            <p className="text-gray-600 mb-6">For school districts and multiple teachers</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$59</span>
              <span className="text-gray-600">/teacher/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Everything in Individual</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Team collaboration</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Admin dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">API access</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Priority support</span>
              </li>
            </ul>
            <Link href="/auth/signup" className="w-full btn-brand-lg block text-center">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center font-bold">
                  IP
                </div>
                <span className="font-bold">IEP Pilot</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered IEP writing tool for special education teachers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-sm text-gray-400">
              &copy; 2024 IEP Pilot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
