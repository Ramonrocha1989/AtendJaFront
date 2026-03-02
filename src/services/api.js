import axios from 'axios'
import { medicosMock, horariosMock } from './mockData'

const useMock = false // Mude para false quando o backend estiver pronto

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

if (useMock) {
  let medicos = [...medicosMock]
  let horarios = [...horariosMock]
  let medicoIdCounter = 4
  let horarioIdCounter = 6

  api.interceptors.request.use(config => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { method, url } = config
        
        // Médicos
        if (url === '/medicos' && method === 'get') {
          config.adapter = () => Promise.resolve({ data: medicos, status: 200, statusText: 'OK', headers: {}, config })
        }
        if (url === '/medicos' && method === 'post') {
          const novoMedico = { ...config.data, id: medicoIdCounter++ }
          medicos.push(novoMedico)
          config.adapter = () => Promise.resolve({ data: novoMedico, status: 201, statusText: 'Created', headers: {}, config })
        }
        if (url.startsWith('/medicos/') && method === 'put') {
          const id = parseInt(url.split('/')[2])
          const index = medicos.findIndex(m => m.id === id)
          if (index !== -1) medicos[index] = { ...config.data, id }
          config.adapter = () => Promise.resolve({ data: medicos[index], status: 200, statusText: 'OK', headers: {}, config })
        }
        if (url.startsWith('/medicos/') && method === 'delete') {
          const id = parseInt(url.split('/')[2])
          medicos = medicos.filter(m => m.id !== id)
          config.adapter = () => Promise.resolve({ data: {}, status: 204, statusText: 'No Content', headers: {}, config })
        }
        
        // Horários
        if (url === '/horarios' && method === 'get') {
          config.adapter = () => Promise.resolve({ data: horarios, status: 200, statusText: 'OK', headers: {}, config })
        }
        if (url === '/horarios' && method === 'post') {
          const novoHorario = { ...config.data, id: horarioIdCounter++ }
          horarios.push(novoHorario)
          config.adapter = () => Promise.resolve({ data: novoHorario, status: 201, statusText: 'Created', headers: {}, config })
        }
        if (url.startsWith('/horarios/') && method === 'put') {
          const id = parseInt(url.split('/')[2])
          const index = horarios.findIndex(h => h.id === id)
          if (index !== -1) horarios[index] = { ...config.data, id }
          config.adapter = () => Promise.resolve({ data: horarios[index], status: 200, statusText: 'OK', headers: {}, config })
        }
        if (url.startsWith('/horarios/') && method === 'delete') {
          const id = parseInt(url.split('/')[2])
          horarios = horarios.filter(h => h.id !== id)
          config.adapter = () => Promise.resolve({ data: {}, status: 204, statusText: 'No Content', headers: {}, config })
        }
        
        resolve(config)
      }, 300)
    })
  })
}

export default api
