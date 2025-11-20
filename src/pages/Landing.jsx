import Hero from '../components/Hero'
import Modules from '../components/Modules'
import Scorecards from '../components/Scorecards'

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <nav className="flex items-center justify-between py-4">
          <div className="font-extrabold text-2xl tracking-tight">TAXism</div>
          <a href="/test" className="text-blue-300 hover:text-blue-200">System Check</a>
        </nav>
        <Hero />
        <Scorecards />
        <div className="pt-2">
          <h2 className="text-xl font-semibold mb-3">Modules</h2>
          <Modules />
        </div>
      </div>
    </div>
  )
}

export default Landing
