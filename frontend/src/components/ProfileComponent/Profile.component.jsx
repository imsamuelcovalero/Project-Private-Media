/* File: src/components/ProfileComponent/Profile.component.jsx */
import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { firebaseReauthenticate, firebaseUpdateProfile } from '../../services/firebase.helper';
import { saveUserInfo } from '../../helpers/localStorage.helper';
import api from '../../services';
import { ProfileS, InputS } from './Style';
import ReactNodeContext from '../../context/ReactNodeContext';

function ProfileComponent() {
  const { user, logout, setUser } = useContext(ReactNodeContext);
  const [formProfile, setFormProfile] = useState({
    name: user?.nome,
    email: user?.email,
    password: '',
    passwordConfirm: '',
  });

  // state to keep track of the original user data
  const [originalProfile, setOriginalProfile] = useState({
    name: user.nome,
    email: user.email,
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isEditFormActivated, setIsEditFormActivated] = useState(false);
  const [canChangePassword, setCanChangePassword] = useState(false);

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

  /* função responsável por cancelar a edição do formulário */
  const cancelEdit = () => {
    setIsEditFormActivated(!isEditFormActivated);
    setTouchedPassword(false);
    setCanChangePassword(false);
    if (isEditFormActivated) {
      setFormProfile(originalProfile);
    } else {
      setOriginalProfile(formProfile);
    }
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

    if (error === '') setIsSubmitDisabled(false); // Se não há erros, habilita o botão
    else setIsSubmitDisabled(true); // Se há erros, desabilita o botão

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
      if (serverError === 'oldPassword') {
        setServerError('');
      }
      // adicionando a atualização do originalProfile aqui também
      if (!isEditFormActivated) {
        setOriginalProfile((prevState) => ({
          ...prevState,
          password: value,
        }));
      }
    }

    if (name === 'name') {
      setTouchedName(true);
      if (!isEditFormActivated) {
        setOriginalProfile((prevState) => ({
          ...prevState,
          name: value,
        }));
      }
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

    console.log('isDisabled1', isDisabled);
    try {
      const idToken = await firebaseUpdateProfile({ name, password });
      if (!idToken) toast.error('Erro ao tentar fazer o registro');
      console.log('idToken', idToken);
      const response = await api.signUp(idToken);
      // console.log('response', response);

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
      navigate('/visitors');
    } catch (error) {
      if (error.message === 'Authentication error') {
        toast.error('Erro na autenticação. Por favor, tente novamente.');
      } else {
        toast.error(error.message || 'Erro ao tentar editar o perfil');
      }
    }
    return null;
  };

  /* Função para lidar com a verificação de senha antiga */
  const verifyOldPassword = async (event, email, oldPassword) => {
    event.preventDefault();

    try {
    // Tenta reautenticar o usuário com o email e a senha antiga
      await firebaseReauthenticate(email, oldPassword);

      // Se a reautenticação for bem-sucedida, altera o estado para mostrar os campos de nova senha
      setCanChangePassword(true);

      // Limpa o campo de senha antiga
      setFormProfile((prevState) => ({
        ...prevState,
        password: '',
      }));

      // Limpa qualquer erro de servidor anterior
      setServerError(null);
    } catch (error) {
    // Se ocorrer um erro, mostra uma mensagem de erro ao usuário e destaca o campo de senha antiga
      if (error.code === 'auth/wrong-password') {
        toast.error('A senha fornecida está incorreta. Por favor, tente novamente.');
        setServerError('oldPassword');
      } else {
        toast.error(error.message || 'Ocorreu um erro ao tentar verificar a senha antiga. Por favor, tente novamente.');
      }

      // Limpa o estado de poder alterar a senha
      setCanChangePassword(false);
    }
  };

  /* aqui vai ficar o campo estendido da senha */

  return (
    <ProfileS>
      <h1>Perfil</h1>
      <p>
        Status da assinatura:
        {' '}
        {user?.assinaturaAtiva.status ? 'Ativa' : 'Inativa'}
      </p>
      {!user?.assinaturaAtiva.status && <button type="button" id="paymentButton" onClick={() => console.log('Implementar assinatura')}>Assinar agora!</button>}
      {!isEditFormActivated ? (
        <div id="itensPerfil">
          <button
            id="editProfileButton"
            type="button"
            onClick={() => setIsEditFormActivated(!isEditFormActivated)}
          >
            Editar perfil
          </button>
          <div>
            <div>
              <span id="title">Nome</span>
              <p>{formProfile.name}</p>
            </div>
            <div>
              <span id="title">Email</span>
              <p>{formProfile.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <form id="profileForm" ref={formRef}>
          {!touchedPassword && (
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
          )}
          <div>
            {!canChangePassword ? (
              <div id="oldPasswordDiv">
                <label htmlFor="password">
                  <p id="inputTitle">Password</p>
                  <InputS
                    id="password"
                    type="password"
                    placeholder="Digite seu password"
                    name="password"
                    value={formProfile.password}
                    onChange={handleChange}
                    onClick={() => {
                      setTouchedPassword(true);
                    }}
                    required
                    hasError={serverError === 'oldPassword'}
                  />
                  {touchedPassword && formProfile.password && passwordErrorMessage && (
                  <p id="ErrorMsg">{passwordErrorMessage}</p>
                  )}
                </label>
                {touchedPassword && (
                <button
                  type="button"
                  id="sendPasswordButton"
                  disabled={isSubmitDisabled || serverError === 'oldPassword'}
                  onClick={(event) => verifyOldPassword(
                    event,
                    formProfile.email,
                    formProfile.password,
                  )}
                >
                  Enviar
                </button>
                ) }
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
          <button
            id="updateButton"
            type="submit"
            disabled={isDisabled}
            onClick={(event) => updateProfile(
              event,
              formProfile.name,
              formProfile.password,
            )}
          >
            Atualizar perfil
          </button>
          <button
            id="editProfileButton"
            type="button"
            onClick={cancelEdit}
          >
            Cancelar edição
          </button>
        </form>
      )}
    </ProfileS>
  );
}

export default ProfileComponent;
