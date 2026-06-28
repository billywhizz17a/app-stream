import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight, Smartphone, Apple, Check } from 'lucide-react'
import AppIcon from '../components/AppIcon'

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
          {apps.map((app) => {
            const launched = isAppLaunched(app)
            const hasScreenshot = app.screenshots && app.screenshots.length > 0

            return (
              <div key={app.id} className="flex flex-col">
                {/* Status badge above card */}
                <div className="mb-2 flex justify-start">
                  {launched ? (
                    <span className="flex items-center gap-1 bg-green-500/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
                      <Check size={12} /> Live
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
                      <Clock size={12} /> Coming Soon
                    </span>
                  )}
                </div>
              <Link
                to={`/apps/${app.id}`}
                className="group flex flex-col bg-slate-900/60 border-2 border-slate-600 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Screenshot Banner */}
                <div className="relative h-56 bg-slate-950 overflow-hidden flex-shrink-0">
                  {hasScreenshot ? (
                    <img
                      src={`${import.meta.env.BASE_URL}images/${app.id}/screenshots/${app.screenshots[0]}`}
                      alt={app.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />


                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-grow p-5 relative">
                  {/* Icon overlapping banner */}
                  <div className="absolute -top-8 left-5 ring-4 ring-slate-900 rounded-2xl">
                    <AppIcon app={app} size={56} />
                  </div>

                  {/* Name + platform */}
                  <div className="mt-6 mb-3">
                    <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                      {app.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-medium">{app.category}</span>
                      <span className="text-gray-700">·</span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        {app.platform === 'iOS' && <Apple size={12} />}
                        {app.platform === 'Android' && <Smartphone size={12} />}
                        {app.platform === 'Both' && <Smartphone size={12} />}
                        {app.platform}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {app.description}
                  </p>

                  {/* Footer */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-shrink-0">
                    {!launched ? (
                      <span className="text-amber-400/80 text-xs font-medium">Coming soon</span>
                    ) : (
                      <span className="text-green-400/80 text-xs font-medium">Live</span>
                    )}
                    <span className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
              </div>
            )
          })}

          {/* Placeholder cards to fill the grid to a multiple of 4 */}
          {apps.length > 0 && apps.length < 8 && (
            Array.from({ length: 8 - apps.length }).map((_, i) => (
              <div key={`placeholder-${i}`} className="flex flex-col">
                <div className="mb-2 flex justify-start">
                  <span className="flex items-center gap-1 bg-slate-700/90 backdrop-blur-sm text-gray-400 px-2.5 py-1 rounded-full text-xs font-medium">
                    <Clock size={12} /> Soon
                  </span>
                </div>
              <div
                className="flex flex-col bg-slate-900/60 border-2 border-slate-600 border-dashed rounded-2xl overflow-hidden opacity-60"
              >
                {/* Screenshot Banner - same h-44 as real cards */}
                <div className="relative h-56 bg-slate-950 overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <Smartphone className="text-slate-700" size={32} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1 bg-slate-700/90 backdrop-blur-sm text-gray-400 px-2.5 py-1 rounded-full text-xs font-medium">
                      <Clock size={12} /> Soon
                    </span>
                  </div>
                </div>

                {/* Card Body - same structure as real cards */}
                <div className="flex flex-col flex-grow p-5 relative">
                  {/* Icon placeholder - same size/position as real cards */}
                  <div className="absolute -top-8 left-5 ring-4 ring-slate-900 rounded-2xl">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <Smartphone className="text-slate-600" size={24} />
                    </div>
                  </div>

                  {/* Name + platform - same spacing */}
                  <div className="mt-6 mb-3">
                    <div className="h-5 w-28 bg-slate-800 rounded mb-2" />
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-16 bg-slate-800/60 rounded" />
                      <span className="text-gray-700">·</span>
                      <div className="h-3 w-12 bg-slate-800/60 rounded" />
                    </div>
                  </div>

                  {/* Description - same height */}
                  <div className="flex-grow mb-4">
                    <div className="h-3 w-full bg-slate-800/40 rounded mb-1.5" />
                    <div className="h-3 w-2/3 bg-slate-800/40 rounded" />
                  </div>

                  {/* Footer - same border and layout */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-shrink-0">
                    <span className="text-gray-600 text-xs font-medium">Coming soon</span>
                    <span className="text-gray-600 text-sm font-medium">—</span>
                  </div>
                </div>
              </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Apps
