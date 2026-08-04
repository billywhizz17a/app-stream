import { Clock, Smartphone } from 'lucide-react'

function PlaceholderCard() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-2 flex justify-start">
        <span className="flex items-center gap-1 bg-slate-700/90 backdrop-blur-sm text-gray-400 px-2.5 py-1 rounded-full text-xs font-medium">
          <Clock size={12} /> Soon
        </span>
      </div>
      <div
        className="flex flex-col h-full bg-slate-900 border-2 border-blue-400/40 border-dashed rounded-2xl overflow-hidden opacity-60"
      >
        {/* App Icon Banner */}
        <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-950 overflow-hidden flex-shrink-0 flex items-center justify-center">
          <Smartphone className="text-slate-700" size={48} />
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 bg-slate-700/90 backdrop-blur-sm text-gray-400 px-2.5 py-1 rounded-full text-xs font-medium">
              <Clock size={12} /> Soon
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-grow p-5 relative">
          {/* Name placeholder */}
          <div className="flex items-center gap-3 mb-3">
            <div className="ring-4 ring-slate-900 rounded-2xl flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-blue-400/40 flex items-center justify-center">
                <Smartphone className="text-slate-600" size={20} />
              </div>
            </div>
            <div className="min-w-0">
              <div className="h-5 w-28 bg-slate-800 rounded mb-2" />
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-16 bg-slate-800/60 rounded" />
                <span className="text-gray-700">·</span>
                <div className="h-3 w-12 bg-slate-800/60 rounded" />
              </div>
            </div>
          </div>

          {/* Description placeholder */}
          <div className="min-h-[2.5rem] mb-4">
            <div className="h-3 w-full bg-slate-800/40 rounded mb-1.5" />
            <div className="h-3 w-2/3 bg-slate-800/40 rounded" />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-shrink-0">
            <span className="text-gray-600 text-xs font-medium whitespace-nowrap">Coming soon</span>
            <span className="text-gray-600 text-sm font-medium">—</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceholderCard
