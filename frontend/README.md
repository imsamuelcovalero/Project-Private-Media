## Sumário

- [Sumário](#sumário)
- [Contexto](#contexto)
- [Regras de Negócio](#regras-de-negócio)
  - [Login](#login)
  - [Registro](#registro)
  - [Edição de Perfil](#edição-de-perfil)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
  - [Download do projeto](#download-do-projeto)
  - [Instalar dependências](#instalar-dependências)
  - [Executando com Docker](#executando-com-docker)
  - [Executando sem Docker](#executando-sem-docker)
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

## Tecnologias e Ferramentas Utilizadas

O `Frontend` foi desenvolvido com o uso das seguintes tecnologias e ferramentas:

- [Angular](https://angular.io/docs): Utilizei o __Angular__, um *framework* `JavaScript` robusto e amplamente adotado para a criação de aplicações *web* de página única (SPA). A escolha se deu pelo fato de que o __Angular__ oferece um ecossistema completo, incluindo ferramentas para roteamento, formulários, testes unitários e *end-to-end*, entre outras funcionalidades.
- [Angular Material](https://material.angular.io/): O __Angular Material__ foi utilizado para fornecer estilos `CSS` pré-construídos e componentes de interface do usuário reutilizáveis. Isso ajudou a acelerar o processo de desenvolvimento e garantir a consistência visual em toda a aplicação. Além disso, __Angular Material__ adere aos princípios de design do __Material Design da Google__, garantindo uma experiência do usuário de alta qualidade.
- [Ngx-toastr](https://www.npmjs.com/package/ngx-toastr): Usamos o __Toastr__ para fornecer feedback ao usuário por meio de notificações. O __Toastr__ é uma biblioteca `JavaScript` que permite exibir mensagens de notificação de forma simples e elegante.

## Instalação e Execução

### Download do projeto

Primeiro, você precisa fazer o clone do repositório do projeto. Para isso, use o comando:

```bash
git clone git@github.com:imsamuelcovalero/Project-Our-Shop-App-Angular.git
```

### Instalar dependências

Em seguida, navegue até o diretório `frontend` e instale as dependências necessárias com os seguintes comandos:

```bash
cd Project-Our-Shop-App-Angular

cd frontend
npm install
```

Esses comandos instalam todas as dependências listadas no arquivo `package.json`, que são necessárias para a execução do projeto.

### Executando com Docker

Para executar o projeto utilizando `Docker`, assegure-se de ter o `Docker` e o `Docker Compose` instalados em sua máquina. Em seguida, no diretório raiz do projeto, execute o seguinte comando:
  
```bash
docker-compose up
```

O `serviço frontend` será executado na porta 4200.

**Importante:** Note que se já tiver executado este comando no `backend`, não será necessário executá-lo novamente, pois o `Docker Compose` já terá criado os containers necessários para a execução do projeto.

### Executando sem Docker

Caso prefira executar o projeto sem `Docker`, após a instalação das dependências, você pode iniciar a aplicação com o seguinte comando:
  
```bash
cd Project-Our-Shop-App-Angular

cd frontend
ng serve
```

Este comando inicia o servidor de desenvolvimento e o site ficará disponível na __porta 4200__, geralmente acessível através do endereço `http://localhost:4200` no navegador.

## Lint

Para verificar a qualidade do código com o `linter`, use o comando:

```bash
ng lint
```

- O `frontend` foi desenvolvido seguindo os padrões de código __TypeScript__ com o uso do [ESLint](https://eslint.org/), juntamente com os plugins ['@typescript-eslint/parser' e '@typescript-eslint/eslint-plugin'](https://github.com/typescript-eslint/typescript-eslint). Essa combinação permite o linting efetivo do código __TypeScript__, promovendo um código limpo e bem estruturado.

É importante lembrar que, ao encontrar problemas durante a instalação ou execução, uma boa prática é verificar as mensagens de erro que aparecem no terminal. Elas geralmente fornecem pistas sobre o que pode estar errado. Também é recomendável manter todas as dependências atualizadas e garantir que seu ambiente de desenvolvimento esteja configurado corretamente. Além disso, é aconselhável consultar a documentação oficial das dependências usadas no projeto em caso de problemas.

Em caso de dúvidas, não hesite em abrir uma [issue](https://github.com/imsamuelcovalero/Project-Our-Shop-App-Angular/issues) no GitHub. Além disso, estou disponível para contato direto para mais esclarecimentos.

Espero que essas orientações tenham sido úteis. Caso necessite de suporte adicional ou tenha outras questões, por favor, me avise.

[⬆ Voltar ao topo](#sumário)<br>
[⬅ Voltar para a página anterior](../README.md)