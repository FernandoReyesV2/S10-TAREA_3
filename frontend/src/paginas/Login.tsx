import Formulario from '../componentes/Formulario';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../componentes/Navbar';
import "./estilos/Inicio.css"

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

   useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/protegida');
    }
  }, [location, navigate]);


  const handleSubmit = (username: string, password: string) => {
    console.log('Login:', { username, password });
  };

   const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/api/auth/google';
  }

  return (
    <>
    <div className='contenedor-Login'>
      <Navbar mostrarLogin={false} />
      <div className="auth-wrapper">
        <Formulario
          title="Iniciar Sesión"
          buttonText="Ingresar"
          onSubmit={handleSubmit}
          extraLinkText="¿Aún no tienes cuenta?"
          extraLinkTo="/register"
          extraLinkLabel="¡crea una!"
        />
        <button className="google-login-button" onClick={handleGoogleLogin}>
          Iniciar sesión con Google
        </button>
      </div>
    </div>
    </>
  );
}

export default Login;
