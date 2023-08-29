import { Children, createContext, useEffect, useState } from 'react'
import axios from "axios";
import jwt_decode from "jwt-decode"


export const UsuariosContext = createContext(null);

const UserContext = ({children}) => {

    const [Token, setToken] = useState()

    
    useEffect(() =>{
        //Token
        if (localStorage.getItem("user") ) {
          const token = localStorage.getItem("user")
          const decode = jwt_decode(token);
          setToken(decode)
          console.log(Token);
        }
  },[])



    const[usuarios,setUsuarios] = useState([])

  const url = import.meta.env.VITE_API;

    const  getUsuarios = async () => {
        try {
            const response = await axios.get(`${url}`)
            setUsuarios(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        localStorage.removeItem("user")
        window.location.href = "/login"
    }

    useEffect(() => {
        getUsuarios()
    },[]);


  return (
    <>
    <UsuariosContext.Provider value={{usuarios, setUsuarios, logout,Token}}>
        {children}
    </UsuariosContext.Provider>
    </>
  )
}

export default UserContext