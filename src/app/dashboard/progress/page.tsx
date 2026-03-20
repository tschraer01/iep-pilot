import { BarChart3, TrendingUp } from 'lucide-react'

const mockProgressData = [
  {
    id: '1',
    studentName: 'Michael Chen',
    goal: 'Read grade-level texts with 90% accuracy',
    target: 90,
    current: 78,
    lastUpdate: '2024-03-15',
    dataPoints: [65, 68, 72, 75, 78],
  },
  {
    id: '2',
    studentName: 'Emma Rodriguez',
    goal: 'Follow directions 80% of the time',
    target: 80,
    current: 85,
    lastUpdate: '2024-03-16',
    dataPoints: [60, 65, 70, 78, 85],
  },
  {
    id: '3',
    studentName: 'James Wilson',
    goal: 'Initiate conversations during unstructured time',
    target: 75,
    current: 65,
    lastUpdate: '2024-03-14',
    dataPoints: [40, 50, 55, 62, 65],
  },
]

export default function ProgressPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Monitoring</h1>
        <p className="text-gray-600">Track student progress toward IEP goals</p>
      </div>

      {/* Progress Cards */}
      <div className="space-y-6">
        {mockProgressData.map((item) => {
          const progress = (item.current / item.target) * 100
          const isOnTrack = progress >= 80

          return (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{item.studentName}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.goal}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      isOnTrack
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {isOnTrack ? (
                      <>
                        <TrendingUp className="w-4 h-4" />
                        On Track
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-4 h-4" />
                        Below Target
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress: {item.current}%</span>
                  <span>Target: {item.target}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>

              {/* Last Update */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Last updated: {new Date(item.lastUpdate).toLocaleDateString()}</span>
                <button className="text-brand-500 hover:text-brand-600 font-medium">
                  Add Data Point
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {mockProgressData.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No progress data yet</h3>
          <p className="text-gray-600">
            Start collecting data on student goals to track progress.
          </p>
        </div>
      )}
    </div>
  )
}
