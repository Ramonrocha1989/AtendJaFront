export const medicosMock = [
  { id: 1, nome: 'Dr. João Silva', especialidade: 'Cardiologia', crm: '12345-SP' },
  { id: 2, nome: 'Dra. Maria Santos', especialidade: 'Pediatria', crm: '67890-SP' },
  { id: 3, nome: 'Dr. Pedro Costa', especialidade: 'Ortopedia', crm: '11223-SP' }
]

const hoje = new Date().toISOString().split('T')[0]
const amanha = new Date(Date.now() + 86400000).toISOString().split('T')[0]

export const horariosMock = [
  { id: 1, medicoId: 1, data: hoje, horaInicio: '08:00', horaFim: '12:00' },
  { id: 2, medicoId: 2, data: hoje, horaInicio: '09:00', horaFim: '13:00' },
  { id: 3, medicoId: 3, data: hoje, horaInicio: '14:00', horaFim: '18:00' },
  { id: 4, medicoId: 1, data: amanha, horaInicio: '08:00', horaFim: '12:00' },
  { id: 5, medicoId: 2, data: amanha, horaInicio: '14:00', horaFim: '18:00' }
]
