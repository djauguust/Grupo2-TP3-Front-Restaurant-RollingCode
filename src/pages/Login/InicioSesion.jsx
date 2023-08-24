import { useState } from "react";
import "../../styles/InicioSesion.css";
import ButtonDefault from "../../components/ButtonDefault";
import logo from "../../assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import axios from "axios";

function InicioSesion() {
  //Url de un back de prueba para que la funcion de logueo quede guardada para cuando usemos el back
  /* const url = "http://localhost:8001/api/usuarios/login"; */
  const url = import.meta.env.VITE_API;

  //UseState para mostrar un mensaje de que los datos ingresados no se encontraron
  const [UsuarioLogueadoError, setUsuarioLogueadoError] = useState(false);

  //Esquema de Yup
  const esquemaInicioSesion = Yup.object().shape({
    email: Yup.string().required("El email es requerido"),

    contrasenia: Yup.string().required("La contrasenia es requerida"),
  });

  //Valores Iniciales
  const valoresIniciales = {
    email: "",
    contrasenia: "",
  };

  //Validacion con formik
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaInicioSesion,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      try {
        //Guardo los valores de los inputs
        const usuarioLogueado = {
          email: values.email,
          contrasenia: values.contrasenia,
        };
        console.log("first");
        let jwtToken;
        //Hago el pedido con axios
        axios
          .post(`${url}/login/`, usuarioLogueado)
          .then((response) => {
            console.log("Usuario logueado con exito");
            console.log(response);
            Swal.fire(
              "Usuario logueado con exito",
              "Tus datos ya fueron ingresados exitosamente",
              "success"
            );
            jwtToken = response.data.data.token;
            localStorage.setItem("user", JSON.stringify(jwtToken));
          })
          .catch((error) => {
            Swal.fire("No se pudo loguear el usuario", " ", "warning");
            console.error(error);
          });

        console.log("firsst");
        //Si se encuentra sale la alerta y guarda el token en LocalStorage
        /* if (response.status === 200) {
          Swal.fire(
            "Logueado con exito",
            "Los datos ingresaron coincidieron con su usuario exitosamente",
            "success"
          );
          console.log(response); */
        setUsuarioLogueadoError(false);
      } catch (error) {
        //Si no te muestra el mensaje de error
        setUsuarioLogueadoError(true);
        console.log(error);
      }
    },
  });

  const MandarARegistro = () => {
    useNavigate("/Registro");
    console.log("Funciona mandar a registro");
  };

  return (
    <div className="background-image">
      <Container className="ubicarCarta">
        <div className="Carta mt-3 mb-3 text-center">
          <h3 className="mt-3">Bienvenido!</h3>
          <img src={logo} alt="Logo de la pagina" className="img-fluid" />
          {UsuarioLogueadoError === true && (
            <div className="d-flex justify-content-center">
              <span role="alert" className="text-danger">
                Los datos ingresadon no coinciden con ningun usuario
              </span>
            </div>
          )}
          <Form onSubmit={formik.handleSubmit} noValidate>
            <Form.Group className="contenedorForm">
              <Form.Label className="label-color">
                Ingresa tu correo electronico{" "}
              </Form.Label>
              <div className="input-group">
                <img
                  src="/src/assets/iconoCorreo.png"
                  alt="Imagen"
                  className="correo-icono"
                />
                <Form.Control
                  type="text"
                  placeholder="Ej: Lucas@gmail.com"
                  id="email"
                  {...formik.getFieldProps("email")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid": formik.touched.email && formik.errors.email,
                    },
                    {
                      "is-valud": formik.touched.email && !formik.errors.email,
                    }
                  )}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div>
                  <span role="alert" className="text-danger">
                    {formik.errors.email}
                  </span>
                </div>
              )}
            </Form.Group>
            <Form.Group className="contenedorForm">
              <Form.Label className="label-color">
                Ingresa tu contrasenia{" "}
              </Form.Label>
              <div className="input-group">
                <img
                  src="/src/assets/contraseña.png"
                  alt="Imagen"
                  className="contraseña-icono"
                />
                <Form.Control
                  type="password"
                  placeholder="Ej: Lucas1234"
                  id="contrasenia"
                  {...formik.getFieldProps("contrasenia")}
                  className={clsx(
                    "form-control",
                    {
                      "is-invalid":
                        formik.touched.contrasenia && formik.errors.contrasenia,
                    },
                    {
                      "is-valid":
                        formik.touched.contrasenia && formik.errors.contrasenia,
                    }
                  )}
                />
              </div>
              {formik.touched.contrasenia && formik.errors.contrasenia && (
                <div>
                  <span role="alert" className="text-danger">
                    {formik.errors.contrasenia}
                  </span>
                </div>
              )}
            </Form.Group>

            <ButtonDefault namebtn="ingresar" TipoBoton="sumbit" />

            {/* <button className="btn mt-3 mb-3" type="submit">
              Ingresar
            </button>  */}
          </Form>
          <br />

          {/* Botón link 'olvidaste tu contrasenia' */}
          <div className="mb-3 text-center">
            <ButtonDefault
              namebtn="registrarse"
              funcion={MandarARegistro}
              to={"/registro"}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default InicioSesion;
