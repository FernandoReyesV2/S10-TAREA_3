import React from 'react';
import Navbar from '../componentes/Navbar';

const Protegida: React.FC = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>¡Funciona! Estás autenticado y puedes ver esta página protegida.</h1>
      </div>
    </>
  );
};

export default Protegida;
