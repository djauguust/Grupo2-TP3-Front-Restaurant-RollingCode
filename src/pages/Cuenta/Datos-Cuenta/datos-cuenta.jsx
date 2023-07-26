import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UsuariosContext } from '../../../context/context'
import ConfigurarContraseña from '../Configurar-Cuenta/configurar-contraseña'

const datosCuenta = () => {

    const {TraerUsuarios, datosUsuarios, setUserId} = useContext(UsuariosContext)
    const {id} = useParams()
    useEffect(() => {
        setUserId(id)
    },[setUserId, id])
    
    TraerUsuarios()

    let [mostrarDatos, setMostrarDatos] = useState(true)
    
    const MostrarDatos = () =>{
        setMostrarDatos(true)
        console.log("Funciona");
        
    }

    const MostrarContraseña = () =>{
        setMostrarDatos(false)
        console.log("Funciona contraseña");
    }

  return (
    <>
    <div>
        <h1>Mi Perfil</h1>
    </div>
    <div>
        <p onClick={MostrarDatos}>Datos de Usuario</p>
        <p onClick={MostrarContraseña}>Cambiar Contraseña</p>
    </div>
    {mostrarDatos === true ? (   
    <div>
        <div>
            <h3>Imagen</h3>
        </div>
        <div>
            <p>Nombre : {datosUsuarios.Nombre}</p>
            <p>Apellido : {datosUsuarios.Apellido}</p>
            <p>Email : {datosUsuarios.Email}</p>
            
        </div>
        <Link className='btn-Volver' to={`/Configurar-Cuenta/${id}`}>Editar Perfil</Link>
    </div>
    ):(
        <ConfigurarContraseña />
    )}
    </>
  )
}

export default datosCuenta