# Bem-vindo ao Project-Private-Media 🎥 📸

O __Project-Private-Media__ é uma aplicação dedicada à exibição de mídias desenvolvida com `Firebase` para armazenamento e gerenciamento de dados, `React.js` no `frontend` e `Node.js` no `backend`, utilizando a `API do Mercado Pago` para aquisição de assinaturas. Ela permite que usuários criem conta, editem seu Perfil e interajam com as mídias das categorias, com a quantidade exibida dependendo do status da assinatura.

## Sumário

- [Bem-vindo ao Project-Our-Shop-App-Angular](#bem-vindo-ao-project-our-shop-app-angular)
  - [Sumário](#sumário)
  - [Visualização](#visualização)
  - [Contexto](#contexto)
    - [Visão Geral de Funcionalidades](#visão-geral-de-funcionalidades)
  - [Como rodar a aplicação e detalhes do funcionamento](#como-rodar-a-aplicação-e-detalhes-do-funcionamento)
    - [Início Rápido](#início-rápido)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Notas](#notas)
    - [Git, GitHub e Histórico de Commits](#git-github-e-histórico-de-commits)
   
## Visualização

<div align="center">

<!-- Adicione a URL da imagem aqui -->

![Project-Private-Media](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/9d4da60a-f1a7-4e6f-84ae-93199ffe8f1b)

</div>

## Contexto

O __Project-Private-Media__ é uma plataforma destinada à exibição de mídias. Criada com a visão de fornecer aos usuários uma experiência única, ela oferece a capacidade de personalizar a quantidade do conteúdo exibido, com base no status da assinatura do usuário. Com uma interface intuitiva e moderna, ela foi projetada para acomodar tanto usuários casuais quanto entusiastas de mídia, garantindo que cada um obtenha o máximo de satisfação de sua experiência.

### Visão Geral de Funcionalidades

O __Project-Private-Media__ vem com um conjunto robusto de funcionalidades que ampliam a experiência padrão de exibição de mídias. Algumas das funcionalidades incluem:

- **Criação e Autenticação de Usuários:** Novos usuários podem facilmente se registrar e os usuários existentes podem fazer login para acessar o conteúdo premium.
  
- **Edição de Perfil:** Os usuários pode editar o perfil, alterando o nome e a senha, se assim o desejar.

- **Navegação por Categorias de Mídias:** Os usuários podem explorar e interagir com diferentes categorias de mídias, contendo fotos e vídeos. O conteúdo disponível varia de acordo com o status da assinatura.

- **Sistema de Assinatura:** Com a integração da API do Mercado Pago, os usuários podem adquirir assinaturas para acessar ainda mais conteúdo exclusivo, com opção de pagamento por cartão de crédito ou pix.

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
8. Lembre-se de configurar o `Firebase`, registrar sua aplicação no `Mercado Pago` definir as variáveis de ambiente. Instruções detalhadas sobre esses passos estão disponíveis nos `READMEs` específicos de cada diretório.

**Informações detalhadas sobre o funcionamento da aplicação podem ser encontradas nos `README` do `frontend` e do `backend`.**

</details>

### Frontend

O `README` referente ao __Frontend__ pode ser acessado [aqui](frontend/README.md).

### Backend

O `README` referente ao __Backend__ pode ser acessado [aqui](backend/README.md).

## Notas

### Git, GitHub e Histórico de Commits

Este projeto utiliza a [Especificação de Commits Convencionais](https://www.conventionalcommits.org/en/v1.0.0/), com alguns tipos da [convenção Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines). Além disso, foi utilizado o pacote [conventional-commit-cli](https://www.npmjs.com/package/conventional-commit-cli)

Durante o desenvolvimento da aplicação, utilizamos o `Git` como ferramenta de controle de versão e o `GitHub` como plataforma de hospedagem. A `branch develop` foi o principal local de desenvolvimento, e suas mudanças foram periodicamente mescladas à `branch main`.

[⬆ Voltar ao topo](#sumário)

