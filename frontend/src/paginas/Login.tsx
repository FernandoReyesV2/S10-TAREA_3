import Formulario from '../componentes/Formulario';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componentes/Navbar';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (username: string, password: string) => {
    // Aquí pondrás la lógica real de login
    console.log('Login:', { username, password });
  };

  return (
    <>
    <Navbar mostrarLogin={false} />
    <Formulario
      title="Iniciar Sesión"
      buttonText="Ingresar"
      onSubmit={handleSubmit}
      extraLinkText="¿Aún no tienes cuenta?"
      extraLinkTo="/register"
      extraLinkLabel="¡crea una!"
    />
    </>
    
  );
}

export default Login;
