import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import api from './services/api'
import Login from './pages/Login'
import Medicos from './pages/Medicos'
import Horarios from './pages/Horarios'
import Agenda from './pages/Agenda'
import Funcionarios from './pages/Funcionarios'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) return <div>Carregando...</div>
  
  return user ? children : <Navigate to="/login" />
}

function AppContent() {
  const { user, logout } = useAuth()

  // Keep-alive: mantém o backend acordado
  useEffect(() => {
    if (!user) return
    
    const keepAlive = setInterval(() => {
      api.get('/medicos').catch(() => {})
    }, 600000) // 10 minutos
    
    return () => clearInterval(keepAlive)
  }, [user])

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )
  }

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Médicos</Link></li>
          <li><Link to="/horarios">Horários</Link></li>
          <li><Link to="/agenda">Agenda do Dia</Link></li>
          {user.tipo === 'admin' && <li><Link to="/funcionarios">Funcionários</Link></li>}
        </ul>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'white' }}>{user.nome}</span>
          <button onClick={logout} style={{ padding: '0.5rem 1rem' }}>Sair</button>
        </div>
      </nav>
      
      <div className="container">
        <Routes>
          <Route path="/" element={<PrivateRoute><Medicos /></PrivateRoute>} />
          <Route path="/horarios" element={<PrivateRoute><Horarios /></PrivateRoute>} />
          <Route path="/agenda" element={<PrivateRoute><Agenda /></PrivateRoute>} />
          <Route path="/funcionarios" element={<PrivateRoute><Funcionarios /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
