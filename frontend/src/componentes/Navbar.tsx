import { useNavigate } from 'react-router-dom';
import './estilos/Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type NavbarProps = {
  mostrarLogin?: boolean;
};

function Navbar({ mostrarLogin = true }: NavbarProps) {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        MiProyecto
      </Link>
      <ul className="navbar-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Acerca</a></li>
        <li><a href="#">Contacto</a></li>
        <li><Link to="/protegida">
        Protegida
      </Link></li>
      </ul>

      {isAuthenticated ? (
        <button className="login-button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        mostrarLogin && (
          <button className="login-button" onClick={() => navigate('/login')}>
            Login
          </button>
        )
      )}
    </nav>
  );
}

export default Navbar;
