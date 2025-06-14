import React, { useState, useContext } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './estilos/Formulario.css';

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (username: string, password: string) => void;
  extraLinkText: string;
  extraLinkTo: string;
  extraLinkLabel: string;
}

interface LoginResponse {
  mensaje: string;
  token?: string;
}

const Formulario: React.FC<AuthFormProps> = ({
  title,
  buttonText,
  onSubmit,
  extraLinkText,
  extraLinkTo,
  extraLinkLabel,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (usernameError || passwordError) return;

    try {
      const endpoint = title === 'Crear Cuenta' ? 'register' : 'login';

      const response = await axios.post<LoginResponse>(`http://localhost:3001/api/${endpoint}`, {
        usuario: username,
        contrasena: password,
      });

      alert(response.data.mensaje);

      if (endpoint === 'login' && response.data.token) {
        login(response.data.token);
      }

      onSubmit(username, password);
      navigate('/protegida');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error al procesar la solicitud');
    }
  };

  return (
    <div className="auth-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {/* Inputs con validaciones como ya tienes */}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => {
            const input = e.target.value.toLowerCase();
            const regex = /^[a-záéíóúñ]*$/i;
            if (regex.test(input)) {
              setUsername(input);
              setUsernameError('');
            } else {
              setUsername(input);
              setUsernameError('El usuario solo debe contener letras sin espacios (pueden incluir tildes)');
            }
          }}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.preventDefault();
              setUsernameError('No se permiten espacios en el nombre de usuario');
            }
          }}
          required
        />
        {usernameError && <p className="error-message">{usernameError}</p>}

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {
            const input = e.target.value;
            if (/\s/.test(input)) {
              setPassword(input);
              setPasswordError('La contraseña no puede contener espacios');
            } else {
              setPassword(input);
              setPasswordError('');
            }
          }}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.preventDefault();
              setPasswordError('La contraseña no puede contener espacios');
            }
          }}
          required
        />
        {passwordError && <p className="error-message">{passwordError}</p>}

        <button type="submit">{buttonText}</button>
      </form>
      <p className="extra-link-text">
        {extraLinkText}{' '}
        <a href={extraLinkTo} className="extra-link-label">
          {extraLinkLabel}
        </a>
      </p>
    </div>
  );
};

export default Formulario;
