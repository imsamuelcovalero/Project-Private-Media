/* File: src/components/ProfileComponent/ProfileEdit.component.jsx */
import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { firebaseReauthenticate, firebaseUpdateProfile } from '../../services/firebase.helper';
import { saveUserInfo } from '../../helpers/localStorage.helper';
import api from '../../services';
import ConfirmationModal from '../ConfirmationModal.component';
import ReactNodeContext from '../../context/ReactNodeContext';
import {
  ProfileEditS, InputS, ButtonS,
} from './Style';

function ProfileEditComponent() {
  const {
    user, logout, setUser,
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
    oldPassword: '',
  });

  /* Estado para controlar o botão de envio do password antigo */
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  /* Estado para controlar o botão de atualizar o perfil */
  const [isNameBtnDisabled, setNameBtnDisabled] = useState(true);
  const [isNewPasswordBtnDisabled, setIsNewPasswordBtnDisabled] = useState(true);

  const [canChangePassword, setCanChangePassword] = useState(false);

  const [touchedName, setTouchedName] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [touchedOldPassword, setTouchedOldPassword] = useState(false);
  const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState('');

  const [touchedNewPassword, setTouchedNewPassword] = useState(false);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState('');
  const [touchedNewPasswordConfirm, setTouchedNewPasswordConfirm] = useState(false);
  const [newPasswordConfirmErrorMessage, setNewPasswordConfirmErrorMessage] = useState('');
  const [serverError, setServerError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalCallback, setModalCallback] = useState(null);

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
      }
    };

    verifyToken();
  }, []);

  /* useEffect que verifica se o formulário foi alterado */
  useEffect(() => {
    setFormProfile({
      name: user?.nome,
      email: user?.email,
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    });

    setOriginalProfile({
      name: user?.nome,
      email: user?.email,
      oldPassword: '',
    });
  }, [user]);

  /* função responsável por cancelar a edição do formulário */
  const cancelEdit = (isFromApi) => {
    if (!touchedName && !touchedOldPassword) {
      return navigate('/profile');
    } if (!isFromApi) {
      setModalMessage('Tem certeza que deseja cancelar a edição?');
      setModalCallback(() => {
        setTouchedName(false);
        setTouchedOldPassword(false);
        setTouchedNewPassword(false);

        setIsSubmitDisabled(true);
        setNameBtnDisabled(true);
        setIsNewPasswordBtnDisabled(true);

        if (canChangePassword) {
          setCanChangePassword(false);
        }

        setFormProfile(originalProfile);
      });
      setShowModal(true);
      return null;
    }

    setTouchedName(false);
    setTouchedOldPassword(false);
    setTouchedNewPassword(false);

    setIsSubmitDisabled(true);
    setNameBtnDisabled(true);
    setIsNewPasswordBtnDisabled(true);

    if (canChangePassword) {
      setCanChangePassword(false);
    }

    setFormProfile(originalProfile);

    return null;
  };

  /* useEffect que verifica se a tecla ESC foi pressionada */
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        cancelEdit();
      }
    };

    document.addEventListener('keydown', handleEsc, true);

    return () => {
      document.removeEventListener('keydown', handleEsc, true);
    };
  }, [cancelEdit]);

  /* Função que valida o campo de nome */
  const validateName = (name) => {
    if (name === originalProfile.name) return true;
    if (name === '') return 'Campo de nome é obrigatório';
    if (name.length < 3) {
      return 'Nome deve ter ao menos 3 caracteres';
    }

    return '';
  };

  /* Função que valida os dados do password antigo e lança mensagem de erro caso necessário */
  const validateOldPassword = (oldPassword) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!formProfile.oldPassword) return 'Campo de senha é obrigatório';
    if (oldPassword.length < 8) {
      return 'Senha deve ter ao menos 8 caracteres';
    }
    if (!passwordRegex.test(oldPassword)) {
      return 'Senha em formato inválido';
    }

    return '';
  };

  /* Função que valida a senha */
  const validateNewPassword = (password) => {
    const hasEightCharacters = /.{8,}/.test(password);
    const hasUpperCaseLetter = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    let error = '';

    // console.log('formProfile.newPassword', formProfile.newPassword);

    if (!formProfile.newPassword) return 'Campo de senha é obrigatório. ';
    if (!hasEightCharacters) error += 'Senha deve ter ao menos 8 caracteres. ';
    if (!hasUpperCaseLetter) error += 'Senha deve ter ao menos uma letra maiúscula. ';
    if (!hasNumber) error += 'Senha deve ter ao menos um número.';

    return error;
  };

  /* Função que valida o campo de confirmação de senha */
  const validateNewPasswordConfirmation = (password, passwordConfirm) => {
    if (!passwordConfirm) return 'Campo de confirmação de senha é obrigatório';
    if (password !== passwordConfirm) {
      return 'As senhas não correspondem';
    }

    return '';
  };

  /* useEffect que chama as funções de validação e atualiza o estado de acordo com o retorno */
  useEffect(() => {
    const nameError = (touchedName || formProfile.name) ? validateName(formProfile.name) : '';
    const oldPasswordError = (touchedOldPassword || formProfile.oldPassword) ? validateOldPassword(formProfile.oldPassword) : '';
    const newPasswordError = (touchedNewPassword || formProfile.newPassword) ? validateNewPassword(formProfile.newPassword) : '';
    const newPasswordConfirmError = (touchedNewPasswordConfirm || formProfile.newPasswordConfirm) ? validateNewPasswordConfirmation(formProfile.newPassword, formProfile.newPasswordConfirm) : '';

    setNameErrorMessage(nameError);
    setOldPasswordErrorMessage(oldPasswordError);
    setNewPasswordErrorMessage(newPasswordError);
    setNewPasswordConfirmErrorMessage(newPasswordConfirmError);

    setNameBtnDisabled(!formProfile.name || nameError);
    setIsSubmitDisabled(!formProfile.oldPassword || oldPasswordError);

    setIsNewPasswordBtnDisabled(
      !formProfile.newPassword
    || !formProfile.newPasswordConfirm
    || newPasswordError
    || newPasswordConfirmError,
    );
  }, [formProfile, touchedName, touchedOldPassword, touchedNewPassword, touchedNewPasswordConfirm]);

  /* Função que atualiza o estado de acordo com o input digitado */
  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'oldPassword') {
      if (serverError === 'oldPassword') {
        setServerError('');
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

    setModalMessage('Tem certeza que deseja atualizar seu perfil?');
    setModalCallback(() => async () => {
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
    });
    setShowModal(true);
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
        oldPassword: '',
        newPassword: '',
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

  return (
    <ProfileEditS>
      <h1>Edição do Perfil</h1>
      <ConfirmationModal
        show={showModal}
        title="Confirmação"
        message={modalMessage}
        onConfirm={() => {
          if (typeof modalCallback === 'function') {
            modalCallback();
          }
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
      <form id="profileForm" ref={formRef}>
        {!touchedOldPassword && (
        <label htmlFor="name">
          <p className="inputTitle">Nome</p>
          <InputS
            id="name"
            type="text"
            name="name"
            placeholder="Seu nome"
            value={formProfile.name}
            onChange={handleChange}
            onClick={() => setTouchedName(true)}
            required
          />
          {touchedName && nameErrorMessage && (
          <p className="errorMsg">{nameErrorMessage}</p>
          )}
        </label>
        )}
        {!touchedName && (
        <div>
          {!canChangePassword ? (
            <div id="oldPasswordDiv">
              <label htmlFor="oldPassword">
                <p className="inputTitle">Password</p>
                <InputS
                  id="oldPassword"
                  type="password"
                  placeholder="Digite seu password"
                  name="oldPassword"
                  value={formProfile.oldPassword}
                  onChange={handleChange}
                  onClick={() => setTouchedOldPassword(true)}
                  required
                  hasError={serverError === 'oldPassword'}
                />
                {touchedOldPassword && oldPasswordErrorMessage && (
                <p className="errorMsg">{oldPasswordErrorMessage}</p>
                )}
              </label>
              {touchedOldPassword && (
              <ButtonS
                type="button"
                id="sendPasswordButton"
                className="primary"
                disabled={isSubmitDisabled || serverError === 'oldPassword'}
                onClick={(event) => verifyOldPassword(
                  event,
                  formProfile.email,
                  formProfile.oldPassword,
                )}
              >
                Enviar
              </ButtonS>
              ) }
            </div>
          ) : (
            <div id="newPasswordDiv">
              <label htmlFor="newPassword">
                <p className="inputTitle">Nova senha</p>
                <InputS
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  placeholder="Digite sua nova senha"
                  value={formProfile.newPassword}
                  onChange={handleChange}
                  onClick={() => setTouchedNewPassword(true)}
                  onBlur={() => { setTouchedNewPassword(false); }}
                  onInvalid={(e) => {
                    e.target.setCustomValidity('');
                    if (!e.target.validity.valid) {
                      e.target.setCustomValidity('A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caracter especial');
                    }
                  }}
                  onInput={(e) => e.target.setCustomValidity('')}
                  required
                />
                {touchedNewPassword && newPasswordErrorMessage && (
                <p className="errorMsg">{newPasswordErrorMessage}</p>
                )}
              </label>
              <label htmlFor="newPasswordConfirm">
                <p className="inputTitle">Confirme a senha</p>
                <InputS
                  id="newPasswordConfirm"
                  type="password"
                  name="newPasswordConfirm"
                  placeholder="Digite novamente a nova senha"
                  value={formProfile.newPasswordConfirm}
                  onChange={handleChange}
                  onClick={() => setTouchedNewPasswordConfirm(true)}
                  onBlur={() => { setTouchedNewPasswordConfirm(false); }}
                  required
                />
                {touchedNewPasswordConfirm && newPasswordConfirmErrorMessage && (
                <p className="errorMsg">{newPasswordConfirmErrorMessage}</p>
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
          disabled={touchedName ? isNameBtnDisabled : isNewPasswordBtnDisabled}
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
                formProfile.newPassword,
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
          onClick={() => (touchedName || touchedOldPassword ? cancelEdit() : navigate('/profile'))}
        >
          {touchedName || touchedOldPassword ? 'Cancelar edição' : 'Voltar'}
        </ButtonS>
      </form>
    </ProfileEditS>
  );
}

export default ProfileEditComponent;
