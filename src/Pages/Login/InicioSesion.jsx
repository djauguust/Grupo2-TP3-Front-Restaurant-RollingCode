import { useContext, useEffect, useState } from "react";
import "../../styles/InicioSesion.css";
import ButtonDefault from "../../components/ButtonDefault";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import axios from "axios";
import { UsuariosContext } from "../../context/UserContext";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

function InicioSesion() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { t } = useTranslation();

  //Url de un back de prueba para que la funcion de logueo quede guardada para cuando usemos el back

  const url = import.meta.env.VITE_API;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === true) {
      toast.success(t("UsuarioLogueadoExitosamente"), {
        style: {
          border: "1px solid #B08D59",
          color: "#B08D59",
        },
        iconTheme: {
          primary: "#B08D59",
          secondary: "#FFFAEE",
        },
      });
      navigate("/");
    }
  }, [isLoggedIn]);
  //UseState para mostrar un mensaje de que los datos ingresados no se encontraron
  const [UsuarioLogueadoError, setUsuarioLogueadoError] = useState(false);

  //Este regex queda a decision general si usarlo o es innecesario
  const validarEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  //Esquema de Yup
  const esquemaInicioSesion = Yup.object().shape({
    email: Yup.string()
      .required("El email es requerido")
      .matches(validarEmail, "El email debe ser un email valido")
      .min(15, "El valor ingresado debe ser mayor a 15 carácteres")
      .max(30, "El valor ingresado debe ser menor a 30 carácteres"),

    contrasenia: Yup.string()
      .required("La contrasenia es requerida")
      .min(8, "El valor ingresadod ebe ser mayor a 8 carácteres")
      .max(16, "El valor ingresado debe de ser menor a 16 carácteres"),
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
        // Hago el pedido con axios
        const response = await axios.post(`${url}/login`, usuarioLogueado);

        // Si la petición es exitosa

        setIsLoggedIn(true);

        // Guardo el token en el estado o en el LocalStorage si es necesario
        const jwtToken = response.data.data.token;
        setUsuarioLogueadoError(false); // No olvides manejar el estado de error

        // Aquí puedes decidir si deseas guardar el token en el estado o en LocalStorage

        localStorage.setItem("user", JSON.stringify(jwtToken));
      } catch (error) {
        // Si la petición falla
        Swal.fire(t("ErrorLoguear"), " ", "warning");
        setUsuarioLogueadoError(true);
        // Muestra los detalles del error en la consola
      }
    },
  });

  return (
    <section className="background-image">
      <Container className="ubicarCarta">
        <article className="Carta mt-3 mb-3 text-center">
          <h3 className="mt-3 TituloInicioSesion">{t("bienvenido")}</h3>
          <img
            src={
              "https://live.staticflickr.com/65535/53172154974_d7af7b89f9_o.png"
            }
            alt="Logo de la pagina"
            className="img-fluid"
          />
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
                {t("IngresaCorreo")}
              </Form.Label>
              <div className="input-group">
                <img
                  src="https://live.staticflickr.com/65535/53171958241_c5697c9a28_o.png"
                  alt="Imagen"
                  className="correo-icono"
                />
                <Form.Control
                  type="text"
                  placeholder={`${t("Ejemplo")}: Lucas@gmail.com`}
                  id="email"
                  minLength="15"
                  maxLength="30"
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
                {t("IngresaContraseña")}
              </Form.Label>
              <div className="input-group">
                <img
                  src="https://live.staticflickr.com/65535/53171369387_6ff310ac34_o.png"
                  alt="Imagen"
                  className="contraseña-icono"
                  />
                <Form.Control
                  type="password"
                  placeholder={`${t("Ejemplo")}: Lucas1234`}
                  id="contrasenia"
                  minLength="8"
                  maxLength="16"
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

            <ButtonDefault namebtn={t("Ingresar")} TipoBoton="sumbit" />
          </Form>
          <br />

          <div className="mb-3 text-center">
            <Link to={"/registro"} className="link ">
              {t("CreateUnaCuenta")}
            </Link>
          </div>
        </article>
      </Container>
      <div></div>
    </section>
  );
}

export default InicioSesion;
