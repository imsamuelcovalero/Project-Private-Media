/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Payment, StatusScreen } from '@mercadopago/sdk-react';
import api from '../../services';
import ReactNodeContext from '../../context/ReactNodeContext';
import { addPaymentId, getPaymentId, removePaymentId } from '../../helpers/localStorage.helper';
import formatCurrency from '../../helpers/formatCurrency.helper';
import SubscriptionS from './Style';

function SubscriptionComponent() {
  const { logout, user } = useContext(ReactNodeContext);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentId, setPaymentId] = useState(getPaymentId() || null);

  // const paymentId = getPaymentId() || null;

  console.log('key', process.env.REACT_APP_MERCADOPAGO_ID);

  const navigate = useNavigate();

  const subscriptionValue = parseFloat(process.env.REACT_APP_SUBSCRIPTION_VALUE);
  // const externalReference = process.env.REACT_APP_MERCADOPAGO_ID;

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

  /* Função responsável por verificar o status do pagamento */
  const getStatusPayment = async () => {
    console.log('paymentId', paymentId);
    try {
      const response = await api.processPaymentStatus(user.id, paymentId);

      if (response && response.status === 'pending') {
        toast.info('Pagamento pendente.');
      } else if (response && response.status === 'approved') {
        toast.success('Pagamento processado com sucesso!');
        setPaymentStatus('approved');
        removePaymentId();
      } else {
        throw new Error(response.message || 'Erro desconhecido ao processar o pagamento.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error && error.response && error.response.data && error.response.data.message) {
        toast.error(`Erro ao processar o pagamento: ${error.response.data.message}`);
      } else {
        toast.error(`Erro ao processar o pagamento: ${error.message}`);
      }
    }
  };

  /* Função responsável por cancelar o pagamento */
  const handleCancel = () => {
    setPaymentId(null);
    removePaymentId();
    toast.info('Pagamento cancelado.');
  };

  /* Função responsável por processar o pagamento via cartão de crédito */
  const handleCreditCardPayment = async (formData, selectedPaymentMethod) => {
    try {
      const response = await api.processPayment({
        userId: user.id,
        paymentDetails: formData,
        selectedPaymentMethod,
        description: process.env.REACT_APP_SUBSCRIPTION_DESCRIPTION,
        external_reference: process.env.REACT_APP_MERCADOPAGO_ID,
      });

      console.log('response', response);

      if (response && response.status === 'approved') {
        // addPaymentId(response.id);
        setPaymentStatus('approved');
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

  /* Função responsável por processar o pagamento via Pix */
  const handlePixPayment = async (formData, selectedPaymentMethod) => {
    try {
      const response = await api.processPayment({
        userId: user.id,
        paymentDetails: formData,
        selectedPaymentMethod,
        external_reference: process.env.REACT_APP_MERCADOPAGO_ID,
      });

      console.log('response', response);

      if (response && response.status === 'pending') {
        addPaymentId(response.id);
        setPaymentId(response.id);
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

  /* Função que é chamada quando o usuário clica em pagar */
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

  console.log('paymentStatus', paymentStatus);

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
          customization={{
            visual: {
              showExternalReference: true,
            },
          }}
          onReady={onReady}
          onError={onError}
        />
        )}
      {paymentId && paymentStatus !== 'approved' && (
      <>
        <button type="button" className="primary" id="statusButton" onClick={() => getStatusPayment()}>Verificar Status do Pagamento</button>
        <button type="button" className="secondary" id="cancelButton" onClick={handleCancel}>Cancelar Pagamento</button>
      </>
      )}
      <button type="button" className="secondary" id="backButton" onClick={() => navigate(-1)}>Voltar</button>
    </SubscriptionS>
  );
}

export default SubscriptionComponent;
