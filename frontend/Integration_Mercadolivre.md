# Integração com o Mercado Pago em Aplicação React

## Resumo

Esta documentação descreve a integração entre uma aplicação React e o SDK do Mercado Pago para tokenizar cartões e processar pagamentos.

## 1. Configuração Inicial

### Inserção do SDK do Mercado Pago

No arquivo HTML principal da aplicação, adicione o seguinte script:

```html
<script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
```

## 2. Arquivo Helper

**Arquivo:** `src/services/mecadopago.helper.jsx`

### Chave Pública

- Armazene sua chave pública do Mercado Pago em uma variável de ambiente chamada `REACT_APP_MERCADOPAGO_PUBLIC_KEY`.

### Funcionalidades

- `initializeMercadoPago()`: Função para inicializar o SDK do Mercado Pago com a chave pública.
- `getCardToken(cardInfo)`: Função assíncrona para obter um token para um cartão fornecido. Retorna uma promessa que resolve para o token ou rejeita com uma resposta de erro.

## 3. Inicialização

Na raiz da sua aplicação React (ex. arquivo `App.jsx``), inicialize o Mercado Pago:

```jsx
import { initializeMercadoPago } from './services/mecadopago.helper';
initializeMercadoPago();
```

## 4. Uso na Aplicação

Ao coletar informações de cartão do usuário no frontend:

1. Utilize a função `getCardToken` para obter um token para o cartão.
2. Envie este token ao seu backend para processamento adicional e eventual pagamento via Mercado Pago.

## Recomendações

- **Segurança1**: Sirva a aplicação sobre HTTPS e nunca armazene ou transmita diretamente detalhes completos do cartão de crédito.
- **Segurança2**: Utilize o token do cartão para processar o pagamento no backend.
- **Segurança3**: Não guarde a chave privada do Mercado Pago no frontend, use apenas a chave pública.
- **Testes**: Utilize cartões de teste para testar a integração. Veja a [documentação do Mercado Pago](https://www.mercadopago.com.br/developers/pt/guides/payments/web-tokenize-checkout/testing/) para mais informações.