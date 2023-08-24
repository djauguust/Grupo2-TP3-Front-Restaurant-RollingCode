import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap"

import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import axios from "axios";

const Formulario = () =>{

  const url = import.meta.env.VITE_API;


    // Esquema
    const SingUpSchema = Yup.object().shape({
        nombre: Yup.string()
        .required("Debe introducir su nombre")
        .min(8,"Minimo 8 caracteres")
        .max(35,"Máximo 35 caracteres")
        .trim(),
        email: Yup.string()
        .email("El formato ingresado no es válido")
        .required("Debe introducir una dirección de email")
        .min(4,"Mínimo 4 caracteres")
        .max(25, "Máximo 25 carácteres")
        .trim(),
        mensaje: Yup.string()
        .required("Debe introducir el motivo de contacto")
        .min(50, "Mínimo 50 caracteres")
        .max(1000,"Máximo 1000 caracteres")
        .trim()
    });

    const initialValues={
        nombre: "",
        email: "",
        mensaje: ""
    }

    const formik = useFormik({
        initialValues,
        validationSchema: SingUpSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            Swal.fire({
                title: 'Ya escribio todo el mensaje?',
                text: "Los cambios no los podra revertir luego!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, estoy seguro!',
                cancelButtonText: 'No, mejor no!'
              }).then(async (result) => {
                try {
                    const res = await axios.post(`${url}/mensajes`,{
                        nombre : values.nombre,
                        email : values.email,
                        mensaje : values.mensaje
                    })
                } catch (error) {
                    console.log(error);
                }
                if (result.isConfirmed) {
                  Swal.fire(
                    'Mensaje enviado!',
                    'El mensaje escrito fue enviado exitosamente.',
                    'success'
                  )
                }
              })
        }
    });

    return(

        <>
            <h3 className="mb-5 text-center">Completa el formulario y lo contactaremos a la brevedad</h3>
            <Form onSubmit={formik.handleSubmit} noValidate>

            <Form.Group className="mb-3">
                    <Form.Label htmlFor="nombre">Nombre completo</Form.Label>
                    <Form.Control
                         type="text"
                         placeholder="Introduce tu nombre"
                         required
                         minLength={8}
                         maxLength={35}
                         //formik
                         id="nombre"
                         {...formik.getFieldProps("nombre")}
                         className= {clsx(
                            "form-control",{
                                "is-invalid": formik.touched.nombre && formik.errors.nombre
                            }, {
                                "is-valid": formik.touched.nombre && !formik.errors.nombre
                            }
                         )}
                    />
                    {formik.touched.nombre && formik.errors.nombre && (
                        <div className="text-danger mt-1">
                            <span role="alert">{formik.errors.nombre}</span>
                        </div>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">Correo electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="ejemplo@gmail.com"
                        required
                        minLength={4}
                        maxLength={25}

                        //formik
                        id="email"
                        {...formik.getFieldProps("email")}
                        className= {clsx(
                           "form-control",{
                               "is-invalid": formik.touched.email && formik.errors.email
                           }, {
                               "is-valid": formik.touched.email && !formik.errors.email
                           }
                        )}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-danger mt-1">
                            <span role="alert">{formik.errors.email}</span>
                        </div>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="mensaje">Mensaje</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Motivo de contacto"
                        required
                        minLength={50}
                        maxLength={1000}

                        //formik
                        id="mensaje"
                        {...formik.getFieldProps("mensaje")}
                        className= {clsx(
                           "form-control",{
                               "is-invalid": formik.touched.mensaje && formik.errors.mensaje
                           }, {
                               "is-valid": formik.touched.mensaje && !formik.errors.mensaje
                           }
                        )}
                    />
                    {formik.touched.mensaje && formik.errors.mensaje && (
                        <div className="text-danger mt-1">
                            <span role="alert">{formik.errors.mensaje}</span>
                        </div>
                    )}
                </Form.Group>

                <Button variant="warning" className="w-100 p-2" type="submit">
                    Enviar
                </Button>

            </Form>
        </>
    )
}

export default Formulario