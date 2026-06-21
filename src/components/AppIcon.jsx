function AppIcon({ app, size = 64, className = "" }) {
  const initials = app?.name
    ?.split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'A'

  const gradients = [
    'from-blue-500 to-cyan-400',
    'from-emerald-500 to-teal-400',
    'from-violet-500 to-purple-400',
    'from-amber-500 to-orange-400',
    'from-rose-500 to-pink-400',
    'from-indigo-500 to-blue-400',
  ]

  const gradient = gradients[(app?.id?.length || 0) % gradients.length]

  return (
    <div
      className={`flex-shrink-0 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shadow-lg select-none ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4, lineHeight: 1 }}
    >
      {initials}
    </div>
  )
}

export default AppIcon
