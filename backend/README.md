## Sumário

- [Sumário](#sumário)
- [Contexto](#contexto)
- [Regras de Negócio](#regras-de-negócio)
  - [Funcionalidade do usuário](#funcionalidade-do-usuário)
  - [Funcionalidade de Assinatura](#funcionalidade-de-assinatura)
- [Banco de Dados](#banco-de-dados)
  - [Estrutura e Criação](#estrutura-e-criação)
    - [Storage](#storage)
    - [Authentication](#authentication)
    - [Firestore Database](#firestore-database)
      - [usuários](#usuários)
      - [fotos](#fotos)
      - [videos](#videos)
      - [categorias](#categorias)
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

O **Backend** deste projeto desempenha um papel essencial para garantir o funcionamento apropriado da aplicação e para integrar-se com diversos serviços externos, como o Firebase e o Mercado Pago. Algumas de suas principais funções são:

- **Validação de Dados e Registração de Usuários**: Valida os dados das requisições e, quando adequado, registra um novo usuário, conforme as informações recebidas do **Frontend**.
  
- **Validação de Dados de Login**: Enquanto a autenticação inicial é realizada pelo `Firebase`, o `token` gerado é encaminhado ao **Backend**. Este, por sua vez, realiza verificações adicionais, garantindo a autenticidade e, posteriormente, retorna informações complementares sobre o usuário necessárias para a lógica do **Frontend**.
  
- **Integração e Legitimidade de Dados**: Funciona como intermediário entre o **Frontend** e o banco de dados, certificando-se de que todas as informações a serem inseridas ou atualizadas são legítimas e estão íntegras.
  
- **Respostas de Requisições**: Retorna ao **Frontend** as respostas apropriadas, sejam elas indicativas de sucesso ou erro.
  
- **Integração com o Firebase**: Automatiza a conexão com o Firebase, carregando e configurando as chaves necessárias para uma integração eficaz.
  
- **Integração com o Mercado Pago**: Embora o **Frontend** inicie a interação com a `API` do `Mercado Pago`, o **Backend** é responsável por validar as informações retornadas e finalizar a interação com a `API`, principalmente no que se refere à aquisição de assinaturas.

Detalhes adicionais sobre a integração com o `Firebase`, `Mercado Pago`, e outras especificações técnicas serão explorados nas seções subsequentes.

## Regras de Negócio

Estamos utilizando principalmente o __Joi__ para aplicar as regras de negócios e validações. O __Joi__ é um validador de dados para `JavaScript` que utiliza um esquema para descrever a forma de dados que são permitidos e que serão validados. O __Joi__ é extremamente poderoso e flexível, e pode ser utilizado para validar dados de forma consistente e confiável.

<details>
<summary>Requisitos levantados</summary>

### Funcionalidade do usuário

Os usuários devem ser capazes de:

- **Login e Logout:** Autenticar-se no sistema e deslogar quando necessário.
- **Registro:** Criar um novo perfil de usuário.
- **Edição de Perfil:** Atualizar informações pessoais.
- **Validação de Token:** Após a autenticação via Firebase, o backend deve validar o token gerado e retornar informações relacionadas ao status de assinatura do usuário e outras informações pertinentes.
- **Aquisição de Assinatura:** Adquirir assinatura, com validação do pagamento e consequente atualização do status de assinatura do usuário.

### Funcionalidade de Assinatura

Os usuários devem ser capazes de adquirir uma assinatura, realizando o pagamento único pelo plano mensal, tendo as opções de cartão de crédito ou pix. O backend é responsável por:

- **Validação do Pagamento:** Confirmar que o pagamento foi bem-sucedido.
- **Atualização de Status:** Atualizar o status da assinatura do usuário para ativo e adicionar 1 mês de assinatura ao perfil do usuário.

</details>

## Banco de Dados

O banco de dados do projeto foi desenvolvido utilizando o Firebase, uma plataforma de desenvolvimento que oferece várias ferramentas como autenticação, armazenamento e banco de dados em tempo real. Abaixo detalhamos a estrutura utilizada no Firebase para que o projeto funcione corretamente.

### Estrutura e Criação

#### Storage

O Storage é a solução do Firebase para armazenar arquivos como imagens, vídeos e outros conteúdos. É neste local que os clientes irão fazer o upload de suas mídias para uso na aplicação. Cada mídia carregada gera uma URL que será posteriormente utilizada no Firestore Database nas coleções "fotos" e "videos".

#### Authentication

O Authentication é a ferramenta do Firebase para autenticação de usuários. A estrutura é a seguinte:

Foto1

Nota: O UID gerado é essencial, pois ele é utilizado como identificador único em outros lugares, como no Firestore Database.

#### Firestore Database

Este é o banco de dados em tempo real do Firebase. Ele é organizado em coleções e documentos. As coleções utilizadas no projeto são:

##### usuários

Cada documento representa um usuário e seu ID coincide com o UID do Authentication. Exemplo de estrutura:

Foto2

##### fotos

Exemplo de estrutura:

Foto3

##### videos

Estrutura semelhante à coleção "fotos".

##### categorias

Cada categoria possui um conjunto de IDs que fazem referência a fotos e vídeos relacionados.

Foto4


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
