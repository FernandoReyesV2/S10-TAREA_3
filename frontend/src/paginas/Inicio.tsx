import "./estilos/Inicio.css"
import Navbar from '../componentes/Navbar';

function Inicio() {
  return (
    <>
    <Navbar />
      <div className="inicio-container">
      <h1>Bienvenido a mi Proyecto</h1>
      <p>Este es un ejemplo básico de la página de inicio usando React + Vite.</p>
    </div>
    </>
  );
}

export default Inicio;
