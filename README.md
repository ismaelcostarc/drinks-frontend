# Drinks Frontend

Projeto de um sistema onde o usuário pode visualizar bebidas e criar favoritos.

Nesse sistema o usuário pode:

- Visualizar uma lista de categorias de bebidas;
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

O usuário para login é:

- **E-mail**: ismael@faster.com
- **Senha**: *secret*

## Testes unitários

Para rodar os testes unitários rode o comando:

```bash
npm run test
```

## Organização do projeto

Além dos diretórios e arquivos padrões do Nuxt, foram criados alguns adicionais como:

- **/app/router.options.ts**: Por razões de melhor personalização, esse projeto utiliza uma configuração de rotas customizada, e não a padrão do Nuxt.

- **/assets**: imagens e arquivos css, reset css e arquivos com variáveis. Esse projeto busca utilizar o máximo possível das variáveis CSS criadas, para que o visual seja padronizado.

- **/components**: diretório que contém os componentes utilizados no projeto. Em *base* foram colocados os componentes gerais, que não são muito ligados a regras de negócio e podem ser utilizados em qualquer lugar. Fora de base devem ser colocados os componentes que contém regras de negócio, mas como são utilizados por várias páginas.

- **/composables**: composables próprios do projeto, sendo *useCustomFetch* para realizar as requisições http, e *useModal* para melhor controlar o modal na página.

- **/middleware**: um middleware que é executado sempre que o usuário acessa uma página e é utilizado para controlar autenticação e autorização nas rotas.

- **/services**: arquivos que realizam as requisições para a API. Separei em arquivos separados, para evitar detalhes de requisições HTTP dentro das páginas. Se o projeto escalasse, também ajudaria a organizar tipos de corpos de requisições e respostas mais complexos.

- **/store**: as stores controlam apenas o estado o usuário autenticado e do layout. A maior parte do estado e da lógica está nos próprios componentes. Por ser um projeto simples, não há necessidade de mover toda a lógica das páginas para stores.

- **/types**: tipos que são utilizados em vários lugares do projeto

## Considerações

#### Dificuldades

- O composable *useFetch*, próprio do Nuxt, acabou se mostrando não ser a melhor opção para realizar requisições, mas acabaria levando muito mais tempo para substituir ele em todo o projeto.

- O código para organizar os favoritos é repetido em mais de um lugar, e seria possível substituir por um composable, mas o *useFetch* acabou complicando fazer isso.

#### Pontos que podem ser desenvolvidos

- Os componentes base podem ser separados em um projeto separado, transformados em um pacote npm, e serem lançados em release. Isso permitira que fossem utilizados em outros projetos.

- Pode ser feito uma documentação em Storybook para os componentes base.

- O projeto possui testes unitários, mas pode ser acrescentado o Cypress para realizar testes e2e.

- A API já possui paginação e ordenação, então o componente de Table pode ser modificado para apresentar páginas e ordenação.

- Os componentes podem apresentar mais variáveis de cores, tamanhos e tipos dos componentes.

- Pode ser utilizado um pacote de loading ou skeleton para tornar os carregamentos mais suaves.