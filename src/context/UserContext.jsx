import { Children, createContext, useEffect, useState } from 'react'
import axios from "axios";

export const UsuariosContext = createContext();

const UserContext = ({children}) => {

    const[usuarios,setUsuarios] = useState([])

    const  getUsuarios = async () => {
        try {
            const response = await axios.get("http://localhost:8080/users")
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
    <UsuariosContext.Provider value={{usuarios, setUsuarios, logout}}>
        {children}
    </UsuariosContext.Provider>
    </>
  )
}

export default UserContext