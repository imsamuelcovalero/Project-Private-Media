/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Payment, StatusScreen } from '@mercadopago/sdk-react';
import api from '../../services';
import ReactNodeContext from '../../context/ReactNodeContext';
// import { getCardToken } from '../../services/mecadopago.helper';
import formatCurrency from '../../helpers/formatCurrency.helper';
import SubscriptionS from './Style';

function SubscriptionComponent() {
  const { logout, user } = useContext(ReactNodeContext);
  const [paymentId, setPaymentId] = useState(null);

  console.log('key', process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY);

  const navigate = useNavigate();

  const subscriptionValue = parseFloat(process.env.REACT_APP_SUBSCRIPTION_VALUE);

  /* useEffect que verifica se existe um token válido */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.checkToken();
      } catch (error) {
        console.error(error);
        logout();
        navigate('/visitors');
      }
    };

    verifyToken();
  }, []);

  const handleCreditCardPayment = async (formData, selectedPaymentMethod) => {
    try {
      const response = await api.processPayment({
        userId: user.id,
        paymentDetails: formData,
        selectedPaymentMethod,
        description: process.env.REACT_APP_SUBSCRIPTION_DESCRIPTION,
      });

      console.log('response', response);

      if (response && response.status === 'approved') {
        setPaymentId(response.id);
        toast.success('Pagamento processado com sucesso!');
      } else {
        throw new Error(response.message || 'Erro desconhecido ao processar o pagamento.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error && error.response && error.response.data && error.response.data.message) {
        toast.error(`Erro ao processar o pagamento: ${error.response.data.message}`);
      } else {
        toast.error('Erro ao processar o pagamento. Por favor, tente novamente.');
      }
    }
  };

  const handlePixPayment = async (formData, selectedPaymentMethod) => {
    try {
      const response = await api.processPayment({
        userId: user.id,
        paymentDetails: formData,
        selectedPaymentMethod,
      });

      console.log('response', response);

      if (response && response.status === 'pending') {
        setPaymentId(response.id);
        // Aqui você deve incluir a lógica para lidar com pagamentos pendentes do Pix.
        // Por exemplo: exibir QR code, ou redirecionar o usuário para uma tela de espera, etc.
        toast.info('Pagamento pendente. Por favor, finalize o pagamento via Pix.');
      } else {
        throw new Error(response.message || 'Erro desconhecido ao processar o pagamento.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error && error.response && error.response.data && error.response.data.message) {
        toast.error(`Erro ao processar o pagamento: ${error.response.data.message}`);
      } else {
        toast.error('Erro ao processar o pagamento. Por favor, tente novamente.');
      }
    }
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    console.log('formData', formData);
    const confirmation = window.confirm('Tem certeza que deseja efetuar o pagamento?');
    if (!confirmation) return;

    if (selectedPaymentMethod === 'credit_card') {
      await handleCreditCardPayment(formData, selectedPaymentMethod);
    } else if (selectedPaymentMethod === 'bank_transfer') { // Pix
      await handlePixPayment(formData, selectedPaymentMethod);
    } else {
      toast.error('Método de pagamento inválido.');
    }
  };

  const onError = async (error) => {
    console.log(error);
    // Você pode adicionar lógica adicional para lidar com erros aqui
  };

  const onReady = async () => {
    // Se você estiver mostrando uma animação de carregamento, pode escondê-la aqui
  };

  return (
    <SubscriptionS>
      <h1>Assinatura</h1>
      <p>
        Valor da Mensalidade:
        {' '}
        {formatCurrency(subscriptionValue)}
      </p>
      <Payment
        initialization={{ amount: subscriptionValue }}
        customization={{
          paymentMethods: {
            creditCard: 'all',
            bankTransfer: 'all',
          },
        }}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
      {paymentId
        && (
        <StatusScreen
          initialization={{ paymentId }}
          onReady={onReady}
          onError={onError}
        />
        )}
      <button type="button" id="backButton" onClick={() => navigate(-1)}>Voltar</button>
    </SubscriptionS>
  );
}

export default SubscriptionComponent;
