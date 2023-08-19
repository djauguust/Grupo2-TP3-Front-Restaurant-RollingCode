import { useState } from "react";
import styles from '../styles/LoginStyle.module.css';
import logo from '../assets/logo.png';
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");  
    const auth = useAuth

    if(auth.isAuthenticated){
        return <Navigate to="/dashboard" />
    }

  return (
<div className={styles["background-image"]}>
    <div className={styles["section"]}>
           
           <div className={styles["container"]}>
               <div className={styles["card"]}>
                   <div className={styles["center"]}>
                       <div className="section text-center">
                       <h3 className="mb-4 pb-3">Bienvenido!</h3> 
                       <img src={logo} alt="Logo de la pagina" className={styles["logo"]} />  
                          <form className="form">

                            <div className={styles["form-group"]}>
                            <label htmlFor=""></label>
                            <input
                            className={styles["form-style"]}
                            value={username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Correo Electrónico" required
                            pattern="^[\wñ]+@[a-zñ]+\.[a-zñ]{2,5}$"
                            autoComplete="off"
                            min={3}
                            maxLength={50}
                            />                            
                            </div>

                            <div className={styles["form-group"]}>
                            <label htmlFor=""></label>
                            <input
                            className={styles["form-style"]}
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña" required
                            autoComplete="off"
                            minLength={4}
                            maxLength={16}
                            />
                            </div>

                            <button className={styles["btn"]} type="submit">Ingresar</button>

                            <p className="mb-0 mt-4 text-center"><a href="#" className={styles["link"]}>
                            Olvidaste tu contraseña?</a></p>
                               
                           </form> 

                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
  );
}

export default Login;