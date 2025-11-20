import { useState } from 'react'

function Harvesting() {
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [rows, setRows] = useState([{ symbol: 'ABC', cost_basis: 100, current_price: 80, quantity: 100 }])
  const [threshold, setThreshold] = useState(500)
  const [plan, setPlan] = useState(null)

  const update = (i, key, value) => {
    const copy = [...rows]
    copy[i][key] = value
    setRows(copy)
  }

  const scan = async () => {
    const res = await fetch(`${backend}/api/harvest/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ portfolio_name: 'My Portfolio', positions: rows, threshold: Number(threshold) }),
    })
    if (res.ok) setPlan(await res.json())
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Tax-Loss Harvesting</h1>
        <p className="text-blue-200/80">Scan positions and propose timing-aware harvest candidates with guardrails.</p>

        <div className="overflow-auto rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/70">
              <tr>
                <th className="p-3 text-left">Symbol</th>
                <th className="p-3 text-left">Cost Basis</th>
                <th className="p-3 text-left">Current Price</th>
                <th className="p-3 text-left">Qty</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-slate-800/80">
                  <td className="p-2"><input className="bg-slate-800 border border-slate-700 rounded p-2 w-full" value={r.symbol} onChange={(e) => update(i, 'symbol', e.target.value)} /></td>
                  <td className="p-2"><input type="number" className="bg-slate-800 border border-slate-700 rounded p-2 w-full" value={r.cost_basis} onChange={(e) => update(i, 'cost_basis', Number(e.target.value))} /></td>
                  <td className="p-2"><input type="number" className="bg-slate-800 border border-slate-700 rounded p-2 w-full" value={r.current_price} onChange={(e) => update(i, 'current_price', Number(e.target.value))} /></td>
                  <td className="p-2"><input type="number" className="bg-slate-800 border border-slate-700 rounded p-2 w-full" value={r.quantity} onChange={(e) => update(i, 'quantity', Number(e.target.value))} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setRows([...rows, { symbol: '', cost_basis: 0, current_price: 0, quantity: 0 }])} className="px-4 py-2 rounded bg-slate-700">Add Row</button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-blue-200/80">Threshold</span>
            <input type="number" className="bg-slate-800 border border-slate-700 rounded p-2 w-28" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
          </div>
          <button onClick={scan} className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600">Scan</button>
        </div>

        {plan && (
          <div className="rounded-xl border border-slate-700 p-4 bg-slate-800">
            <div className="font-semibold">Candidates</div>
            <ul className="mt-2 list-disc list-inside text-blue-100/90">
              {plan.candidates.map((c, i) => (
                <li key={i}>{c.symbol}: {c.unrealized.toLocaleString()} — {c.note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Harvesting
