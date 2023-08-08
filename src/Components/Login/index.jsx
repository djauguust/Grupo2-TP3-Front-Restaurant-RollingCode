import React, { useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleSignInClick = () => {
    console.log('Sign In clicked');
  };
  const handleSignUpClick = () => {
    console.log('Sign Up clicked');
  };
  const handleToggleForm = () => {
    setIsSignIn(!isSignIn);
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`cont ${isSignUp ? 's--signup' : ''}`}>
      <div className={isSignIn ? 'form sign-in' : 'form sign-up'}>
        <h2>Bienvenido,</h2>
        
        <label>
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        
        <label>
          <span>Contraseña</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <p className="forgot-pass">Olvidaste tu contraseña?</p>
        <button type="button" className="submit">Ingresar</button>
        <button type="button" className="fb-btn">Conectate con <span>facebook</span></button>
      </div>
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h2>Nuevo?</h2>
            <p>Create una cuenta para descubrir los beneficios!</p>
          </div>
          <div className="img__text m--in">
            <h2>Ya estás registrado?</h2>
            <p>Si ya tienes cuenta, sólo ingresa!</p>
          </div>
          <div className="img__btn" onClick={handleToggleForm}>
            <span className="m--up">Crear cuenta</span>
            <span className="m--in">Ingresar</span>
          </div>
        </div>
        <div className="form sign-up">
          <h2>Sientete como en casa,</h2>
          <label>
            <span>Nombre</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <span>Contraseña</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="button" className="submit" onClick={handleSignUpClick} >Crear cuenta</button>
          <button type="button" className="fb-btn">Ingresa con <span>facebook</span></button>
        </div>
      </div>
    </div>
  )
}

export default Login