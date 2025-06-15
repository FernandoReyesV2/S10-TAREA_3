import React from 'react';
import Navbar from '../componentes/Navbar';
import './estilos/Servidores.css';

const servidores = [
  {
    nombre: 'Servidor Básico',
    costo: '$10/mes',
    rendimiento: '1 vCPU, 1 GB RAM',
    detalles: 'Ideal para pruebas, blogs pequeños y entornos de desarrollo.',
  },
  {
    nombre: 'Servidor Estándar',
    costo: '$25/mes',
    rendimiento: '2 vCPU, 4 GB RAM',
    detalles: 'Recomendado para aplicaciones web ligeras y bases de datos pequeñas.',
  },
  {
    nombre: 'Servidor Avanzado',
    costo: '$50/mes',
    rendimiento: '4 vCPU, 8 GB RAM',
    detalles: 'Buen rendimiento para aplicaciones en producción de tamaño medio.',
  },
  {
    nombre: 'Servidor Profesional',
    costo: '$90/mes',
    rendimiento: '8 vCPU, 16 GB RAM',
    detalles: 'Ideal para ecommerce, APIs con tráfico moderado y contenedores.',
  },
  {
    nombre: 'Servidor Empresarial',
    costo: '$150/mes',
    rendimiento: '16 vCPU, 32 GB RAM',
    detalles: 'Para arquitecturas distribuidas y servicios empresariales exigentes.',
  },
  {
    nombre: 'Servidor GPU',
    costo: '$200/mes',
    rendimiento: '8 vCPU, 64 GB RAM, GPU NVIDIA Tesla T4',
    detalles: 'Perfecto para IA, machine learning y procesamiento gráfico intensivo.',
  },
];

const Protegida: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="protegida-container">
        <h1 className="protegida-titulo">Catálogo de Servidores</h1>
        <div className="servidores-grid">
          {servidores.map((srv, index) => (
            <div className="servidor-card" key={index}>
              <h2>{srv.nombre}</h2>
              <p className="costo">{srv.costo}</p>
              <p className="rendimiento">{srv.rendimiento}</p>
              <p className="detalles">{srv.detalles}</p>
              <button>Alquilar</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Protegida;
