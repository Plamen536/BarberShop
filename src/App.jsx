import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Admin from './pages/Admin'
import Home from './pages/Home'

// BrowserRouter + basename, за да работят и котвите (#services), и /admin.
// GitHub Pages няма server-side routing, затова билдът копира
// index.html като 404.html (виж package.json -> build).
export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
