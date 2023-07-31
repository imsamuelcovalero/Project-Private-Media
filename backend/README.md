## Sumário

- [Sumário](#sumário)
- [Contexto](#contexto)
- [Regras de Negócio](#regras-de-negócio)
- [Banco de Dados](#banco-de-dados)
  - [Diagrama](#diagrama)
- [API](#api)
  - [Acesso Online](#acesso-online)
  - [Acesso Local](#acesso-local)
  - [Autenticação](#autenticação)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
  - [Download do projeto](#download-do-projeto)
  - [Instalar dependências](#instalar-dependências)
    - [Configuração Local](#configuração-local)
    - [Configuração Docker](#configuração-docker)
  - [Executando com Docker](#executando-com-docker)
  - [Executando sem Docker](#executando-sem-docker)
  - [Lint](#lint)
  - [Testes](#testes)

## Contexto

Neste projeto, o __Backend__ desempenha diversas funções fundamentais, tais como:

- Montar a estrutura inicial das tabelas e relações através do [`Mongoose`](https://mongoosejs.com/).
- Possui alguns *scripts* no `package.json` para cuidar da organização e inicialização correta da aplicação, dando a opção de reiniciar o banco de dados ou manter os dados existentes.
- Validar a requisição e registrar um novo usuário no banco de dados, caso seja criado pelo `Frontend`.
- Receber do `Frontend` as entradas de dados e aplicar as validações e regras de negócio, em caso de uma nova ordem de compra.
- Devolver para o `Frontend` as respostas das requisições, sejam elas de sucesso ou de erro.
- Cuidar da integridade e legitimidade dos dados.
- Ao receber uma nova ordem de compra, gravar as informações pertinentes no `banco de dados`, inclusive o valor atualizado do saldo de *cashback* do cliente.
- Prover para o `Frontend` o histórico de compras do cliente, com as informações de cada compra e o valor de *cashback* acumulado.

## Regras de Negócio

Estamos utilizando principalmente o __Joi__ para aplicar as regras de negócios e validações. O __Joi__ é um validador de dados para `JavaScript` que utiliza um esquema para descrever a forma de dados que são permitidos e que serão validados. O __Joi__ é extremamente poderoso e flexível, e pode ser utilizado para validar dados de forma consistente e confiável.

<details>
<summary>Requisitos levantados</summary>

1. __Funcionalidade do usuário__: Os usuários devem ser capazes de fazer login, registrar-se e visualizar seu histórico de pedidos. A validação de novos usuários e o registro de suas informações no banco de dados são responsabilidade do backend. O sistema deve ser capaz de lidar com informações de usuário únicas, como nome de usuário e e-mail.

2. __Funcionalidade de produtos__: Os usuários devem ser capazes de visualizar e escolher produtos para comprar. O sistema deve garantir que cada produto tenha um nome único e deve ser capaz de lidar com o preço e a imagem do produto.

3. __Funcionalidade de carrinho de compras__: Os usuários devem ser capazes de adicionar produtos ao carrinho de compras e efetuar o checkout. Durante o checkout, os usuários devem ter a opção de usar seu cashback para reduzir o valor total da compra. O backend deve receber as entradas de dados do frontend e aplicar as validações e regras de negócio necessárias.

4. __Funcionalidade de cashback__: Após cada compra, o sistema deve calcular e atualizar o saldo de cashback do cliente. Este saldo deve ser registrado no banco de dados e estar disponível para consulta na página de histórico de ordens.

5. __Funcionalidade de pontos de retirada__: Os usuários devem ter a opção de escolher um ponto de retirada durante o checkout. Cada ponto de retirada deve ter um nome e um endereço únicos.

6. __Funcionalidade de histórico de ordens__: Os usuários devem ser capazes de consultar o histórico de ordens, que inclui informações sobre cada compra e o valor de cashback acumulado. O backend deve fornecer essas informações para o frontend.

</details>

## Banco de Dados

O banco de dados foi criado utilizando o `MongoDB` e o `Mongoose` para gerenciar as tabelas e relações. O diagrama abaixo representa a estrutura do banco de dados:

### Diagrama

<div align="center">

![Diagrama do banco de dados](https://github.com/imsamuelcovalero/Project-Our-Shop-App-Angular/assets/98184355/0064391a-778b-4a36-8478-92263db5ee76)

</div>
  
## API

A `API` é documentada e fácil de usar, graças ao `Swagger`, uma ferramenta que permite a exploração dos endpoints da `API` e os esquemas de dados associados por meio de uma interface interativa. Além disso, foi realizado o *__deploy__* da aplicação no `Railway`.

Você pode acessar a documentação da `API` *__online__* ou __localmente__.

### Acesso Online

A documentação `Swagger` está hospedada e pode ser acessada no seguinte link: [API Documentation](https://our-shop-app-backend-production.up.railway.app/docs/).

### Acesso Local

Caso deseje rodar a aplicação localmente e acessar a documentação, siga estes passos:

1. Certifique-se que a aplicação está rodando. Por padrão, ela deve estar rodando na `porta 3001`.

2. Abra um navegador web e acesse a URL `http://localhost:3001/docs`.

A interface do `Swagger` deve aparecer, fornecendo acesso a informações detalhadas sobre a `API` e permitindo que você experimente os diferentes *endpoints*.

### Autenticação

Alguns *endpoints* requerem autenticação. Quando um usuário realiza o *login*, um __*token*__ é gerado e retornado como parte da resposta. Este __*token*__ deve ser fornecido no campo de __*Authorization*__ do `Swagger` para acessar esses *endpoints*.

Por favor, note que a autenticação é necessária para garantir a segurança dos dados e permitir que apenas usuários autorizados acessem determinadas funcionalidades.

## Tecnologias e Ferramentas Utilizadas

Na construção do `Backend`, optei por utilizar uma variedade de tecnologias e ferramentas, selecionadas por suas vantagens específicas:

- [Node.js](https://nodejs.org/en): A plataforma de desenvolvimento em `JavaScript` foi escolhida para a construção do `backend` devido à sua alta performance, facilidade de aprendizado e ampla adoção na comunidade de desenvolvimento.
- [MongoDB](https://www.mongodb.com/): O `MongoDB`, um banco de dados não-relacional, foi utilizado devido à sua flexibilidade e escalabilidade, perfeitamente adequado para aplicativos modernos.
- [Mongoose](https://mongoosejs.com/): Uma biblioteca para `MongoDB` e `Node.js` que proporciona uma solução direta, baseada em esquemas, para modelar os dados da aplicação.
- [Joi](https://github.com/sideway/joi): Esta biblioteca de validação de dados em `JavaScript` foi escolhida por sua facilidade de uso e versatilidade na validação de diversos tipos de dados.
- [Express](https://expressjs.com/): Este `framework web` para `Node.js` foi escolhido devido à sua simplicidade e eficácia na criação de rotas e endpoints do backend.
- [JWT](https://jwt.io/): `JSON Web Tokens` é um padrão __RFC 7519__, que define uma forma compacta e autossuficiente para transmitir informações com segurança entre as partes como um objeto `JSON`.
- [@hapi/boom](https://github.com/hapijs/boom): Utilizei a biblioteca `Boom` para lidar com erros `HTTP` de forma mais fácil e organizada, permitindo uma melhor manipulação e apresentação dos erros para os usuários.
- [Mocha](https://mochajs.org/): `Mocha` é um framework de testes `JavaScript` flexível e de fácil utilização, com suporte para testes síncronos e assíncronos.
- [Chai](https://www.chaijs.com/): `Chai` é uma biblioteca de asserção para `Node.js` que proporciona um rico conjunto de asserções que podem ser usadas para escrever testes de forma mais legível e expressiva.
- [Sinon](https://sinonjs.org/): `Sinon` é uma biblioteca de testes que oferece recursos como *spies*, *stubs* e *mocks*, facilitando a criação de testes unitários e de integração.

## Instalação e Execução

### Download do projeto

Primeiro, você precisa fazer o clone do repositório do projeto. Para isso, use o comando:

```bash
git clone git@github.com:imsamuelcovalero/Project-Our-Shop-App-Angular.git
```

### Instalar dependências

Em seguida, navegue até o diretório `backend` e instale as dependências necessárias com os seguintes comandos:

```bash
cd Project-Our-Shop-App-Angular

cd backend
npm install
```

Esses comandos instalam todas as dependências listadas no arquivo `package.json`, que são necessárias para a execução do projeto.

<details>
<summary>Configuração de Variáveis de Ambiente</summary>

  O projeto utiliza variáveis de ambiente para configuração de valores sensíveis ou específicos do ambiente, como chaves secretas, nomes de usuário e senhas.

  No diretório do `backend`, você encontrará dois arquivos `.env.example` e `.docker.example.env`. Esses arquivos contêm exemplos das variáveis de ambiente que o projeto espera.

  #### Configuração Local

  1. Renomeie o arquivo `.env.example` para `.env`.
  2. Substitua os valores conforme necessário. As variáveis incluem:

  ```bash
  #### SECRET VARIABLES
  JWT_SECRET=suaSenhaSecreta

  MONGO_INITDB_DATABASE=mongodb # name_db
  MONGO_INITDB_ROOT_USERNAME=root # probably root
  MONGO_INITDB_ROOT_PASSWORD=suaSenha # probably password
  MONGO_URI=mongodb://localhost:27017/mongodb # mongodb://localhost:27017/name_db
  ```

  #### Configuração Docker

  1. Renomeie o arquivo `.docker.example.env` para `.env`.
  2. Substitua os valores conforme necessário. As variáveis incluem:

  ```bash
  #### SECRET VARIABLES
  JWT_SECRET=suaSenhaSecreta

  MONGO_INITDB_DATABASE=mongodb # name_db
  MONGO_INITDB_ROOT_USERNAME=root # probably root
  MONGO_INITDB_ROOT_PASSWORD=suaSenha # probably password
  MONGO_URI=mongodb://mongodb:27017/mongodb # mongodb://mongodb:27017/name_db
  ```

  Substitua cada valor com os detalhes do seu próprio ambiente.

  __Nota:__ As variáveis `MONGO_INITDB_DATABASE`, `MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD` e `MONGO_URI` são usadas para configurar a conexão com o __MongoDB__. Lembre-se de usar valores que correspondam à configuração do seu banco de dados.

</details>

### Executando com Docker

Para executar o projeto utilizando `Docker`, assegure-se de ter o `Docker` e o `Docker Compose` instalados em sua máquina. Em seguida, no diretório raiz do projeto, execute o seguinte comando:

```bash
docker-compose up -d
```

**Importante:** Note que se já tiver executado este comando no `frontend`, não será necessário executá-lo novamente, pois o `Docker Compose` já terá criado os containers necessários para a execução do projeto.

O `serviço backend` será executado na porta 3001.

### Executando sem Docker

Caso prefira executar o projeto sem `Docker`, após a instalação das dependências, você pode iniciar a aplicação com o seguinte comando:

```bash
cd Project-Our-Shop-App-Angular

cd backend
npm run dev
```

Este comando inicia o servidor de desenvolvimento e ficará disponível na porta 3001, geralmente acessível através do endereço `http://localhost:3001` no navegador.

### Lint

Para verificar a qualidade do código com o linter, use o comando:

```bash
npm run lint
```

### Testes

Para assegurar a qualidade do código e o funcionamento correto das funcionalidades, foram escritos testes unitários utilizando Mocha, Chai e Sinon. Você pode executar os testes com o seguinte comando:

```bash
npm test
```

- O `backend` foi desenvolvido seguindo os padrões de código JavaScript com o uso do [ESLint](https://eslint.org/), utilizando a extensão 'trybe-backend' e algumas regras personalizadas para promover um código limpo e bem estruturado.

É importante lembrar que, ao encontrar problemas durante a instalação ou execução, uma boa prática é verificar as mensagens de erro que aparecem no terminal. Elas geralmente fornecem pistas sobre o que pode estar errado. Também é recomendável manter todas as dependências atualizadas e garantir que seu ambiente de desenvolvimento esteja configurado corretamente. Além disso, é aconselhável consultar a documentação oficial das dependências usadas no projeto em caso de problemas.

Em caso de dúvidas, não hesite em abrir uma [issue](https://github.com/imsamuelcovalero/Desafio_Shopper/issues) no GitHub ou me contatar diretamente. Estou à disposição para ajudar.

Espero que estas instruções sejam úteis para a instalação e execução do projeto. Se houver mais alguma coisa em que eu possa ajudar, por favor, me avise.

[⬆ Voltar ao topo](#sumário)<br>
[⬅ Voltar para a página anterior](../README.md)
