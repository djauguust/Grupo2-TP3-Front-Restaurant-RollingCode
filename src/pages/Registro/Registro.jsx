import { useState } from "react";
import "../../styles/InicioSesion.css";
import logo from "../../assets/logo.png";
import { useAuth } from "../../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import axios from "axios";

function Registro() {

    const url = import.meta.env.VITE_API_USUARIOS

  //Expresiones para validar
  const soloLetras = /^[a-zA-Z ]+$/;
  const email =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const contraseña = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

  //Esquema de Yup
  const esquemaRegistro = Yup.object().shape({
    Nombre: Yup.string()
      .required("El nombre es requerido")
      .matches(soloLetras, "El nombre solo debe incluir letras")
      .min(4, "El nombre debe de ser menor a 4 letras")
      .max(25, "El nombre debe de ser menor a 25 letras"),

    Email: Yup.string()
      .required("El email es requerido")
      .matches(email, "Ingrese un formato de email correcto")
      .min(16, "Ingrese un email mayor a 16 carácteres")
      .max(40, "Ingrese un email menor a 40 carácteres"),

    Contraseña: Yup.string()
      .required("La contraseña es requerida")
      .matches(
        contraseña,
        "La contraseña debe de contener entre 8 y 16 carácteres, al menos un dígito, al menos una minuscula y al menos una mayuscula"
      ),

    ConfirmarContraseña: Yup.string()
      .required("Debe ingresar la contraseña nuevamente")
      .oneOf([Yup.ref("Contraseña")], "Las contraseñas deben de coincidir"),
  });

  //Valores iniciales
  const valoresIniciales = {
    Nombre: "",
    Email: "",
    Contraseña: "",
    ConfirmarContraseña: "",
  };

  //Validacion con Formik
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaRegistro,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      try {
        //Alert de sweetalert para confirmar
        Swal.fire({
          title: "Ingresaste los datos correctamente?",
          text: "Si revisaste todos los valores, y los ingresaste correctamente sigue adelante",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, esta todo bien",
          cancelButtonText: "No, quiero cambiar algo",
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Usuario credo con exito",
              "Tus datos ya fueron ingresados exitosamente",
              "success"
            );
            //Guarda los valores del formulario
            const Usuario = {
              Nombre: values.Nombre,
              Email: values.Email,
              Contraseña: values.Contraseña,
            };

            axios.post(url,Usuario)
            .then(response => {
                console.log("Usuario creado con exito");
            })
            .catch(error => {
                console.error("Error al cargar el usuario")
            })


            console.log(Usuario);
            //Funcion para redirigirte a inicio
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="background-image">
      <div className="container mt-4 mb-4">
        <div className="Carta">
          <div className="center text-center">
            <h3 className="mt-3">No tienes cuenta?</h3>
            <h3 className="">Create una!</h3>
            <img src={logo} alt="Logo de la pagina" className="img-fluid" />
            <div className="section text-center">
              <Form onSubmit={formik.handleSubmit} noValidate>
                <Form.Group className="contenedorForm">
                  <Form.Label>Nombre :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Lucas"
                    id="Nombre"
                    {...formik.getFieldProps("Nombre")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.Nombre && formik.errors.Nombre,
                      },
                      {
                        "is-valid":
                          formik.touched.Nombre && !formik.errors.Nombre,
                      }
                    )}
                  />
                  {formik.touched.Nombre && formik.errors.Nombre && (
                    <div>
                      <span role="alert" className="text-danger">
                        {formik.errors.Nombre}
                      </span>
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="contenedorForm">
                  <Form.Label>Correo Electrónico </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: lucas@gmail.com"
                    id="Email"
                    {...formik.getFieldProps("Email")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.Email && formik.errors.Email,
                      },
                      {
                        "is-valid":
                          formik.touched.Email && !formik.errors.Email,
                      }
                    )}
                  />
                  {formik.touched.Email && formik.errors.Email && (
                    <div>
                      <span role="alert" className="text-danger">
                        {formik.errors.Email}
                      </span>
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="contenedorForm">
                  <Form.Label>Contrasña </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ej: Lucas1234"
                    id="Contraseña"
                    {...formik.getFieldProps("Contraseña")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.Contraseña && formik.errors.Contraseña,
                      },
                      {
                        "is-valid":
                          formik.touched.Contraseña && formik.errors.Contraseña,
                      }
                    )}
                  />
                  {formik.touched.Contraseña && formik.errors.Contraseña && (
                    <div className="Div-Contraseña">
                      <span role="alert" className="text-danger">
                        {formik.errors.Contraseña}
                      </span>
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="contenedorForm">
                  <Form.Label>Repite tu contraseña </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresa nuevamente la contraseña"
                    id="ConfirmarContraseña"
                    {...formik.getFieldProps("ConfirmarContraseña")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.ConfirmarContraseña &&
                          formik.errors.ConfirmarContraseña,
                      },
                      {
                        "is-valid":
                          formik.touched.ConfirmarContraseña &&
                          !formik.errors.ConfirmarContraseña,
                      }
                    )}
                  />
                  {formik.touched.ConfirmarContraseña &&
                    formik.errors.ConfirmarContraseña && (
                      <div className="Div-Contraseña">
                        <span role="alert" className="text-danger">
                          {formik.errors.ConfirmarContraseña}
                        </span>
                      </div>
                    )}
                </Form.Group>

                <button className="btn mt-3 mb-3" type="submit">
                  Crear Cuenta
                </button>

                <p className="mb-0 mt-4 text-center mb-2">
                  <a href="#" className="link ">
                    Ya tienes una cuenta? Inicia Sesion?
                  </a>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
