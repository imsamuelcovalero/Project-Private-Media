/* File: src/components/LoginComponent/PasswordReset.component.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { firebaseSendPasswordResetEmail } from '../../services/firebase.helper';
import api from '../../services';
import LoginS from './Style';

function PasswordResetComponent() {
  const [resetEmail, setResetEmail] = useState('');

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
    <LoginS>
      <div className="reset-modal">
        <h2>Redefinição de Senha</h2>
        <input
          type="email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          aria-label="Digite seu e-mail para redefinição de senha"
        />
        <button type="submit" onClick={handlePasswordReset}>
          Enviar solicitação
        </button>
      </div>
    </LoginS>
  );
}

export default PasswordResetComponent;
