import { Link } from 'react-router-dom'

const modules = [
  { key: 'entity', title: 'Entity Design', desc: 'Choose structures and jurisdictions that optimize how and where income is taxed.' },
  { key: 'depreciation', title: 'Depreciation & Segregation', desc: 'Auto-build schedules and surface paper losses to shield taxable income.' },
  { key: 'liquidity', title: 'Liquidity Strategy', desc: 'Access capital tax-efficiently using lending on assets and timing-aware flows.' },
  { key: 'harvesting', title: 'Loss Harvesting', desc: 'Scan positions and generate timing-aware harvest plans with guardrails.' },
  { key: 'crossborder', title: 'Cross-Border Optimization', desc: 'Coordinate global rules for eligible mobile earners and assets.' },
]

function Modules() {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {modules.map((m) => (
        <div key={m.key} className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6 hover:border-blue-500/40 transition-colors">
          <h3 className="text-xl font-semibold text-white">{m.title}</h3>
          <p className="mt-2 text-sm text-blue-100/80">{m.desc}</p>
          <div className="mt-4">
            <Link to={`/${m.key}`} className="text-blue-300 hover:text-blue-200 font-medium">Open</Link>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Modules
