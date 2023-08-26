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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    onSubmit: async (values) => {
      try {
        // Guardo los valores de los inputs
        const usuarioLogueado = {
          email: values.email,
          contrasenia: values.contrasenia,
        };
        console.log(usuarioLogueado);
        // Hago el pedido con axios
        const response = await axios.post(`${url}/login`, usuarioLogueado);
        console.log(response);
        // Si la petición es exitosa
        Swal.fire(
          "Usuario logueado con exito",
          "Tus datos ya fueron ingresados exitosamente",
          "success"
        );

        // Guardo el token en el estado o en el LocalStorage si es necesario
        const jwtToken = response.data.data.token;
        setUsuarioLogueadoError(false); // No olvides manejar el estado de error
        console.log(jwtToken);

        // Aquí puedes decidir si deseas guardar el token en el estado o en LocalStorage
        /* setTokenEnEstado(jwtToken); */
        localStorage.setItem("user", JSON.stringify(jwtToken));
        
        /* setIsLoogedIn(true); */
      
      } catch (error) {
        // Si la petición falla
        Swal.fire("No se pudo loguear el usuario", " ", "warning");
        setUsuarioLogueadoError(true);
        console.error(error.response); // Muestra los detalles del error en la consola
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
