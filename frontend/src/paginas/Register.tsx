import Formulario from '../componentes/Formulario';
import Navbar from '../componentes/Navbar';

function Register() {
  const handleSubmit = (username: string, password: string) => {
    console.log('Register:', { username, password });
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
        title="Crear Cuenta"
        buttonText="Registrarse"
        onSubmit={handleSubmit}
        extraLinkText="¿Ya tienes cuenta?"
        extraLinkTo="/login"
        extraLinkLabel="Inicia sesión"
      />
      <button className="google-login-button" onClick={handleGoogleLogin}>
        Registrate con Google
      </button>
      </div>
      </div>
    </>

  );
}

export default Register;
