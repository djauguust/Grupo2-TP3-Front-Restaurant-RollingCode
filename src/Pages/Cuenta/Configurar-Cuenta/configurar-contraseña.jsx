import React, { useContext, useRef, useState } from 'react'
import { Container, Stack, Form, Button } from 'react-bootstrap'
import "../../../styles/configurar-cuenta.css"
import {useFormik} from "formik";
import * as Yup from "yup" ;
import clsx from "clsx";

import Swal from 'sweetalert2';
import { useParams } from 'react-router';
import { UsuariosContext } from '../../../context/UserContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import ButtonDefault from '../../../components/ButtonDefault';
import toast from 'react-hot-toast';

const configurarContraseña = () => {

    const {t} = useTranslation();

    const TokenPuro = localStorage.getItem("user")

    //Uso ref para referirme a los 3 Form.Control para guardarlos en una constante
    const CambiarTipo = useRef(null);
    const CambiarTipo2 = useRef(null);
    const CambiarTipo3 = useRef(null);

    const { logout, traerUnUsuario, usuario, Token, pasarStates  } = useContext(UsuariosContext);

    const url = import.meta.env.VITE_API;

    const { setMostrarDatos, setMostrarContraseña, setMostrarConfigurarPerfil} = pasarStates



    //Funcion para cambiar el type de los input a password por mas que se borren desde inspeccionar
    function cambiarTipo () {
        CambiarTipo.current.setAttribute('type', 'password');
        CambiarTipo2.current.setAttribute('type', 'password');
        CambiarTipo3.current.setAttribute('type', 'password');
      };
    

    //Expresiones para validar
    const contraseña = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

    //Esquema de Yup para el formulario 
    const esquemaConfigurarContraseña = Yup.object().shape({
        ContraseñaActual: Yup.string()
        .required("Su contraseña actual es requerida")
        .matches(contraseña, "La contraseña debe de contener entre 8 y 16 carácteres, al menos un dígito, al menos una minuscula y al menos una mayuscula"),

        Contraseña: Yup.string()
        .required("La contraseña es requerida")
        .matches(contraseña, "La contraseña debe de contener entre 8 y 16 carácteres, al menos un dígito, al menos una minuscula y al menos una mayuscula"),

        ConfirmarContraseña: Yup.string()
        .required("Repetir la contraseña es requerido")
        .oneOf([Yup.ref('Contraseña')],'Las contraseñas deben de coincidir')
    })

    //Valores iniciales de los input
    const valoresIniciales = {
        ContraseñaActual : "",
        Contraseña : "",
        ConfirmarContraseña : ""
    }


    //Validacion de todo el formulario y acciones para cuando este listo para enviarse
    const formik = useFormik({
        initialValues: valoresIniciales,
        validationSchema : esquemaConfigurarContraseña,
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
                        const ContraseñaActualizada ={
                            oldPass : values.ContraseñaActual,
                            newPass : values.ConfirmarContraseña
                        }                        
                        try {
                            const respuesta = await axios.put(`${url}/contrasenia/${usuario._id}`,ContraseñaActualizada,{
                                headers:{
                                  "auth-token" : TokenPuro.replace(/^"(.*)"$/, '$1')
                                }
                              })
                            console.log(respuesta.data);
                            toast.success('Contraseña actualizada con exito', {
                                style: {
                                  border: '1px solid #B08D59',
                                  color: '#B08D59',
                                },
                                iconTheme: {
                                  primary: '#B08D59',
                                  secondary: '#FFFAEE',
                                },
                              });
                            //Funciones para volver a mostrar los datos y TraerUsuarios para actualizar todo
                                setMostrarDatos(true)
                                setMostrarConfigurarPerfil(false)
                                setMostrarContraseña(false)
                                traerUnUsuario()
                    } catch (error) {
                        console.log(error);
                    }
                    }
                  })
            } catch (error) {
                console.log(error);
            }
        }
    })


  return (
    <>
    <div className='Contenedor-Cambiar-Contraseña mb-4'>
    <div>
        <h1>{t('cambiaContraseña')}</h1>
    </div>
    <Container>
        <div>
            <Form onSubmit={formik.handleSubmit} noValidate>
                <Stack gap={2}>
                    <Form.Group>
                        <Form.Label>{t('ingreseContraseña')}</Form.Label>
                        <Form.Control type="password" placeholder='Contraseña Actual' id='ContraseñaActual'
                        minLength={8} maxLength={16}
                        onInput={cambiarTipo} ref={CambiarTipo}
                        {...formik.getFieldProps("ContraseñaActual")}
                        className={clsx(
                            "form-control",{
                                "is-invalid" : formik.touched.ContraseñaActual && formik.errors.ContraseñaActual
                            },{
                                "is-valid" : formik.touched.ContraseñaActual && !formik.errors.ContraseñaActual
                            }
                        )}
                        />
                        {formik.touched.ContraseñaActual && formik.errors.ContraseñaActual && (
                            <div className='Div-Contraseña'>
                                <span role="alert" className="text-danger">{formik.errors.ContraseñaActual}</span>
                            </div>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{t('ingreseContraseñaNueva')}</Form.Label>
                        <Form.Control type='password' placeholder='Contraseña Nueva' id='Contraseña'
                        minLength={8} maxLength={16}
                        onInput={cambiarTipo} ref={CambiarTipo2}
                        {...formik.getFieldProps("Contraseña")}
                        className={clsx(
                            "form-control",{
                                "is-invalid" : formik.touched.Contraseña && formik.errors.Contraseña
                            },{
                                "is-valid" : formik.touched.Contraseña && !formik.errors.Contraseña
                            }
                        )}
                        />
                        {formik.touched.Contraseña && formik.errors.Contraseña && (
                            <div className='Div-Contraseña'>
                                <span role="alert" className="text-danger">{formik.errors.Contraseña}</span>
                            </div>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{t('ingreseContraseñaNuevamente')}</Form.Label>
                        <Form.Control type='password' placeholder='Repetir Nueva Contraseña' id='ConfirmarContraseña'
                        minLength={8} maxLength={16}
                        onInput={cambiarTipo} ref={CambiarTipo3}
                        {...formik.getFieldProps("ConfirmarContraseña")}
                        className={clsx(
                            "form-control",{
                                "is-invalid" : formik.touched.ConfirmarContraseña && formik.errors.ConfirmarContraseña
                            },{
                                "is-valid" : formik.touched.ConfirmarContraseña && !formik.errors.ConfirmarContraseña
                            }
                        )}
                        />
                        {formik.touched.ConfirmarContraseña && formik.errors.ConfirmarContraseña && (
                            <div className='Div-Contraseña'>
                                <span role="alert" className="text-danger">{formik.errors.ConfirmarContraseña}</span>
                            </div>
                        )}
                    </Form.Group>
                </Stack>
                <ButtonDefault namebtn={t('guardarCambios')} TipoBoton={"sumbit"} />
            </Form>
        </div>
    </Container>
    </div>
    </>
  )
}

export default configurarContraseña