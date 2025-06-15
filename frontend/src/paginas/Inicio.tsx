import "./estilos/Inicio.css";
import Navbar from '../componentes/Navbar';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Inicio() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);


  return (
    <>
      <Navbar />

      <div className="inicio-container" id="inicio">
        <h1>Alquiler de Servidores de Alto Rendimiento</h1>
        <p>Infraestructura confiable, segura y optimizada para tus proyectos más exigentes.</p>
      </div>

      <div className="seccion" id="acerca">
        <h2>¿Quiénes Somos?</h2>
        <div className="cards-container">
          <div className="card">
            <h3>Misión</h3>
            <p>Proveer servicios de hosting y servidores de alto rendimiento que se adapten a las necesidades empresariales y tecnológicas modernas.</p>
          </div>
          <div className="card">
            <h3>Visión</h3>
            <p>Ser líderes en soluciones de infraestructura digital, brindando estabilidad, velocidad y seguridad a nuestros clientes.</p>
          </div>
        </div>
      </div>

      <div className="seccion" id="contacto">
        <h2>Contacto</h2>
        <p>¿Listo para llevar tu proyecto al siguiente nivel? Escríbenos a: <a href="mailto:servicio@servidorespro.com">servicio@servidorespro.com</a></p>
      </div>
    </>
  );
}

export default Inicio;
