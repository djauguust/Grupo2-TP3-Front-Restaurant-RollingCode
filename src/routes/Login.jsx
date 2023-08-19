import { useState } from "react";


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");  

  return (
    <div className="section">
        <div className="container">
            <div className="card">
                <div className="center">
                    <div className="section text-center">
                        <h3 className="mb-4 pb-3">Bienvenido!</h3> 
                            
                            <form className="form">

                            <div className="form-group">
                            <label htmlFor=""></label>
                            <input
                            className="form-style"
                            value={username}
                            type="text"
                            placeholder="Correo Electrónico" required
                            pattern="^[\wñ]+@[a-zñ]+\.[a-zñ]{2,5}$"
                            autoComplete="off"
                            min={3}
                            maxLength={50}
                            />                            
                            </div>

                            <div className="form-group">
                            <label htmlFor=""></label>
                            <input
                            className="form-style"
                            value={password}
                            type="password"
                            placeholder="Contraseña" required
                            autoComplete="off"
                            minLength={4}
                            maxLength={16}
                            />
                            </div>

                            <button className="btn" type="submit">Ingresar</button>

                            <p className="mb-0 mt-4 text-center"><a href="#" className="link">
                            Olvidaste tu contraseña?</a></p>
                               
                            </form> 

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;