import { useState } from "react";
import "../../styles/InicioSesion.css";
import logo from "../../assets/logo.png";
import { useAuth } from "../../auth/AuthProvider";
import { Link, Navigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import axios from "axios";

function InicioSesion() {
  //Url de un back de prueba para que la funcion de logueo quede guardada para cuando usemos el back
  const url = "http://localhost:8001/api/usuarios/login";

  //UseState para mostrar un mensaje de que los datos ingresados no se encontraron
  const [UsuarioLogueadoError, setUsuarioLogueadoError] = useState(false);

  //Esquema de Yup
  const esquemaInicioSesion = Yup.object().shape({
    Email: Yup.string().required("El email es requerido"),

    Contraseña: Yup.string().required("La contraseña es requerida"),
  });

  //Valores Iniciales
  const valoresIniciales = {
    Email: "",
    Contraseña: "",
  };

  //Validacion con formik
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaInicioSesion,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        //Guardo los valores de los inputs
        const usuarioLogueado = {
          email: values.Email,
          contraseña: values.Contraseña,
        };

        //Hago el pedido con axios
        const response = await axios.post(url, usuarioLogueado);

        //Si se encuentra sale la alerta y guarda el token en LocalStorage
        if (response.status === 200) {
          Swal.fire(
            "Logueado con exito",
            "Los datos ingresaron coincidieron con su usuario exitosamente",
            "success"
          );

          const jwtToken = response.data.data.token;
          localStorage.setItem("user", JSON.stringify(jwtToken));
          setUsuarioLogueadoError(false);
        }
      } catch (error) {
        //Si no te muestra el mensaje de error
        setUsuarioLogueadoError(true);
        console.log(error);
      }
    },
  });

  //Nose para que sirve xd
  const auth = useAuth;

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

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
              <Form.Label>Ingresa tu correo electronico :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Lucas@gmail.com"
                id="Email"
                {...formik.getFieldProps("Email")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.Email && formik.errors.Email,
                  },
                  {
                    "is-valud": formik.touched.Email && !formik.errors.Email,
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
              <Form.Label>Ingresa tu contraseña :</Form.Label>
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
                <div>
                  <span role="alert" className="text-danger">
                    {formik.errors.Contraseña}
                  </span>
                </div>
              )}
            </Form.Group>

            <button className="btn mt-3 mb-3" type="submit">
              Ingresar
            </button>

            <div className="mb-3 text-center">
              <Link to={"/Registro"} className="link">
                Olvidaste tu contraseña?
              </Link>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default InicioSesion;
