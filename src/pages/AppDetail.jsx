import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Download, Tag, Clock, ArrowLeft, Check, Mail, Smartphone, Apple, ArrowRight, QrCode, Newspaper, X } from 'lucide-react'
import AppIcon from '../components/AppIcon'
import { QRCodeSVG } from 'qrcode.react'

function AppDetail() {
  const { id } = useParams()
  const [app, setApp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [waitlisted, setWaitlisted] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [newsItems, setNewsItems] = useState([])
  const [selectedNews, setSelectedNews] = useState(null)

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}apps.json`).then(res => res.json()),
      fetch(`${import.meta.env.BASE_URL}news.json`).then(res => res.json()).catch(() => [])
    ]).then(([data, news]) => {
        const found = data.find(a => a.id === id)
        setApp(found)
        const filtered = (news || []).filter(n => n.app_id === id)
        setNewsItems(filtered)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleWaitlist = (e) => {
    e.preventDefault()
    if (email.trim()) setWaitlisted(true)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <div className="text-gray-400 text-lg">Loading app...</div>
        </div>
      </div>
    )
  }

  if (!app) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-3">App not found</div>
          <p className="text-gray-400 mb-6">We couldn't find that app in our catalogue.</p>
          <Link to="/apps" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium">
            <ArrowLeft size={18} /> Back to Apps
          </Link>
        </div>
      </div>
    )
  }

  const now = new Date()
  const launchDate = app.launch_date ? new Date(app.launch_date) : null
  const isLaunched = launchDate && launchDate <= now
  const daysUntil = launchDate ? Math.ceil((launchDate - now) / (1000 * 60 * 60 * 24)) : null
  const allImages = app.screenshots || []

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/apps" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={18} /> Back to Apps
        </Link>

        {/* Hero Section */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden mb-12">
          <div className="flex flex-col lg:flex-row">
            {/* App Icon */}
            <div className="lg:w-64 flex items-center justify-center p-8 lg:border-r border-slate-800 bg-slate-950/30">
              <AppIcon app={app} size={120} />
            </div>

            {/* App Info */}
            <div className="flex-1 p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">{app.name}</h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-sm bg-slate-800 text-gray-300 px-3 py-1 rounded-full font-medium border border-slate-700">
                      {app.platform === 'iOS' && <Apple size={14} />}
                      {app.platform === 'Android' && <Smartphone size={14} />}
                      {app.platform === 'Both' && <Smartphone size={14} />}
                      {app.platform}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Tag size={14} /> {app.category}
                    </span>
                    {app.target_audience && (
                      <span className="text-gray-500 text-sm">{app.target_audience}</span>
                    )}
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 self-start text-sm px-3 py-1.5 rounded-full font-medium border ${isLaunched ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                  {isLaunched ? <Check size={14} /> : <Clock size={14} />}
                  {isLaunched ? 'Live' : 'Coming Soon'}
                </span>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">{app.description}</p>

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
                  <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for launch notification"
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-medium transition-colors whitespace-nowrap"
                    >
                      <Mail size={18} /> Notify Me
                    </button>
                  </form>
                  {waitlisted && (
                    <div className="mt-3 flex items-center gap-2 text-green-400 text-sm bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20 inline-flex">
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
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-green-600/10"
                    >
                      <Download size={20} /> Get it on Google Play
                    </a>
                  )}
                  {app.app_store_url && (
                    <a
                      href={app.app_store_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/10"
                    >
                      <Download size={20} /> Download on the App Store
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-10">
            {/* Screenshot Gallery */}
            {allImages.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Screenshots</h2>
                <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden mb-4">
                  <img
                    src={`${import.meta.env.BASE_URL}images/${app.id}/screenshots/${allImages[activeImage]}`}
                    alt={`${app.name} screenshot ${activeImage + 1}`}
                    className="w-full max-h-[520px] object-contain"
                  />
                </div>
                {allImages.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                          i === activeImage ? 'border-blue-500' : 'border-slate-800 hover:border-slate-600'
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
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {app.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-900/40 border border-slate-800 rounded-xl p-4">
                      <div className="bg-blue-500/10 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                        <Check className="text-blue-400" size={18} />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Details card */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">App Details</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Platform</dt>
                  <dd className="text-gray-300">{app.platform}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Category</dt>
                  <dd className="text-gray-300">{app.category}</dd>
                </div>
                {app.target_audience && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Audience</dt>
                    <dd className="text-gray-300">{app.target_audience}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-500">Status</dt>
                  <dd className={isLaunched ? 'text-green-400' : 'text-amber-400'}>
                    {isLaunched ? 'Live' : 'Coming Soon'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Hashtags */}
            {app.hashtags && app.hashtags.length > 0 && (
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {app.hashtags.map((tag, i) => (
                    <span key={i} className="text-sm bg-slate-800 text-gray-400 px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* QR Code / Download */}
            {(() => {
              const downloadUrl = app.google_play_url || app.app_store_url
              if (!downloadUrl) return null
              return (
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
                  {isLaunched ? (
                    <>
                      <h3 className="text-lg font-semibold text-white mb-1">Scan to Download</h3>
                      <p className="text-gray-500 text-sm mb-4">Point your camera at the code</p>
                      <div className="inline-block bg-white p-4 rounded-xl">
                        <QRCodeSVG
                          value={downloadUrl}
                          size={160}
                          level="M"
                          includeMargin={false}
                        />
                      </div>
                      <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-medium transition-colors text-sm"
                      >
                        <Download size={16} /> Open download link
                      </a>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold text-white mb-1">Scan to Download</h3>
                      <p className="text-gray-500 text-sm mb-4">Point your camera at the code</p>
                      <div className="inline-flex flex-col items-center justify-center w-[192px] h-[192px] bg-slate-800/50 rounded-xl border border-slate-700">
                        <Clock className="text-amber-400 mb-2" size={32} />
                        <span className="text-amber-400 font-medium text-sm">Coming Soon</span>
                      </div>
                    </>
                  )}
                </div>
              )
            })()}

            {/* CTA card */}
            <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Explore more apps</h3>
              <p className="text-gray-400 text-sm mb-4">See everything else we are building at App Stream.</p>
              <Link to="/apps" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm">
                View all apps <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Latest News & Press Releases for this app */}
        {newsItems.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <Newspaper className="text-blue-400" size={28} />
              <div>
                <h2 className="text-3xl font-bold text-white">Latest News & Press Releases</h2>
                <p className="text-gray-400 text-sm">Updates and announcements for {app.name}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {newsItems.map((item, i) => (
                <div key={i} onClick={() => setSelectedNews(item)} className="cursor-pointer bg-slate-900/60 border-2 border-blue-400/60 rounded-2xl p-6 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-400/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    {app.icon && (
                      <img src={`${import.meta.env.BASE_URL}images/${app.id}/icons/${app.icon}`} alt={app.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                    )}
                    {item.app_name && (
                      <span className="inline-block text-xs bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full font-medium border border-blue-500/20">
                        {item.app_name}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  {item.summary && (
                    <p className="text-blue-100/70 text-sm mb-2 font-medium line-clamp-2">{item.summary}</p>
                  )}
                  {item.date && (
                    <p className="text-gray-500 text-xs mb-3">{new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  )}
                  <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">{item.content}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-blue-400 text-sm font-medium">
                    Read more <ArrowRight size={14} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedNews(null)}>
          <div className="bg-slate-900 border-2 border-blue-400/40 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                {app && app.icon && (
                  <img src={`${import.meta.env.BASE_URL}images/${app.id}/icons/${app.icon}`} alt={app.name} className="w-10 h-10 rounded-xl object-cover" />
                )}
                <div>
                  {selectedNews.app_name && (
                    <span className="inline-block text-xs bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full font-medium border border-blue-500/20">
                      {selectedNews.app_name}
                    </span>
                  )}
                </div>
              </div>
              <button onClick={() => setSelectedNews(null)} className="text-gray-400 hover:text-white transition-colors p-1">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              {selectedNews.date && (
                <p className="text-gray-500 text-sm mb-4">{new Date(selectedNews.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              )}
              <h2 className="text-2xl font-bold text-white mb-3">{selectedNews.title}</h2>
              {selectedNews.summary && (
                <p className="text-blue-100/70 text-base mb-4 font-medium">{selectedNews.summary}</p>
              )}
              <div className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">{selectedNews.content}</div>
              {selectedNews.source_url && (
                <a href={selectedNews.source_url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Read full article <ArrowRight size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppDetail
