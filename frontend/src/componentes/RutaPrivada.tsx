import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RutaPrivadaProps {
  children: React.ReactElement;
}

const RutaPrivada: React.FC<RutaPrivadaProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a login
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, muestra el componente hijo (la página protegida)
  return children;
};

export default RutaPrivada;
