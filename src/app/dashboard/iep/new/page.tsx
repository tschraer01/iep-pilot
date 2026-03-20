'use client'

import { useState } from 'react'
import { ChevronRight, Loader2, Download, FileText } from 'lucide-react'

// Mock data for students
const mockStudents = [
  { id: 'STU001', name: 'Michael Chen', grade: '3rd', disability: 'SLD' },
  { id: 'STU002', name: 'Emma Rodriguez', grade: '5th', disability: 'ADHD' },
  { id: 'STU003', name: 'James Wilson', grade: '2nd', disability: 'Autism' },
]

// Mock goal bank
const mockGoals = [
  {
    id: 'G001',
    domain: 'Reading',
    grade: '2-3',
    text: 'Student will read grade-level texts with 90% accuracy',
    category: 'Academic',
  },
  {
    id: 'G002',
    domain: 'Math',
    grade: '2-3',
    text: 'Student will solve two-digit addition problems with 85% accuracy',
    category: 'Academic',
  },
  {
    id: 'G003',
    domain: 'Social Skills',
    grade: 'K-3',
    text: 'Student will initiate conversations with peers during unstructured time',
    category: 'Social-Emotional',
  },
  {
    id: 'G004',
    domain: 'Self-Care',
    grade: 'K-3',
    text: 'Student will independently complete morning hygiene routine',
    category: 'Life Skills',
  },
]

type Step = 'student' | 'goals' | 'generate' | 'review'

interface IEPContent {
  presentLevels: string
  goals: string[]
  accommodations: string[]
  services: string[]
}

export default function NewIEPPage() {
  const [currentStep, setCurrentStep] = useState<Step>('student')
  const [selectedStudent, setSelectedStudent] = useState('')
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [iepContent, setIepContent] = useState<IEPContent | null>(null)

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    )
  }

  const handleGenerateIEP = async () => {
    if (!selectedStudent || selectedGoals.length === 0) {
      alert('Please select a student and at least one goal')
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate-iep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedStudent,
          goalIds: selectedGoals,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate IEP')
      }

      const data = await response.json()
      setIepContent(data.content)
      setCurrentStep('review')
    } catch (error) {
      console.error('Error generating IEP:', error)
      alert('Failed to generate IEP. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const student = mockStudents.find((s) => s.id === selectedStudent)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New IEP</h1>
        <p className="text-gray-600">Generate a comprehensive IEP using AI in just a few steps.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center flex-1">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                ['student', 'goals', 'generate', 'review'].indexOf(currentStep) >= 0
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              1
            </div>
            <div
              className={`flex-1 h-1 mx-2 ${
                ['goals', 'generate', 'review'].indexOf(currentStep) >= 0
                  ? 'bg-brand-500'
                  : 'bg-gray-200'
              }`}
            />
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                ['goals', 'generate', 'review'].indexOf(currentStep) >= 0
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              2
            </div>
            <div
              className={`flex-1 h-1 mx-2 ${
                ['generate', 'review'].indexOf(currentStep) >= 0
                  ? 'bg-brand-500'
                  : 'bg-gray-200'
              }`}
            />
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                ['generate', 'review'].indexOf(currentStep) >= 0
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              3
            </div>
            <div
              className={`flex-1 h-1 mx-2 ${
                currentStep === 'review' ? 'bg-brand-500' : 'bg-gray-200'
              }`}
            />
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                currentStep === 'review'
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              4
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs font-medium text-gray-600">
          <span>Select Student</span>
          <span>Select Goals</span>
          <span>Generate</span>
          <span>Review</span>
        </div>
      </div>

      {/* Step 1: Select Student */}
      {currentStep === 'student' && (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Student</h2>
          <div className="space-y-3 mb-8">
            {mockStudents.map((s) => (
              <label
                key={s.id}
                className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-colors"
              >
                <input
                  type="radio"
                  name="student"
                  value={s.id}
                  checked={selectedStudent === s.id}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-4 h-4 text-brand-500"
                />
                <div className="ml-4 flex-1">
                  <p className="font-semibold text-gray-900">{s.name}</p>
                  <p className="text-sm text-gray-600">
                    Grade {s.grade} • {s.disability}
                  </p>
                </div>
              </label>
            ))}
          </div>
          <button
            onClick={() => setCurrentStep('goals')}
            disabled={!selectedStudent}
            className="flex items-center gap-2 btn-brand disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Select Goals */}
      {currentStep === 'goals' && (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Goals</h2>
          <p className="text-gray-600 mb-6">
            Choose goals from the bank or create custom ones for {student?.name}
          </p>

          <div className="space-y-3 mb-8">
            {mockGoals.map((goal) => (
              <label
                key={goal.id}
                className="flex items-start p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-brand-500 hover:bg-brand-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedGoals.includes(goal.id)}
                  onChange={() => handleGoalToggle(goal.id)}
                  className="w-4 h-4 text-brand-500 mt-1"
                />
                <div className="ml-4 flex-1">
                  <p className="font-semibold text-gray-900">{goal.text}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {goal.domain}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {goal.category}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setCurrentStep('student')}
              className="btn-secondary"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep('generate')}
              disabled={selectedGoals.length === 0}
              className="flex items-center gap-2 btn-brand disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Generate IEP */}
      {currentStep === 'generate' && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Generate</h2>
          <p className="text-gray-600 mb-8">
            We'll use Claude AI to generate a comprehensive IEP for {student?.name} based on the selected goals.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <p className="text-sm font-medium text-gray-600 mb-3">Summary:</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>Student:</strong> {student?.name}
              </li>
              <li>
                <strong>Grade:</strong> {student?.grade}
              </li>
              <li>
                <strong>Goals Selected:</strong> {selectedGoals.length}
              </li>
            </ul>
          </div>

          <button
            onClick={handleGenerateIEP}
            disabled={isGenerating}
            className="flex items-center justify-center gap-2 btn-brand-lg disabled:opacity-50 disabled:cursor-not-allowed w-full"
          >
            {isGenerating && <Loader2 className="w-5 h-5 animate-spin" />}
            {isGenerating ? 'Generating IEP...' : 'Generate IEP with AI'}
          </button>

          <button
            onClick={() => setCurrentStep('goals')}
            disabled={isGenerating}
            className="w-full mt-3 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
        </div>
      )}

      {/* Step 4: Review & Export */}
      {currentStep === 'review' && iepContent && (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Review IEP</h2>

          {/* IEP Preview */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 max-h-96 overflow-y-auto border border-gray-200">
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Present Levels of Academic Achievement and Functional Performance</h3>
              <p className="text-gray-700 whitespace-pre-wrap mb-6">{iepContent.presentLevels}</p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Measurable Annual Goals</h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {iepContent.goals.map((goal, idx) => (
                  <li key={idx} className="text-gray-700">
                    {goal}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Accommodations</h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {iepContent.accommodations.map((acc, idx) => (
                  <li key={idx} className="text-gray-700">
                    {acc}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Special Education Services</h3>
              <ul className="list-disc pl-5 space-y-2">
                {iepContent.services.map((svc, idx) => (
                  <li key={idx} className="text-gray-700">
                    {svc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-4 flex-wrap">
            <button className="flex items-center gap-2 btn-brand">
              <Download className="w-5 h-5" />
              Export as PDF
            </button>
            <button className="flex items-center gap-2 btn-brand">
              <FileText className="w-5 h-5" />
              Export as Word
            </button>
            <button className="btn-secondary">
              Save Draft
            </button>
            <button
              onClick={() => {
                setCurrentStep('student')
                setSelectedStudent('')
                setSelectedGoals([])
                setIepContent(null)
              }}
              className="btn-secondary ml-auto"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
