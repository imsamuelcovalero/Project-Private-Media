# Criação e Configuração na Plataforma do Mercado Pago

1. **Registro no Mercado Pago**: Caso ainda não possua uma conta, [crie uma no Mercado Pago](https://www.mercadopago.com.br/).

2. **Acesso ao Painel de Desenvolvedores**: Uma vez com sua conta ativa, acesse o [Dashboard de Desenvolvedores](https://www.mercadopago.com.br/developers).

3. **Criação de Aplicativo**: No painel, localize a seção "Seus aplicativos" e selecione "Criar aplicativo". Ao preencher as informações, estabelecerá a integração entre o Mercado Pago e nossa plataforma.

4. **Coleta de Credenciais**: Após a criação do aplicativo, anote as credenciais "Access Token", "Public Key" e "ID da Aplicação". Elas são essenciais para a integração e autenticação em nossa aplicação.

> ⚠️ **Atenção**: Não guarde a chave privada (Access Token) do Mercado Pago no frontend!

## Requisitos para Entrar em Produção

- **Certificado SSL**: Durante os testes, a presença de SSL pode não ser obrigatória, mas para entrar em produção é fundamental ter um certificado SSL e disponibilizar a forma de pagamento em uma página HTTPS.

- **Pix**: Para oferecer pagamento via Pix, é necessário ter uma chave Pix cadastrada no Mercado Pago.

Para detalhes completos e outros requisitos, consulte a [documentação oficial](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-test/go-to-production-requirements).

## Gestão de Credenciais

Para a integração e transações seguras, é necessário configurar as credenciais do Mercado Pago nas variáveis de ambiente de nossa aplicação.

As instruções detalhadas para definir e gerenciar essas credenciais podem ser encontradas na seção **Variáveis de Ambiente** no `README` de cada pasta ([frontend](frontend/README.md) e [backend](backend/README.md)).

Ao seguir estes passos, sua aplicação estará corretamente configurada para processar pagamentos através do Mercado Pago. Qualquer dúvida ou problema, não hesite em me contactar. Para mais informações e detalhes específicos, consulte a [documentação completa do Mercado Pago](https://www.mercadopago.com.br/developers/pt/guides).

## Opções de Pagamento

Nesta aplicação, foram implementadas as opções de pagamento com `Cartão de Crédito` e `Pix`.

- **Cartão de Crédito**: O pagamento é identificado na hora, e a assinatura ativada imediatamente, em caso de sucesso. Também foi adicionada à compra, a descrição e o `ID` da aplicação, para facilitar a identificação da compra no extrato do cartão de crédito e facilitar a aprovação pelo banco.
- **Pix**: O pagamento pelo `Pix` acontece em dois momentos, primeiro o usuário gera um `QR Code` e o status da transação fica como pendente, e após o usuário realizar o pagamento, o status da transação é atualizado para aprovado, e a assinatura é ativada, adicionando 30 dias de acesso ao conteúdo premium.

[⬅ Voltar para o README principal](./README.md)
