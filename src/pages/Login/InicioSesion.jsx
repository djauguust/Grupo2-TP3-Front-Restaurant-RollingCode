import { useState } from "react";
import styles from '../../styles/InicioSesion.css';
import logo from '../../assets/logo.png';
import { useAuth } from "../../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { Form } from "react-bootstrap";


function InicioSesion() {
     
    const auth = useAuth

    if(auth.isAuthenticated){
        return <Navigate to="/dashboard" />
    }

  return (
<div className="background-image">
             
           <div className="container">
               <div className="Carta">
                   <div className="center text-center">
                       <h3 className="">Bienvenido!</h3> 
                       <img src={logo} alt="Logo de la pagina" className="logo" />  
                          <Form className="form">
                            <Form.Group className="contenedorForm">
                                <Form.Label>Ingresa tu correo electronico :</Form.Label>
                                <Form.Control  />
                            </Form.Group>
                            <Form.Group className="contenedorForm">
                                <Form.Label>Ingresa tu contraseña :</Form.Label>
                                <Form.Control  />
                            </Form.Group>     
                            
                            <button className="btn mt-3" type="submit">Ingresar</button>
                                                   

                            <p className="mb-0 mt-4 text-center"><a href="#" className="link">
                            Olvidaste tu contraseña?</a></p>
                               
                           </Form> 

                        </div>
                    </div>
                </div>
    </div>
  );
}

export default InicioSesion;