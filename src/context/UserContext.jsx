import { Children, createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";

export const UsuariosContext = createContext(null);

const UserContext = ({ children }) => {
  const [Token, setToken] = useState();

  const navigate = useNavigate()

  useEffect(() => {
    //Token
    if (localStorage.getItem("user")) {
      const token = localStorage.getItem("user");
      const decode = jwt_decode(token);
      setToken(decode);
      //console.log(Token);
    }
  }, []);

  const [usuarios, setUsuarios] = useState([]);

  const url = import.meta.env.VITE_API;

  const getUsuarios = async () => {
    try {
      const response = await axios.get(`${url}/usuarios`);
      setUsuarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login")
  };

  

  const pasarDatos = {
    usuarios,
    setUsuarios,
    logout,
    Token,
    getUsuarios,

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
