import { Link } from 'react-router-dom'
import { Mail, Twitter, Github } from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="inline-block">
              <img src={`${import.meta.env.BASE_URL}as4.png`} alt="App Stream" className="h-12 w-48 object-contain mb-4" />
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Building thoughtful apps that inform, support, and improve everyday life.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Apps', path: '/apps' },
                { name: 'Privacy', path: '/privacy' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex items-center gap-4">
              <a
                href="mailto:billywhizz17a@gmail.com"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://github.com/billywhizz17a"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} App Stream. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
