import { Eye, Lock, Shield } from 'lucide-react'

function Privacy() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800">
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
                <li>Health and fitness data (steps, exercise, calories, heart rate, sleep, height, weight, nutrition) — accessed via Health Connect with user permission</li>
                <li>Recipes and progression photos — stored securely and encrypted, accessible only to the user</li>
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
                <li>End-to-end encryption for data transmission and storage</li>
                <li>Firebase device registration — each device is registered and encoded so that only the authenticated user can access their data</li>
                <li>Data is encrypted and blocked from outside users — no unauthorised access is permitted</li>
                <li>Secure storage with access controls</li>
                <li>Regular security audits and updates</li>
                <li>Compliance with data protection regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Health Data</h2>
              <p className="mb-3">
                Some of our apps, such as Kalo, access and collect health-related data through
                Health Connect and similar platform APIs. This data is used to provide personalised
                health and nutrition insights. The types of health data we may access include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Steps</strong> — displayed on the home dashboard and used to calculate activity-based calorie adjustments for meal plans</li>
                <li><strong>Exercise sessions</strong> — shown in the progress tracker and used to calculate calories burned for daily energy balance</li>
                <li><strong>Active calories burned</strong> — displayed on the home screen and used to adjust daily calorie targets</li>
                <li><strong>Total calories burned</strong> — displayed in the progress dashboard for a complete picture of daily energy expenditure</li>
                <li><strong>Basal metabolic rate (BMR)</strong> — used to calculate personalised daily calorie targets for meal plans</li>
                <li><strong>Heart rate</strong> — displayed in the health insights section to show correlations between cardiovascular health, nutrition, and exercise</li>
                <li><strong>Sleep data</strong> — shown in the insights dashboard to analyse correlations between sleep quality, nutrition, and mood</li>
                <li><strong>Height</strong> — used to calculate BMI and personalise calorie targets during profile setup</li>
                <li><strong>Weight</strong> — tracked over time in the progress tracker, used for BMI calculation, and to adjust calorie targets</li>
                <li><strong>Nutrition data</strong> — synced from Health Connect to display food intake alongside calorie burn for a complete energy balance view</li>
              </ul>
              <p className="mt-3">
                This health data is accessed with your explicit permission and is used solely to
                provide the features described above. Health data read from Health Connect remains on-device.
                User-generated data, including recipes and progression photos, is stored securely on our
                servers with encryption. Each device is registered with Firebase and encoded so that only
                the authenticated user can access their own data — all data is blocked from outside users.
                You can revoke access to health data at any time through your device's health permissions settings.
              </p>
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
              <h2 className="text-xl font-semibold text-white mb-3">Data Deletion</h2>
              <p className="mb-3">
                You have the right to request deletion of your personal data at any time.
                To request data deletion, you can:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email us at <a href="mailto:support@appstream.uk" className="text-blue-400 hover:underline">support@appstream.uk</a> with the subject "Data Deletion Request"</li>
                <li>Use our <a href="/contact" className="text-blue-400 hover:underline">contact form</a> to submit a deletion request</li>
              </ul>
              <p className="mt-3">
                We will process your request within 30 days and confirm once your data has been
                permanently deleted from our systems. Note that certain data may be retained where
                required by law for legal, accounting, or security purposes.
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
