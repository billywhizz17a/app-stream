import { Link } from 'react-router-dom'
import { Shield, Eye, Lock } from 'lucide-react'

function Privacy() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center">
              <Shield className="text-blue-400" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          </div>

          <p className="text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Eye size={20} className="text-blue-400" />
                Information We Collect
              </h2>
              <p className="mb-3">
                At App Stream, we collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and contact information</li>
                <li>Account credentials</li>
                <li>Usage data and analytics</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Lock size={20} className="text-green-400" />
                How We Protect Your Data
              </h2>
              <p className="mb-3">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>End-to-end encryption for data transmission</li>
                <li>Secure storage with access controls</li>
                <li>Regular security audits and updates</li>
                <li>Compliance with data protection regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Data Usage</h2>
              <p>
                We use your information to provide, maintain, and improve our services, 
                communicate with you, and ensure security and fraud prevention.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Data Sharing</h2>
              <p>
                We do not sell your personal information. We may share data only with 
                service providers who assist us in operating our platform, subject to 
                strict confidentiality obligations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal data. 
                Contact us to exercise these rights or for any privacy-related questions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
              <p>
                For any questions about this Privacy Policy, please reach out through our 
                <a href="/contact" className="text-blue-400 hover:underline ml-1">contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
