import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'
import "../../../style/configurar-cuenta.css"
import {useFormik} from "formik";
import * as Yup from "yup" ;
import clsx from "clsx";

import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UsuariosContext } from '../../../context/UserContext';
import axios from 'axios';



const configurarCuenta = () => {
    


    const { traerUnUsuario, usuario, Token, pasarStates } = useContext(UsuariosContext);
    const { setMostrarDatos, setMostrarContraseña, setMostrarConfigurarPerfil} = pasarStates



  const url = import.meta.env.VITE_API;


    //Funcion para setear los valores en los inputs cada vez que datos usuarios se cambie
    useEffect(() => {
                if (usuario && usuario.nombre && usuario.apellido && usuario.email) {
                    formik.setFieldValue('Nombre', usuario.nombre);
                    formik.setFieldValue('Apellido', usuario.apellido);
                    formik.setFieldValue('Email', usuario.email);
                  }
    },[usuario])



    //Expresiones para validar 
    const soloLetras= /^[a-zA-Z ]+$/ 
    const email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    

    //Esquema de Yup para el formulario 
    const esquemaConfigurarCuenta = Yup.object().shape({
        Nombre: Yup.string()
        .required("El Nombre es Requerido")
        .matches(soloLetras, "Solo son validas letras")
        .min(4,"Ingrese un nombre mayor de 4 letras")
        .max(25,"Ingrese menos de 25 letras"),

        Apellido: Yup.string()
        .required("El Apellido es Requerido")
        .matches(soloLetras, "Solo son validas letras")
        .min(4,"Ingrese mas de 4 letras")
        .max(25,"Ingrese menos de 25 letras"),

        Email: Yup.string()
        .required("El email es requerido")
        .matches(email,"Ingrese un formato de email correcto")
        .min(16,"Ingrese un email mayor a 16 carácteres")
        .max(40,"Ingrese un email menor a 40 carácteres")
    })

    //Valores iniciales de los input
    const valoresIniciales = {
        Nombre : "",
        Apellido : "",
        Email : ""
    }
    
    //Validacion de todo el formulario y acciones para cuando este listo para enviarse
    const formik = useFormik({
        initialValues: valoresIniciales,
        validationSchema : esquemaConfigurarCuenta,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit:  (values) => {
            try {
                //Alert de sweetalert para confirmar
                Swal.fire({
                    title: 'Realizaste todos los cambios?',
                    text: "No te Preocupes puedes realizar los cambios que desees luego",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si estoy seguro',
                    cancelButtonText: 'Cancelar'
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                    
                      //Guarda los valores del formulario
                      const usuarioActualizado ={
                        nombre: values.Nombre,
                        apellido: values.Apellido,
                        email: values.Email
                    }
                    try {
                        //Solicitud para editar el usuario
                        const respuesta = await axios.put(`${url}/usuarios/${usuario._id}`,usuarioActualizado)
                        console.log(respuesta.data);
                        Swal.fire(
                            'Usuario Modificado',
                            'Los cambios que hiciste fueron implementados',
                            'success'
                          )
                    } catch (error) {
                        console.log(error);
                    }
                    //Funciones para volver a mostrar los datos y TraerUsuarios para actualizar todo
                    setMostrarDatos(true)
                    setMostrarConfigurarPerfil(false)
                    setMostrarContraseña(false)
                    traerUnUsuario()
                    }

                  })
            } catch (error) {
                
            }
        }
    })

  return (
    <>
    <div className='Contenedor-Cuerpo mb-4'>
    <div className='text-center'>
        <h1>Cambia los datos de tu cuenta :</h1>
    </div>
    <Container>
        <div className='Contenedor-Form d-flex justify-content-center mt-3'>    
        <Form onSubmit={formik.handleSubmit} noValidate>
        <Stack gap={2}>
            <Form.Group>
                <Form.Label>Nombre :</Form.Label>
                <Form.Control type='text' placeholder='Ej: Lucas' id='Nombre' minLength={4} maxLength={25}
                {...formik.getFieldProps("Nombre")}
                className={clsx(
                    "form-control",{
                        "is-invalid" : formik.touched.Nombre && formik.errors.Nombre
                    },{
                        "is-valid" : formik.touched.Nombre && !formik.errors.Nombre
                    }
                )}
                />
                {formik.touched.Nombre && formik.errors.Nombre && (
                <div>
                    <span role="alert" className="text-danger">{formik.errors.Nombre}</span>
                </div>
                )}
            </Form.Group>
            <Form.Group>
                <Form.Label>Apellido :</Form.Label>
                <Form.Control type='text' placeholder='Ej: Yudi' id='Apellido' minLength={4} maxLength={25}
                {...formik.getFieldProps("Apellido")}
                className={clsx(
                    "form-control",{
                        "is-invalid" : formik.touched.Apellido && formik.errors.Apellido
                    },{
                        "is-valid" : formik.touched.Apellido && !formik.errors.Apellido
                    }
                )}
                />
                {formik.touched.Apellido && formik.errors.Apellido && (
                <div>
                    <span role="alert" className="text-danger">{formik.errors.Apellido}</span>
                </div>
                )}
            </Form.Group>
            <Form.Group>
                <Form.Label>Email :</Form.Label>
                <Form.Control type='email' placeholder='Ej: yudilucas@gmail.com' id='Email' minLength={16} maxLength={40}
                {...formik.getFieldProps("Email")}
                className={clsx(
                    "form-control",{
                        "is-invalid" : formik.touched.Email && formik.errors.Email
                    },{
                        "is-valid" : formik.touched.Email && !formik.errors.Email
                    }
                )}
                />
                {formik.touched.Email && formik.errors.Email && (
                <div>
                    <span role="alert" className="text-danger">{formik.errors.Email}</span>
                </div>
                )}
            </Form.Group>
        </Stack>
        <Button className='btn-Volver mt-3 ' type='submit'>Guardar Cambios</Button>
        </Form>
        </div>
    </Container>
    </div>
    </>
  )
}

export default configurarCuenta