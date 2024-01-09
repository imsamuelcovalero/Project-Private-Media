# Bem-vindo ao Project-Private-Media 🎥 📸

O __Project-Private-Media__ é uma aplicação dedicada à exibição de mídias desenvolvida com `Firebase` para armazenamento e gerenciamento de dados, `React.js` no `frontend` e `Node.js` no `backend`, utilizando a `API do Mercado Pago` para aquisição de assinaturas. Ela permite que usuários criem conta, editem seu Perfil e interajam com as mídias das categorias, com a quantidade exibida dependendo do status da assinatura.

## Sumário

- [Bem-vindo ao Project-Private-Media 🎥 📸](#bem-vindo-ao-project-private-media--)
  - [Sumário](#sumário)
  - [Visualização](#visualização)
  - [Contexto](#contexto)
    - [Visão Geral de Funcionalidades](#visão-geral-de-funcionalidades)
  - [Como rodar a aplicação e detalhes do funcionamento](#como-rodar-a-aplicação-e-detalhes-do-funcionamento)
    - [Início Rápido](#início-rápido)
    - [READMEs](#readmes)
      - [Backend](#backend)
      - [Frontend](#frontend)
      - [Firebase e Mercado Pago](#firebase-e-mercado-pago)
  - [Notas](#notas)
    - [Git, GitHub e Histórico de Commits](#git-github-e-histórico-de-commits)

## Visualização

<div align="center">

<!-- Adicione a URL da imagem aqui -->

![Project-Private-Media](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/6dfdf1eb-c93b-4a6e-a2eb-1050d60d9f9c)

</div>

## Contexto

O __Project-Private-Media__ é uma plataforma destinada à exibição de mídias. Criada com a visão de fornecer aos usuários uma experiência única, ela oferece a capacidade de personalizar a quantidade do conteúdo exibido, com base no status da assinatura do usuário. Com uma interface intuitiva e moderna, ela foi projetada para acomodar tanto usuários casuais quanto entusiastas de mídia, garantindo que cada um obtenha o máximo de satisfação de sua experiência.

### Visão Geral de Funcionalidades

O __Project-Private-Media__ vem com um conjunto robusto de funcionalidades que ampliam a experiência padrão de exibição de mídias. Algumas das funcionalidades incluem:

- __Criação e Autenticação de Usuários:__ Novos usuários podem facilmente se registrar e os usuários existentes podem fazer login para acessar o conteúdo premium.
  
- __Edição de Perfil:__ Os usuários pode editar o perfil, alterando o nome e a senha, se assim o desejar.

- __Navegação por Categorias de Mídias:__ Os usuários podem explorar e interagir com diferentes categorias de mídias, contendo fotos e vídeos. O conteúdo disponível varia de acordo com o status da assinatura.

- __Sistema de Assinatura:__ Com a integração da `API` do `Mercado Pago`, os usuários podem adquirir assinaturas para acessar ainda mais conteúdo exclusivo, com opção de pagamento por `cartão de crédito` ou `pix`.

## Como rodar a aplicação e detalhes do funcionamento

### Início Rápido

<details>
<summary><strong>Detalhes</strong></summary>

Para começar, clone o repositório em sua máquina local.

  ```bash
  git clone git@github.com:imsamuelcovalero/Project-Private-Media
  ```

1. Navegue até o diretório raiz do projeto no terminal usando: `cd Project-Private-Media`.
2. Acesse o diretório `backend` e execute `npm install` para instalar as dependências.
3. Inicie o servidor com `npm run dev`.
4. A aplicação estará rodando na porta `3001`.
5. Agora, acesse o diretório `frontend` e execute `npm install` para instalar as dependências.
6. Execute `npm start` para iniciar a aplicação frontend.
7. A aplicação `frontend` estará rodando em `http://localhost:3000`.
8. Lembre-se de configurar o `Firebase`, registrar sua aplicação no `Mercado Pago` e definir as variáveis de ambiente, de acordo com a instruções específicas contidas no `README` de cada diretório.

**Informações detalhadas sobre o funcionamento da aplicação podem ser encontradas nos `README` do [frontend](frontend/README.md) e do [backend](backend/README.md)..**

</details>

### READMEs

Recomendo iniciar a configuração e familiarização do projeto pelo `README` do `backend`, seguido pelo `frontend`. Isso se deve ao fato de que a configuração do `frontend` depende do `backend`.

#### Backend

O `README` do __backend__ fornece informações detalhadas sobre a configuração e os recursos do lado do servidor. Acesse-o [aqui](backend/README.md).

#### Frontend

Após configurar o `backend`, você pode prosseguir com o `README` do __frontend__. Acesse-o [aqui](frontend/README.md).

#### Firebase e Mercado Pago

Além disso, temos `READMEs` específicos para o [Firebase](Firebase.md) e o [Mercado Pago](MercadoPago.md). É crucial associá-los às configurações dos `READMEs` de `frontend` e `backend` para garantir o funcionamento adequado do projeto.

## Notas

### Git, GitHub e Histórico de Commits

Este projeto utiliza a [Especificação de Commits Convencionais](https://www.conventionalcommits.org/en/v1.0.0/), com alguns tipos da [convenção Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines). Além disso, foi utilizado o pacote [conventional-commit-cli](https://www.npmjs.com/package/conventional-commit-cli)

Durante o desenvolvimento da aplicação, utilizei o `Git` como ferramenta de controle de versão e o `GitHub` como plataforma de hospedagem. A `branch develop` foi o principal local de desenvolvimento, e suas mudanças foram periodicamente mescladas à `branch main`.

[⬆ Voltar ao topo](#sumário)
