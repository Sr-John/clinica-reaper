# 🏥 Clínica Reaper - Sistema de Agendamento Médico

Aplicação Web Full-Stack desenvolvida como Trabalho da Disciplina para o curso de **Análise e Desenvolvimento de Sistemas (ADS)**. O sistema informatiza o processo de agendamento de consultas médicas, contando com autenticação segura e integração com serviços externos.

## 🚀 Tecnologias Utilizadas

### Frontend
* **Vue.js 3 (Composition API):** Framework reativo para construção da interface de usuário.
* **TypeScript:** Tipagem estática para maior segurança e prevenção de bugs.
* **Axios:** Cliente HTTP para comunicação com a API REST e APIs externas.
* **Vite:** Ferramenta de build otimizada e rápida.

### Backend
* **Node.js & Express:** Criação do servidor e gerenciamento das rotas da API REST.
* **MongoDB & Mongoose:** Banco de dados NoSQL para persistência de usuários e consultas.
* **JWT (JSON Web Token):** Middleware de segurança para proteção de rotas privadas.
* **CORS:** Controle de acesso HTTP.

### Integrações Externas (APIs)
* **ViaCEP:** Preenchimento automático de endereço completo a partir do CEP informado no cadastro.
* **OpenWeatherMap:** Exibição da previsão do tempo em tempo real no painel do paciente, com sistema de fallback (tratamento de erro 429) para garantir a estabilidade da interface.

## 🛠️ Como rodar o projeto localmente

### 1. Configurando o Backend
1. Abra o terminal e navegue até a pasta `backend`: `cd backend`
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env` na raiz do backend contendo suas variáveis de ambiente:
   * `MONGO_URI=sua_string_de_conexao_aqui`
   * `JWT_SECRET=seu_segredo_jwt_aqui`
4. Inicie o servidor: `npm run dev` (O servidor rodará na porta 3000).

### 2. Configurando o Frontend
1. Abra um novo terminal e navegue até a pasta `frontend`: `cd frontend`
2. Instale as dependências: `npm install`
3. Inicie a aplicação web: `npm run dev`
4. Acesse o link fornecido no terminal (geralmente `http://localhost:5173`) no seu navegador.

## 📌 Funcionalidades Principais (CRUD)
- Cadastro de novos usuários (com busca de CEP automatizada).
- Login criptografado com geração de token JWT.
- Agendamento de consultas médicas (Create).
- Listagem em tempo real do histórico de consultas do usuário logado (Read).
- Cancelamento/Exclusão de consultas (Delete).