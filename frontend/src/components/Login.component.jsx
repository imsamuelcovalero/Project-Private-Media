/* File: src/components/LoginComponent.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { firebaseSignIn } from '../services/firebase.helper';
import { saveUserInfo } from '../helpers/localStorage.helper';
import api from '../services';

function LoginComponent() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const navigate = useNavigate();

  /* useEffect que verifica se o usuário já está logado e assinatura é ativa */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await api.checkToken();
        if (data && data.assinaturaAtiva) {
          navigate('/main');
        }
      } catch (error) {
        console.error(error);
      }
    };

    verifyToken();
  }, []);

  /* Função que valida os dados digitados e habilita ou desabilita o botão de Entrar */
  const validateField = (field) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const emailRegex = /\S+@\S+\.\S+/;

    if (field === 'email') {
      if (!formLogin.email) return 'Campo de e-mail é obrigatório';
      if (!emailRegex.test(formLogin.email)) {
        return 'Email inválido';
      }
    }

    if (field === 'password') {
      if (!formLogin.password) return 'Campo de senha é obrigatório';
      if (formLogin.password.length < 8) {
        return 'Senha deve ter ao menos 8 caracteres';
      }
      if (!passwordRegex.test(formLogin.password)) {
        return 'Senha em formato inválido';
      }
    }

    return '';
  };

  /* useEffect que chama a função validateField e atualiza o estado de acordo com o retorno */
  useEffect(() => {
    const emailError = (touchedEmail || formLogin.email) ? validateField('email') : '';
    const passwordError = (touchedPassword || formLogin.password) ? validateField('password') : '';

    setEmailErrorMessage(emailError);
    setPasswordErrorMessage(passwordError);

    setIsDisabled(
      !formLogin.email
      || !formLogin.password
      || emailError
      || passwordError,
    );
  }, [formLogin, touchedEmail, touchedPassword]);

  /* Função que atualiza o estado de acordo com o input digitado */
  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'email') {
      setTouchedEmail(true);
    } else if (name === 'password') {
      setTouchedPassword(true);
    }

    setFormLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /* Função que envia os dados do login para a API (api.singIn) e em caso de sucesso
     salva os dados do usuário logado no localStorage e redireciona para a rota /main */
  const signIn = async (email, password) => {
    try {
      const idToken = await firebaseSignIn(email, password);
      const response = await api.signIn(idToken);

      const { id, nome, assinaturaAtiva } = response;

      if (!assinaturaAtiva) {
        toast.warning('Sua assinatura está inativa. Por favor, renove sua assinatura.', {
          position: 'bottom-right',
        });
        navigate('/visitors');
        return null;
      }

      saveUserInfo({
        id, email, nome, assinaturaAtiva,
      });

      navigate('/main');
    } catch (error) {
      if (error.message === 'Authentication error') {
        toast.error('Erro na autenticação. Por favor, tente novamente.');
      } else {
        toast.error(error.message || 'Erro ao tentar fazer login');
      }
      navigate('/login');
    }
    return null;
  };

  return (
    <div id="loginDiv">
      <form id="loginForm">
        <div id="inputs">
          <label htmlFor="email">
            <p id="inputTitle">Login</p>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              value={formLogin.email}
              onChange={handleChange}
              onBlur={() => { setTouchedEmail(true); }}
              required
            />
            {touchedEmail && formLogin.email && emailErrorMessage && (
            <p id="ErrorMsg">{emailErrorMessage}</p>
            )}
          </label>
        </div>
        <div id="inputs">
          <label htmlFor="password">
            <p id="inputTitle">Senha</p>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              name="password"
              value={formLogin.password}
              onChange={handleChange}
              onBlur={() => { setTouchedPassword(true); }}
              required
            />
            {touchedPassword && formLogin.password && passwordErrorMessage && (
            <p id="ErrorMsg">{passwordErrorMessage}</p>
            )}
          </label>
        </div>
        <div>
          <button
            id="loginButton"
            type="button"
            disabled={isDisabled}
            onClick={() => signIn(formLogin.email, formLogin.password)}
          >
            LOGIN
          </button>
        </div>
        <div>
          <button
            id="registerButton"
            type="submit"
            onClick={() => navigate('/register', { replace: true })}
          >
            Ainda não tenho conta
          </button>
        </div>
        <div>
          <button
            id="visitorsButton"
            type="button"
            onClick={() => navigate('/visitors', { replace: true })}
          >
            Acessar página de visitantes
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;
