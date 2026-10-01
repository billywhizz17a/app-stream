import { Link } from 'react-router-dom'

const card = 'bg-slate-800/60 border border-slate-700 rounded-xl p-6'
const h2 = 'text-white text-lg font-semibold mb-3'
const p = 'text-gray-300 text-sm mb-3 last:mb-0'
const ul = 'text-gray-300 text-sm space-y-1.5 list-disc pl-5 mb-3 last:mb-0'
const liStrong = 'text-slate-200'
const link = 'text-blue-400 hover:text-blue-300 transition-colors'

function Privacy() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <p className="text-slate-500 text-sm mb-2">Last updated: 1 October 2026</p>
      <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
      <p className="text-gray-300 text-sm mb-8 max-w-3xl">
        App Stream builds mobile apps including Kalo, UK News Now, Write AI, MindScape, Camp Compass, and KC
        Legacy Booking. This policy explains what data we collect, how we use it, and the choices you have. It
        applies to our website (appstream.uk) and our apps.
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        <section className={card}>
          <h2 className={h2}>Information we collect</h2>
          <ul className={ul}>
            <li><strong className={liStrong}>Account information</strong> — email address and credentials when you sign in to one of our apps</li>
            <li><strong className={liStrong}>Health and fitness data</strong> — where you grant permission, data from Health Connect and similar platform APIs</li>
            <li><strong className={liStrong}>Content you create</strong> — recipes, journal entries, progression photos, and preferences saved inside our apps</li>
            <li><strong className={liStrong}>Usage data</strong> — anonymised analytics about how the apps and site are used</li>
            <li><strong className={liStrong}>Link analytics</strong> — when you tap one of our shared links we log the platform it came from, browser, and timestamp</li>
          </ul>
        </section>

        <section className={card}>
          <h2 className={h2}>How we use information</h2>
          <ul className={ul}>
            <li>To provide and improve the apps and website</li>
            <li>To personalise features like calorie targets and insights</li>
            <li>To communicate with you (support replies, launch notifications you signed up for)</li>
            <li>To keep the service secure and prevent misuse</li>
          </ul>
        </section>

        <section className={`${card} md:col-span-2`}>
          <h2 className={h2}>Health data (Kalo)</h2>
          <p className={p}>
            Kalo can read health data via Health Connect, only with your explicit permission, to provide
            personalised nutrition and activity insights:
          </p>
          <ul className={`${ul} md:columns-2 md:gap-8`}>
            <li><strong className={liStrong}>Steps</strong> — shown on the home dashboard and used for activity-based calorie adjustments</li>
            <li><strong className={liStrong}>Exercise sessions</strong> — shown in the progress tracker and used to calculate calories burned</li>
            <li><strong className={liStrong}>Active &amp; total calories burned</strong> — used to adjust daily calorie targets</li>
            <li><strong className={liStrong}>Basal metabolic rate (BMR)</strong> — used to calculate personalised calorie targets</li>
            <li><strong className={liStrong}>Heart rate</strong> — shown in health insights alongside nutrition and exercise</li>
            <li><strong className={liStrong}>Sleep</strong> — used to analyse correlations between sleep, nutrition, and mood</li>
            <li><strong className={liStrong}>Height &amp; weight</strong> — used for BMI calculation and calorie personalisation</li>
            <li><strong className={liStrong}>Nutrition data</strong> — synced to show food intake alongside energy expenditure</li>
          </ul>
          <p className={p}>
            Health data read from Health Connect stays on your device. Content you create (recipes, progression
            photos) is stored encrypted on our servers. You can revoke health permissions at any time in your
            device settings.
          </p>
        </section>

        <section className={card}>
          <h2 className={h2}>How we protect your data</h2>
          <ul className={ul}>
            <li>Encryption in transit and at rest</li>
            <li>Per-device Firebase registration — each device is registered and encoded so only the authenticated user can access their data</li>
            <li>Access controls blocking data from outside users</li>
          </ul>
        </section>

        <section className={card}>
          <h2 className={h2}>Sharing</h2>
          <p className={p}>
            We do not sell your personal information. Data is shared only with service providers that help us
            run the platform (such as Firebase hosting and analytics), under strict confidentiality obligations,
            or where required by law.
          </p>
        </section>

        <section className={card}>
          <h2 className={h2}>Your rights</h2>
          <p className={p}>
            Under UK GDPR you can request to access, correct, export, or delete your personal data, and you can
            object to or restrict certain processing. To exercise any of these rights, contact us using the
            details below.
          </p>
        </section>

        <section className={card}>
          <h2 className={h2}>Deleting your data</h2>
          <p className={p}>You can request deletion of your account and personal data at any time:</p>
          <ul className={ul}>
            <li>Use our <a href="/delete-account" className={link}>delete account page</a></li>
          </ul>
          <p className={p}>
            Requests are processed within 30 days. Some data may be retained where required for legal,
            accounting, or security purposes.
          </p>
        </section>

        <section className={card}>
          <h2 className={h2}>Children</h2>
          <p className={p}>
            Our apps are not directed at children under 13, and we do not knowingly collect data from them.
          </p>
        </section>

        <section className={card}>
          <h2 className={h2}>Changes</h2>
          <p className={p}>
            We may update this policy from time to time. The &quot;last updated&quot; date above shows the
            current version.
          </p>
        </section>

        <section className={card}>
          <h2 className={h2}>Contact</h2>
          <p className={p}>
            Questions about this policy or your data:{' '}
            <a href="mailto:support@appstream.uk" className={link}>support@appstream.uk</a> or via our{' '}
            <Link to="/contact" className={link}>contact page</Link>.
          </p>
        </section>
      </div>
    </div>
  )
}

export default Privacy
