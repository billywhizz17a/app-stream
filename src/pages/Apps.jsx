import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Download, Tag, Clock, ArrowRight, Smartphone, Apple, Check } from 'lucide-react'
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
        <div className="grid md:grid-cols-2 gap-8">
          {apps.map((app) => {
            const launched = isAppLaunched(app)
            const launchDate = app.launch_date ? new Date(app.launch_date) : null
            const daysUntil = launchDate ? Math.ceil((launchDate - now) / (1000 * 60 * 60 * 24)) : null

            return (
              <Link
                key={app.id}
                to={`/apps/${app.id}`}
                className="group bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 block"
              >
                {/* Screenshot Header */}
                {app.screenshots && app.screenshots.length > 0 && (
                  <div className="relative h-64 bg-slate-950 overflow-hidden">
                    <img
                      src={`${import.meta.env.BASE_URL}images/${app.id}/screenshots/${app.screenshots[0]}`}
                      alt={app.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
                      {app.platform === 'iOS' && <Apple size={14} />}
                      {app.platform === 'Android' && <Smartphone size={14} />}
                      {app.platform === 'Both' && <Smartphone size={14} />}
                      {app.platform}
                    </div>

                    <div className="absolute top-4 left-4">
                      {launched ? (
                        <span className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                          <Check size={12} /> Available
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                          <Clock size={12} /> Coming Soon
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-5">
                      <AppIcon app={app} size={60} />
                    </div>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6">
                  {!app.screenshots?.length && (
                    <div className="flex items-center gap-4 mb-4">
                      <AppIcon app={app} size={60} />
                      <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{app.name}</h2>
                    </div>
                  )}

                  {app.screenshots?.length && (
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{app.name}</h2>
                  )}

                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full font-medium border border-blue-500/20">
                      <Tag size={12} /> {app.category}
                    </span>
                    {app.target_audience && (
                      <span className="text-xs text-gray-500">{app.target_audience}</span>
                    )}
                  </div>

                  <p className="text-gray-400 text-sm mb-5 leading-relaxed line-clamp-2">{app.description}</p>

                  {app.features && app.features.length > 0 && (
                    <ul className="space-y-1.5 mb-5">
                      {app.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                          <Check size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {app.hashtags && app.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {app.hashtags.slice(0, 4).map((tag, i) => (
                        <span key={i} className="text-xs bg-slate-800 text-gray-400 px-2 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-5 border-t border-slate-800 flex items-center justify-between">
                    {!launched ? (
                      <div className="flex items-center gap-2 text-amber-400 text-sm">
                        <Clock size={16} />
                        {daysUntil !== null ? (
                          <span>Launching in {daysUntil} day{daysUntil !== 1 ? 's' : ''}</span>
                        ) : (
                          <span>Coming soon</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-sm">
                        {app.google_play_url && (
                          <span className="flex items-center gap-1.5 text-green-400 font-medium">
                            <Download size={14} /> Google Play
                          </span>
                        )}
                        {app.app_store_url && (
                          <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                            <Download size={14} /> App Store
                          </span>
                        )}
                      </div>
                    )}
                    <span className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Details <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Apps
