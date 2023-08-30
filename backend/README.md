## Sumário

- [Sumário](#sumário)
- [Contexto](#contexto)
- [Regras de Negócio](#regras-de-negócio)
  - [Funcionalidade do usuário](#funcionalidade-do-usuário)
  - [Funcionalidade de Assinatura](#funcionalidade-de-assinatura)
- [Firebase e Mercado Pago](#firebase-e-mercado-pago)
  - [Banco de Dados](#banco-de-dados)
  - [API do Mercado Pago](#api-do-mercado-pago)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
  - [Download do projeto](#download-do-projeto)
  - [Instalação de Dependências](#instalação-de-dependências)
  - [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
  - [Execução](#execução)
  - [Lint](#lint)

## Contexto

O **Backend** deste projeto desempenha um papel essencial para garantir o funcionamento apropriado da aplicação e para integrar-se com diversos serviços externos, como o Firebase e o Mercado Pago. Algumas de suas principais funções são:

- **Validação de Dados e Registração de Usuários**: Valida os dados das requisições e, quando adequado, registra um novo usuário, conforme as informações recebidas do **Frontend**.

- **Validação de Dados de Login**: Enquanto a autenticação inicial é realizada pelo `Firebase`, o `token` gerado é encaminhado ao **Backend**. Este, por sua vez, realiza verificações adicionais, garantindo a autenticidade e, posteriormente, retorna informações complementares sobre o usuário necessárias para a lógica do **Frontend**.
  
- **Integração e Legitimidade de Dados**: Funciona como intermediário entre o **Frontend** e o banco de dados, certificando-se de que todas as informações a serem inseridas ou atualizadas são legítimas e estão íntegras.
  
- **Respostas de Requisições**: Retorna ao **Frontend** as respostas apropriadas, sejam elas indicativas de sucesso ou erro.
  
- **Integração com o Firebase**: Automatiza a conexão com o `Firebase`, carregando e configurando as chaves necessárias para uma integração eficaz.
  
- **Integração com o Mercado Pago**: Embora o **Frontend** inicie a interação com a `API` do `Mercado Pago`, o **Backend** é responsável por validar as informações retornadas e finalizar a interação com a `API`, principalmente no que se refere à aquisição de assinaturas.

Detalhes adicionais sobre a integração com o `Firebase`, `Mercado Pago`, e outras especificações técnicas serão explorados nas seções subsequentes e `READMEs` específicos.

## Regras de Negócio

Estamos utilizando principalmente o **Joi** para aplicar as regras de negócios e validações. O **Joi** é um validador de dados para `JavaScript` que utiliza um esquema para descrever a forma de dados que são permitidos e que serão validados. O **Joi** é extremamente poderoso e flexível, e pode ser utilizado para validar dados de forma consistente e confiável.

- **Autenticação e Registro**:
  Em operações de login, registro e atualização, o esquema principal verifica a presença de um token, que é essencial para autenticação no Firebase:

  ```javascript
  const authSchema = Joi.object({
    idToken: Joi.string().required(),
  });
  ```

- **Pagamento**:  
  A rota de pagamento exige a validação de diversos dados, incluindo:
  - `ID` do usuário
  - Método de pagamento selecionado, que deve ser ou `credit_card` ou `bank_transfer`
  - Uma referência externa
  - Detalhes do pagamento, que incluem:
    - `Token` do cartão (quando o método de pagamento é `credit_card`)
    - `ID` do método de pagamento
    - Valor da transação (positivo e com duas casas decimais)
    - Quantidade de parcelas (quando o método de pagamento é `credit_card`)
    - Detalhes do pagador, incluindo email

  Os esquemas garantem que os dados necessários sejam fornecidos e estejam no formato correto.

- **Verificação do Status de Pagamento e Cancelamento**:  
  Estes esquemas validam o `ID` do usuário e o `ID` do pagamento, garantindo que sejam fornecidos e estejam no formato correto.

Estas validações garantem que todas as informações fornecidas ao backend estejam no formato correto, assegurando a integridade dos dados e a segurança das transações. Em especial, o esquema de pagamento assegura que as informações de pagamento sejam não apenas presentes, mas consistentes e seguras, protegendo assim tanto a integridade das transações quanto a experiência do usuário.

---

Esse refinamento destaca a importância das validações no backend, especialmente quando se trata de pagamentos, e a robustez dos esquemas de validação usados para proteger os dados e a integridade das transações.

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

## Firebase e Mercado Pago

### Banco de Dados

O `banco de dados` do projeto foi desenvolvido utilizando o `Firebase`, uma plataforma de desenvolvimento que oferece várias ferramentas como autenticação, armazenamento e banco de dados em tempo real. Abaixo detalhamos a estrutura utilizada no `Firebase` para que o projeto funcione corretamente.

O `README` detalhado sobre nossa integração com o **Firebase**, abrangendo configurações, fluxos e práticas recomendadas, pode ser encontrado [aqui](../Firebase.md).

### API do Mercado Pago

O `Mercado Pago` é uma das soluções de pagamento mais reconhecidas e utilizadas na América Latina. No contexto deste projeto, utilizamos a `API do Mercado Pago` para gerenciar e processar transações de pagamento, permitindo que os usuários realizem pagamentos de forma segura e confiável.

A integração com a `API do Mercado Pago` é essencial para garantir que os pagamentos sejam processados corretamente, e que toda a lógica de negócios associada a pagamentos (como validação, notificações de pagamento, gestão de assinaturas, entre outros) seja adequadamente tratada.

Para uma visão detalhada da nossa integração com a `API do Mercado Pago`, incluindo configurações, fluxos e melhores práticas, consulte o `README` específico sobre esta integração, acessível [aqui](../MercadoPago.md).

## Tecnologias e Ferramentas Utilizadas

As tecnologias de`Backend` selecionadas para este projeto, por conta de suas vantagens específicas, foram:

- [Node.js](https://nodejs.org/en): A plataforma de desenvolvimento em `JavaScript` foi escolhida para a construção do `backend` devido à sua alta performance, facilidade de aprendizado e ampla adoção na comunidade de desenvolvimento.
- [Joi](https://github.com/sideway/joi): Esta biblioteca de validação de dados em `JavaScript` foi escolhida por sua facilidade de uso e versatilidade na validação de diversos tipos de dados.
- [Express](https://expressjs.com/): Este `framework web` para `Node.js` foi escolhido devido à sua simplicidade e eficácia na criação de rotas e endpoints do backend.
- [@hapi/boom](https://github.com/hapijs/boom): Utilizei a biblioteca `Boom` para lidar com erros `HTTP` de forma mais fácil e organizada, permitindo uma melhor manipulação e apresentação dos erros para os usuários.

## Instalação e Execução

### Download do projeto

Primeiro, você precisa fazer o clone do repositório do projeto. Para isso, use o comando:

```bash
git clone git@github.com:imsamuelcovalero/Project-Private-Media
```

### Instalação de Dependências

Após clonar o projeto, navegue até o diretório `backend` e instale as dependências necessárias com os seguintes comandos:

```bash
cd Project-Private-Media

cd backend
npm install
```

Esses comandos instalam todas as dependências listadas no arquivo `package.json`, que são necessárias para a execução do projeto.

### Configuração de Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para configuração de valores sensíveis ou específicos do ambiente, como chaves secretas, nomes de usuário e senhas.

No diretório do `backend`, você encontrará o arquivo `.env.example`, que contêm exemplos das variáveis de ambiente que o projeto espera.

1. Renomeie o arquivo `.env.example` para `.env`.
2. Substitua os valores conforme necessário. As variáveis incluem:

```bash
PORT= # porta da aplicação

#### API MERCADO PAGO CHAVE PRIVADA
MERCADOPAGO_ACCESS_TOKEN=suaChavePrivada # a chave privada do Mercado Pago deve vir aqui

#### FIREBASE # não é necessário inserir as variáveis de ambiente do Firebase, pois elas são carregadas automaticamente pelo arquivo loadFirebaseConfig.js
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=
```

### Execução

Após a instalação das dependências e a configuração das variáveis de ambiente, você pode iniciar a aplicação com o seguinte comando:

```bash
npm run dev
```

Este comando inicia o servidor de desenvolvimento e ficará disponível na porta definida na variável PORT do .env ou 3001, caso não tenha sido definida. O backend estará acessível através do endereço `http://localhost:${PORT}` ou `http://localhost:3001` no navegador.

### Lint

Para verificar a qualidade do código com o linter, use o comando:

```bash
npm run lint
```

- O `backend` foi desenvolvido seguindo os padrões de código JavaScript com o uso do [ESLint](https://eslint.org/), utilizando a extensão 'trybe-backend' e algumas regras personalizadas para promover um código limpo e bem estruturado.

É importante lembrar que, ao encontrar problemas durante a instalação ou execução, uma boa prática é verificar as mensagens de erro que aparecem no terminal. Elas geralmente fornecem pistas sobre o que pode estar errado. Também é recomendável manter todas as dependências atualizadas e garantir que seu ambiente de desenvolvimento esteja configurado corretamente. Além disso, é aconselhável consultar a documentação oficial das dependências usadas no projeto em caso de problemas.

Em caso de dúvidas, não hesite em abrir uma [issue](https://github.com/imsamuelcovalero/Project-Private-Media/issues) no GitHub ou me contatar diretamente. Estou à disposição para ajudar.

Espero que estas instruções sejam úteis para a instalação e execução do projeto. Se houver mais alguma coisa em que eu possa ajudar, por favor, me avise.

[⬆ Voltar ao topo](#sumário)<br>
[⬅ Voltar para a página anterior](../README.md)
