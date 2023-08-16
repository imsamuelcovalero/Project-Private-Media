/* File: src/components/ProfileComponent/ProfileEdit.component.jsx */
import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { firebaseReauthenticate, firebaseUpdateProfile } from '../../services/firebase.helper';
import { saveUserInfo } from '../../helpers/localStorage.helper';
import api from '../../services';
import {
  ProfileEditS, InputS, ButtonS,
} from './Style';
import ReactNodeContext from '../../context/ReactNodeContext';

function ProfileEditComponent() {
  const {
    user, logout, setUser, isEditFormActivated, setIsEditFormActivated,
  } = useContext(ReactNodeContext);
  const [formProfile, setFormProfile] = useState({
    name: user?.nome,
    email: user?.email,
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const [originalProfile, setOriginalProfile] = useState({
    name: user.nome,
    email: user.email,
    password: '',
  });

  const [isNameBtnDisabled, setNameBtnDisabled] = useState(true);
  const [isPasswordBtnDisabled, setIsPasswordBtnDisabled] = useState(true);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [canChangePassword, setCanChangePassword] = useState(false);
  const [hasEditFieldTouched, setHasEditFieldTouched] = useState(false);

  const [touchedName, setTouchedName] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedPasswordConfirm, setTouchedPasswordConfirm] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState('');
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();
  const formRef = useRef();

  /* useEffect que verifica se o usuário está logado  */
  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.checkToken();
        // console.log('data', data);
      } catch (error) {
        console.error(error);
        logout();
        navigate('/visitors');
      }
    };

    verifyToken();
  }, []);

  /* useEffect que verifica se o formulário foi alterado */
  useEffect(() => {
    setFormProfile({
      name: user?.nome,
      email: user?.email,
      password: '',
      passwordConfirm: '',
    });

    setOriginalProfile({
      name: user?.nome,
      email: user?.email,
      password: '',
    });
  }, [user]);

  /* função responsável por redefinir o perfil do formulário */
  const resetFormProfile = () => {
    if (isEditFormActivated) {
      setFormProfile(originalProfile);
    } else {
      setOriginalProfile(formProfile);
    }
  };

  /* função responsável por alternar a ativação do formulário de edição */
  const toggleEditForm = () => {
    setIsEditFormActivated(!isEditFormActivated);
    setCanChangePassword(false);
    resetFormProfile();
  };

  /* função responsável por cancelar a edição do formulário */
  const cancelEdit = (isFromApi) => {
    if (!hasEditFieldTouched) {
      toggleEditForm();
      return;
    }

    if (!isFromApi) {
      const confirmation = window.confirm('Tem certeza que deseja cancelar a edição?');
      if (!confirmation) return;
    }

    setHasEditFieldTouched(false);
    setTouchedName(false);
    setTouchedPassword(false);

    if (canChangePassword) {
      setCanChangePassword(false);
    }

    resetFormProfile();
  };

  /* useEffect que verifica se a tecla ESC foi pressionada */
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && isEditFormActivated) {
        event.preventDefault();
        event.stopPropagation();
        cancelEdit();
      }
    };

    document.addEventListener('keydown', handleEsc, true);

    return () => {
      document.removeEventListener('keydown', handleEsc, true);
    };
  }, [cancelEdit, isEditFormActivated]);

  /* Função que valida o campo de nome */
  const validateName = (name) => {
    if (!name) return 'Campo de nome é obrigatório';
    if (name.length < 3) {
      return 'Nome deve ter ao menos 3 caracteres';
    }

    return '';
  };

  /* Função que valida o campo de confirmação de senha */
  const validatePasswordConfirmation = (password, passwordConfirm) => {
    if (!passwordConfirm) return 'Campo de confirmação de senha é obrigatório';
    if (password !== passwordConfirm) {
      return 'As senhas não correspondem';
    }

    return '';
  };

  /* Função que valida os dados do password antigo e lança mensagem de erro caso necessário */
  const validateOldPassword = (oldPassword) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!oldPassword) return 'Campo de senha é obrigatório';
    if (oldPassword.length < 8) {
      return 'Senha deve ter ao menos 8 caracteres';
    }
    if (!passwordRegex.test(oldPassword)) {
      return 'Senha em formato inválido';
    }

    return '';
  };

  /* Função que valida a senha */
  const validatePassword = (password) => {
    const hasEightCharacters = /.{8,}/.test(password);
    const hasUpperCaseLetter = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    let error = '';

    if (!hasEightCharacters) error += 'Senha deve ter ao menos 8 caracteres. ';
    if (!hasUpperCaseLetter) error += 'Senha deve ter ao menos uma letra maiúscula. ';
    if (!hasNumber) error += 'Senha deve ter ao menos um número.';

    if (error === '') setIsSubmitDisabled(false);
    else setIsSubmitDisabled(true);

    return error;
  };

  /* useEffect que chama as funções de validação e atualiza o estado de acordo com o retorno */
  useEffect(() => {
    const nameError = (touchedName || formProfile.name) ? validateName(formProfile.name) : '';
    const passwordConfirmError = (touchedPasswordConfirm || formProfile.passwordConfirm) ? validatePasswordConfirmation(formProfile.password, formProfile.passwordConfirm) : '';

    setNameErrorMessage(nameError);
    setPasswordConfirmErrorMessage(passwordConfirmError);

    setNameBtnDisabled(
      !formProfile.name
    || nameError,
    );

    setIsPasswordBtnDisabled(
      !formProfile.passwordConfirm
    || passwordConfirmError,
    );
  }, [formProfile, touchedPassword, touchedName, touchedPasswordConfirm]);

  /* Função que atualiza o estado de acordo com o input digitado */
  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'oldPassword') {
      const oldPasswordError = validateOldPassword(value);
      setOldPasswordErrorMessage(oldPasswordError);
      setIsOldPasswordBtnDisabled(oldPasswordError);
    }

    if (name === 'password') {
      setTouchedPassword(true);
      const passwordError = validatePassword(value);
      setPasswordErrorMessage(passwordError);
      setIsPasswordBtnDisabled(passwordError);
      if (serverError === 'oldPassword') {
        setServerError('');
      }
      if (!isEditFormActivated) {
        setOriginalProfile((prevState) => ({
          ...prevState,
          password: value,
        }));
      }
    } else if (name === 'passwordConfirm') {
      setTouchedPasswordConfirm(true);
    }

    if (name === 'name') {
      setTouchedName(true);
      const nameError = validateName(value);
      setNameErrorMessage(nameError);
      setNameBtnDisabled(nameError);
      if (!isEditFormActivated) {
        setOriginalProfile((prevState) => ({
          ...prevState,
          name: value,
        }));
      }
    }

    setFormProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /* Função que envia os dados atualizados para a API (api.updateProfile) */
  const updateProfile = async (event, data, type) => {
    event.preventDefault();

    const confirmation = window.confirm('Tem certeza que deseja atualizar seu perfil?');
    if (!confirmation) return;

    const updateData = {};
    updateData[type] = data;

    try {
      const idToken = await firebaseUpdateProfile(updateData);
      if (!idToken) toast.error('Erro ao tentar fazer a edição');

      const response = await api.signUp(idToken);
      const {
        id, nome, email, assinaturaAtiva,
      } = response;

      const userInfo = {
        id, email, nome, assinaturaAtiva,
      };

      saveUserInfo(userInfo);

      setUser(userInfo);

      toast.success('Conta editada com sucesso!', {
        position: 'bottom-right',
      });
      setIsEditFormActivated(false);
      navigate('/profile');
    } catch (error) {
      if (error.message === 'Authentication error') {
        toast.error('Erro na autenticação. Por favor, tente novamente.');
      } else {
        toast.error(error.message || 'Erro ao tentar editar o perfil');
      }
    }
    setCanChangePassword(false);
    cancelEdit(true);
  };

  /* Função para lidar com a verificação de senha antiga */
  const verifyOldPassword = async (event, email, oldPassword) => {
    event.preventDefault();

    try {
    // Tenta reautenticar o usuário com o email e a senha antiga
      await firebaseReauthenticate(email, oldPassword);

      // Se a reautenticação for bem-sucedida, altera o estado para mostrar os campos de nova senha
      setCanChangePassword(true);

      setFormProfile((prevState) => ({
        ...prevState,
        password: '',
      }));

      setServerError(null);
    } catch (error) {
    // Se ocorrer um erro, mostra uma mensagem de erro ao usuário e destaca o campo de senha antiga
      if (error.code === 'auth/wrong-password') {
        toast.error('A senha fornecida está incorreta. Por favor, tente novamente.');
        setServerError('oldPassword');
      } else {
        toast.error(error.message || 'Ocorreu um erro ao tentar verificar a senha antiga. Por favor, tente novamente.');
      }

      setCanChangePassword(false);
    }
  };

  console.log('touchend', touchedName, touchedPassword);

  return (
    <ProfileEditS>
      <h1>Edição do Perfil</h1>
      <form id="profileForm" ref={formRef}>
        {!touchedPassword && (
        <label htmlFor="name">
          <p className="inputTitle">Nome</p>
          <InputS
            id="name"
            type="text"
            name="name"
            placeholder="Seu nome"
            value={formProfile.name}
            onChange={handleChange}
            onClick={() => {
              setTouchedName(true);
              setHasEditFieldTouched(true);
            }}
            required
          />
          {touchedName && formProfile.name && nameErrorMessage && (
          <p className="errorMsg">{nameErrorMessage}</p>
          )}
        </label>
        )}
        {!touchedName && (
        <div>
          {!canChangePassword ? (
            <div id="oldPasswordDiv">
              <label htmlFor="password">
                <p className="inputTitle">Password</p>
                <InputS
                  id="password"
                  type="password"
                  placeholder="Digite seu password"
                  name="password"
                  value={formProfile.password}
                  onChange={handleChange}
                  onClick={() => {
                    setTouchedPassword(true);
                    setHasEditFieldTouched(true);
                  }}
                  required
                  hasError={serverError === 'oldPassword'}
                />
                {touchedPassword && formProfile.password && passwordErrorMessage && (
                <p className="errorMsg">{passwordErrorMessage}</p>
                )}
              </label>
              {touchedPassword && (
              <ButtonS
                type="button"
                id="sendPasswordButton"
                className="primary"
                disabled={isSubmitDisabled || serverError === 'oldPassword'}
                onClick={(event) => verifyOldPassword(
                  event,
                  formProfile.email,
                  formProfile.password,
                )}
              >
                Enviar
              </ButtonS>
              ) }
            </div>
          ) : (
            <div id="newPasswordDiv">
              <label htmlFor="password">
                <p className="inputTitle">Nova senha</p>
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
                <p className="errorMsg">{passwordErrorMessage}</p>
                )}
              </label>
              <label htmlFor="passwordConfirm">
                <p className="inputTitle">Confirme a senha</p>
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
                <p className="errorMsg">{passwordConfirmErrorMessage}</p>
                )}
              </label>
            </div>
          )}
        </div>
        )}
        <ButtonS
          id="updateButton"
          type="submit"
          className="primary"
          disabled={touchedName ? isNameBtnDisabled : isPasswordBtnDisabled}
          onClick={(event) => {
            if (touchedName) {
              updateProfile(
                event,
                formProfile.name,
                'name',
              );
            } else {
              updateProfile(
                event,
                formProfile.password,
                'password',
              );
            }
          }}
        >
          Atualizar perfil
        </ButtonS>
        <ButtonS
          id="editProfileButton"
          type="button"
          className="secondary"
          onClick={() => (touchedName || touchedPassword ? cancelEdit() : navigate('/profile'))}
        >
          {touchedName || touchedPassword ? 'Cancelar edição' : 'Voltar'}
        </ButtonS>
      </form>
    </ProfileEditS>
  );
}

export default ProfileEditComponent;
