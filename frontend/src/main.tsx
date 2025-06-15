import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Inicio from './paginas/Inicio';
import Login from './paginas/Login';
import Register from './paginas/Register';
import Protegida from './paginas/Servidores';
import RutaPrivada from './componentes/RutaPrivada';
import { AuthProvider } from './AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/protegida"
            element={
              <RutaPrivada>
                <Protegida />
              </RutaPrivada>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
