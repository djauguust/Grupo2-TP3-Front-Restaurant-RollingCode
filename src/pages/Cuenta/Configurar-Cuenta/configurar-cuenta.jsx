import React, { useContext, useEffect } from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'
import "../../../style/configurar-cuenta.css"
import {useFormik} from "formik";
import * as Yup from "yup" ;
import clsx from "clsx";
import { UsuariosContext } from '../../../context/context';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';



const configurarCuenta = () => {
    
    const navigate = useNavigate()

    const {TraerUsuarios, setUserId, datosUsuarios} = useContext(UsuariosContext)
    
    const {id} = useParams()
    
    const URLUsuarios=import.meta.env.VITE_API_USUARIOS

    useEffect(() => {
        setUserId(id)
    },[setUserId, id])
    TraerUsuarios()

    useEffect(() => {
        async function mostrarValores () {
            try {
                const Usuario = await datosUsuarios
                console.log(Usuario);
                if (Usuario && Usuario.Nombre && Usuario.Apellido && Usuario.Email && Usuario.Contraseña) {
                    formik.setFieldValue('Nombre', Usuario.Nombre);
                    formik.setFieldValue('Apellido', Usuario.Apellido);
                    formik.setFieldValue('Email', Usuario.Email);
                    formik.setFieldValue('Contraseña', Usuario.Contraseña);
                  }
            } catch (error) {
               console.log(error); 
            }
        }
        mostrarValores()
    },[datosUsuarios])

    /*Expresiones para validar*/ 
    const soloLetras= /^[a-zA-Z ]+$/ 
    const email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    const contraseña= /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

    /*Esquema de Yup para el formulario*/ 
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
        .max(40,"Ingrese un email menor a 40 carácteres"),

        Contraseña: Yup.string()
        .required("La contraseña es requerida")
        .matches(contraseña,"La contraseña debe de contener entre 8 y 16 carácteres, al menos un dígito, al menos una minuscula y al menos una mayuscula")

    })

    /*Valores iniciales de los input */
    const valoresIniciales = {
        Nombre : "",
        Apellido : "",
        Email : "",
        Contraseña : ""
    }
    
    /*Validacion de todo el formulario y acciones para cuando este listo para enviarse */
    const formik = useFormik({
        initialValues: valoresIniciales,
        validationSchema : esquemaConfigurarCuenta,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit:  (values) => {
            try {

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
                      const usuarioActualizado ={
                        Nombre: values.Nombre,
                        Apellido: values.Apellido,
                        Email: values.Email,
                        Contraseña: values.Contraseña
                    }
                    try {
                        const res = await fetch(`${URLUsuarios}/${id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type" : "application/json"
                            },
                            body : JSON.stringify(usuarioActualizado)
                        });
                        console.log(res);
                    } catch (error) {
                        console.log(error);
                    }
                    navigate(`/Cuenta/${id}`)
                    }
                  })
            } catch (error) {
                console.log(error);
            }
        }
    })

  return (
    <>
    <div className='Contenedor-Cuerpo'>
    <div className='text-center'>
        <h1>Cambia los datos de tu cuenta :</h1>
    </div>
    <Container>
        <div className='Contenedor-Form d-flex justify-content-center mt-3'>    
        <Form onSubmit={formik.handleSubmit} noValidate>
        <Stack gap={2}>
            <Form.Group>
                <Form.Label>Nombre :</Form.Label>
                <Form.Control type='text' placeholder='Ej: Lucas' id='Nombre'
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
                <Form.Control type='text' placeholder='Ej: Yudi' id='Apellido'
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
                <Form.Control type='email' placeholder='Ej: yudilucas@gmail.com' id='Email'
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
            <Form.Group>
                <Form.Label>Contraseña :</Form.Label>
                <Form.Control type='text' placeholder='Ej: Lucas1234' id='Contraseña'
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