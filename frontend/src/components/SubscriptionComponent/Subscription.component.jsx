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
import LoadingSpinner from '../LoadingSpinner.component';
import ConfirmationModal from '../ConfirmationModal.component';

function SubscriptionComponent() {
  const { logout, user } = useContext(ReactNodeContext);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentId, setPaymentId] = useState(getPaymentId() || null);

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalCallback, setModalCallback] = useState(null);

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
      }
    };

    verifyToken();
  }, []);

  /* Função responsável por verificar o status do pagamento */
  const getStatusPayment = async () => {
    console.log('paymentId', paymentId);
    setIsLoading(true);
    try {
      const response = await api.processPaymentStatus(user.id, paymentId);

      if (response && response.status === 'pending') {
        toast.info('Pagamento pendente.');
      } else if (response && response.status === 'approved') {
        toast.success('Pagamento processado com sucesso!');
        setPaymentStatus('approved');
        removePaymentId();
        navigate('/login');
      } else {
        throw new Error(response.message || 'Erro desconhecido ao processar o pagamento.');
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      if (error && error.response && error.response.data && error.response.data.message) {
        toast.error(`Erro ao processar o pagamento: ${error.response.data.message}`);
      } else {
        toast.error(`Erro ao processar o pagamento: ${error.message}`);
      }
    }
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
        navigate('/login');
      } else {
        throw new Error(response.message || 'Erro desconhecido ao processar o pagamento.');
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
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
      setIsLoading(false);
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
    setModalMessage('Tem certeza que deseja efetuar o pagamento?');
    setModalCallback(() => () => {
      setIsLoading(true);

      if (selectedPaymentMethod === 'credit_card') {
        handleCreditCardPayment(formData, selectedPaymentMethod);
      } else if (selectedPaymentMethod === 'bank_transfer') {
        handlePixPayment(formData, selectedPaymentMethod);
      } else {
        toast.error('Método de pagamento inválido.');
      }
    });
    setShowModal(true);
  };

  /* Função responsável por cancelar o pagamento */
  const handleCancel = async () => {
    setModalMessage('Tem certeza que deseja cancelar este pix?');
    setModalCallback(() => async () => {
      try {
        await api.cancelPayment(paymentId);
        setPaymentId(null);
        removePaymentId();
        toast.success('Pagamento cancelado com sucesso.');
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
        if (error && error.message) {
          toast.error(`Erro ao cancelar o pagamento: ${error.message}`);
        } else {
          toast.error('Erro desconhecido ao cancelar o pagamento.');
        }
      }
    });
    setShowModal(true);
  };

  const onError = async (error) => {
    console.log(error);
    toast.error('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.');
  };

  const onReady = async () => {
    setIsLoading(false);
  };

  return (
    <SubscriptionS>
      {isLoading && <LoadingSpinner />}
      <ConfirmationModal
        show={showModal}
        title="Confirmação"
        message={modalMessage}
        onConfirm={() => {
          if (typeof modalCallback === 'function') {
            modalCallback();
          }
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
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
        <button type="button" className="secondary" id="cancelButton" onClick={() => handleCancel()}>Cancelar Pagamento</button>
      </>
      )}
      {/* <button
        type="button"
        className="secondary"
        id="backButton"
        onClick={() => navigate(-1)}
      >
        Voltar
      </button> */}
    </SubscriptionS>
  );
}

export default SubscriptionComponent;
