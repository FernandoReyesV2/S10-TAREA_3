import { useNavigate } from 'react-router-dom';
import './estilos/Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

type NavbarProps = {
  mostrarLogin?: boolean;
};

function Navbar({ mostrarLogin = true }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        ASAR
      </Link>
      <ul className="navbar-links">
        <li><button onClick={() => handleNavClick("inicio")}>Inicio</button></li>
        <li><button onClick={() => handleNavClick("acerca")}>Acerca</button></li>
        <li><button onClick={() => handleNavClick("contacto")}>Contacto</button></li>
        <li><Link to="/protegida">Protegida</Link></li>
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
