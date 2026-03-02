import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import Toast from '../components/Toast'

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([])
  const [form, setForm] = useState({ nome: '', email: '', senha: '', tipo: 'funcionario' })
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [editando, setEditando] = useState(null)
  const [toast, setToast] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    carregarFuncionarios()
  }, [])

  const carregarFuncionarios = async () => {
    try {
      const response = await api.get('/usuarios')
      setFuncionarios(response.data)
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (form.senha !== confirmarSenha) {
      setToast({ message: 'As senhas não coincidem!', type: 'error' })
      return
    }
    
    try {
      if (editando) {
        await api.put(`/usuarios/${editando}`, form)
      } else {
        await api.post('/usuarios', form)
      }
      setForm({ nome: '', email: '', senha: '', tipo: 'funcionario' })
      setConfirmarSenha('')
      setEditando(null)
      carregarFuncionarios()
      setToast({ message: 'Funcionário salvo com sucesso!', type: 'success' })
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error)
      setToast({ message: 'Erro ao salvar funcionário', type: 'error' })
    }
  }

  const handleEditar = (funcionario) => {
    setForm({ nome: funcionario.nome, email: funcionario.email, senha: '', tipo: funcionario.tipo })
    setEditando(funcionario.id)
  }

  const handleExcluir = async (id) => {
    if (confirm('Deseja excluir este funcionário?')) {
      try {
        await api.delete(`/usuarios/${id}`)
        carregarFuncionarios()
      } catch (error) {
        console.error('Erro ao excluir funcionário:', error)
      }
    }
  }

  if (user?.tipo !== 'admin') {
    return (
      <div>
        <h1>Acesso Negado</h1>
        <p>Apenas administradores podem acessar esta página.</p>
      </div>
    )
  }

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1>Gestão de Funcionários</h1>
      
      <div className="card">
        <h2>{editando ? 'Editar Funcionário' : 'Cadastrar Funcionário'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
              required={!editando}
              placeholder={editando ? 'Deixe em branco para manter a senha atual' : ''}
            />
          </div>
          
          <div className="form-group">
            <label>Confirmar Senha:</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required={!editando}
              placeholder={editando ? 'Deixe em branco para manter a senha atual' : ''}
            />
          </div>
          
          <div className="form-group">
            <label>Tipo:</label>
            <select
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              required
            >
              <option value="funcionario">Funcionário</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          
          <button type="submit">{editando ? 'Atualizar' : 'Cadastrar'}</button>
          {editando && (
            <button type="button" onClick={() => {
              setEditando(null)
              setForm({ nome: '', email: '', senha: '', tipo: 'funcionario' })
              setConfirmarSenha('')
            }} style={{ marginLeft: '10px' }}>
              Cancelar
            </button>
          )}
        </form>
      </div>

      <div className="card">
        <h2>Lista de Funcionários</h2>
        {funcionarios.length === 0 ? (
          <p>Nenhum funcionário cadastrado.</p>
        ) : (
          funcionarios.map(funcionario => (
            <div key={funcionario.id} className="list-item">
              <div className="list-item-info">
                <strong>{funcionario.nome}</strong> - {funcionario.email}<br />
                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                  {funcionario.tipo === 'admin' ? 'Administrador' : 'Funcionário'}
                </span>
              </div>
              <div className="list-item-actions">
                <button onClick={() => handleEditar(funcionario)}>Editar</button>
                <button className="danger" onClick={() => handleExcluir(funcionario.id)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Funcionarios
