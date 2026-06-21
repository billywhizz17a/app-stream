import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Newspaper, Clock, Rocket, Mail, Check, Sparkles, Shield, Heart, Smartphone } from 'lucide-react'
import AppIcon from '../components/AppIcon'

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
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const now = new Date()
  const isAppLaunched = (a) => a.launch_date && new Date(a.launch_date) <= now
  const upcomingApps = apps.filter(a => !a.launch_date || new Date(a.launch_date) > now)
  const launchedApps = apps.filter(isAppLaunched)
  const featuredApps = launchedApps.length > 0 ? launchedApps : apps.slice(0, 3)
  const nextLaunch = upcomingApps[0]

  const handleWaitlist = (e) => {
    e.preventDefault()
    if (waitlistEmail.trim()) setWaitlisted(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/0 to-slate-900/0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
              <Sparkles size={14} />
              <span>Apps designed for everyday life</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Discover apps from <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">App Stream</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
              A curated collection of thoughtful Android and iOS apps — from trusted news to wellness tools — built with care and clarity.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link to="/apps" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20">
                Browse Apps <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-6 py-3 rounded-xl font-medium transition-all">
                Get in Touch
              </Link>
            </div>
          </div>

          {/* App preview mockups */}
          {apps.length > 0 && (
            <div className="mt-20 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {apps.slice(0, 2).map((app) => (
                <Link
                  key={app.id}
                  to={`/apps/${app.id}`}
                  className="group bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-600 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <AppIcon app={app} size={72} />
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">{app.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{app.category}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-4 line-clamp-2">{app.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Launch Banner */}
      {nextLaunch && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/10 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                  <Rocket className="text-blue-400" size={28} />
                </div>
                <div>
                  <div className="text-sm text-blue-400 font-medium mb-1">Coming Soon</div>
                  <h3 className="text-2xl font-bold text-white">{nextLaunch.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    <Clock size={14} className="inline mr-1 -mt-0.5" />
                    Launching {formatDate(nextLaunch.launch_date)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
                {!waitlisted ? (
                  <form onSubmit={handleWaitlist} className="flex gap-2 w-full md:w-auto">
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="Get notified at launch"
                      className="flex-1 bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-sm"
                    />
                    <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-medium transition-colors text-sm whitespace-nowrap">
                      <Mail size={16} /> Notify Me
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 px-4 py-2.5 rounded-xl border border-green-500/20">
                    <Check size={18} /> You're on the list!
                  </div>
                )}
                <Link to={`/apps/${nextLaunch.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium whitespace-nowrap">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Apps */}
      {featuredApps.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white">Featured Apps</h2>
              <p className="text-gray-400 mt-1">Explore our latest releases</p>
            </div>
            <Link to="/apps" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm font-medium">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredApps.map((app) => (
              <Link key={app.id} to={`/apps/${app.id}`} className="group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition-all hover:-translate-y-1">
                {app.screenshots && app.screenshots.length > 0 && (
                  <div className="h-48 bg-slate-950 overflow-hidden">
                    <img
                      src={`${import.meta.env.BASE_URL}images/${app.id}/screenshots/${app.screenshots[0]}`}
                      alt={app.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <AppIcon app={app} size={48} />
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">{app.name}</h3>
                      <span className="text-gray-500 text-sm">{app.category}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{app.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${isAppLaunched(app) ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                      {isAppLaunched(app) ? 'Available' : 'Coming Soon'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Why App Stream */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Why App Stream?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">We focus on apps that are useful, respectful, and easy to use — without unnecessary clutter or tracking.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Smartphone, title: 'Built for Mobile', desc: 'Every app is designed for smooth, native-feeling experiences on Android and iOS.', color: 'blue' },
            { icon: Shield, title: 'Privacy First', desc: 'We keep your data where it belongs — with you. No unnecessary tracking or selling.', color: 'green' },
            { icon: Heart, title: 'Made with Care', desc: 'From wellness tools to news, each app is crafted to genuinely help its users.', color: 'rose' },
          ].map((item) => (
            <div key={item.title} className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors">
              <div className={`bg-${item.color}-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-${item.color}-500/20`}>
                <item.icon className={`text-${item.color}-400`} size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* News Section */}
      {!loading && news.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-10">
            <Newspaper className="text-blue-400" size={28} />
            <div>
              <h2 className="text-3xl font-bold text-white">Latest News</h2>
              <p className="text-gray-400 text-sm">Updates, launches, and announcements</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 6).map((item, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                {item.app_name && (
                  <span className="inline-block text-xs bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full mb-3 font-medium border border-blue-500/20">
                    {item.app_name}
                  </span>
                )}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <Calendar size={14} />
                  <span>{formatDate(item.date)}</span>
                  {item.phase && <span className="text-gray-600">· {item.phase}</span>}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-4 whitespace-pre-line leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
