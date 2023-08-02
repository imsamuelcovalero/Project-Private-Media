/* File: src/components/ProfileComponent/Profile.component.jsx */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services';
import { ProfileS, InputS } from './Style';
import ReactNodeContext from '../../context/ReactNodeContext';

function ProfileComponent() {
  const { user, logout } = useContext(ReactNodeContext);
  const [formProfile, setFormProfile] = useState({
    name: user.nome,
    email: user.email,
    password: '',
    passwordConfirm: '',
    isEditProfile: false,
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditFormActivated, setIsEditFormActivated] = useState(false);

  const [touchedName, setTouchedName] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedPasswordConfirm, setTouchedPasswordConfirm] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState('');

  const navigate = useNavigate();
  /* useEffect que verifica se o usuário está logado  */
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

  /* Função que valida os dados digitados e habilita ou desabilita o botão de Enviar Edição */
  const validateField = (field) => {
    if (field === 'name') {
      if (!formProfile.name) return 'Campo de nome é obrigatório';
      if (formProfile.name.length < 3) {
        return 'Nome deve ter ao menos 3 caracteres';
      }
    }

    if (field === 'passwordConfirm') {
      if (!formProfile.passwordConfirm) return 'Campo de confirmação de senha é obrigatório';
      if (formProfile.password !== formProfile.passwordConfirm) {
        return 'As senhas não correspondem';
      }
    }

    return '';
  };

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

  /* useEffect que chama a função validateField e atualiza o estado de acordo com o retorno */
  useEffect(() => {
    const nameError = (touchedName || formProfile.name) ? validateField('name') : '';
    const passwordConfirmError = (touchedPasswordConfirm || formProfile.passwordConfirm) ? validateField('passwordConfirm') : '';

    setNameErrorMessage(nameError);
    setPasswordConfirmErrorMessage(passwordConfirmError);

    setIsDisabled(
      !formProfile.name
    || !formProfile.passwordConfirm
    || nameError
    || passwordConfirmError,
    );
  }, [formProfile, touchedPassword, touchedName, touchedPasswordConfirm]);

  /* Função que atualiza o estado de acordo com o input digitado */
  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'password') {
      setTouchedPassword(true);
      const passwordError = validatePassword(value);
      setPasswordErrorMessage(passwordError);
      setIsDisabled(!!passwordError || !formProfile.name);
    }

    if (name === 'name') {
      setTouchedName(true);
    } else if (name === 'passwordConfirm') {
      setTouchedPasswordConfirm(true);
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

  const toggleEditProfile = () => {
    setFormProfile((prevState) => ({
      ...prevState,
      isEditProfile: !prevState.isEditProfile,
    }));
  };

  return (
    <ProfileS>
      <h1>Perfil</h1>
      <p>
        Status da assinatura:
        {' '}
        {user.assinaturaAtiva.status ? 'Ativa' : 'Inativa'}
      </p>
      {!user.assinaturaAtiva.status && <button type="button" onClick={() => console.log('Implementar assinatura')}>Assinar agora!</button>}
      <button
        id="editProfileButton"
        type="button"
        onClick={toggleEditProfile}
      >
        {formProfile.isEditProfile ? 'Cancelar edição' : 'Editar perfil'}
      </button>
      {formProfile.isEditProfile && (
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
          <label htmlFor="passwordConfirm">
            <p id="inputTitle">Confirme a senha</p>
            <InputS
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              placeholder="Digite novamente a nova senha"
              value={formProfile.passwordConfirm}
              onChange={handleChange}
              required
            />
            {formProfile.passwordConfirm && passwordConfirmErrorMessage && (
            <p id="ErrorMsg">{passwordConfirmErrorMessage}</p>
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
      )}
    </ProfileS>
  );
}

export default ProfileComponent;
