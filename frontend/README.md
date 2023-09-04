## Sumário

- [Sumário](#sumário)
- [Contexto](#contexto)
- [Regras de Negócio](#regras-de-negócio)
  - [Login](#login)
  - [Registro](#registro)
  - [Edição de Perfil](#edição-de-perfil)
- [Firebase e Mercado Pago](#firebase-e-mercado-pago)
  - [Firebase](#firebase)
  - [LocalStorage](#localstorage)
  - [Integração com Mercado Pago](#integração-com-mercado-pago)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
  - [Download do projeto](#download-do-projeto)
  - [Instalação de Dependências](#instalação-de-dependências)
  - [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
  - [Execução](#execução)
- [Lint](#lint)

## Contexto

O **Frontend** deste projeto oferece a interface principal com a qual os usuários interagem, apresentando funcionalidades variadas e essenciais para a experiência do usuário. As responsabilidades principais do **Frontend** incluem:

- **Autenticação e Criação de Conta**: Permite que os usuários se registrem e acessem a plataforma. A autenticação é essencial para garantir o acesso restrito às funcionalidades e dados de cada usuário. Graças ao `Authentication` do `Firebase`, os dados são criptografados e um `token` é enviado ao `backend`, garantindo ainda mais a segurança durante o processo de autenticação. Além disso, os usuários têm a opção de redefinir suas senhas em caso de esquecimento.

- **Perfil do Usuário**: Os usuários têm a capacidade de acessar e modificar seus perfis, incluindo a alteração de nomes e senhas, proporcionando assim personalização e segurança à experiência do usuário.

- **Interação com o Mercado Pago**: O **Frontend** inicia o processo de assinatura através da `API do Mercado Pago`, permitindo que os usuários contratem assinaturas de maneira fácil e segura.

- **Navegação por Categorias e Mídias**: Oferece uma experiência de navegação intuitiva, onde os usuários podem explorar diferentes categorias e interagir com as mídias, todas provenientes do `Firebase`.

- **Logout**: Garante que os usuários possam encerrar suas sessões de forma segura, ajudando a proteger suas contas e informações pessoais.

- **Adaptação Responsiva**: A aplicação foi projetada para ser totalmente responsiva, adaptando-se de forma harmoniosa a diferentes tamanhos de tela, desde desktops até dispositivos móveis. Isso garante que os usuários tenham uma experiência fluida e consistente, independentemente do dispositivo utilizado.

Com estas características, o **Frontend** se destina a garantir que os usuários tenham uma experiência fluida, segura e amigável ao usar a aplicação.

## Regras de Negócio

A validação no **Frontend** é uma parte crucial da integridade e segurança dos dados na nossa aplicação. Ao estabelecer regras claras para o preenchimento dos campos e fornecer *feedbacks* diretos aos usuários, minimizamos a possibilidade de erros, garantimos que os dados sejam corretos e prevemos potenciais tentativas maliciosas.

### Login

- **Email**:
  - O email precisa ser um email válido, seguindo o padrão comum de emails (e.g., `usuario@example.com`).
  - Regex utilizado: `/\S+@\S+\.\S{2,}/`.

- **Senha**:
  - Deve conter no mínimo 8 caracteres.
  - Deve conter ao menos uma letra maiúscula.
  - Deve conter ao menos um número.
  - Regex utilizado: `/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/`.
  
  Com essas regras, garantimos que os usuários utilizem senhas fortes, reduzindo o risco de ataques e acesso não autorizado.

### Registro

- **Nome**:
  - Campo obrigatório.
  - Deve ter no mínimo 3 caracteres.

- **Email e Senha**:
  - Seguem as mesmas regras definidas na seção de Login.

- **Confirmação de Senha**:
  - O campo de confirmação de senha é obrigatório.
  - A senha e a confirmação devem ser iguais.

### Edição de Perfil

- **Nome**:
  - Segue as mesmas regras definidas na seção de Registro.

- **Senha**:
  - Antes de alterar a senha, é necessário verificar a senha atual do usuário.

- **Confirmação de Senha**:
  - Segue as mesmas regras definidas na seção de Registro.

Este processo garante que a atualização de informações sensíveis, como a senha, seja feita de forma consciente e segura pelo usuário.

---

Estas validações são essenciais para garantir que os dados enviados ao `Firebase` estejam corretos e seguros. A robustez dessas validações no **Frontend** também permite uma maior eficiência e segurança, uma vez que o **Backend** apenas lida com tokens, delegando a validação inicial ao **Frontend** e ao `Firebase`.

## Firebase e Mercado Pago

### Firebase

O projeto se beneficia amplamente do `Firebase`, uma solução versátil que nos oferece recursos como autenticação, armazenamento, e um banco de dados em tempo real. A integração com o Firebase garante uma experiência de usuário otimizada e a possibilidade de atualizações em tempo real.

Se desejar compreender a fundo como implementamos o **Firebase** no frontend e obter informações sobre configurações, fluxos e boas práticas, convidamos você a ler nosso `README` detalhado, disponível [aqui](../Firebase.md).

### LocalStorage

O `LocalStorage` é utilizado para otimizar a experiência de usuários visitantes ou daqueles sem uma assinatura ativa. Com ele, conseguimos armazenar, de forma temporária e segura, metadados sobre as mídias exibidas, permitindo um acesso rápido e reduzindo a necessidade de consultas constantes ao `Firebase`. O processo de busca por novas mídias é realizado apenas após 2 horas da consulta prévia, evitando repetições frequentes e economizando recursos.

Com a introdução do sistema de paginação, as consultas ao `Firebase` são ainda mais otimizadas. Em vez de buscar aleatoriamente no banco de dados completo, a consulta é feita em páginas específicas de mídias, equilibrando a variedade do conteúdo exibido com a eficiência da consulta.

A estrutura armazenada no `LocalStorage` é organizada da seguinte maneira:

```json
{
  "<categoryId>": {
    "<mediaType>": {
      "data": [
        {
          "categoriaId": "cat1",
          "dataCriacao": {
            "seconds": 1692659463,
            "nanoseconds": 411000000
          },
          "descricao": "",
          "id": "rT8UPo7C1BxOyOE9f7rF",
          "url": "https://firebasestorage.googleapis.com/v0/b/plataforma-node-e-react.appspot.com/o/gato3.png?alt=media&token=32c2541e-144f-48dd-8c4f-ee3d3f11addd"
        },
        ...
      ],
      "time": <timestamp>
    }
  }
}
```

Nesta estrutura:

- **`<categoryId>`**: é o identificador da categoria da mídia
- **`<mediaType>`**: É o tipo de mídia, que pode ser `fotos` ou `videos`.
- **`data`**: é um array contendo até 5 mídias selecionadas aleatoriamente.
- **`time`**: é um registro de quando essa informação foi armazenada no `LocalStorage`.

A função responsável por armazenar essas informações no `LocalStorage` é:

```javascript
/* função que armazena as mídias e o tempo no localStorage */
export const addMediasTimeToLocalStorage = (categoryId, mediaType, medias) => {
  const storedMediaData = localStorage.getItem('reactNodeMediaData')
    ? JSON.parse(localStorage.getItem('reactNodeMediaData'))
    : {};

  if (!storedMediaData[categoryId]) {
    storedMediaData[categoryId] = {};
  }

  storedMediaData[categoryId][mediaType] = {
    data: medias,
    time: Date.now(),
  };

  localStorage.setItem('reactNodeMediaData', JSON.stringify(storedMediaData));
};
```

> ⚠️ **Reforçando**: O `LocalStorage` é utilizado apenas para armazenar metadados (informações leves) sobre as mídias exibidas, não as mídias em si. As mídias são armazenadas no `Firebase Storage` e são acessadas através de `URLs` que apontam para o local onde estão armazenadas.

### Integração com Mercado Pago

A integração com o `Mercado Pago`, uma das plataformas de pagamento líderes na América Latina, foi crucial para proporcionar uma experiência de compra segura e eficiente aos nossos usuários. Através desta parceria, o projeto permite transações práticas e confiáveis.

É fundamental entender como o frontend se comunica e trabalha em conjunto com a `API do Mercado Pago` para processar pagamentos e garantir que os usuários tenham uma experiência de compra excepcional. Para mergulhar nos detalhes desta integração e familiarizar-se com as configurações, fluxos e recomendações, veja o `README` dedicado, que pode ser acessado [aqui](../MercadoPago.md).

## Tecnologias e Ferramentas Utilizadas

O `Frontend` foi desenvolvido com o uso das seguintes tecnologias e ferramentas:

- [React](https://reactjs.org/): Optei pelo **React**, uma biblioteca `JavaScript` para a construção de interfaces de usuário. Reconhecido por sua eficiência e flexibilidade, o `React` nos permite criar componentes reutilizáveis, tornando o desenvolvimento mais modular e a manutenção mais simples.
  
- [Styled Components](https://styled-components.com/): O **Styled Components** auxilia na estilização dos componentes `React`. Através dele, é possível criar componentes estilizados reutilizáveis, garantindo que o estilo do aplicativo seja consistente e facilmente gerenciável.
  
- [Toast](https://github.com/fkhadra/react-toastify): Utilizei o **Toast** para fornecer feedback ao usuário por meio de notificações. Esta biblioteca permite a apresentação de mensagens de notificação de forma intuitiva e estilizada, melhorando a comunicação com o usuário.

- [axios](https://github.com/axios/axios): O **axios** é uma biblioteca `JavaScript` usada para realizar requisições `HTTP`. Sua interface limpa e capacidade de lidar com solicitações e respostas em `JSON` tornam a comunicação com `backends` e `APIs externas` mais eficiente e direta.

## Instalação e Execução

### Download do projeto

Primeiro, você precisa fazer o clone do repositório do projeto. Para isso, use o comando:

```bash
git clone git@github.com:imsamuelcovalero/Project-Private-Media
```

### Instalação de Dependências

Após clonar o projeto, navegue até o diretório `frontend` e instale as dependências necessárias com os seguintes comandos:

```bash
cd Project-Private-Media

cd frontend
npm install
```

Esses comandos instalam todas as dependências listadas no arquivo `package.json`, que são necessárias para a execução do projeto.

### Configuração de Variáveis de Ambiente

O projeto requer a configuração de variáveis de ambiente para lidar com informações sensíveis e específicas, como `chaves de API`, nomes de usuário e senhas.

Dentro do diretório do `frontend`, há um arquivo chamado `.env.example`, que contém exemplos de todas as variáveis de ambiente necessárias para o projeto.

1. Renomeie `.env.example` para simplesmente `.env`.
2. Atualize os valores placeholder com as configurações reais. As variáveis incluem:

Após realizar o deploy da aplicação, é essencial que a `URL` do `backend` seja definida no arquivo `.env` do `frontend`:

```bash
#### API Url ####
REACT_APP_API_URL=https://meusite.com # Substitua por seu próprio endereço do backend
```

Conforme detalhado no passo 5 de `**Obtendo Configurações de Inicialização**` no [Firebase](../Firebase.md), você deve coletar essas informações no `Firebase Console` e inseri-las aqui:

```bash
#### Configuração do Firebase ####
REACT_APP_FIREBASE_API_KEY=INSIRA_AQUI_SUA_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=INSIRA_AQUI_SEU_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID=INSIRA_AQUI_SEU_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=INSIRA_AQUI_SEU_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=INSIRA_AQUI_SEU_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID=INSIRA_AQUI_SUA_APP_ID
REACT_APP_FIREBASE_MEASUREMENT_ID=INSIRA_AQUI_SUA_MEASUREMENT_ID
```

Estas variáveis identificam categorias de mídia no `Firebase`. Certifique-se de que seus valores coincidam com aqueles configurados no `Firebase` e que sejam ***únicos***:

```bash
#### Firebase categories ####
REACT_APP_FIREBASE_CATEGORY_ID1=INSIRA_AQUI_SUA_CATEGORIA_ID1
REACT_APP_FIREBASE_CATEGORY_ID2=INSIRA_AQUI_SUA_CATEGORIA_ID2
REACT_APP_FIREBASE_CATEGORY_ID3=INSIRA_AQUI_SUA_CATEGORIA_ID3
REACT_APP_FIREBASE_CATEGORY_ID4=INSIRA_AQUI_SUA_CATEGORIA_ID4
REACT_APP_FIREBASE_CATEGORY_ID5=INSIRA_AQUI_SUA_CATEGORIA_ID5
```

Baseado no passo 4 de `**Criação e Configuração na Plataforma do Mercado Pago**` no `README` do [Mercado Pago](../MercadoPago.md):

```bash
#### Mercado Pago ####
REACT_APP_MERCADOPAGO_PUBLIC_KEY=INSIRA_AQUI_SUA_PUBLIC_KEY
REACT_APP_MERCADOPAGO_ID=INSIRA_AQUI_O_ID_DO_APLICATIVO
REACT_APP_SUBSCRIPTION_VALUE=INSIRA_AQUI_O_VALOR_DA_ASSINATURA
REACT_APP_SUBSCRIPTION_DESCRIPTION=INSIRA_AQUI_A_DESCRICAO_DA_ASSINATURA
```

- Insira a chave pública em `REACT_APP_MERCADOPAGO_PUBLIC_KEY`.
- Coloque o `ID` da aplicação em `REACT_APP_MERCADOPAGO_ID`.
- Defina o valor da assinatura mensal em `REACT_APP_SUBSCRIPTION_VALUE`.
- Estabeleça a descrição da assinatura em `REACT_APP_SUBSCRIPTION_DESCRIPTION`, que será exibida na fatura do usuário.
  
### Execução

Após a instalação das dependências e a configuração das variáveis de ambiente, você pode iniciar a aplicação com o seguinte comando:

```bash
npm start
```

Este comando inicia o servidor de desenvolvimento e o site ficará disponível na **porta 3000**, geralmente acessível através do endereço `http://localhost:3000` no navegador.

## Lint

Para verificar a qualidade do código com o `linter`, use o comando:

```bash
npm run lint
```

- O `frontend` foi desenvolvido seguindo os padrões de código JavaScript com o uso do [ESLint](https://eslint.org/), utilizando a extensão 'trybe-frontend' e algumas regras personalizadas para promover um código limpo e bem estruturado.

É importante lembrar que, ao encontrar problemas durante a instalação ou execução, uma boa prática é verificar as mensagens de erro que aparecem no terminal. Elas geralmente fornecem pistas sobre o que pode estar errado. Também é recomendável manter todas as dependências atualizadas e garantir que seu ambiente de desenvolvimento esteja configurado corretamente. Além disso, é aconselhável consultar a documentação oficial das dependências usadas no projeto em caso de problemas.

Em caso de dúvidas, não hesite em abrir uma [issue](https://github.com/imsamuelcovalero/Project-Private-Media/issues) no GitHub. Além disso, estou disponível para contato direto para mais esclarecimentos.

Espero que estas instruções sejam úteis para a instalação e execução do projeto. Não se esqueça de verificar o `README` do [backend](../backend/README.md) e realizar as configurações necessárias para que o projeto funcione corretamente. Se houver mais alguma coisa em que eu possa ajudar, por favor, me avise.

[⬆ Voltar ao topo](#sumário)<br>
[⬅ Voltar para a página anterior](../README.md)