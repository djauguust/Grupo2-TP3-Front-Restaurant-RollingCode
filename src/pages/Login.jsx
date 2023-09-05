import React from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UsuariosContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const {usuarios} = useContext(UsuariosContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const user = usuarios.find(
        (user) => user.email === email && user.password === password
      );

      if (user){
        localStorage.setItem("user", JSON.stringify(user))
        window.location.href = "/";
      } else{
        
      }
    } catch (error) {
      
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginTop: "150px" }}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn-danger">
          Ingresar
        </button>
      </form>
    </>
  );
};

export default Login;
