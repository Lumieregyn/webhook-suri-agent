# Webhook IA Checklist – GPT-4o

Este projeto recebe mensagens via webhook, analisa com GPT-4o se o checklist comercial foi seguido corretamente e retorna um alerta inteligente.

## Requisitos

- Node.js 16+
- Conta na OpenAI com chave API (GPT-4o)
- Endpoint ativo com SURI apontando para /conversa

## Instalação

```bash
npm install
```

## Uso

1. Copie `.env.example` para `.env`
2. Insira sua chave da OpenAI (`OPENAI_API_KEY`)
3. Inicie com:

```bash
node index.js
```

## Estrutura

- `index.js`: servidor Express com integração GPT
- `prompt_checklist_gpt4o.txt`: prompt inteligente de checklist
