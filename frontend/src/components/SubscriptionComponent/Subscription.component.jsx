import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services';
import ReactNodeContext from '../../context/ReactNodeContext';
import { getCardToken } from '../../services/mecadopago.helper';
import MainS from './Style';

function SubscriptionComponent() {
  const { logout, user } = useContext(ReactNodeContext);

  console.log('user', user);

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardholderName: '',
    cardExpirationDate: '', // formato MMYY
    cardSecurityCode: '',
  });

  const navigate = useNavigate();

  /* useEffect que verifica se existe um token válido */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await api.checkToken();
        console.log('data', data);
      } catch (error) {
        console.error(error);
        logout();
        navigate('/visitors');
      }
    };

    verifyToken();
  }, []);

  const isValidCardInfo = () => {
    if (cardInfo.cardNumber.length !== 16) {
      toast.error('O número do cartão deve ter 16 dígitos.');
      return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(cardInfo.cardExpirationDate)) {
      toast.error('A data de validade deve estar no formato MM/AA.');
      return false;
    }

    if (cardInfo.cardSecurityCode.length !== 3) {
      toast.error('O código de segurança deve ter 3 dígitos.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidCardInfo()) {
      return;
    }

    try {
      const token = await getCardToken(cardInfo);
      console.log(token);
      toast.success('Token gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao obter o token:', error);
      toast.error('Erro ao processar o pagamento. Por favor, tente novamente.');
    }
  };

  return (
    <MainS>
      <h1>Subscription</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cardNumber">
            Número do Cartão:
            <input
              id="cardNumber"
              type="text"
              maxLength="16"
              value={cardInfo.cardNumber}
              onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="cardholderName">
            Nome no Cartão:
            <input
              id="cardholderName"
              type="text"
              value={cardInfo.cardholderName}
              onChange={(e) => setCardInfo({ ...cardInfo, cardholderName: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="cardExpirationDate">
            Validade (MM/AA):
            <input
              id="cardExpirationDate"
              type="text"
              maxLength="5"
              value={cardInfo.cardExpirationDate}
              onChange={(e) => setCardInfo({ ...cardInfo, cardExpirationDate: e.target.value })}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="cardSecurityCode">
            Código de Segurança:
            <input
              id="cardSecurityCode"
              type="text"
              maxLength="3"
              value={cardInfo.cardSecurityCode}
              onChange={(e) => setCardInfo({ ...cardInfo, cardSecurityCode: e.target.value })}
              required
            />
          </label>
        </div>
        <button type="submit">Pagar</button>
      </form>
    </MainS>
  );
}

export default SubscriptionComponent;
