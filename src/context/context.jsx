
import {  createContext, useEffect, useState } from 'react'

export const UsuariosContext = createContext()

export const UsuariosProvider = ({children}) => {

    const [userId, setUserId] = useState("");
    const [datosUsuarios, setDatosUsuarios] = useState("")

    const [mostrarDatos, setMostrarDatos] = useState(true)
    const [mostrarContraseña, setMostrarContraseña] = useState(false)
    const [mostrarConfigurarPerfil, setMostrarConfigurarPerfil] = useState(false)

    const URLUsuarios=import.meta.env.VITE_API_USUARIOS
    
    //Funcion para traer los datos de un solo usuario dependiendo del ID
    const TraerUsuarios = async () => {
        
                try {
                    const id = userId
                    const res = await fetch(`${URLUsuarios}/${id}`)
                    const Usuario = await res.json()
                    const NombreUsuario = Usuario.Nombre || '';
                    const ApellidoUsuario = Usuario.Apellido || '';
                    const EmailUsuario = Usuario.Email || '';
                    const ContraseñaUsuario = Usuario.Contraseña || '';
                    
                    
                    setDatosUsuarios({
                        Nombre: NombreUsuario,
                        Apellido: ApellidoUsuario,
                        Email: EmailUsuario,
                        Contraseña: ContraseñaUsuario
                      });
                    
                } catch (error) {
                    
                }
    }

    const pasarStates = {
        mostrarDatos,
        mostrarConfigurarPerfil,
        mostrarContraseña,
        setMostrarDatos,
        setMostrarConfigurarPerfil,
        setMostrarContraseña
    }

    const pasarDatos = {
        TraerUsuarios,
        setUserId,
        datosUsuarios,
        userId,
        pasarStates
    }

  return (
    <UsuariosContext.Provider value={pasarDatos} >
        {children}
    </UsuariosContext.Provider>
  )
}


