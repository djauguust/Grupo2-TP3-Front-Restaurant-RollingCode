import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";

export const UsuariosContext = createContext(null);

const UserContext = ({ children }) => {
  const [Token, setToken] = useState();
  const [TokenPuro, setTokenPuro] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState();

  //States para mostrar datos
  const [mostrarDatos, setMostrarDatos] = useState(true);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarConfigurarPerfil, setMostrarConfigurarPerfil] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    //Token
    if (localStorage.getItem("user")) {
      const token = localStorage.getItem("user");
      setTokenPuro(token);
      const decode = jwt_decode(token);
      setToken(decode);
    }
  }, [localStorage.getItem("user")]);

  //console.log(TokenPuro);

  const url = import.meta.env.VITE_API;

  const getUsuarios = async () => {
    try {
      const response = await axios.get(`${url}/usuarios`, {
        headers: {
          "auth-token": TokenPuro.replace(/^"(.*)"$/, "$1"),
        },
      });
      setUsuarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Get de un usuario
  const traerUnUsuario = async () => {
    try {
      const respuesta = await axios.get(`${url}/usuarios/${Token.id}`, {
        headers: {
          "auth-token": TokenPuro.replace(/^"(.*)"$/, "$1"),
        },
      });
      setUsuario(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setToken("");
    navigate("/login");
  };

  const pasarStates = {
    mostrarDatos,
    setMostrarDatos,
    mostrarContraseña,
    setMostrarContraseña,
    mostrarConfigurarPerfil,
    setMostrarConfigurarPerfil,
  };

  const pasarDatos = {
    usuarios,
    setUsuarios,
    logout,
    Token,
    getUsuarios,
    traerUnUsuario,
    usuario,
    setUsuario,
    pasarStates,
  };

  return (
    <>
      <UsuariosContext.Provider value={pasarDatos}>
        {children}
      </UsuariosContext.Provider>
    </>
  );
};

export default UserContext;
