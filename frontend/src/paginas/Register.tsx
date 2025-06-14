import Formulario from '../componentes/Formulario';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componentes/Navbar';

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (username: string, password: string) => {
    // Aquí pondrás la lógica real de registro
    console.log('Register:', { username, password });
  };

  return (
    <>
      <Navbar mostrarLogin={false} />
      <Formulario
        title="Crear Cuenta"
        buttonText="Registrarse"
        onSubmit={handleSubmit}
        extraLinkText="¿Ya tienes cuenta?"
        extraLinkTo="/login"
        extraLinkLabel="Inicia sesión"
      />
    </>
  );
}

export default Register;
