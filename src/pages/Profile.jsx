import { useState } from 'react'

function Profile() {
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ full_name: '', email: '', country: '', filing_status: 'single', employment_type: 'salaried', entities: [], risk_tolerance: 'medium' })
  const [saved, setSaved] = useState(null)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const save = async () => {
    const res = await fetch(`${backend}/api/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, entities: form.entities.filter(Boolean) }),
    })
    if (res.ok) setSaved(await res.json())
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Create your profile</h1>
        <p className="text-blue-200/80">Tell us about your situation so we can tailor eligible strategies.</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <input name="full_name" placeholder="Full name" className="bg-slate-800 border border-slate-700 rounded p-3" value={form.full_name} onChange={onChange} />
          <input name="email" placeholder="Email" type="email" className="bg-slate-800 border border-slate-700 rounded p-3" value={form.email} onChange={onChange} />
          <input name="country" placeholder="Country" className="bg-slate-800 border border-slate-700 rounded p-3" value={form.country} onChange={onChange} />
          <select name="filing_status" className="bg-slate-800 border border-slate-700 rounded p-3" value={form.filing_status} onChange={onChange}>
            <option value="single">Single</option>
            <option value="married_joint">Married filing jointly</option>
            <option value="married_separate">Married filing separately</option>
            <option value="head_of_household">Head of household</option>
          </select>
          <select name="employment_type" className="bg-slate-800 border border-slate-700 rounded p-3" value={form.employment_type} onChange={onChange}>
            <option value="salaried">Salaried</option>
            <option value="self_employed">Self-employed</option>
            <option value="business_owner">Business owner</option>
            <option value="creator">Creator</option>
            <option value="consultant">Consultant</option>
          </select>
          <select name="risk_tolerance" className="bg-slate-800 border border-slate-700 rounded p-3" value={form.risk_tolerance} onChange={onChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input name="entities" placeholder="Entities (comma-separated)" className="bg-slate-800 border border-slate-700 rounded p-3 sm:col-span-2" value={form.entities.join(',')} onChange={(e) => setForm({ ...form, entities: e.target.value.split(',').map(s => s.trim()) })} />
        </div>

        <div className="flex gap-3">
          <button onClick={save} className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600">Save</button>
        </div>

        {saved && (
          <div className="rounded-xl border border-slate-700 p-4 bg-slate-800 text-blue-100/90">
            Saved ✓ Reference ID: {saved.id}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
