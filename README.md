# Drinks Frontend

Projeto de um sistema onde o usuário pode visualizar bebidas e criar favoritos.

Nesse sistema o usuário pode:

- Visualizar uma lista de categoritas de bebidas;
- Clicar em uma categoria e visualizar as bebidas dentro dessa categoria;
- Pesquisar por bebidas;
- Fazer login e favoritar bebidas;
- Visualizar seus favoritos;

## Setup

A versão do *Node* utilizada é a v20.5.1, e *npm* na versão 9.8.0.

Instale as dependências:

```bash
npm install
```

## Variáveis de ambiente

Copie o arquivo com as variáveis de ambiente:

```bash
cp .env.example .env
```

## Servidor de desenvolvimento

Confira se o backend está rodando, se estiver, rode o servidor do frontend em `http://localhost:3000`:

```bash
npm run dev
```