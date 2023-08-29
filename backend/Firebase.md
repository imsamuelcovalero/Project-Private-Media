# Criação e Configuração do Projeto no Firebase

## Storage

O `Storage` é a solução do `Firebase` para armazenar arquivos como imagens, vídeos e outros conteúdos. É neste local que os clientes irão fazer o *upload* de suas mídias para uso na aplicação. Cada mídia carregada gera uma `URL` que será posteriormente utilizada no `Firestore Database` nas coleções "fotos" e "videos".

> ⚠️ **Atenção**: É importante manter os mesmos nomes de coleções e documentos utilizados neste documento, pois eles são utilizados no código para referenciar os dados.

<div align="center">

![Storage](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/08ffea3b-5059-4261-9f78-7024f1c06720)

</div>

## Authentication

O **Authentication** é a ferramenta do `Firebase` para autenticação de usuários. A estrutura é a seguinte:

```plaintext
Identificador: [e-mail do usuário]
Provedores: [e-mail e senha]
Data de criação: [data da criação do documento]
Último login: [data do último login]
UID do usuário: [ID gerado automaticamente pelo Firebase, deve ser linkado ao uid do documento da coleção usuários correspondente]
```

<div align="center">

![Authentication1](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/d719f1cc-78e0-4955-a18d-02eb1d50b54b)
![Authentication2](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/c5335f28-2969-4e33-a98a-75512fea729f)

</div>

Nota: O `UID` gerado é essencial, pois ele é utilizado como identificador único em outros lugares, como no `Firestore Database`.

## Firestore Database

Este é o banco de dados em tempo real do `Firebase`. Ele é organizado em coleções e documentos. As coleções utilizadas no projeto são:

### usuários

Cada documento representa um usuário e seu `ID` coincide com o `UID` do `Authentication`. Exemplo de estrutura:

```plaintext
ID do Documento: [ID único gerado pelo Firebase]
assinaturaAtiva: [Indica se a assinatura do usuário está ativa]
dataCriacao: [Data e hora de criação do documento]
dataExpiracaoAssinatura: [Data e hora de expiração da assinatura]
email: [E-mail do usuário]
nome: [Nome completo do usuário]
uid: [ID gerado automaticamente pelo Firebase, deve ser linkado ao UID do Authentication]
```

<div align="center">

![usuários](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/026455a9-9a20-47a6-a247-6f2cca8bb2c3)

</div>

### fotos

Exemplo de estrutura:

```plaintext
ID do Documento: [ID único gerado pelo Firebase]
categoriaId: [ID da categoria à qual a foto pertence]
dataCriacao: [Data e hora de criação do documento]
descricao: [Descrição opcional da foto]
url: [URL do Storage onde a imagem está armazenada]
```

<div align="center">

![fotos](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/ede7cfc7-afe0-458d-bc35-5b686d21e771)

</div>

### videos

Estrutura semelhante à coleção "fotos".

### categorias

Cada categoria possui um conjunto de `IDs` que fazem referência a fotos e vídeos relacionados.

Exemplo de estrutura:

```plaintext
ID do Documento: [ID único gerado pelo Firebase]
categoriaId: [ID único para a categoria]
fotos: [Array de IDs de fotos que pertencem a essa categoria]
videos: [Array de IDs de vídeos que pertencem a essa categoria]
```

<div align="center">

![categorias](https://github.com/imsamuelcovalero/Project-Private-Media/assets/98184355/67899e81-001e-43ad-a9b3-99de58c5de26)

</div>

## 1.2 Chaves, Instalação de Biblioteca no Node.js e Conexão

Para integrar sua aplicação `Node.js` ao `Firebase`, você precisa instalar a biblioteca correspondente e configurar com uma chave privada. Aqui estão os passos para fazer isso:

### 1. Instalação da Biblioteca

Primeiro, vamos instalar a biblioteca do `Firebase Admin` para `Node.js`. No terminal ou *prompt* de comando, navegue até a pasta do seu projeto e execute o seguinte comando:

```bash
npm install firebase-admin --save
```

### 2. Gerando a Chave Privada

1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Selecione seu projeto.
3. No menu lateral, clique em `Configurações` (ícone de engrenagem) e escolha a opção `Configurações do projeto`.
4. Na aba `Service accounts`, clique no botão `Generate new private key`.
5. Um arquivo `.json` será baixado. Este arquivo contém sua chave privada e outras informações importantes para a conexão.

### 3. Configurando a Chave no Projeto

1. Renomeie o arquivo baixado para `firebaseKey.json`.
2. Transfira ou cole este arquivo dentro da pasta `backend/src/database` do seu projeto.
3. Certifique-se de que o arquivo `firebaseKey.json` esteja na mesma pasta e ao lado dos arquivos `connection.js` e `loadFirebaseConfig.js`.

### 4. Conexão com o Firebase

Os arquivos `connection.js` e `loadFirebaseConfig.js` que já estão presentes em seu projeto, são responsáveis por estabelecer a conexão entre o `Node.js` e o `Firebase`. Certificando-se de que a chave `firebaseKey.json` esteja na pasta correta, esses arquivos cuidarão do resto!

> ⚠️ **Atenção**: Nunca compartilhe ou cometa seu arquivo `firebaseKey.json` em repositórios públicos, pois ele contém informações sensíveis.

Pronto! Agora sua aplicação `Node.js` está pronta para se conectar e interagir com o `Firebase`.
