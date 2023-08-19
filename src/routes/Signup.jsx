import { useState } from "react";

function Signup() {
   const [name, setName] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");


    return (
      <div className="section">
        <div className="container">
            <div className="card">
                <div className="center">
                    <div className="section text-center">
                        <h4 className="mb-4 pb-3">No tienes cuenta?</h4> 
                        <h5 className="mb-4 pb-3">Create una!</h5>  
                          
                            <form className="form">

                            <div className="form-group">
                            <label htmlFor=""></label>
                            <input
                            className="form-style"
                            value={name}
                            type="text"
                            onChange={(e) => setName(e.target.value)}                   
                            placeholder="Nombre" required 
                            pattern='^[\wñ]+@[a-zñ]+\.[a-zñ]{2,5}$'  
                            autoComplete="off" 
                            maxLength={50}
                            />                            
                            </div>

                            <div className="form-group">
                            <label htmlFor=""></label>
                            <input
                            className="form-style"
                            value={username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}                          
                            placeholder="Correo Electrónico" required 
                            pattern='^[\wñ]+@[a-zñ]+\.[a-zñ]{2,5}$'  
                            autoComplete="off" 
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

                            <button className="btn" type="submit">Crear Cuenta</button>

                               
                            </form> 

                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
  
  export default Signup;