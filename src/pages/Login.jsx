import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    
    const sucesso = await login(email, senha)
    if (sucesso) {
      navigate('/')
    } else {
      setErro('Email ou senha inválidos')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 style={{ textAlign: 'center' }}>AtendeJá</h1>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          
          {erro && <p style={{ color: '#e74c3c', marginBottom: '1rem' }}>{erro}</p>}
          
          <button type="submit" style={{ width: '100%' }}>Entrar</button>
        </form>
      </div>
    </div>
  )
}

export default Login
