![Logo of the project](readme/logo.png)

<p align = "center">
   <img src="https://img.shields.io/badge/author-MARCUS_VINICIUS-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/MARCUS_VINICIUS/projeto20-repoprovas?color=4dae71&style=flat-square" />
</p>


##  Descrição

Está é uma api complementar do projeto para o processo seletivo da NG.CASH

***

##  Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- Prisma
- Faker

***

## Rotas

```yml
POST /user/new
    - Rota para cadastrar um novo usuário
    - headers: {}
    - - body: {
        "username": "exemple_465",
        "password": "loremipsumA124",
        "confirmPassword": "loremipsumA124",
        }
```
    
```yml 
POST /user/login
    - Rota para fazer login
    - headers: {}
    - body: {
        "username": "exemple_465",
        "passoword": "loremipsumA124",
        }
```
    
```yml 
GET /user/find/:username (autenticada)
    - Rota para listar todas usuários pelo ussername
    - headers: { "x-acess-token": "Bearer $token" }
    - body: {}
```

```yml
GET /account/:accountId (autenticada)
    - Rota para listar a carteira do usuário logado, ou qualquer outro usuário
    - headers: { "x-acess-token": "Bearer $token" }
    - body: {}


``` 

```yml
POST /transaction/new (autenticada)
    - Rota para criar uma nova transação
    - headers: { "x-acess-token": "Bearer $token" }
    - body: {
        "userInId": "Id do user que receberá o valor (tipo: inteiro)",
        "userOutId": Id do user que tranferirá o valor (tipo: inteiro)",
        "accountInId": "Conta de recebimento (tipo: inteiro)",
        "accountOutId": "Conta da tranferência (tipo: inteiro)",
        "value: Valor a ser tranferido (float)"
    }
``` 

```yml
GET /transaction (autenticada)
    - Rota para listar o histórico das transações
    - headers: { "x-acess-token": "Bearer $token" }
    - body: {}


``` 
 
***

## 🏁 Rodando a aplicação


Dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm run dev:docker
```

Para iniciar o seed no data base, execute o commando
```
npm run dev:seed
```

Importe o arquivo "thunder-collection_repoprovas" no thunder client, para ver as rotas detalhadamente.

Se quiser rodar um servidor na sua própria máquina, crie um arquivo ".env" na raiz do repositório de acordo com o ".env.development"
