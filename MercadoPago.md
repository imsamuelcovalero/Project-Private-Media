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

Dentro desta aplicação, disponibilizamos duas principais opções de pagamento: **Cartão de Crédito** e **Pix**.

- **Cartão de Crédito**: Ao escolher esta opção, a identificação do pagamento é imediata. Assim que a transação for bem-sucedida, a assinatura é ativada sem demora. Além disso, incluímos na fatura a descrição e o `ID` da aplicação, a fim de que o usuário possa identificar facilmente a compra em seu extrato do cartão. Isso também contribui para uma maior probabilidade de aprovação da transação pelo banco emissor do cartão.

- **Pix**: A transação via Pix ocorre em dois passos distintos. Primeiramente, o usuário gera um `QR Code` e, nesse momento, o status da transação é definido como "pendente". Após o usuário concluir o pagamento pelo aplicativo bancário ou outro método compatível, o status da transação muda para "aprovado". Com a aprovação, a assinatura é ativada, concedendo ao usuário 30 dias de acesso ao conteúdo premium.

[⬅ Voltar para o README principal](./README.md)
