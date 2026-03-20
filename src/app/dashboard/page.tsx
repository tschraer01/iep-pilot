import Link from 'next/link'
import { Plus, TrendingUp, Clock, CheckCircle2 } from 'lucide-react'

// Mock data - in production, this would come from Supabase
const mockIEPs = [
  {
    id: '1',
    studentId: 'STU001',
    studentName: 'Michael Chen',
    status: 'draft',
    createdAt: '2024-03-15',
    goals: 3,
  },
  {
    id: '2',
    studentId: 'STU002',
    studentName: 'Emma Rodriguez',
    status: 'completed',
    createdAt: '2024-03-10',
    goals: 5,
  },
  {
    id: '3',
    studentId: 'STU003',
    studentName: 'James Wilson',
    status: 'in_review',
    createdAt: '2024-03-08',
    goals: 4,
  },
]

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your IEPs.</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">IEPs This Month</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Time Saved</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">2.5 hrs</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Goals Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">24</p>
            </div>
            <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-brand-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent IEPs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Recent IEPs</h2>
            <p className="text-sm text-gray-600">Your latest IEP documents</p>
          </div>
          <Link
            href="/dashboard/iep/new"
            className="flex items-center gap-2 btn-brand"
          >
            <Plus className="w-5 h-5" />
            New IEP
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Student</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Goals</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockIEPs.map((iep) => (
                <tr key={iep.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {iep.studentName}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        iep.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : iep.status === 'in_review'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {iep.status === 'completed'
                        ? 'Completed'
                        : iep.status === 'in_review'
                        ? 'In Review'
                        : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {iep.goals} goals
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(iep.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-brand-500 hover:text-brand-600 font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State - if no IEPs */}
      {mockIEPs.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No IEPs yet</h3>
          <p className="text-gray-600 mb-6">Create your first IEP to get started with IEP Pilot.</p>
          <Link
            href="/dashboard/iep/new"
            className="inline-flex items-center gap-2 btn-brand"
          >
            <Plus className="w-5 h-5" />
            Create First IEP
          </Link>
        </div>
      )}
    </div>
  )
}
