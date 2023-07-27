import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UsuariosContext } from '../../../context/context'
import ConfigurarContraseña from '../Configurar-Cuenta/configurar-contraseña'
import { Row, Stack } from 'react-bootstrap'

const datosCuenta = () => {

    const {TraerUsuarios, datosUsuarios, setUserId} = useContext(UsuariosContext)
    const {id} = useParams()
    useEffect(() => {
        setUserId(id)
    },[setUserId, id])
    
    TraerUsuarios()

    let [mostrarDatos, setMostrarDatos] = useState(true)
    let [mostrarContraseña, setMostrarContraseña] = useState(false)
    
    const MostrarDatos = () =>{
        setMostrarDatos(true)
        setMostrarContraseña(false)
        console.log("Funciona");
        
    }

    const MostrarContraseña = () =>{
        setMostrarDatos(false)
        setMostrarContraseña(true)
        console.log("Funciona contraseña");
    }

  return (
    <>
    <div>
        <h1>Mi Perfil</h1>
    </div>
    <div className='ContenedorPerfil'>
    <div className='ContenedorCambiarUsuario-Contraseña'>
        <p onClick={MostrarDatos} className={`mt-3 ${mostrarDatos ? 'boton-seleccionado' : 'boton-desSeleccionado'}`}>Datos de Usuario</p>
        <p onClick={MostrarContraseña} className={`mt-3 ${mostrarContraseña ? 'boton-seleccionado' : 'boton-desSeleccionado'}`}>Cambiar Contraseña</p>
    </div>
    {mostrarDatos === true ? (
    <div className='Contenedor-Para-Centrar'>
    <div className='Contenedor-Datos'>
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
    </div>
    ):(
        <ConfigurarContraseña />
    )}
    </div>
    </>
  )
}

export default datosCuenta