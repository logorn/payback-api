# PayBack RESTful API
API RESTful para solicitação de reembolso de despesa e adiantamento de salário

### Objetivo
Prover serviços via HTTP de forma segura e rápida para transações de tempo real de forma escalável com tecnologias de alta disponibilidade.

### Instalação

#### Atenção
É necessário ter um servidor mongodb rodando em localhost:27017, esse endereço pode ser alterado em src/config.json. Instalação: https://docs.mongodb.com/manual/installation/
```sh
$ git clone https://github.com/pqnoje/payback-api.git
$ cd payback-api
$ npm install -g gulp
$ gulp assets && gulp scripts
$ npm start
```
### Rotas disponíveis
* GET /api/v1/auth
* POST /api/v1/auth
* GET /api/v1/users
* GET /api/v1/users/:id
* POST /api/v1/users
* POST /api/v1/:id/change_password
* POST /api/v1/recover_password
Em breve terá uma documentação completa para cada rota

### Contribuições
Suas contribuições serão muito úteis aqui. Sinta-se à vontade para enviar suas sugestões.

### Links úteis:
* https://docs.mongodb.com/manual/installation/
* https://nodejs.org/dist/latest-v6.x/docs/api
* https://github.com/gulpjs/gulp/blob/master/docs/API.md
* https://jwt.io/
* http://expressjs.com/pt-br/4x/api.html
* https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html
* https://github.com/DrkSephy/es6-cheatsheet
