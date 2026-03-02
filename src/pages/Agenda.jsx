import { useState, useEffect } from 'react'
import api from '../services/api'

function Agenda() {
  const [horarios, setHorarios] = useState([])
  const [medicos, setMedicos] = useState([])
  const [dataSelecionada, setDataSelecionada] = useState('')

  useEffect(() => {
    carregarMedicos()
    const hoje = new Date().toISOString().split('T')[0]
    setDataSelecionada(hoje)
  }, [])

  useEffect(() => {
    if (dataSelecionada) {
      carregarHorarios()
    }
  }, [dataSelecionada])

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
      const horariosDoDia = response.data.filter(h => h.data === dataSelecionada)
      setHorarios(horariosDoDia.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio)))
    } catch (error) {
      console.error('Erro ao carregar horários:', error)
    }
  }

  const getMedicoNome = (medicoId) => {
    const medico = medicos.find(m => m.id === medicoId)
    return medico ? `${medico.nome} - ${medico.especialidade}` : 'Médico não encontrado'
  }

  const formatarData = (data) => {
    const [ano, mes, dia] = data.split('-')
    return `${dia}/${mes}/${ano}`
  }

  return (
    <div>
      <h1>Agenda do Dia</h1>
      
      <div className="card">
        <div className="form-group">
          <label>Selecione a Data:</label>
          <input
            type="date"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        <h2>Atendimentos - {formatarData(dataSelecionada)}</h2>
        {horarios.length === 0 ? (
          <p>Nenhum atendimento agendado para este dia.</p>
        ) : (
          horarios.map(horario => (
            <div key={horario.id} className="list-item">
              <div className="list-item-info">
                <strong>{horario.horaInicio} - {horario.horaFim}</strong><br />
                {getMedicoNome(horario.medicoId)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Agenda
