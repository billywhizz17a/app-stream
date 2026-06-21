import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Download, ExternalLink, Tag, Clock, ArrowRight } from 'lucide-react'

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-xl">Loading apps...</div>
      </div>
    )
  }

  if (apps.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-xl">No apps available yet. Check back soon!</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-blue-400">Apps</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover our collection of innovative applications designed to make your life better.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {apps.map((app) => (
            <Link key={app.id} to={`/apps/${app.id}`} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden hover:border-blue-500 transition-colors block">
              {app.screenshots && app.screenshots.length > 0 && (
                <div className="relative h-64 bg-slate-900">
                  <img
                    src={`${import.meta.env.BASE_URL}images/${app.id}/screenshots/${app.screenshots[0]}`}
                    alt={app.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {app.platform}
                  </div>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  {app.icon && (
                    <img
                      src={`${import.meta.env.BASE_URL}images/${app.id}/icons/${app.icon}`}
                      alt={`${app.name} icon`}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-600"
                    />
                  )}
                  <h2 className="text-2xl font-bold text-white">{app.name}</h2>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="text-gray-500" size={16} />
                  <span className="text-gray-400 text-sm">{app.category}</span>
                  {app.target_audience && (
                    <span className="text-gray-500 text-sm">· {app.target_audience}</span>
                  )}
                </div>
                <p className="text-gray-400 mb-4 line-clamp-3">{app.description}</p>

                {app.hashtags && app.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {app.hashtags.slice(0, 5).map((tag, i) => (
                      <span key={i} className="text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                )}

                {app.screenshots && app.screenshots.length > 1 && (
                  <div className="flex gap-2 mb-4 overflow-x-auto">
                    {app.screenshots.slice(1, 5).map((img, i) => (
                      <img
                        key={i}
                        src={`${import.meta.env.BASE_URL}images/${app.id}/screenshots/${img}`}
                        alt={`${app.name} screenshot ${i + 2}`}
                        className="w-20 h-20 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                      />
                    ))}
                  </div>
                )}

                {(() => {
                  const now = new Date()
                  const launchDate = app.launch_date ? new Date(app.launch_date) : null
                  const isLaunched = !launchDate || launchDate <= now

                  if (!isLaunched) {
                    const daysUntil = Math.ceil((launchDate - now) / (1000 * 60 * 60 * 24))
                    return (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                          <Clock size={16} />
                          <span>Launching in {daysUntil} day{daysUntil !== 1 ? 's' : ''} — {launchDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex gap-3">
                          {app.google_play_url && (
                            <span className="flex items-center gap-2 bg-slate-700/50 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                              <Download size={16} /> Google Play
                            </span>
                          )}
                          {app.app_store_url && (
                            <span className="flex items-center gap-2 bg-slate-700/50 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                              <Download size={16} /> App Store
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div className="flex gap-3 mt-4">
                      {app.google_play_url && (
                        <a
                          href={app.google_play_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Download size={16} /> Google Play
                        </a>
                      )}
                      {app.app_store_url && (
                        <a
                          href={app.app_store_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Download size={16} /> App Store
                        </a>
                      )}
                    </div>
                  )
                })()}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/contact" className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Apps
