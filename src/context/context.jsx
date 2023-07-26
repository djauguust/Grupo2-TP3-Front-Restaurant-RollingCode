
import {  createContext, useEffect, useState } from 'react'

export const UsuariosContext = createContext()

export const UsuariosProvider = ({children}) => {

    const [userId, setUserId] = useState("");
    const [datosUsuarios, setDatosUsuarios] = useState("")

 

    const URLUsuarios=import.meta.env.VITE_API_USUARIOS
    
    
    const TraerUsuarios = () => {
        
        useEffect(() => {
            async function traerUsuarios() {
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
                    console.log(error);
                }
            }
            traerUsuarios()
        },[userId])
    }

    const pasarDatos = {
        TraerUsuarios,
        setUserId,
        datosUsuarios,
        userId
    }

  return (
    <UsuariosContext.Provider value={pasarDatos} >
        {children}
    </UsuariosContext.Provider>
  )
}


