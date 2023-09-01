import React, { useContext, useRef, useState } from 'react'
import { Container, Stack, Form, Button } from 'react-bootstrap'
import "../../../style/configurar-cuenta.css"
import {useFormik} from "formik";
import * as Yup from "yup" ;
import clsx from "clsx";

import Swal from 'sweetalert2';
import { useParams } from 'react-router';
import { UsuariosContext } from '../../../context/UserContext';

const configurarContraseña = () => {

    //Uso ref para referirme a los 3 Form.Control para guardarlos en una constante
    const CambiarTipo = useRef(null);
    const CambiarTipo2 = useRef(null);
    const CambiarTipo3 = useRef(null);

    const { logout, traerUnUsuario, usuario, Token } = useContext(UsuariosContext);

    {usuario === undefined && Token && (
      traerUnUsuario()
    )}
    const URLUsuarios=import.meta.env.VITE_API_USUARIOS
    //Desestructuro pasarStates
    const [userId, setUserId] = useState("");
    const [datosUsuarios, setDatosUsuarios] = useState("")

    const [mostrarDatos, setMostrarDatos] = useState(true)
    const [mostrarContraseña, setMostrarContraseña] = useState(false)
    const [mostrarConfigurarPerfil, setMostrarConfigurarPerfil] = useState(false)


    //Funcion para cambiar el type de los input a password por mas que se borren desde inspeccionar
    function cambiarTipo () {
        CambiarTipo.current.setAttribute('type', 'password');
        CambiarTipo2.current.setAttribute('type', 'password');
        CambiarTipo3.current.setAttribute('type', 'password');
      };
    

    //Expresiones para validar
    const contraseña= /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

    //Esquema de Yup para el formulario 
    const esquemaConfigurarContraseña = Yup.object().shape({
        ContraseñaActual: Yup.string()
        .required("Su contraseña actual es requerida")
        .matches(contraseñaActual,"Debe ingresar una contraseña igual a la anterior"),

        Contraseña: Yup.string()
        .required("La contraseña es requerida")
        .matches(contraseña,"La contraseña debe de contener entre 8 y 16 carácteres, al menos un dígito, al menos una minuscula y al menos una mayuscula"),

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
                      Swal.fire(
                        'Usuario Modificado',
                        'Los cambios que hiciste fueron implementados',
                        'success'
                      )
                    //Guarda los valores del formulario
                      const ContraseñaActualizada ={
                        ...datosUsuarios,
                        Contraseña: values.Contraseña
                    }

                    try {
                        //Solicitud para editar el usuario
                        const res = await fetch(`${URLUsuarios}/${id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type" : "application/json"
                            },
                            body : JSON.stringify(ContraseñaActualizada)
                        });
                    } catch (error) {
                        
                    }
                    //Funciones para volver a mostrar los datos y TraerUsuarios para actualizar todo
                        setMostrarDatos(true)
                        setMostrarConfigurarPerfil(false)
                        setMostrarContraseña(false)
                        TraerUsuarios()
                    }
                  })
            } catch (error) {
                
            }
        }
    })


  return (
    <>
    <div className='Contenedor-Cambiar-Contraseña mb-4'>
    <div>
        <h1>Cambiar Contraseña</h1>
    </div>
    <Container>
        <div>
            <Form onSubmit={formik.handleSubmit} noValidate>
                <Stack gap={2}>
                    <Form.Group>
                        <Form.Label>Ingrese su contraseña actual :</Form.Label>
                        <Form.Control type="password" placeholder='Contraseña Actual' id='ContraseñaActual' onInput={cambiarTipo} ref={CambiarTipo}
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
                        <Form.Label>Ingrese su nueva contraseña :</Form.Label>
                        <Form.Control type='password' placeholder='Contraseña Nueva' id='Contraseña' onInput={cambiarTipo} ref={CambiarTipo2}
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
                        <Form.Label>Ingrese nuevamente su nueva contraseña :</Form.Label>
                        <Form.Control type='password' placeholder='Repetir Nueva Contraseña' id='ConfirmarContraseña' onInput={cambiarTipo} ref={CambiarTipo3}
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
                <Button className='btn-Volver mt-3 ' type='submit'>Guardar Cambios</Button>
            </Form>
        </div>
    </Container>
    </div>
    </>
  )
}

export default configurarContraseña