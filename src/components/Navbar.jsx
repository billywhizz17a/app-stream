import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Apps', path: '/apps' },
    { name: 'Privacy', path: '/privacy' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <nav className="bg-transparent sticky top-0 z-50 overflow-visible relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center z-50">
            <img src={`${import.meta.env.BASE_URL}as4.png`} alt="App Stream" className="h-28 sm:h-32 w-auto object-contain drop-shadow-lg ml-4 -mb-16" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    active
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute inset-0 bg-slate-800/80 rounded-lg -z-10 border border-slate-700/50" />
                  )}
                </Link>
              )
            })}
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-slate-800/80 text-white border border-slate-700/50'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
