export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Account Settings */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Account</h2>
          </div>
          <div className="divide-y divide-gray-200">
            <Link
              href="/dashboard/settings/profile"
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">Profile Information</p>
                <p className="text-sm text-gray-600">Update your name and contact details</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              href="/dashboard/settings/password"
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">Change Password</p>
                <p className="text-sm text-gray-600">Update your password</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Subscription & Billing */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Billing</h2>
          </div>
          <div className="divide-y divide-gray-200">
            <Link
              href="/dashboard/settings/subscription"
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">Subscription</p>
                <p className="text-sm text-gray-600">View your plan and billing info</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              href="/dashboard/settings/billing"
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">Payment Method</p>
                <p className="text-sm text-gray-600">Manage your payment method</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              href="/dashboard/settings/invoices"
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">Invoices</p>
                <p className="text-sm text-gray-600">Download past invoices</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Preferences</h2>
          </div>
          <div className="divide-y divide-gray-200">
            <Link
              href="/dashboard/settings/notifications"
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">Notifications</p>
                <p className="text-sm text-gray-600">Manage email and notification settings</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link
              href="/dashboard/settings/integrations"
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">Integrations</p>
                <p className="text-sm text-gray-600">Connect with other tools and services</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-red-200">
            <h2 className="text-lg font-bold text-red-900">Danger Zone</h2>
          </div>
          <div className="px-6 py-4">
            <p className="text-sm text-red-800 mb-4">
              These actions cannot be undone. Please proceed with caution.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
