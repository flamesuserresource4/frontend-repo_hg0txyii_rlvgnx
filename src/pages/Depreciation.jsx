import { useState } from 'react'

function Depreciation() {
  const [form, setForm] = useState({ asset_name: '', cost_basis: '', placed_in_service: '', life_years: 5 })
  const [schedule, setSchedule] = useState(null)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const calculate = async () => {
    const res = await fetch(`${backend}/api/depreciation/calc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asset_name: form.asset_name,
        cost_basis: parseFloat(form.cost_basis || 0),
        placed_in_service: form.placed_in_service,
        life_years: parseInt(form.life_years, 10),
      }),
    })
    if (res.ok) setSchedule(await res.json())
  }

  const save = async () => {
    if (!schedule) return
    await fetch(`${backend}/api/depreciation/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule),
    })
    alert('Saved schedule')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Depreciation & Cost Segregation</h1>
        <p className="text-blue-200/80">Accelerate deductions and create paper losses to shield income.</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <input name="asset_name" placeholder="Asset name" className="bg-slate-800 border border-slate-700 rounded p-3" value={form.asset_name} onChange={onChange} />
          <input name="cost_basis" placeholder="Cost basis" type="number" className="bg-slate-800 border border-slate-700 rounded p-3" value={form.cost_basis} onChange={onChange} />
          <input name="placed_in_service" placeholder="Placed in service" type="date" className="bg-slate-800 border border-slate-700 rounded p-3" value={form.placed_in_service} onChange={onChange} />
          <input name="life_years" placeholder="Life (years)" type="number" className="bg-slate-800 border border-slate-700 rounded p-3" value={form.life_years} onChange={onChange} />
        </div>

        <div className="flex gap-3">
          <button onClick={calculate} className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600">Calculate</button>
          <button onClick={save} disabled={!schedule} className="px-4 py-2 rounded bg-slate-700 disabled:opacity-50">Save</button>
        </div>

        {schedule && (
          <div className="rounded-xl border border-slate-700 p-4 bg-slate-800">
            <div className="font-semibold">Schedule for {schedule.asset_name}</div>
            <div className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {schedule.schedule.map((s) => (
                <div key={s.year} className="p-3 rounded border border-slate-700 bg-slate-900/60">
                  <div className="text-sm text-blue-200/80">Year {s.year}</div>
                  <div className="text-lg font-bold">{s.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Depreciation
