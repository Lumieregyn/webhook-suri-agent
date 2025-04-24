# Servidor Webhook Lumieregyn

Este projeto é um servidor Express simples com uma rota `/conversa` para análise de conversas.

## Instalação

```bash
npm install
```

## Execução

```bash
npm start
```

O servidor iniciará na porta `10000` (pode ser configurado via `PORT`).

- **GET /**: Retorna status do servidor.
- **POST /conversa**: Recebe payload JSON com campos `cliente`, `vendedor` e `message` (ou `mensagem`).

