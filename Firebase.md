# Criação e Configuração do Projeto no Firebase

## Storage

O `Storage` é a solução do `Firebase` para armazenar arquivos como imagens, vídeos e outros conteúdos. É neste local que os clientes irão fazer o *upload* de suas mídias para uso na aplicação. Cada mídia carregada gera uma `URL` que será posteriormente utilizada no `Firestore Database` nas coleções "fotos" e "videos".

> ⚠️ **Atenção**: É importante manter os mesmos nomes de coleções e documentos utilizados neste documento, pois eles são utilizados no código para referenciar os dados.

<div align="center">

![Firebase1](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/90562cb2-006a-48de-9a96-4509571b16fc)

</div>

## Authentication

O **Authentication** é a ferramenta do `Firebase` para autenticação de usuários. A estrutura, juntamente com os tipos de dados esperados para cada campo, é a seguinte:

- **Identificador (string)**: Corresponde ao `e-mail` do usuário.
- **Provedores (array of strings)**: Inclui os métodos de autenticação usados, neste caso, `e-mail` e senha.
- **Data de criação (timestamp)**: Representa a data e a hora em que o documento de autenticação do usuário foi criado.
- **Último login (timestamp)**: Indica a data e a hora do último login do usuário.
- **UID do usuário (string)**: É um `ID` gerado automaticamente pelo `Firebase`. Esse `UID do usuário` deve ser associado ao `uid` do documento correspondente na coleção de usuários.

<div align="center">

![Authentication1](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/5215849a-f468-40c2-b664-51893c2ada02)
![Authentication2](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/1b9db887-ef2b-45b3-a996-68bccba1836c)

</div>

Nota: O `UID` gerado é essencial, pois ele é utilizado como identificador único em outros lugares, como no `Firestore Database`.

## Firestore Database

Este é o banco de dados em tempo real do `Firebase`. Ele é organizado em coleções e documentos. As coleções utilizadas no projeto são:

### usuários

Cada documento representa um usuário e seu `ID` coincide com o `UID` do `Authentication`. A estrutura, incluindo os tipos de dados esperados para cada campo, é apresentada a seguir:

- **ID do Documento (string)**: ID único gerado pelo `Firebase` para cada documento.
- **assinaturaAtiva (boolean)**: Indica se a assinatura do usuário está ativa. Verdadeiro para ativo e falso para inativo.
- **dataCriacao (timestamp)**: Representa a data e a hora em que o documento do usuário foi criado.
- **dataExpiracaoAssinatura (timestamp)**: Indica a data e a hora de expiração da assinatura do usuário.
- **email (string)**: Corresponde ao `e-mail` do usuário.
- **nome (string)**: Reflete o nome do usuário.
- **uid (string)**: Esse `uid` deve ser associado ao `UID do usuário` correspondente na seção Authentication.

<div align="center">

![usuários](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/90095a2d-80aa-4f5a-b200-f24acb0fc616)

</div>

### fotos

A estrutura, incluindo os tipos de dados esperados para cada campo, é apresentada a seguir:

- **ID do Documento (string)**: `ID` único gerado pelo `Firebase` para cada documento.
- **categoriaId (string)**:`ID` que indica a categoria à qual a foto pertence.
- **dataCriacao (timestamp)**: Representa a data e a hora em que o documento da foto foi criado.
- **descricao (string, opcional)**: Uma descrição opcional associada à foto.
- **url (string)**: `URL` direcionando para o local no `Firebase Storage` onde a imagem está armazenada.

<div align="center">

![fotos]](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/c82b4524-997f-4368-ab5e-7aae44143c36)

</div>

### videos

Estrutura semelhante à coleção "fotos".

### categorias

Cada categoria é associada a um conjunto de IDs que se referem a fotos e vídeos relacionados. A estrutura, com os tipos de dados esperados para cada campo, é:

- **ID do Documento (string)**: `ID` único gerado pelo `Firebase` para cada documento.
- **categoriaId (string)**: `ID` único designado para identificar distintamente cada categoria.
- **fotos (array of strings)**: `Array` contendo os `IDs` das fotos que são associadas a essa categoria específica.
- **videos (array of strings)**: `Array` contendo os `IDs` dos vídeos que são associados a essa categoria.

<div align="center">

![categorias](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/19ad98c3-233f-48e7-a354-0c1fe9001360)

</div>

## 1.2 Chaves e Conexão com Firebase

Para integrar sua aplicação ao `Firebase`, é necessário configurar as chaves apropriadas, tanto no `frontend` quanto no `backend`. Abaixo estão os detalhes para cada caso:

### Backend

#### 1. Gerando a Chave Privada

1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Selecione seu projeto.
3. No menu lateral, clique em `Configurações` (ícone de engrenagem) e escolha a opção `Configurações do projeto`.
4. Na aba `Service accounts`, clique no botão `Generate new private key`.
5. Um arquivo `.json` será baixado. Este arquivo contém sua chave privada e outras informações importantes para a conexão.

#### 2. Configurando a Chave no Projeto

1. Renomeie o arquivo baixado para `firebaseKey.json`.
2. Transfira ou cole este arquivo dentro da pasta `backend/src/database` do seu projeto.
3. Certifique-se de que o arquivo `firebaseKey.json` esteja na mesma pasta e ao lado dos arquivos `connection.js` e `loadFirebaseConfig.js`.

#### 3. Conexão com o Firebase

Os arquivos `connection.js` e `loadFirebaseConfig.js` que já estão presentes em seu projeto backend são responsáveis por estabelecer a conexão entre o `Node.js` e o `Firebase`. Certificando-se de que a chave `firebaseKey.json` esteja na pasta correta, esses arquivos cuidarão do resto!

> ⚠️ **Atenção**: Nunca compartilhe ou cometa seu arquivo `firebaseKey.json` em repositórios públicos, pois ele contém informações sensíveis.

### Frontend

#### 1. Obtendo Configurações de Inicialização

1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Selecione seu projeto.
3. No menu lateral, clique em `Configurações` (ícone de engrenagem) e escolha a opção `Configurações gerais`.
4. Sob `Firebase SDK snippet`, selecione a opção `Config`.
5. Anote as configurações apresentadas. Elas serão usadas na sua aplicação frontend.

> **Nota1**: No README do ([frontend](frontend/README.md), serão fornecidas instruções detalhadas sobre como inserir estas informações como variáveis de ambiente, garantindo que elas não estejam expostas.

#### Configurando Índices Compostos no Firestore

O `Firestore`, por padrão, cria índices para cada campo individual em seus documentos. Contudo, ao realizar consultas mais complexas que combinam múltiplos campos para filtrar e ordenar, é preciso configurar índices compostos. Estes otimizam e tornam a consulta eficiente, garantindo uma execução rápida e previsível e mantendo o desempenho à medida que o tamanho do conjunto de dados cresce.

##### Identificando a Necessidade de Índices Compostos

Ao executar o projeto, se você encontrar um erro que indica a necessidade de criar um índice composto, a mensagem de erro fornecerá um *link* direto para a criação deste índice no `Firebase Console`.

##### Criação do Índice Composto

1. Clique no *link* fornecido na mensagem de erro. Ele irá redirecionar você para o `Firebase Console`, especificamente na página de criação de índices compostos.
2. Os campos da consulta que causou o erro já estarão pré-selecionados. Confirme e prossiga com a criação do índice composto.
3. Aguarde até que o índice seja construído. Isso pode levar alguns minutos.

**Nota:** É provável que você precise criar, ao menos, índices compostos para as entidades de fotos, vídeos e categorias. Siga os passos acima para estas e outras entidades, conforme necessário.

<div align="center">

![Firebase_index](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/731edd71-e5cc-4609-9dfc-0554688f8ce6)

</div>

> ⚠️ **Atenção**: Ao configurar o projeto pela primeira vez ou após realizar mudanças nas consultas do Firestore, é uma boa prática testar todas as funcionalidades e certificar-se de que todas as consultas estão executando corretamente. Isso ajudará a identificar rapidamente a necessidade de índices compostos adicionais.

Com essas configurações, sua aplicação está pronta para se conectar e interagir com o `Firebase`.

> **Nota2**: Para mais informações sobre o `Firebase`, acesse a [documentação oficial](https://firebase.google.com/docs).
---
> ⚠️ **Atenção**: Lembre-se de seguir as instruções detalhadas nos READMEs do frontend e backend, e de definir corretamente as variáveis de ambiente!

[⬅ Voltar para o README principal](./README.md)
