#  API REST – Plataforma Campo Minado

## Sobre o Projeto

Este projeto consiste no desenvolvimento de uma API REST para uma plataforma de apostas inspirada no jogo **Campo Minado**. A aplicação foi desenvolvida como atividade avaliativa da disciplina de **Desenvolvimento Web / Back-end**, seguindo os princípios da arquitetura REST para gerenciamento de usuários, autenticação e partidas do jogo.

---

##  Tecnologias Utilizadas

As principais tecnologias utilizadas no desenvolvimento da API foram:

* Node.js
* Express.js
* PostgreSQL
* pg (node-postgres)
* Nodemon
* Dotenv
* CORS

---

##  Como Executar o Projeto

### 1. Clonar ou baixar o projeto

Faça o download ou clone o repositório para sua máquina, garantindo que todos os arquivos e pastas do projeto estejam presentes.

### 2. Configurar o banco de dados

No PostgreSQL (via pgAdmin ou outro gerenciador), crie um banco de dados chamado:

```sql
campo_minado_db
```

Em seguida, crie as tabelas necessárias para o funcionamento da aplicação, como:

* usuarios
* partidas
* (demais tabelas utilizadas no projeto)

### 3. Instalar as dependências

Abra o terminal na pasta raiz do projeto e execute:

```bash
npm install
```

Esse comando instalará todas as dependências listadas no arquivo `package.json`.

### 4. Iniciar o servidor

Após a instalação das dependências, execute:

```bash
npm run dev
```

Se tudo estiver configurado corretamente, o terminal exibirá a seguinte mensagem:

```
Servidor rodando na porta 3000
```

---

#  Rotas Disponíveis

##  Autenticação (`/auth`)

### POST `/auth/register`

Realiza o cadastro de novos usuários, aplicando validações de dados e requisitos para criação de senhas seguras.

### POST `/auth/login`

Autentica o usuário utilizando e-mail e senha, retornando os dados do perfil e o saldo disponível.

### PATCH `/auth/reset-password`

Permite alterar a senha do usuário de forma segura.

---

##  Usuários (`/users`)

### GET `/users/dashboard`

Retorna informações estatísticas utilizadas no painel principal da aplicação.

### GET `/users/:id`

Busca um usuário pelo seu ID.

### PUT `/users/:id`

Atualiza o saldo do usuário, validando valores negativos e limitando o número de casas decimais.

### DELETE `/users/:id`

Remove permanentemente um usuário do sistema.

---

##  Partidas (`/games`)

### POST `/games/start`

Inicia uma nova partida de Campo Minado com o valor da aposta informado.

### POST `/games/:gameId/reveal`

Revela uma posição específica do tabuleiro, informando linha e coluna.

### POST `/games/:gameId/cashout`

Finaliza a partida voluntariamente, calculando e retornando os ganhos acumulados.

---

##  Estrutura do Projeto

```
api-campo-minado
│
├── controllers/
├── routes/
├── services/
├── database/
├── middlewares/
├── .env
├── package.json
└── server.js
```

---

##  Desenvolvedor

**Matheus Israael Carlos Pessoa**

Projeto desenvolvido como atividade acadêmica da disciplina de **Desenvolvimento Web / Back-end**, utilizando Node.js, Express e PostgreSQL para a construção de uma API REST.
