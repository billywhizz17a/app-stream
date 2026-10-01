import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import AppDetail from './pages/AppDetail'
import Apps from './pages/Apps'
import Contact from './pages/Contact'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 relative">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/30 via-blue-900/10 to-slate-900/0 pointer-events-none" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/apps/:id" element={<AppDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
