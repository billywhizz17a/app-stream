import { Apple, ArrowRight, Check, Clock, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import AppIcon from './AppIcon'

function AppCard({ app, launched }) {
  return (
    <div className="flex flex-col h-full">
      {/* Status badge above card */}
      <div className="mb-2 flex justify-start">
        {launched ? (
          <span className="flex items-center gap-1 bg-green-500/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
            <Check size={12} /> Live
          </span>
        ) : (
          <span className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg shadow-amber-500/20 whitespace-nowrap">
            <Clock size={12} /> Coming Soon
          </span>
        )}
      </div>
      <Link
        to={`/apps/${app.id}`}
        className="group flex flex-col h-full bg-slate-900 border-2 border-blue-400/60 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-xl hover:shadow-blue-400/20 transition-all duration-300 hover:-translate-y-1"
      >
        {/* App Icon Banner / Video Preview / Hero Screenshot */}
        <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-950 overflow-hidden flex-shrink-0 flex items-center justify-center">
          {app.video ? (
            <video
              src={`${import.meta.env.BASE_URL}images/${app.id}/videos/${app.video}`}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : app.screenshots && app.screenshots.length > 0 ? (
            <img
              src={`${import.meta.env.BASE_URL}images/${app.id}/screenshots/${app.screenshots[0]}`}
              alt={`${app.name} preview`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <AppIcon app={app} size={96} />
          )}
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-grow p-6 relative">
          {/* Name + meta */}
          <div className="mb-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors truncate drop-shadow-sm">
                {app.name}
              </h2>
              <span className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all whitespace-nowrap flex-shrink-0">
                View <ArrowRight size={14} />
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-300 font-medium">{app.category}</span>
              <span className="text-gray-700">·</span>
              <span className="flex items-center gap-1 text-sm text-gray-300">
                {app.platform === 'iOS' && <Apple size={14} />}
                {app.platform === 'Android' && <Smartphone size={14} />}
                {app.platform === 'Both' && <Smartphone size={14} />}
                {app.platform}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-200 text-base leading-relaxed line-clamp-3 mb-4 min-h-[3.5rem]">
            {app.description}
          </p>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-shrink-0">
            {!launched ? (
              <span className="flex items-center gap-1 text-amber-400 text-sm font-semibold whitespace-nowrap"><Clock size={14} /> Coming soon</span>
            ) : (
              <span className="text-green-400 text-sm font-medium">Live</span>
            )}
            {app.google_play_url && (
              <a href={app.google_play_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:opacity-80 transition-opacity">
                <img src={`${import.meta.env.BASE_URL}google-play-badge.svg`} alt="Get it on Google Play" className="h-8 w-auto" />
              </a>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default AppCard
