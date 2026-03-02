// Script para criar admin inicial
const admin = {
  id: 1,
  nome: 'Admin',
  email: 'admin@clinica.com',
  senha: 'admin123',
  tipo: 'admin'
}

console.log('Usuário admin criado:')
console.log('Email: admin@clinica.com')
console.log('Senha: admin123')
console.log('')
console.log('Execute no console do navegador:')
console.log(`localStorage.setItem('usuarios', JSON.stringify([${JSON.stringify(admin)}]))`)
