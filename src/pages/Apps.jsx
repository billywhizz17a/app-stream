import { useEffect, useState } from 'react'
import AppCard from '../components/AppCard'
import PlaceholderCard from '../components/PlaceholderCard'

// cache-bust: 2026-06-28T19:30

function Apps() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}apps.json`)
      .then(res => res.json())
      .then(data => {
        setApps(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const now = new Date()
  const isAppLaunched = (a) => a.launch_date && new Date(a.launch_date) <= now

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <div className="text-gray-400 text-lg">Loading apps...</div>
        </div>
      </div>
    )
  }

  if (apps.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-300 text-xl mb-2">No apps available yet.</div>
          <div className="text-gray-500 text-sm">Check back soon — we're working on something great.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Apps</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Browse our collection of thoughtful apps. Each one is built to solve a real problem and work beautifully on your device.
          </p>
        </div>

        {/* App Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} launched={isAppLaunched(app)} />
          ))}

          {/* Placeholder cards to fill the grid to a multiple of 4 */}
          {apps.length < 8 && (
            Array.from({ length: 8 - apps.length }).map((_, i) => (
              <PlaceholderCard key={`placeholder-${i}`} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Apps
