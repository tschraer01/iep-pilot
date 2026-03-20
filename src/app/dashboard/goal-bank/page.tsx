export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Plus, Search } from 'lucide-react'

const mockGoals = [
  {
    id: 'G001',
    domain: 'Reading',
    gradeBand: '2-3',
    text: 'Student will read grade-level texts with 90% accuracy',
    category: 'Academic',
  },
  {
    id: 'G002',
    domain: 'Math',
    gradeBand: '2-3',
    text: 'Student will solve two-digit addition problems with 85% accuracy',
    category: 'Academic',
  },
  {
    id: 'G003',
    domain: 'Social Skills',
    gradeBand: 'K-3',
    text: 'Student will initiate conversations with peers during unstructured time',
    category: 'Social-Emotional',
  },
  {
    id: 'G004',
    domain: 'Self-Care',
    gradeBand: 'K-3',
    text: 'Student will independently complete morning hygiene routine',
    category: 'Life Skills',
  },
  {
    id: 'G005',
    domain: 'Writing',
    gradeBand: '3-5',
    text: 'Student will write simple sentences with correct capitalization and punctuation',
    category: 'Academic',
  },
  {
    id: 'G006',
    domain: 'Behavior',
    gradeBand: 'K-5',
    text: 'Student will follow classroom directions on first request 80% of the time',
    category: 'Behavioral',
  },
]

export default function GoalBankPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Goal Bank</h1>
          <p className="text-gray-600">Access and manage evidence-based IEP goals</p>
        </div>
        <button className="flex items-center gap-2 btn-brand">
          <Plus className="w-5 h-5" />
          Add Goal
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search goals..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option>All Domains</option>
          <option>Reading</option>
          <option>Math</option>
          <option>Writing</option>
          <option>Social Skills</option>
          <option>Behavior</option>
        </select>
        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option>All Grades</option>
          <option>K-1</option>
          <option>2-3</option>
          <option>4-5</option>
          <option>6-8</option>
        </select>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-4">
        {mockGoals.map((goal) => (
          <div
            key={goal.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {goal.text}
                </h3>
                <div className="flex gap-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {goal.domain}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Grade {goal.gradeBand}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {goal.category}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 text-sm text-brand-500 hover:text-brand-600 font-medium">
                Use Goal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
