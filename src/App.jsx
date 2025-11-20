import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Depreciation from './pages/Depreciation'
import Harvesting from './pages/Harvesting'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/depreciation" element={<Depreciation />} />
      <Route path="/harvesting" element={<Harvesting />} />
      <Route path="/profile" element={<Profile />} />
      {/* Placeholder routes for future modules */}
      <Route path="/entity" element={<Landing />} />
      <Route path="/liquidity" element={<Landing />} />
      <Route path="/crossborder" element={<Landing />} />
    </Routes>
  )
}

export default App
