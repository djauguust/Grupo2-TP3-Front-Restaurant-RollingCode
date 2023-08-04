import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UsuariosContext } from '../../../context/context'
import ConfigurarContraseña from '../Configurar-Cuenta/configurar-contraseña'
import { Col, Row, Stack } from 'react-bootstrap'
import ConfigurarCuenta from '../Configurar-Cuenta/configurar-cuenta'

const datosCuenta = () => {

    const {TraerUsuarios, datosUsuarios, setUserId, pasarStates, userId} = useContext(UsuariosContext)
    //Guardamos el id 
    const {id} = useParams()
    useEffect(() => {
        //Setea el valor de id para poder usarlo en el context
        setUserId(id);
      }, [setUserId, id]);
      
    //Desetruscturo pasarStates para traer todos los useStates de context
    const { mostrarDatos, setMostrarDatos, mostrarContraseña, setMostrarContraseña, mostrarConfigurarPerfil, setMostrarConfigurarPerfil } = pasarStates;


    {datosUsuarios === "" && (
        TraerUsuarios() // Cargamos los datos del usuario cada vez que el ID de usuario cambia
    )}

    //Funcion para mostrar el contenedor de los datos
    const MostrarDatos = () =>{
        setMostrarDatos(true)
        setMostrarContraseña(false)
        setMostrarConfigurarPerfil(false)
    }

    //Funcion para mostrar el contenedor para cambiar de contraseña
    const MostrarContraseña = () =>{
        setMostrarContraseña(true)
        setMostrarDatos(false)
        setMostrarConfigurarPerfil(false)
    }

    //Funcion para mostrar el contenedor para configurar el perfil
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
        {/*Links para acceder a las distintas secciones */}
        <p onClick={MostrarDatos} className={`mt-3 ${mostrarDatos ? 'boton-seleccionado' : 'boton-desSeleccionado'}`}>Datos de Usuario</p>
        <p onClick={MostrarContraseña} className={`mt-3 ${mostrarContraseña ? 'boton-seleccionado' : 'boton-desSeleccionado'}`}>Cambiar Contraseña</p>
        {mostrarConfigurarPerfil === true &&
                <p className={`mt-3 ${mostrarConfigurarPerfil ? 'boton-seleccionado' : 'boton-desSeleccionado'}`} >Cambiar Datos</p> 
        }
    </div>
    {/*Expresion CondicionaL que muestra los datos si mostrarDatos es true */}
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
    {/*Expresion CondicionaL que muestra el contenedor para cambiar la contraseña si mostrarContraseña es true */}
    {mostrarContraseña === true && 
        <ConfigurarContraseña  />
    }
    {/*Expresion CondicionaL que muestra el contenedor para cambiar los datos si mostrarConfigurarPerfil es true */}
    {mostrarConfigurarPerfil === true && 
        <ConfigurarCuenta />
    }
    </div>

    </>
  )
}

export default datosCuenta