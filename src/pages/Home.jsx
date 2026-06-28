import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Newspaper, Clock, Rocket, Mail, Check, Sparkles, Shield, Heart, Smartphone } from 'lucide-react'

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
  const upcomingApps = apps.filter(a => !a.launch_date || new Date(a.launch_date) > now)
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:py-12 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              <Sparkles size={14} />
              <span>Apps designed for everyday life</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Discover apps from
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">App Stream</span>
            </h1>
            <p className="text-base md:text-lg text-gray-400 mb-6 leading-relaxed">
              A curated collection of thoughtful Android and iOS apps — from trusted news to wellness tools — built with care and clarity.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link to="/apps" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20">
                Browse Apps <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-5 py-2.5 rounded-xl font-medium transition-all">
                Get in Touch
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* News Section */}
      {!loading && news.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
          <div className="flex items-center gap-3 mb-6">
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

      {/* Why App Stream */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="text-center mb-8">
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

      {/* Launch Banner */}
      {nextLaunch && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
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
    </div>
  )
}

export default Home
