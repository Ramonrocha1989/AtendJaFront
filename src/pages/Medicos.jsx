import { useState, useEffect } from 'react'
import api from '../services/api'
import Toast from '../components/Toast'

function Medicos() {
  const [medicos, setMedicos] = useState([])
  const [form, setForm] = useState({ nome: '', especialidade: '', crm: '' })
  const [editando, setEditando] = useState(null)
  const [toast, setToast] = useState(null)

  const especialidadesComuns = [
    'Cardiologia',
    'Dermatologia',
    'Ginecologia',
    'Ortopedia',
    'Pediatria',
    'Psiquiatria',
    'Clínico Geral'
  ]

  useEffect(() => {
    carregarMedicos()
  }, [])

  const carregarMedicos = async () => {
    try {
      const response = await api.get('/medicos')
      setMedicos(response.data)
    } catch (error) {
      console.error('Erro ao carregar médicos:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editando) {
        await api.put(`/medicos/${editando}`, form)
      } else {
        await api.post('/medicos', form)
      }
      setForm({ nome: '', especialidade: '', crm: '' })
      setEditando(null)
      carregarMedicos()
      setToast({ message: 'Médico salvo com sucesso!', type: 'success' })
    } catch (error) {
      console.error('Erro ao salvar médico:', error)
      setToast({ message: 'Erro ao salvar médico', type: 'error' })
    }
  }

  const handleEditar = (medico) => {
    setForm({ nome: medico.nome, especialidade: medico.especialidade, crm: medico.crm })
    setEditando(medico.id)
  }

  const handleExcluir = async (id) => {
    if (confirm('Deseja excluir este médico?')) {
      try {
        await api.delete(`/medicos/${id}`)
        carregarMedicos()
      } catch (error) {
        console.error('Erro ao excluir médico:', error)
      }
    }
  }

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1>Gestão de Médicos</h1>
      
      <div className="card">
        <h2>{editando ? 'Editar Médico' : 'Cadastrar Médico'}</h2>
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
            <label>Especialidade:</label>
            <input
              list="especialidades"
              type="text"
              value={form.especialidade}
              onChange={(e) => setForm({ ...form, especialidade: e.target.value })}
              required
            />
            <datalist id="especialidades">
              {especialidadesComuns.map(esp => (
                <option key={esp} value={esp} />
              ))}
            </datalist>
          </div>
          
          <div className="form-group">
            <label>CRM:</label>
            <input
              type="text"
              value={form.crm}
              onChange={(e) => setForm({ ...form, crm: e.target.value })}
              required
            />
          </div>
          
          <button type="submit">{editando ? 'Atualizar' : 'Cadastrar'}</button>
          {editando && (
            <button type="button" onClick={() => {
              setEditando(null)
              setForm({ nome: '', especialidade: '', crm: '' })
            }} style={{ marginLeft: '10px' }}>
              Cancelar
            </button>
          )}
        </form>
      </div>

      <div className="card">
        <h2>Lista de Médicos</h2>
        {medicos.length === 0 ? (
          <p>Nenhum médico cadastrado.</p>
        ) : (
          medicos.map(medico => (
            <div key={medico.id} className="list-item">
              <div className="list-item-info">
                <strong>{medico.nome}</strong> - {medico.especialidade} (CRM: {medico.crm})
              </div>
              <div className="list-item-actions">
                <button onClick={() => handleEditar(medico)}>Editar</button>
                <button className="danger" onClick={() => handleExcluir(medico.id)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Medicos
