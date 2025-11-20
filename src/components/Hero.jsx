import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-slate-800/40 p-10">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-400/10 blur-3xl rounded-full" />

      <div className="relative">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Start now. Keep more of what you earn.
        </h1>
        <p className="mt-4 text-blue-100/90 text-lg max-w-2xl">
          TAXism turns complex, pro-grade tax strategies into guided steps with automation and
          audit-ready outputs — so you pay the lowest legal tax with confidence.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link to="/profile" className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow">
            Start now
          </Link>
          <Link to="/depreciation" className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold">
            Try a module
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
