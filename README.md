# Webhook Server - Lumieregyn

Servidor Node.js/Express para receber e analisar webhooks de conversas (via WhatsApp/SURI).

## Rotas

- **GET /**  
  - Retorna status de saúde do servidor.

- **POST /conversa**  
  - Recebe JSON com campos `cliente`, `vendedor`, `mensagem` ou `checklist`.  
  - Gera logs no console:
    - `👤 Cliente: ...`
    - `🙋 Vendedor: ...`
    - `📩 Mensagem recebida: ...`

## Como usar

1. Instalar dependências:
   ```bash
   npm install
   ```
2. Iniciar servidor:
   ```bash
   npm start
   ```
3. Testar localmente:
   - `GET http://localhost:10000/`  
   - `POST http://localhost:10000/conversa` com JSON no corpo.

4. Deploy:
   - Suba no GitHub e conecte ao Render/Heroku.
