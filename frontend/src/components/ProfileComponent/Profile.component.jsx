/* File: src/components/ProfileComponent/Profile.component.jsx */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services';
// import { removeUserInfo } from '../../helpers/localStorage.helper';
import { ProfileS, InputS } from './Style';
import ReactNodeContext from '../../context/ReactNodeContext';

function ProfileComponent() {
  const { user, logout } = useContext(ReactNodeContext);
  const [formProfile, setFormProfile] = useState({
    name: user.nome,
    password: '',
  });

  const [touchedName, setTouchedName] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const navigate = useNavigate();
  /* useEffect que verifica se o usuário está logado  */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const data = await api.checkToken();
        console.log('data', data);
        if (data) {
          setFormProfile({
            name: data.nome,
            email: data.email,
            password: '',
          });
        }
      } catch (error) {
        console.error(error);
        logout();
        navigate('/visitors');
      }
    };

    verifyToken();
  }, []);

  /* Função que valida os dados digitados */
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

  /* Função que atualiza o estado de acordo com o input digitado */
  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'password') {
      const passwordError = validatePassword(value);
      setPasswordErrorMessage(passwordError);
    }

    setFormProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /* Função que envia os dados atualizados para a API (api.updateProfile) */
  const updateProfile = async (event, name, password) => {
    event.preventDefault();

    try {
      await api.updateProfile(name, password);
      toast.success('Perfil atualizado com sucesso.');
    } catch (error) {
      toast.error('Erro ao tentar atualizar o perfil.');
    }
  };

  /* useEffect que recupera os dados do usuário do localStorage e preenche o estado */
  // useEffect(() => {
  //   const userInfo = getUserInfo();
  //   if (userInfo) {
  //     setFormProfile({
  //       name: userInfo.nome,
  //       email: userInfo.email,
  //       password: '',
  //     });
  //   }
  // }, []);

  return (
    <ProfileS>
      <h1>Perfil</h1>
      <form id="profileForm">
        <label htmlFor="name">
          <p id="inputTitle">Nome</p>
          <InputS
            id="name"
            type="text"
            name="name"
            placeholder="Seu nome"
            value={formProfile.name}
            onChange={handleChange}
            required
          />
          {touchedName && formProfile.name && nameErrorMessage && (
            <p id="ErrorMsg">{nameErrorMessage}</p>
          )}
        </label>
        <label htmlFor="password">
          <p id="inputTitle">Nova senha</p>
          <InputS
            id="password"
            type="password"
            name="password"
            placeholder="Digite sua nova senha"
            value={formProfile.password}
            onChange={handleChange}
            onInvalid={(e) => {
              e.target.setCustomValidity('');
              if (!e.target.validity.valid) {
                e.target.setCustomValidity('A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caracter especial');
              }
            }}
            onInput={(e) => e.target.setCustomValidity('')}
          />
          {formProfile.password && passwordErrorMessage && (
          <p id="ErrorMsg">{passwordErrorMessage}</p>
          )}
        </label>
        <button
          id="updateButton"
          type="submit"
          onClick={(event) => updateProfile(
            event,
            formProfile.name,
            formProfile.password,
          )}
        >
          Atualizar perfil
        </button>
      </form>
    </ProfileS>
  );
}

export default ProfileComponent;
