# Node API - Gerenciador de Transações Financeiras

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v20-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Fastify](https://img.shields.io/badge/Fastify-5.x-000000?logo=fastify)
![License](https://img.shields.io/badge/License-ISC-yellow)

Uma API REST robusta para gerenciar transações financeiras, desenvolvida com **Fastify**, **TypeScript** e **SQLite/PostgreSQL**.

[Diagrama de Rotas](#diagrama-de-rotas) • [Características](#características) • [Tecnologias](#tecnologias) • [Instalação](#instalação) • [Uso](#uso) • [Endpoints](#endpoints) • [Contribuindo](#contribuindo)

</div>

---

## 📋 Sobre o Projeto

Uma aplicação de backend desenvolvida como projeto de **aprendizado e portfólio** durante a formação Node.js da Rocketseat. A API oferece funcionalidades essenciais para gerenciar transações financeiras (receitas e despesas), com suporte a cookie-based sessions para rastreamento de usuários.

**Público-alvo:** Desenvolvedores e recrutadores interessados em conhecer a implementação de uma API REST profissional.

---

## 🗺️ Diagrama de Rotas

Esta API possui 4 principais rotas de transações financeiras, cada uma com uma função específica:

- **GET `/transactions`** - Lista todas as transações do usuário
- **GET `/transactions/:id`** - Busca uma transação específica por ID
- **POST `/transactions`** - Cria uma nova transação financeira
- **GET `/summary`** - Retorna um resumo com o saldo total das transações

Todas as rotas de consulta (`GET`) utilizam cookie-based sessions para identificar o usuário. O fluxo completo, incluindo diagramas interativos e exemplos de requisições, está disponível no arquivo de documentação detalhada:

### 📊 [Visualizar Diagrama Detalhado](ROUTES_DIAGRAM.md)

O diagrama inclui:

- 📈 Fluxo visual das principais rotas
- 🔄 Diagrama de sequência de dados
- 💻 Exemplos práticos de requisições
- 🔐 Detalhes sobre middleware de segurança

---

## ✨ Características

- ✅ **Gerenciamento de Transações** - Criar, listar e consultar transações financeiras
- ✅ **Resumo Financeiro** - Visualizar o saldo total das transações
- ✅ **Session Management** - Rastreamento automático de usuários via cookies
- ✅ **Validação de Dados** - Schemas validados com Zod
- ✅ **Testes Automatizados** - Cobertura de testes com Vitest
- ✅ **Migrations de Banco de Dados** - Versionamento com Knex
- ✅ **Suporte Multi-Ambiente** - SQLite (dev) e PostgreSQL (produção)
- ✅ **Type-Safe** - 100% TypeScript

---

## 🛠️ Tecnologias

### Backend

- **[Fastify](https://www.fastify.io/)** - Framework web rápido e de baixa overhead
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript com tipagem estática
- **[Zod](https://zod.dev/)** - Validação de schemas e tipos
- **[Knex.js](http://knexjs.org/)** - Query builder e migration tool

### Banco de Dados

- **[SQLite3](https://www.sqlite.org/)** - Desenvolvimento local
- **[PostgreSQL](https://www.postgresql.org/)** - Produção

### Testes & Qualidade

- **[Vitest](https://vitest.dev/)** - Test runner rápido com suporte ESM
- **[Supertest](https://github.com/visionmedia/supertest)** - HTTP assertions
- **[ESLint](https://eslint.org/)** - Linter para código consistente
- **[c8](https://github.com/bcoe/c8)** - Coverage reporter

### Ferramentas

- **[tsx](https://github.com/esbuild-kit/tsx)** - Executor de TypeScript
- **[tsup](https://tsup.egoist.dev/)** - Bundler e build tool
- **[pnpm](https://pnpm.io/)** - Package manager rápido

---

## 📦 Instalação

### Pré-requisitos

- **Node.js** ≥ 20.x
- **pnpm** ≥ 10.x (ou npm/yarn)

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/emmanuelmarcosdeoliveira/financial-management.git
cd financial-management
```

2. **Instale as dependências**

```bash
pnpm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

4. **Execute as migrações do banco de dados**

```bash
pnpm knex migrate:latest
```

5. **Inicie o servidor em desenvolvimento**

```bash
pnpm dev
```

A API estará disponível em `http://localhost:3333`

---

## 🚀 Uso Rápido

### Criar uma Transação

```bash
curl -X POST http://localhost:3333/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Freelance Work",
    "price": 150.00,
    "type": "income",
    "category": "Work"
  }'
```

### Listar Transações

```bash
curl http://localhost:3333/api/transactions
```

### Obter Resumo Financeiro

```bash
curl http://localhost:3333/api/summary
```

---

## 📚 Endpoints

### Health Check

| Método | Endpoint      | Descrição                |
| ------ | ------------- | ------------------------ |
| `GET`  | `/api/health` | Verifica o status da API |

### Transações

| Método | Endpoint                | Descrição                  | Auth |
| ------ | ----------------------- | -------------------------- | ---- |
| `POST` | `/api/transactions`     | Criar uma nova transação   | ❌   |
| `GET`  | `/api/transactions`     | Listar todas as transações | ✅   |
| `GET`  | `/api/transactions/:id` | Obter transação específica | ✅   |
| `GET`  | `/api/summary`          | Obter resumo financeiro    | ✅   |

### Request/Response Exemplos

#### POST /api/transactions

**Request:**

```json
{
  "title": "Despesa com refeição",
  "price": 45.5,
  "type": "outcome",
  "category": "Alimentação",
  "createdAt": "2026-08-13T10:30:00Z"
}
```

**Response (201 Created):**

```json

```

#### GET /api/transactions

**Response (200 OK):**

```json
{
  "transactions": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Freelance Work",
      "price": 150.0,
      "type": "income",
      "category": "Work",
      "created_at": "2026-08-13T10:30:00.000Z",
      "session_id": "uuid-da-sessao"
    }
  ]
}
```

#### GET /api/transactions/:id

**Response (200 OK):**

```json
{
  "transaction": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Freelance Work",
    "price": 150.0,
    "type": "income",
    "category": "Work",
    "created_at": "2026-08-13T10:30:00.000Z",
    "session_id": "uuid-da-sessao"
  }
}
```

#### GET /api/summary

**Response (200 OK):**

```json
{
  "summary": {
    "amount": 104.5
  }
}
```

---

## 🗄️ Estrutura do Banco de Dados

### Tabela: transactions

| Coluna       | Tipo          | Descrição               |
| ------------ | ------------- | ----------------------- |
| `id`         | UUID          | Identificador único     |
| `title`      | TEXT          | Título da transação     |
| `price`      | DECIMAL(10,2) | Valor da transação      |
| `type`       | TEXT          | Tipo (income/outcome)   |
| `category`   | TEXT          | Categoria da transação  |
| `created_at` | TIMESTAMP     | Data de criação         |
| `session_id` | UUID          | ID da sessão do usuário |

---

## 📁 Estrutura do Projeto

```
src/
├── app.ts                 # Configuração do Fastify
├── server.ts              # Inicialização do servidor
├── env/
│   └── index.ts           # Validação de variáveis de ambiente
├── routes/
│   └── transaction.ts      # Rotas de transações
├── middlewares/
│   └── check-session-id-exists.ts  # Middleware de validação de sessão
└── test/
    └── transaction.spec.ts # Testes da API

database/
├── migrations/
│   ├── 20260801023140_create-transactions.ts
│   └── 20260802221544_add-session-id-to-transactions.ts
└── index.ts (database.ts) # Configuração do banco

.env.example              # Variáveis de ambiente de exemplo
knexfile.ts               # Configuração do Knex
tsconfig.json             # Configuração do TypeScript
vitest.config.ts          # Configuração do Vitest
```

---

## 🧪 Testes

### Executar testes

```bash
pnpm test
```

### Executar testes com cobertura

```bash
pnpm coverage
```

### Modo watch (watch mode)

```bash
pnpm test -- --watch
```

---

## 🔨 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia o servidor com hot reload

# Testes
pnpm test             # Executa os testes
pnpm coverage         # Gera relatório de cobertura

# Build
pnpm build            # Compila para produção (build/)

# Banco de Dados
pnpm knex             # Acessa CLI do Knex
pnpm knex migrate:make <name>   # Criar nova migration
pnpm knex migrate:latest        # Aplicar migrações pendentes
pnpm knex migrate:rollback      # Reverter última migration

# Qualidade de Código
pnpm lint             # Executa ESLint
```

---

## 🌍 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Ambiente
NODE_ENV=development

# Banco de Dados
DB_CLIENT=sqlite                    # 'sqlite' ou 'pg' (postgresql)
DB_FILENAME=./tmp/app.db           # Apenas para SQLite
DB_HOST=localhost                   # Apenas para PostgreSQL
DB_PORT=5432                        # Apenas para PostgreSQL
DB_USER=postgres                    # Apenas para PostgreSQL
DB_PASSWORD=senha                   # Apenas para PostgreSQL
DB_DATABASE=node_api                # Apenas para PostgreSQL

# Servidor
SERVER_PORT=3333
```

---

## 🚀 Deployment

### Render

1. **Conecte seu repositório GitHub ao Render**
2. **Configure as variáveis de ambiente** no painel do Render
3. **Defina o comando de build:**
   ```bash
   pnpm install && pnpm build && pnpm knex migrate:latest
   ```
4. **Defina o comando de start:**
   ```bash
   node build/server.cjs
   ```

### Docker (Opcional)

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build && pnpm knex migrate:latest

EXPOSE 3333
CMD ["node", "build/server.cjs"]
```

---

## 📝 Padrões de Código

### Validação com Zod

```typescript
const schema = z.object({
  title: z.string(),
  price: z.number().positive(),
  type: z.enum(["income", "outcome"]),
});
```

### Middleware de Session

```typescript
server.get(
  "/transactions",
  { preHandler: [checkSessionIdExists] },
  async (request) => {
    const { sessionId } = request.cookies;
    // ...
  },
);
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a Licença ISC - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👨‍💻 Autor

**Emmanuel Marcos de Oliveira**

- LinkedIn: [LinkedIn Emmanuel](https://www.linkedin.com/in/oliveira-emmanuel/)
- GitHub: [GitHub Emmanuel Oliveira](https://github.com/emmanuelmarcosdeoliveira)
- Email: oliveira.fullstack@gmail.com

---

## 📚 Recursos e Referências

- [Documentação Fastify](https://www.fastify.io/docs/latest/)
- [Documentação TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação Zod](https://zod.dev/)
- [Documentação Knex](http://knexjs.org/)
- [Documentação Vitest](https://vitest.dev/)
- [Rocketseat](https://www.rocketseat.com.br)

---

<div align="center">

**[⬆ Voltar ao topo](#node-api---gerenciador-de-transações-financeiras)**

</div>
