/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Formik, Form, Field,
} from 'formik';
import * as Yup from 'yup';
import api from '../../services';
import ReactNodeContext from '../../context/ReactNodeContext';
import { getCardToken } from '../../services/mecadopago.helper';
import formatCurrency from '../../helpers/formatCurrency.helper';
import SubscriptionS from './Style';

function SubscriptionComponent() {
  const { logout, user } = useContext(ReactNodeContext);

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

  const validationSchema = Yup.object({
    cardNumber: Yup.string().required('O número do cartão é obrigatório.').length(16, 'O número do cartão deve ter 16 dígitos.'),
    cardholderName: Yup.string().required('O nome no cartão é obrigatório.').min(3, 'O nome no cartão deve ter pelo menos 3 caracteres.'),
    cardExpirationDate: Yup.string().required('A data de validade é obrigatória.').matches(/^\d{2}\/\d{2}$/, 'A data de validade deve estar no formato MM/AA.'),
    cardSecurityCode: Yup.string().required('O código de segurança é obrigatório.').length(3, 'O código de segurança deve ter 3 dígitos.'),
  });

  const handleSubmit = async (values) => {
    const confirmation = window.confirm('Tem certeza que deseja efetuar o pagamento?');
    if (!confirmation) return;

    try {
      const token = await getCardToken(values);
      console.log(token);

      const paymentDetails = {
        userId: user.id,
        paymentDetails: {
          token,
          amount: subscriptionValue,
          currency: 'BRL',
          description: 'Pagamento da assinatura mensal',
        },
      };

      await api.processPayment(paymentDetails);
      toast.success('Pagamento processado com sucesso!');
    } catch (error) {
      console.error('Erro ao obter o token:', error);
      toast.error('Erro ao processar o pagamento. Por favor, tente novamente.');
    }
  };

  return (
    <SubscriptionS>
      <h1>Subscription</h1>
      <p>
        Valor da Mensalidade:
        {' '}
        {formatCurrency(subscriptionValue)}
      </p>
      <Formik
        initialValues={{
          cardNumber: '',
          cardholderName: '',
          cardExpirationDate: '',
          cardSecurityCode: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        // validateOnMount
        // validateOnBlur
      >
        {({
          isSubmitting, isValid, errors, touched, values,
        }) => (
          <Form>
            <div className="field">
              <label htmlFor="cardNumber">
                Número do Cartão:
                <Field id="cardNumber" type="text" name="cardNumber" maxLength="16" />
              </label>
              {(touched.cardNumber || values.cardNumber) && errors.cardNumber && <span className="errorMessage">{errors.cardNumber}</span>}
            </div>
            <div className="field">
              <label htmlFor="cardholderName">
                Nome no Cartão:
                <Field id="cardholderName" type="text" name="cardholderName" />
              </label>
              {(touched.cardholderName || values.cardholderName) && errors.cardholderName && <span className="errorMessage">{errors.cardholderName}</span>}
            </div>
            <div className="field">
              <label htmlFor="cardExpirationDate">
                Validade (MM/AA):
                <Field id="cardExpirationDate" type="text" name="cardExpirationDate" maxLength="5" />
              </label>
              {(touched.cardExpirationDate || values.cardExpirationDate) && errors.cardExpirationDate && <span className="errorMessage">{errors.cardExpirationDate}</span>}
            </div>
            <div className="field">
              <label htmlFor="cardSecurityCode">
                Código de Segurança:
                <Field id="cardSecurityCode" type="text" name="cardSecurityCode" maxLength="3" />
              </label>
              {(touched.cardSecurityCode || values.cardSecurityCode) && errors.cardSecurityCode && <span className="errorMessage">{errors.cardSecurityCode}</span>}
            </div>
            <button type="submit" disabled={isSubmitting || !isValid}>Pagar</button>
          </Form>
        )}
      </Formik>
    </SubscriptionS>
  );
}

export default SubscriptionComponent;
