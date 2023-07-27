import React, { useContext } from 'react'
import { Container, Stack, Form, Button } from 'react-bootstrap'
import "../../../style/configurar-cuenta.css"
import {useFormik} from "formik";
import * as Yup from "yup" ;
import clsx from "clsx";
import { UsuariosContext } from '../../../context/context';

const configurarContraseña = () => {

    const {datosUsuarios} = useContext(UsuariosContext)
    const contraseñaActual = datosUsuarios.Contraseña
    

    const contraseña= /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

    const esquemaConfigurarContraseña = Yup.object().shape({
        ContraseñaActual: Yup.string()
        .required("Su contraseña actual es requerida")
        .matches(contraseñaActual,"Debe ingresar una contraseña igual a la anterior"),

        Contraseña: Yup.string()
        .required("La contraseña es requerida")
        .matches(contraseña,"La contraseña debe de contener entre 8 y 16 carácteres, al menos un dígito, al menos una minuscula y al menos una mayuscula"),

        ConfirmarContraseña: Yup.string()
        .required("La contraseña es requerida")
        .oneOf([Yup.ref('Contraseña')],'Las contraseñas deben de coincidir')
    })

    const valoresIniciales = {
        ContraseñaActual : "",
        Contraseña : "",
        ConfirmarContraseña : ""
    }

    const formik = useFormik({
        initialValues: valoresIniciales,
        validationSchema : esquemaConfigurarContraseña,
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
                      /*
                      const usuarioActualizado ={
                        Nombre: values.Nombre,
                        Apellido: values.Apellido,
                        Email: values.Email,
                        Contraseña: values.Contraseña
                    }*/

                    }
                  })
            } catch (error) {
                console.log(error);
            }
        }
    })


  return (
    <>
    <div className='Contenedor-Cambiar-Contraseña'>
    <div>
        <h1>Cambiar Contraseña</h1>
    </div>
    <Container>
        <div>
            <Form onSubmit={formik.handleSubmit} noValidate>
                <Stack gap={2}>
                    <Form.Group>
                        <Form.Label>Ingrese su contraseña actual :</Form.Label>
                        <Form.Control type='text' placeholder='Ingrese su contraseña mas reciente' id='ContraseñaActual'
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
                        <Form.Control type='text' placeholder='Ingrese la contraseña que usara' id='Contraseña' 
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
                        <Form.Control type='text' placeholder='Ingrese nuevamente la nueva contraseña' id='ConfirmarContraseña' 
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

export default configurarContraseña