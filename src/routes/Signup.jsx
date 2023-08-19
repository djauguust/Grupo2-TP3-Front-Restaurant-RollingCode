import { useState } from "react";
import styles from '../styles/SignupStyle.module.css';
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

function Signup() {
   const [name, setName] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const auth = useAuth();

   if(auth.isAuthenticated){
    return <Navigate to="/dashboard" />
   }

    return (
      <div className={styles["section"]}>
        <div className={styles["container"]}>
            <div className={styles["card"]}>
                <div className={styles["center"]}>
                    <div className="section text-center">
                        <h4 className="mb-4 pb-3">No tienes cuenta?</h4> 
                        <h5 className="mb-4 pb-3">Create una!</h5>  
                        <div className="section text-center">  

                            <form className="form">

                            <div className={styles["form-group"]}>
                            <label htmlFor=""></label>
                            <input
                            className={styles["form-style"]}
                            value={name}
                            type="text"
                            onChange={(e) => setName(e.target.value)}                   
                            placeholder="Nombre" required 
                            pattern='^[\wñ]+@[a-zñ]+\.[a-zñ]{2,5}$'  
                            autoComplete="off" 
                            maxLength={50}
                            />                            
                            </div>

                            <div className={styles["form-group"]}>
                            <label htmlFor=""></label>
                            <input
                            className={styles["form-style"]}
                            value={username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}                          
                            placeholder="Correo Electrónico" required 
                            pattern='^[\wñ]+@[a-zñ]+\.[a-zñ]{2,5}$'  
                            autoComplete="off" 
                            maxLength={50}
                            />
                                                      
                            </div>

                            <div className={styles["form-group"]}>
                            <label htmlFor=""></label>
                            <input
                            className={styles["form-style"]}
                            value={password}
                            type="password"
                            placeholder="Contraseña" required
                            autoComplete="off"
                            minLength={4}
                            maxLength={16}
                            />
                            </div>

                            <button className={styles["btn"]} type="submit">Crear Cuenta</button>

                               
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
  
  export default Signup;