# Criação e Configuração na Plataforma do Mercado Pago

Antes de qualquer coisa, você precisará de uma conta no [Mercado Pago](https://www.mercadopago.com.br/). Se ainda não tiver uma, crie agora.

1. **Acesso ao Painel**: Depois de entrar na sua conta, acesse o [Dashboard de Desenvolvedores](https://www.mercadopago.com.br/developers) do Mercado Pago.

2. **Criação de Aplicativo**: No painel, vá até a seção "Seus aplicativos" e clique em "Criar aplicativo". Preencha as informações solicitadas. Este aplicativo será o ponto de integração entre a plataforma e a nossa aplicação.

3. **Anote as Credenciais**: Depois de criar o aplicativo, você terá acesso às credenciais, como o "Access Token". Guarde essas informações com cuidado, pois elas serão usadas posteriormente na nossa aplicação.

## Pré-requisitos para Integração

- **Aplicação**: Para cada solução implementada, é recomendado criar uma aplicação separada. Isso ajuda na organização e gestão. [Mais informações](https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/prerequisites).

- **Conta de vendedor**: É essencial ter uma conta de vendedor no Mercado Pago ou Mercado Livre. 

- **Credenciais**: São necessárias as credenciais (Public key e Access Token) para realizar as integrações.

- **SDK do Mercado Pago**: Simplifica a integração com as APIs. 

## Instalação da Biblioteca do Mercado Pago

Para facilitar a integração, utilizamos a biblioteca oficial do Mercado Pago. Para instalá-la, execute o seguinte comando:

```bash
npm install mercadopago
```

Ou, se você estiver usando Yarn:

```bash
yarn add mercadopago
```

## Requisitos para Entrar em Produção

- **Certificado SSL**: Durante os testes, a presença de SSL pode não ser obrigatória, mas para entrar em produção é fundamental ter um certificado SSL e disponibilizar a forma de pagamento em uma página HTTPS.

- **Dados do Pagador**: Melhore a aprovação de pagamentos enviando informações detalhadas do item, do pagador, dados de envio e informações da indústria.

- **Notificações IPN ou Webhooks**: Mantenha o status dos pedidos atualizados usando e processando essas notificações.

- **Pix**: Para oferecer pagamento via Pix, é necessário ter uma chave Pix cadastrada no Mercado Pago.

Para detalhes completos e outros requisitos, consulte a [documentação oficial](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-test/go-to-production-requirements).

## Gestão de Credenciais

As credenciais do Mercado Pago, em especial o "Access Token", são essenciais para a autenticação e realização de transações. Para garantir a segurança e facilitar a gestão, colocamos essas credenciais nas variáveis de ambiente da nossa aplicação.

Consulte a seção de **Variáveis de Ambiente** no `README` principal para instruções detalhadas sobre como definir e gerenciar estas credenciais.

Ao seguir estes passos, sua aplicação estará corretamente configurada para processar pagamentos através do Mercado Pago. Qualquer dúvida ou problema, não hesite em me contactar. Para mais informações e detalhes específicos, consulte a [documentação completa do Mercado Pago](https://www.mercadopago.com.br/developers/pt/guides).
