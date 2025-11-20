function Scorecards() {
  const cards = [
    { label: 'Progress', value: 'Step 1 of 5', tone: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20' },
    { label: 'Compliance', value: 'Low Risk', tone: 'bg-blue-500/15 text-blue-300 border-blue-400/20' },
    { label: 'Estimated Savings', value: '~ up to 60%', tone: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/20' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c, i) => (
        <div key={i} className={`rounded-2xl border p-5 ${c.tone}`}>
          <div className="text-sm opacity-80">{c.label}</div>
          <div className="text-2xl font-bold mt-1">{c.value}</div>
        </div>
      ))}
    </div>
  )
}

export default Scorecards
