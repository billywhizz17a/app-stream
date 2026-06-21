import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Download, Tag, Clock, ArrowLeft, Check, Star, Mail } from 'lucide-react'

function AppDetail() {
  const { id } = useParams()
  const [app, setApp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [waitlisted, setWaitlisted] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}apps.json`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(a => a.id === id)
        setApp(found)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleWaitlist = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setWaitlisted(true)
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-xl">Loading app...</div>
      </div>
    )
  }

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-xl mb-4">App not found</div>
          <Link to="/apps" className="text-blue-400 hover:text-blue-300">Back to Apps</Link>
        </div>
      </div>
    )
  }

  const now = new Date()
  const launchDate = app.launch_date ? new Date(app.launch_date) : null
  const isLaunched = launchDate && launchDate <= now
  const daysUntil = launchDate ? Math.ceil((launchDate - now) / (1000 * 60 * 60 * 24)) : null
  const allImages = app.screenshots || []
  const iconSrc = app.icon
    ? `${import.meta.env.BASE_URL}images/${app.id}/icons/${app.icon}`
    : (allImages.length > 0)
      ? `${import.meta.env.BASE_URL}images/${app.id}/screenshots/${allImages[0]}`
      : null

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/apps" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Apps
        </Link>

        {/* Hero Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            {/* App Icon */}
            <div className="md:w-48 flex items-center justify-center p-8 md:border-r border-slate-700">
              {iconSrc ? (
                <img
                  src={iconSrc}
                  alt={`${app.name} icon`}
                  className="w-32 h-32 rounded-2xl object-cover border border-slate-600"
                />
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-slate-700 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{app.name?.charAt(0)}</span>
                </div>
              )}
            </div>

            {/* App Info */}
            <div className="flex-1 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{app.name}</h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-medium">
                      {app.platform}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Tag size={14} /> {app.category}
                    </span>
                    {app.target_audience && (
                      <span className="text-gray-500 text-sm">· {app.target_audience}</span>
                    )}
                  </div>
                </div>
                {!isLaunched && (
                  <span className="inline-flex items-center gap-1 text-sm bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    <Clock size={14} /> Coming Soon
                  </span>
                )}
              </div>

              <p className="text-gray-300 text-lg mb-6">{app.description}</p>

              {/* Launch status + download/waitlist */}
              {!isLaunched ? (
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <Clock size={16} />
                    {daysUntil !== null ? (
                      <span>Launching in {daysUntil} day{daysUntil !== 1 ? 's' : ''} — {formatDate(app.launch_date)}</span>
                    ) : (
                      <span>Coming soon — launch date to be announced</span>
                    )}
                  </div>
                  <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for launch notification"
                      className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                    >
                      <Mail size={18} /> Notify Me
                    </button>
                  </form>
                  {waitlisted && (
                    <div className="mt-3 flex items-center gap-2 text-green-400 text-sm">
                      <Check size={16} /> You're on the list! We'll email you when {app.name} launches.
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-3 flex-wrap">
                  {app.google_play_url && (
                    <a
                      href={app.google_play_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      <Download size={20} /> Get it on Google Play
                    </a>
                  )}
                  {app.app_store_url && (
                    <a
                      href={app.app_store_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      <Download size={20} /> Download on the App Store
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Screenshot Gallery */}
        {allImages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Screenshots</h2>
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden mb-4">
              <img
                src={`${import.meta.env.BASE_URL}images/${app.id}/screenshots/${allImages[activeImage]}`}
                alt={`${app.name} screenshot ${activeImage + 1}`}
                className="w-full max-h-[500px] object-contain bg-slate-900"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === activeImage ? 'border-blue-500' : 'border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}images/${app.id}/screenshots/${img}`}
                      alt={`${app.name} thumbnail ${i + 1}`}
                      className="w-24 h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Features */}
        {app.features && app.features.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {app.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-800/50 rounded-xl border border-slate-700 p-4">
                  <div className="bg-blue-500/20 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="text-blue-400" size={18} />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hashtags */}
        {app.hashtags && app.hashtags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {app.hashtags.map((tag, i) => (
                <span key={i} className="text-sm bg-slate-700 text-gray-300 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <Link to="/apps" className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            View All Apps
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AppDetail
