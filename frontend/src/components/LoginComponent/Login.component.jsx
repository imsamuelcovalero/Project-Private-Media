/* File: src/components/LoginComponent/Login.component.jsx */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { firebaseSignIn } from '../../services/firebase.helper';
import { saveUserInfo } from '../../helpers/localStorage.helper';
import api from '../../services';
import ReactNodeContext from '../../context/ReactNodeContext';
import { LoginS } from './Style';

function LoginComponent() {
  const {
    setUser, categoryIds, setIsSignatureActive,
    setIsUserLogged,
  } = useContext(ReactNodeContext);
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
        if (data && !data.assinaturaAtiva.status) {
          toast.warning(data.assinaturaAtiva.message, {
            position: 'top-right',
          });
          setIsSignatureActive(false);
        } else if (data && data.assinaturaAtiva.status) {
          setIsSignatureActive(true);
        }
        navigate(`/${categoryIds[0]}`);
      } catch (error) {
        console.error(error);
      }
    };

    verifyToken();
  }, []);

  /* Função que valida os dados digitados e lança mensagem de erro caso necessário */
  const validateField = (field) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const emailRegex = /\S+@\S+\.\S{2,}/;

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

  /* useEffect que chama a função validateField e habilita ou desabilita o botão de Entrar */
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
  const signIn = async (e, email, password) => {
    e.preventDefault();
    try {
      const idToken = await firebaseSignIn(email, password);
      const response = await api.signIn(idToken);

      const { id, nome, assinaturaAtiva } = response;

      const userInfo = {
        id, email, nome, assinaturaAtiva,
      };

      saveUserInfo(userInfo);

      setUser(userInfo);

      if (!assinaturaAtiva.status) {
        toast.warning(assinaturaAtiva.message, {
          position: 'top-right',
        });
        setIsSignatureActive(false);
      } else {
        setIsSignatureActive(true);
      }
      setIsUserLogged(true);
      navigate(`/${categoryIds[0]}`);
    } catch (error) {
      // Check the code property of the error to determine the type of the error
      switch (error.code) {
        case 'auth/user-not-found':
          toast.error('Usuário não encontrado. Por favor, tente novamente.');
          break;
        case 'auth/invalid-email':
          toast.error('O email informado não é válido. Por favor, tente novamente.');
          break;
        case 'auth/wrong-password':
          toast.error('Senha incorreta. Por favor, tente novamente.');
          break;
        default:
          toast.error('Erro ao tentar fazer login. Por favor, tente novamente.');
      }
      navigate('/login');
    }
    return null;
  };

  return (
    <LoginS>
      <form id="loginForm">
        <div id="inputs">
          <label htmlFor="email">
            <p className="inputTitle">Login</p>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              value={formLogin.email}
              onChange={handleChange}
              onBlur={() => { setTouchedEmail(false); }}
              required
            />
            {touchedEmail && emailErrorMessage && (
            <p className="errorMsg">{emailErrorMessage}</p>
            )}
          </label>
        </div>
        <div id="inputs">
          <label htmlFor="password">
            <p className="inputTitle">Senha</p>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              name="password"
              value={formLogin.password}
              onChange={handleChange}
              onBlur={() => { setTouchedPassword(false); }}
              required
            />
            {touchedPassword && passwordErrorMessage && (
            <p className="errorMsg">{passwordErrorMessage}</p>
            )}
          </label>
        </div>
        <button
          className="forgot-password"
          type="button"
          onClick={() => navigate('/password-reset')}
        >
          Esqueci minha senha
        </button>
        <div>
          <button
            className="primary"
            type="submit"
            disabled={isDisabled}
            onClick={(e) => signIn(e, formLogin.email, formLogin.password)}
          >
            LOGIN
          </button>
        </div>
        <div>
          <button
            className="secondary"
            type="button"
            onClick={() => navigate('/register')}
          >
            Ainda não tenho conta
          </button>
        </div>
        <div>
          <button
            className="standard"
            type="button"
            onClick={() => navigate('/visitors')}
          >
            Acessar página de visitantes
          </button>
        </div>
      </form>
    </LoginS>
  );
}

export default LoginComponent;
