# AtendeJá - Sistema de Gestão de Atendimentos Médicos

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.21-purple)
![License](https://img.shields.io/badge/license-MIT-green)

Sistema completo para gestão de médicos, horários de atendimento e agendamentos. Interface moderna e intuitiva desenvolvida em React.

## 📋 Funcionalidades

- ✅ **Autenticação** - Login com controle de acesso (Admin/Funcionário)
- 👥 **Gestão de Usuários** - Cadastro e gerenciamento de funcionários
- 👨‍⚕️ **Gestão de Médicos** - CRUD completo com especialidades
- 📅 **Gestão de Horários** - Agendamento com validação de conflitos
- 📊 **Agenda do Dia** - Visualização de atendimentos por data
- 🔔 **Notificações Toast** - Feedback visual amigável
- 🔒 **Validação de Senhas** - Confirmação de senha no cadastro

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **React Router DOM** - Navegação entre páginas
- **Axios** - Cliente HTTP para API
- **Vite** - Build tool e dev server
- **CSS3** - Estilização moderna

## 📦 Instalação

### Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- Backend rodando na porta 8080

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/projetoFrontAtendeJa.git
cd projetoFrontAtendeJa
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com a URL do seu backend:
```env
VITE_API_URL=http://localhost:8080/api
```

4. Execute o projeto:
```bash
npm run dev
```

O projeto estará disponível em: **http://localhost:5173**

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🌐 Deploy no Netlify

1. Faça push do código para o GitHub
2. Conecte o repositório no Netlify
3. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Environment variable:** `VITE_API_URL` = URL do backend em produção

## 🔌 API Backend

O frontend espera que o backend esteja rodando em `http://localhost:8080/api` (ou conforme configurado no `.env`).

### Endpoints Necessários

#### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/logout` - Logout

#### Usuários/Funcionários
- `GET /api/usuarios` - Listar todos
- `POST /api/usuarios` - Criar novo
- `PUT /api/usuarios/:id` - Atualizar
- `DELETE /api/usuarios/:id` - Excluir

#### Médicos
- `GET /api/medicos` - Listar todos
- `POST /api/medicos` - Criar novo
- `PUT /api/medicos/:id` - Atualizar
- `DELETE /api/medicos/:id` - Excluir

#### Horários
- `GET /api/horarios` - Listar todos
- `POST /api/horarios` - Criar novo
- `PUT /api/horarios/:id` - Atualizar
- `DELETE /api/horarios/:id` - Excluir

### Formato de Dados

**Usuário:**
```json
{
  "nome": "string",
  "email": "string",
  "senha": "string",
  "tipo": "admin" | "funcionario"
}
```

**Médico:**
```json
{
  "nome": "string",
  "especialidade": "string",
  "crm": "string"
}
```

**Horário:**
```json
{
  "medicoId": number,
  "data": "YYYY-MM-DD",
  "horaInicio": "HH:mm",
  "horaFim": "HH:mm"
}
```

## 📱 Aplicativo Desktop (Electron)

Para criar um executável desktop que roda offline:

1. Instale as dependências:
```bash
npm install --save-dev electron electron-builder
```

2. Coloque o backend Node na pasta `backend/`

3. Build:
```bash
npm run electron:build
```

O instalador será gerado na pasta `release/`.

## 📂 Estrutura do Projeto

```
projetoFrontAtendeJa/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   └── Toast.jsx      # Notificações
│   ├── context/           # Context API
│   │   └── AuthContext.jsx
│   ├── pages/             # Páginas da aplicação
│   │   ├── Login.jsx
│   │   ├── Funcionarios.jsx
│   │   ├── Medicos.jsx
│   │   ├── Horarios.jsx
│   │   └── Agenda.jsx
│   ├── services/          # Serviços e API
│   │   └── api.js
│   ├── styles/            # Estilos CSS
│   │   └── Toast.css
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Entry point
│   └── index.css          # Estilos globais
├── .env                   # Variáveis de ambiente (não commitado)
├── .env.example           # Exemplo de variáveis
├── netlify.toml           # Configuração Netlify
├── package.json
└── vite.config.js
```

## 🎨 Funcionalidades Detalhadas

### Validação de Conflitos
O sistema impede o cadastro de horários conflitantes para o mesmo médico na mesma data.

### Especialidades Sugeridas
Campo de especialidade com datalist oferecendo sugestões:
- Cardiologia
- Dermatologia
- Ginecologia
- Ortopedia
- Pediatria
- Psiquiatria
- Clínico Geral

### Notificações Toast
Feedback visual elegante para:
- ✅ Sucesso nas operações
- ❌ Erros e validações
- ⚠️ Avisos importantes

## 🔐 Segurança

- Autenticação via JWT (token armazenado no localStorage)
- Validação de senhas com confirmação
- Controle de acesso por tipo de usuário
- Proteção de rotas sensíveis

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido por [Seu Nome]

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no GitHub.
