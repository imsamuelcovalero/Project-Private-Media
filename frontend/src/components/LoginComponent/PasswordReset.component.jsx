/* File: src/components/LoginComponent/PasswordReset.component.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { firebaseSendPasswordResetEmail } from '../../services/firebase.helper';
import api from '../../services';
import { PasswordResetS } from './Style';

function PasswordResetComponent() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [resetEmail, setResetEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [touchedEmail, setTouchedEmail] = useState(false);

  const navigate = useNavigate();

  /* useEffect que verifica se o usuário já está logado e assinatura é ativa */
  useEffect(() => {
    const verifyUserLoggedIn = async () => {
      try {
        const data = await api.checkToken();
        if (data) {
          navigate('/main');
        }
      } catch (error) {
        console.error(error);
      }
    };

    verifyUserLoggedIn();
  }, []);

  /* useEffect que verifica se o campo de e-mail está preenchido e faz as validações */
  useEffect(() => {
    const emailRegex = /\S+@\S+\.\S{2,}/;
    let error = '';
    if (touchedEmail) {
      if (!resetEmail) {
        error = 'Campo de e-mail é obrigatório';
      } else if (!emailRegex.test(resetEmail)) {
        error = 'Email inválido';
      }
    }
    setEmailErrorMessage(error);
    setIsDisabled(!!error || !resetEmail);
  }, [resetEmail, touchedEmail]);

  /* Função que recebe o valor do campo de e-mail e ativa o touched */
  const handleEmailChange = (e) => {
    setResetEmail(e.target.value);
    setTouchedEmail(true);
  };

  /* Função para resetar a senha */
  const handlePasswordReset = async () => {
    try {
      await firebaseSendPasswordResetEmail(resetEmail);
      toast.success('Email de redefinição de senha enviado com sucesso! Por favor, verifique sua caixa de entrada.');
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          toast.error('Não existe uma conta associada ao e-mail fornecido.');
          break;
        case 'auth/invalid-email':
          toast.error('O email informado não é válido.');
          break;
        default:
          toast.error('Erro ao enviar email de redefinição de senha. Por favor, tente novamente.');
      }
    }
  };

  return (
    <PasswordResetS>
      <div className="reset-modal">
        <h2>Redefinição de Senha</h2>
        <input
          type="email"
          value={resetEmail}
          onChange={(e) => handleEmailChange(e)}
          onBlur={() => setTouchedEmail(false)}
          placeholder="Digite seu e-mail"
          aria-label="Digite seu e-mail para redefinição de senha"
          required
        />
        {touchedEmail && emailErrorMessage && <p id="ErrorMsg">{emailErrorMessage}</p>}
        <button type="submit" className="primary" onClick={handlePasswordReset} disabled={isDisabled}>
          Enviar solicitação
        </button>
        <button type="button" className="secondary" onClick={() => navigate('/login')}>
          Cancelar
        </button>
      </div>
    </PasswordResetS>
  );
}

export default PasswordResetComponent;
