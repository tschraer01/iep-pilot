export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Plus, Edit2, Trash2 } from 'lucide-react'

const mockStudents = [
  {
    id: 'STU001',
    name: 'Michael Chen',
    grade: '3rd',
    disability: 'SLD',
    iepDate: '2024-01-15',
  },
  {
    id: 'STU002',
    name: 'Emma Rodriguez',
    grade: '5th',
    disability: 'ADHD',
    iepDate: '2024-02-10',
  },
  {
    id: 'STU003',
    name: 'James Wilson',
    grade: '2nd',
    disability: 'Autism',
    iepDate: '2024-03-05',
  },
]

export default function StudentsPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Students</h1>
          <p className="text-gray-600">Manage your students and their IEPs</p>
        </div>
        <Link href="/dashboard/students/add" className="flex items-center gap-2 btn-brand">
          <Plus className="w-5 h-5" />
          Add Student
        </Link>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Grade</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Disability</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">IEP Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Grade {student.grade}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.disability}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(student.iepDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
