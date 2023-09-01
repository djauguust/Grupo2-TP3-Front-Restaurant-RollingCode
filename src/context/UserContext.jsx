import { Children, createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";

export const UsuariosContext = createContext(null);

const UserContext = ({ children }) => {
  const [Token, setToken] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    //Token
    if (localStorage.getItem("user")) {
      const token = localStorage.getItem("user");
      const decode = jwt_decode(token);
      setToken(decode);
    }
  }, [localStorage.getItem("user")]);


  

  const url = import.meta.env.VITE_API;

  const getUsuarios = async () => {
    try {
      const response = await axios.get(`${url}/usuarios`);
      setUsuarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Get de un usuario
  const traerUnUsuario = async () => {
    try {
      const respuesta = await axios.get(`${url}/usuarios/${Token.id}`)
      setUsuario(respuesta.data)
    } catch (error) {
      console.log(error);
    }
  }
  

  const logout = () => {
    localStorage.removeItem("user");
    setToken("")
    navigate("/login")
  };

  

  const pasarDatos = {
    usuarios,
    setUsuarios,
    logout,
    Token,
    getUsuarios,
    traerUnUsuario,
    usuario,
    setUsuario
  };

  return (
    <>
      <UsuariosContext.Provider
        value={pasarDatos}
      >
        {children}
      </UsuariosContext.Provider>
    </>
  );
};

export default UserContext;
