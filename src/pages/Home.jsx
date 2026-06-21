import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Shield, MessageSquare, ArrowRight, Newspaper, Calendar, Download, Clock, Rocket, Mail, Check } from 'lucide-react'

function Home() {
  const [news, setNews] = useState([])
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlisted, setWaitlisted] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}news.json`).then(res => res.json()).catch(() => []),
      fetch(`${import.meta.env.BASE_URL}apps.json`).then(res => res.json()).catch(() => []),
    ]).then(([newsData, appsData]) => {
      setNews(newsData)
      setApps(appsData)
      setLoading(false)
    })
  }, [])

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const now = new Date()
  const upcomingApps = apps.filter(a => a.launch_date && new Date(a.launch_date) > now)
  const launchedApps = apps.filter(a => !a.launch_date || new Date(a.launch_date) <= now)
  const featuredApps = launchedApps.slice(0, 3)
  const nextLaunch = upcomingApps[0]

  const handleWaitlist = (e) => {
    e.preventDefault()
    if (waitlistEmail.trim()) {
      setWaitlisted(true)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-blue-400">App Stream</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your modern platform for seamless application management and streaming experiences.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/apps" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
              Browse Apps <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
              Get Started
            </Link>
          </div>
        </div>

        {/* Launch Banner */}
        {nextLaunch && (
          <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/20 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Rocket className="text-blue-400" size={28} />
                </div>
                <div>
                  <div className="text-sm text-blue-400 font-medium mb-1">Coming Soon</div>
                  <h3 className="text-2xl font-bold text-white">{nextLaunch.name}</h3>
                  <p className="text-gray-300 text-sm mt-1">
                    <Clock size={14} className="inline mr-1" />
                    Launching {formatDate(nextLaunch.launch_date)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                {!waitlisted ? (
                  <form onSubmit={handleWaitlist} className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="Get notified at launch"
                      className="bg-slate-900/80 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                    <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap">
                      <Mail size={16} /> Notify Me
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <Check size={18} /> You're on the list!
                  </div>
                )}
                <Link to={`/apps/${nextLaunch.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium whitespace-nowrap">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Featured Apps */}
        {featuredApps.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Featured Apps</h2>
              <Link to="/apps" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm font-medium">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredApps.map((app) => (
                <Link key={app.id} to={`/apps/${app.id}`} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden hover:border-blue-500 transition-colors group">
                  {app.screenshots && app.screenshots.length > 0 ? (
                    <div className="h-44 bg-slate-900 overflow-hidden">
                      <img
                        src={`${import.meta.env.BASE_URL}images/${app.id}/screenshots/${app.screenshots[0]}`}
                        alt={app.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-44 bg-slate-900 flex items-center justify-center">
                      {app.icon && (
                        <img src={`${import.meta.env.BASE_URL}images/${app.id}/icons/${app.icon}`} alt={app.name} className="w-20 h-20 rounded-xl object-cover" />
                      )}
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      {app.icon && (
                        <img src={`${import.meta.env.BASE_URL}images/${app.id}/icons/${app.icon}`} alt={app.name} className="w-10 h-10 rounded-lg object-cover border border-slate-600" />
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-white">{app.name}</h3>
                        <span className="text-gray-400 text-sm">{app.category}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2">{app.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      {(app.google_play_url || app.app_store_url) && (
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <Download size={12} /> Available now
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Coming Soon Apps */}
        {upcomingApps.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="text-amber-400" size={28} />
              <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingApps.map((app) => {
                const days = Math.ceil((new Date(app.launch_date) - now) / (1000 * 60 * 60 * 24))
                return (
                  <Link key={app.id} to={`/apps/${app.id}`} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:border-amber-500 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      {app.icon ? (
                        <img src={`${import.meta.env.BASE_URL}images/${app.id}/icons/${app.icon}`} alt={app.name} className="w-12 h-12 rounded-xl object-cover border border-slate-600" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center">
                          <span className="text-xl font-bold text-white">{app.name?.charAt(0)}</span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-white">{app.name}</h3>
                        <span className="text-gray-400 text-sm">{app.category}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">{app.description}</p>
                    <div className="flex items-center gap-2 text-amber-400 text-sm">
                      <Clock size={14} />
                      <span>Launching in {days} day{days !== 1 ? 's' : ''}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
            <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-400">
              Experience blazing fast performance with our optimized streaming infrastructure.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-green-500 transition-colors">
            <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure & Private</h3>
            <p className="text-gray-400">
              Your data is protected with enterprise-grade security and privacy measures.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
            <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
            <p className="text-gray-400">
              Our dedicated support team is always ready to help you with any questions.
            </p>
          </div>
        </div>

        {/* News Section */}
        {!loading && news.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-8">
              <Newspaper className="text-blue-400" size={28} />
              <h2 className="text-3xl font-bold text-white">Latest News</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.slice(0, 6).map((item, i) => (
                <div key={i} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:border-blue-500 transition-colors">
                  {item.app_name && (
                    <span className="inline-block text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded mb-3 font-medium">
                      {item.app_name}
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar size={14} />
                    <span>{formatDate(item.date)}</span>
                    {item.phase && (
                      <span className="text-gray-600">· {item.phase}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-4 whitespace-pre-line">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-8">Contact us today to learn more about our services.</p>
          <Link to="/contact" className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
