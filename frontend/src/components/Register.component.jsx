import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { firebaseSignUp } from '../services/firebase.helper';
import { saveUserInfo } from '../helpers/localStorage.helper';
import api from '../services';
import InputS from './Style';

function RegisterComponent() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [formRegister, setFormRegister] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedPasswordConfirm, setTouchedPasswordConfirm] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState('');
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();

  /* Função que valida os dados digitados e habilita ou desabilita o botão de Entrar */
  const validateField = (field) => {
    // const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const emailRegex = /\S+@\S+\.\S{2,}/;

    if (field === 'name') {
      if (!formRegister.name) return 'Campo de nome é obrigatório';
      if (formRegister.name.length < 3) {
        return 'Nome deve ter ao menos 3 caracteres';
      }
    }

    if (field === 'email') {
      if (!formRegister.email) return 'Campo de e-mail é obrigatório';
      if (!emailRegex.test(formRegister.email)) {
        return 'Email inválido';
      }
    }

    // if (field === 'password') {
    //   if (!formRegister.password) return 'Campo de senha é obrigatório';
    //   if (formRegister.password.length < 8) {
    //     return 'Senha deve ter ao menos 8 caracteres';
    //   }
    //   if (!passwordRegex.test(formRegister.password)) {
    //     return 'Senha em formato inválido';
    //   }
    // }

    if (field === 'passwordConfirm') {
      if (!formRegister.passwordConfirm) return 'Campo de confirmação de senha é obrigatório';
      if (formRegister.password !== formRegister.passwordConfirm) {
        return 'As senhas não correspondem';
      }
    }

    return '';
  };

  /* Função que valida os dados digitados e habilita ou desabilita o botão de Entrar */
  const validatePassword = (password) => {
    const hasEightCharacters = /.{8,}/.test(password);
    const hasUpperCaseLetter = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    let error = '';

    if (!hasEightCharacters) error += 'Senha deve ter ao menos 8 caracteres. ';
    if (!hasUpperCaseLetter) error += 'Senha deve ter ao menos uma letra maiúscula. ';
    if (!hasNumber) error += 'Senha deve ter ao menos um número.';

    return error;
  };

  /* useEffect que chama a função validateField e atualiza o estado de acordo com o retorno */
  useEffect(() => {
    const emailError = (touchedEmail || formRegister.email) ? validateField('email') : '';
    // const passwordError = (touchedPassword || formRegister.password)
    //   ? validateField('password') : '';
    const nameError = (touchedName || formRegister.name) ? validateField('name') : '';
    const passwordConfirmError = (touchedPasswordConfirm || formRegister.passwordConfirm) ? validateField('passwordConfirm') : '';

    setNameErrorMessage(nameError);
    setEmailErrorMessage(emailError);
    // setPasswordErrorMessage(passwordError);
    setPasswordConfirmErrorMessage(passwordConfirmError);

    setIsDisabled(
      !formRegister.email
    // || !formRegister.password
    || !formRegister.name
    || !formRegister.passwordConfirm
    || emailError
    // || passwordError
    || nameError
    || passwordConfirmError,
    );
  }, [formRegister, touchedEmail, touchedPassword, touchedName, touchedPasswordConfirm]);

  /* Função que atualiza o estado de acordo com o input digitado */
  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'password') {
      setTouchedPassword(true);
      const passwordError = validatePassword(value);
      setPasswordErrorMessage(passwordError);
      setIsDisabled(!!passwordError || !formRegister.email || !formRegister.name);
    }

    if (name === 'name') {
      setTouchedName(true);
    } else if (name === 'email') {
      setTouchedEmail(true);
      if (serverError === 'email') {
        setServerError('');
      }
    } else if (name === 'passwordConfirm') {
      setTouchedPasswordConfirm(true);
    }

    setFormRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /* Função que envia os dados do registro para a API (api.singUp) e
  em caso de sucesso redireciona para a rota /visitors */
  const signUp = async (event, name, email, password) => {
    event.preventDefault();
    console.log('isDisabled1', isDisabled);
    try {
      const idToken = await firebaseSignUp({ name, email, password });
      if (!idToken) toast.error('Erro ao tentar fazer o registro');
      console.log('idToken', idToken);
      const response = await api.signUp(idToken);
      // console.log('response', response);

      const { id, nome, assinaturaAtiva } = response;

      saveUserInfo({
        id, email, nome, assinaturaAtiva,
      });

      toast.warning('Conta criada! Para acessar todo o conteúdo, faça uma assinatura.', {
        position: 'bottom-right',
      });
      navigate('/visitors');
    } catch (error) {
      if (error.message === 'Authentication error') {
        toast.error('Erro na autenticação. Por favor, tente novamente.');
      } else {
        if (error.message === 'O e-mail já está em uso. Por favor, tente outro.') {
          setServerError('email');
        }
        toast.error(error.message || 'Erro ao tentar fazer o registro');
      }
    }
    return null;
  };

  return (
    <div>
      <div>
        <h1>
          Cadastro
        </h1>
      </div>
      <form id="registerForm">
        <div id="inputs">
          <label htmlFor="name">
            <p id="inputTitle">Nome</p>
            <InputS
              id="name"
              type="text"
              name="name"
              placeholder="Seu nome"
              value={formRegister.name}
              onChange={handleChange}
              required
            />
            {touchedName && formRegister.name && nameErrorMessage && (
              <p id="ErrorMsg">{nameErrorMessage}</p>
            )}
          </label>
          <label htmlFor="email">
            <p id="inputTitle">Email</p>
            <InputS
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              value={formRegister.email}
              onChange={handleChange}
              onBlur={() => { setTouchedEmail(true); }}
              required
              hasError={serverError === 'email'}
            />
            {touchedEmail && formRegister.email && emailErrorMessage && (
            <p id="ErrorMsg">{emailErrorMessage}</p>
            )}
          </label>
          <label htmlFor="password">
            <p id="inputTitle">Senha</p>
            <InputS
              id="password"
              type="password"
              placeholder="Digite sua senha"
              name="password"
              value={formRegister.password}
              onChange={handleChange}
              onBlur={() => { setTouchedPassword(true); }}
              onInvalid={(e) => {
                e.target.setCustomValidity('');
                if (!e.target.validity.valid) {
                  e.target.setCustomValidity('A senha deve conter pelo menos 8 caracteres, uma letra maiúscula e um dígito numérico');
                }
              }}
              onInput={(e) => e.target.setCustomValidity('')}
            />
            {touchedPassword && formRegister.password && passwordErrorMessage && (
            <p id="ErrorMsg">{passwordErrorMessage}</p>
            )}
          </label>
          <label htmlFor="passwordConfirm">
            <p id="inputTitle">Confirmar senha</p>
            <InputS
              id="passwordConfirm"
              type="password"
              placeholder="Confirme sua senha"
              name="passwordConfirm"
              value={formRegister.passwordConfirm}
              onChange={handleChange}
              onBlur={() => { setTouchedPasswordConfirm(true); }}
              required
            />
            {touchedPasswordConfirm && formRegister.passwordConfirm
            && passwordConfirmErrorMessage && (
            <p id="ErrorMsg">{passwordConfirmErrorMessage}</p>
            )}
          </label>
        </div>
        <button
          id="registerButton"
          type="submit"
          disabled={isDisabled || serverError === 'email'}
          onClick={(event) => signUp(
            event,
            formRegister.name,
            formRegister.email,
            formRegister.password,
          )}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default RegisterComponent;
