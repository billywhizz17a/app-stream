import { Link } from 'react-router-dom'
import { Zap, Shield, MessageSquare, ArrowRight } from 'lucide-react'

function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-blue-400">App Stream</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your modern platform for seamless application management and streaming experiences.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
              Get Started <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
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

        <div className="mt-20 text-center">
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
