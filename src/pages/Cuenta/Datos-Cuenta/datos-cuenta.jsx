import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UsuariosContext } from '../../../context/context'
import ConfigurarContraseña from '../Configurar-Cuenta/configurar-contraseña'
import { Row, Stack } from 'react-bootstrap'
import ConfigurarCuenta from '../Configurar-Cuenta/configurar-cuenta'

const datosCuenta = () => {

    const {TraerUsuarios, datosUsuarios, setUserId, pasarStates, userId} = useContext(UsuariosContext)
    const {id} = useParams()
    useEffect(() => {
        setUserId(id);

      }, [setUserId, id]);
      

    const { mostrarDatos, setMostrarDatos } = pasarStates;
    const { mostrarContraseña, setMostrarContraseña } = pasarStates;
    const { mostrarConfigurarPerfil, setMostrarConfigurarPerfil } = pasarStates;


    {datosUsuarios === "" && (
        TraerUsuarios() // Cargamos los datos del usuario cada vez que el ID de usuario cambia
    )}


    const MostrarDatos = () =>{
        setMostrarDatos(true)
        setMostrarContraseña(false)
        setMostrarConfigurarPerfil(false)
    }

    const MostrarContraseña = () =>{
        setMostrarContraseña(true)
        setMostrarDatos(false)
        setMostrarConfigurarPerfil(false)
    }

    const MostrarConfigurarPerfil = () => {
        setMostrarConfigurarPerfil(true)
        setMostrarContraseña(false)
        setMostrarDatos(false)
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
        {mostrarConfigurarPerfil === true && 
            <p className={`mt-3 ${mostrarConfigurarPerfil ? 'boton-seleccionado' : 'boton-desSeleccionado'}`} >Cambiar Datos</p>

        }
    </div>
    {mostrarDatos === true && datosUsuarios !== "" && (
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
        <Link className='btn-Volver' onClick={MostrarConfigurarPerfil}>Editar Perfil</Link>
    </div>
    </div>
    )}
    {mostrarContraseña === true && 
        <ConfigurarContraseña  />
    }
    {mostrarConfigurarPerfil === true && 
        <ConfigurarCuenta />
    }
    </div>

    </>
  )
}

export default datosCuenta