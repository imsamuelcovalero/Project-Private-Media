/* File: src/components/Profile/ProfileEdit.component.jsx */
import React, {
  useState, useEffect, useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { firebaseUpdateProfile } from '../../services/firebase.helper';
import { saveUserInfo } from '../../helpers/localStorage.helper';
import api from '../../services';
import ReactNodeContext from '../../context/ReactNodeContext';

function ProfileEdit() {
  const { user, logout, setUser } = useContext(ReactNodeContext);
  const navigate = useNavigate();

  const [formProfile, setFormProfile] = useState({
    name: user?.nome,
    email: user?.email,
    password: '',
    passwordConfirm: '',
  });

  const [isEditFormActivated, setIsEditFormActivated] = useState(false);
  const [hasEditFieldTouched, setHasEditFieldTouched] = useState(false);
  const [touchedName, setTouchedName] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedPasswordConfirm, setTouchedPasswordConfirm] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState('');
  const [serverError, setServerError] = useState('');

  // ... (restante das funções)

  return (
    <div>
      <h1>Edição de Perfil</h1>
      <form id="profileForm">
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
              onClick={() => {
                setTouchedName(true);
                setHasEditFieldTouched(true);
              }}
              required
            />
            {touchedName && formProfile.name && nameErrorMessage && (
            <p id="ErrorMsg">{nameErrorMessage}</p>
            )}
          </label>
        )}

        {!touchedName && (
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
                    setHasEditFieldTouched(true);
                  }}
                  required
                />
                {touchedPassword && formProfile.password && passwordErrorMessage && (
                <p id="ErrorMsg">{passwordErrorMessage}</p>
                )}
              </label>
              {touchedPassword && (
              <button
                type="button"
                id="sendPasswordButton"
                onClick={(event) => verifyOldPassword(
                  event,
                  formProfile.email,
                  formProfile.password,
                )}
              >
                Enviar
              </button>
              )}
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
                  required
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
        )}

        <button
          id="updateButton"
          type="submit"
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
        </button>
        <button
          id="cancelEditButton"
          type="button"
          onClick={() => cancelEdit(false)}
        >
          Cancelar edição
        </button>
      </form>
      <button type="button" onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

export default ProfileEdit;
