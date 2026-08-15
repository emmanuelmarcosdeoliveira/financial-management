# Diagrama de Rotas - API Gerenciador de Transações

## Fluxo das Principais Rotas

```mermaid
graph TD
    A["Cliente HTTP"] --> B{"Qual Rota?"}

    B -->|GET /transactions| C["Listar Transações<br/>(com Session ID)"]
    C --> D["Valida Session ID"]
    D --> E["Retorna lista de transações<br/>do usuário"]

    B -->|GET /transactions/:id| F["Buscar Transação por ID<br/>(com Session ID)"]
    F --> G["Valida Session ID"]
    G --> H{"Transação<br/>encontrada?"}
    H -->|Sim| I["Retorna transação"]
    H -->|Não| J["Retorna 404"]

    B -->|POST /transactions| K["Criar Transação"]
    K --> L{"Session ID<br/>existe?"}
    L -->|Não| M["Gera novo UUID"]
    L -->|Sim| N["Usa Session ID existente"]
    M --> O["Salva transação no BD"]
    N --> O
    O --> P["Retorna 201 Created"]

    B -->|GET /summary| Q["Obter Resumo Financeiro<br/>(com Session ID)"]
    Q --> R["Valida Session ID"]
    R --> S["Calcula soma de todas<br/>as transações"]
    S --> T["Retorna resumo com amount total"]
```

## Detalhes das Rotas

### 📥 **Entrada de Rotas**

| Método | Rota                | Descrição                            | Autenticação                 |
| ------ | ------------------- | ------------------------------------ | ---------------------------- |
| `GET`  | `/transactions`     | Lista todas as transações do usuário | Session Cookie ✅            |
| `GET`  | `/transactions/:id` | Busca uma transação específica       | Session Cookie ✅            |
| `POST` | `/transactions`     | Cria uma nova transação              | Automática (cria/usa cookie) |
| `GET`  | `/summary`          | Retorna resumo financeiro            | Session Cookie ✅            |

### 🔐 **Middleware de Segurança**

- **`checkSessionIdExists`**: Valida se o `sessionId` está presente nos cookies nas rotas GET `/transactions`, GET `/transactions/:id` e GET `/summary`
- Cookie de sessão válido por: **7 dias**

### 📊 **Fluxo de Dados**

```mermaid
sequenceDiagram
    participant Cliente
    participant Fastify as Fastify Server
    participant Middleware
    participant DB as Database

    Cliente->>Fastify: POST /transactions {title, price, type, category}
    Fastify->>Middleware: Verifica sessionId nos cookies
    alt Sem sessionId
        Middleware->>Fastify: Gera novo UUID
        Fastify->>Fastify: setCookie(sessionId)
    else Com sessionId
        Middleware->>Fastify: Usa sessionId existente
    end
    Fastify->>DB: Insere nova transação
    DB->>Fastify: ✅ Confirmação
    Fastify->>Cliente: 201 Created

    Cliente->>Fastify: GET /transactions
    Fastify->>Middleware: Valida sessionId
    Middleware->>DB: Query: SELECT * WHERE session_id = ?
    DB->>Fastify: Retorna lista
    Fastify->>Cliente: 200 OK {transactions: []}

    Cliente->>Fastify: GET /summary
    Fastify->>Middleware: Valida sessionId
    Middleware->>DB: Query: SUM(price) WHERE session_id = ?
    DB->>Fastify: Retorna soma
    Fastify->>Cliente: 200 OK {summary: {amount}}
```

---

## 🚀 Exemplos de Requisições

### Criar uma Transação

```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Venda de Produtos",
    "price": 150.50,
    "type": "income",
    "category": "Vendas"
  }'
```

### Listar Transações

```bash
curl http://localhost:3000/transactions
```

### Buscar Transação por ID

```bash
curl http://localhost:3000/transactions/{id}
```

### Obter Resumo Financeiro

```bash
curl http://localhost:3000/summary
```

---

**Voltar para [README](README.md)**
