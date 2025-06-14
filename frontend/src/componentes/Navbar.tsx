import { useNavigate } from 'react-router-dom';
import './estilos/Navbar.css';
import { Link } from 'react-router-dom';

type NavbarProps = {
  mostrarLogin?: boolean;
};

function Navbar({ mostrarLogin = true }: NavbarProps) {
  const navigate = useNavigate();
  

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        MiProyecto
      </Link>
      <ul className="navbar-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Acerca</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
      {mostrarLogin && (
       <button className="login-button" onClick={() => navigate('/login')}>
        Login
      </button>
      )}
    </nav>
  );
}

export default Navbar;
