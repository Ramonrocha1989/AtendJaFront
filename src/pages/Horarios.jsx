import { useState, useEffect } from 'react'
import api from '../services/api'
import Toast from '../components/Toast'

function Horarios() {
  const [horarios, setHorarios] = useState([])
  const [medicos, setMedicos] = useState([])
  const [form, setForm] = useState({
    medicoId: '',
    data: '',
    horaInicio: '',
    horaFim: ''
  })
  const [editando, setEditando] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    carregarMedicos()
    carregarHorarios()
  }, [])

  const carregarMedicos = async () => {
    try {
      const response = await api.get('/medicos')
      setMedicos(response.data)
    } catch (error) {
      console.error('Erro ao carregar médicos:', error)
    }
  }

  const carregarHorarios = async () => {
    try {
      const response = await api.get('/horarios')
      setHorarios(response.data)
    } catch (error) {
      console.error('Erro ao carregar horários:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const conflito = horarios.find(h => {
      if (editando && h.id === editando) return false
      if (String(h.medicoId) !== String(form.medicoId) || h.data !== form.data) return false
      return (form.horaInicio < h.horaFim && form.horaFim > h.horaInicio)
    })
    
    if (conflito) {
      setToast({ message: 'Este médico já possui um horário agendado neste período!', type: 'error' })
      return
    }
    
    try {
      if (editando) {
        await api.put(`/horarios/${editando}`, form)
      } else {
        await api.post('/horarios', form)
      }
      setForm({ medicoId: '', data: '', horaInicio: '', horaFim: '' })
      setEditando(null)
      carregarHorarios()
      setToast({ message: 'Horário salvo com sucesso!', type: 'success' })
    } catch (error) {
      console.error('Erro ao salvar horário:', error)
      setToast({ message: 'Erro ao salvar horário', type: 'error' })
    }
  }

  const handleEditar = (horario) => {
    setForm({
      medicoId: horario.medicoId,
      data: horario.data,
      horaInicio: horario.horaInicio,
      horaFim: horario.horaFim
    })
    setEditando(horario.id)
  }

  const handleExcluir = async (id) => {
    if (confirm('Deseja excluir este horário?')) {
      try {
        await api.delete(`/horarios/${id}`)
        carregarHorarios()
      } catch (error) {
        console.error('Erro ao excluir horário:', error)
      }
    }
  }

  const getMedicoNome = (medicoId) => {
    const medico = medicos.find(m => m.id === medicoId)
    return medico ? medico.nome : 'Médico não encontrado'
  }

  const formatarData = (data) => {
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
  }

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1>Horários de Atendimento</h1>
      
      <div className="card">
        <h2>{editando ? 'Editar Horário' : 'Cadastrar Horário'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Médico:</label>
            <select
              value={form.medicoId}
              onChange={(e) => setForm({ ...form, medicoId: e.target.value })}
              required
            >
              <option value="">Selecione um médico</option>
              {medicos.map(medico => (
                <option key={medico.id} value={medico.id}>
                  {medico.nome} - {medico.especialidade}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Data:</label>
            <input
              type="date"
              value={form.data}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Hora Início:</label>
            <input
              type="time"
              value={form.horaInicio}
              onChange={(e) => setForm({ ...form, horaInicio: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Hora Fim:</label>
            <input
              type="time"
              value={form.horaFim}
              onChange={(e) => setForm({ ...form, horaFim: e.target.value })}
              required
            />
          </div>
          
          <button type="submit">{editando ? 'Atualizar' : 'Cadastrar'}</button>
          {editando && (
            <button type="button" onClick={() => {
              setEditando(null)
              setForm({ medicoId: '', data: '', horaInicio: '', horaFim: '' })
            }} style={{ marginLeft: '10px' }}>
              Cancelar
            </button>
          )}
        </form>
      </div>

      <div className="card">
        <h2>Lista de Horários</h2>
        {horarios.length === 0 ? (
          <p>Nenhum horário cadastrado.</p>
        ) : (
          horarios.map(horario => (
            <div key={horario.id} className="list-item">
              <div className="list-item-info">
                <strong>{getMedicoNome(horario.medicoId)}</strong><br />
                {formatarData(horario.data)}: {horario.horaInicio} - {horario.horaFim}
              </div>
              <div className="list-item-actions">
                <button onClick={() => handleEditar(horario)}>Editar</button>
                <button className="danger" onClick={() => handleExcluir(horario.id)}>Excluir</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Horarios
