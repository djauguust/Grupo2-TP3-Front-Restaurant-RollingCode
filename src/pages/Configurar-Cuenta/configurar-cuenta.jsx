import React from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'
import "../../style/configurar-cuenta.css"
import {useFormik} from "formik";
import * as Yup from "yup" ;
import clsx from "clsx";

const configurarCuenta = () => {

    const soloLetras= /^[a-zA-Z ]+$/
    const email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    const contraseña= /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

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
        .matches(contraseña,"La contraseña debe de contener entre 8 y 16 carácteres, al menos un dígito, al menos una minuscula y al menos una mayuscula"),

        RepetirContraseña:Yup.string()
        .required("Debe ingresar la contraseña nuevamente")
        .oneOf([Yup.ref('Contraseña')],'Las contraseñas deben de coincidir')
    })

  return (
    <>
    <div className='Contenedor-Cuerpo'>
    <div className='text-center'>
        <h1>Cambia los datos de tu cuenta :</h1>
    </div>
    <h3></h3>
    <Container>
        <div className='Contenedor-Form d-flex justify-content-center mt-3'>    
        <Form>
        <Stack gap={2}>
            <Form.Group>
                <Form.Label>Nombre :</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Label>Apellido :</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email :</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Label>Contraseña   :</Form.Label>
                <Form.Control />
            </Form.Group>
        </Stack>
            <Button className='btn-Volver mt-3'>Guardar Cambios</Button>
        </Form>
        </div>
    </Container>
    </div>
    </>
  )
}

export default configurarCuenta