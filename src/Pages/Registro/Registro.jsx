import "../../styles/InicioSesion.css";
import ButtonDefault from "../../components/ButtonDefault";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function Registro() {
  const url = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const { t } = useTranslation();


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

    Apellido: Yup.string()
      .required("El apellido es requerido")
      .matches(soloLetras, "El apellido solo debe incluir letras")
      .min(4, "El apellido debe de ser menor a 4 letras")
      .max(25, "El apellido debe de ser menor a 25 letras"),

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
    Apellido: "",
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
            //Guarda los valores del formulario
            const Usuario = {
              nombre: values.Nombre,
              apellido: values.Apellido,
              email: values.Email,
              contrasenia: values.Contraseña,
            };

            axios
              .post(`${url}/usuarios`, Usuario)
              .then((response) => {
                toast.success("Usuario registrado con exito", {
                  style: {
                    border: "1px solid #B08D59",
                    color: "#B08D59",
                  },
                  iconTheme: {
                    primary: "#B08D59",
                    secondary: "#FFFAEE",
                  },
                });
                navigate("/Login");
              })
              .catch((error) => {
                Swal.fire("No se pudo crear el usuario", " ", "warning");
              });
          }
        });
      } catch (error) {}
    },
  });

  return (
    <div className="background-image">
      <Container className="ubicarCarta mt-4 mb-4">
        <div className="Carta text-center">
          <h3 className="mt-3 TituloInicioSesion">{t("CreateUnaCuenta")}</h3>
          <img
            src={
              "https://live.staticflickr.com/65535/53172154974_d7af7b89f9_o.png"
            }
            alt="Logo de la pagina"
            className="img-fluid"
          />
          <div className="section text-center">
            <Form onSubmit={formik.handleSubmit} noValidate>
              <Form.Group className="contenedorForm">
                <Form.Label className="label-color">{t("nombre")}</Form.Label>
                <div className="input-group">
                  <img
                    src="https://live.staticflickr.com/65535/53172154969_6c2b8bcf1a_o.png"
                    alt="Imagen"
                    className="usuario-icono"
                  />
                  <Form.Control
                    type="text"
                    placeholder={`${t("Ejemplo")}: Lucas`}
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
                </div>
                {formik.touched.Nombre && formik.errors.Nombre && (
                  <span role="alert" className="text-danger">
                    {formik.errors.Nombre}
                  </span>
                )}
              </Form.Group>

              <Form.Group className="contenedorForm">
                <Form.Label className="label-color">{t("apellido")}</Form.Label>
                <div className="input-group">
                  <img
                    src="https://live.staticflickr.com/65535/53172154969_6c2b8bcf1a_o.png"
                    alt="Imagen"
                    className="usuario-icono"
                  />
                  <Form.Control
                    type="text"
                    placeholder={`${t("Ejemplo")}: Yudi`}
                    id="Apellido"
                    {...formik.getFieldProps("Apellido")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.Apellido && formik.errors.Apellido,
                      },
                      {
                        "is-valid":
                          formik.touched.Apellido && !formik.errors.Apellido,
                      }
                    )}
                  />
                </div>
                {formik.touched.Apellido && formik.errors.Apellido && (
                  <span role="alert" className="text-danger">
                    {formik.errors.Apellido}
                  </span>
                )}
              </Form.Group>

              <Form.Group className="contenedorForm">
                <Form.Label className="label-color">
                  {t("email")}
                </Form.Label>
                <div className="input-group">
                  <img
                    src="https://live.staticflickr.com/65535/53171958241_c5697c9a28_o.png"
                    alt="Imagen"
                    className="correo-icono"
                  />
                  <Form.Control
                    type="text"
                    placeholder={`${t("Ejemplo")}: lucas@gmail.com`}
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
                </div>
                {formik.touched.Email && formik.errors.Email && (
                  <span role="alert" className="text-danger">
                    {formik.errors.Email}
                  </span>
                )}
              </Form.Group>
              <Form.Group className="contenedorForm">
                <Form.Label className="label-color">{t("Contraseña")} </Form.Label>
                <div className="input-group">
                  <img
                    src="https://live.staticflickr.com/65535/53171369387_6ff310ac34_o.png"
                    alt="Imagen"
                    className="contraseña-icono"
                  />
                  <Form.Control
                    type="password"
                    placeholder={`${t("Ejemplo")}: Lucas1234`}
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
                </div>
                {formik.touched.Contraseña && formik.errors.Contraseña && (
                  <span role="alert" className="text-danger">
                    {formik.errors.Contraseña}
                  </span>
                )}
              </Form.Group>
              <Form.Group className="contenedorForm">
                <Form.Label className="label-color">
                  {t("RepetirContraseña")}
                </Form.Label>
                <div className="input-group">
                  <img
                    src="https://live.staticflickr.com/65535/53171369387_6ff310ac34_o.png"
                    alt="Imagen"
                    className="contraseña-icono"
                  />
                  <Form.Control
                    type="password"
                    placeholder={t("RepetirContraseña")}
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
                </div>
                {formik.touched.ConfirmarContraseña &&
                  formik.errors.ConfirmarContraseña && (
                    <span role="alert" className="text-danger">
                      {formik.errors.ConfirmarContraseña}
                    </span>
                  )}
              </Form.Group>

              <ButtonDefault namebtn={t("CrearCuenta")} TipoBoton={"sumbit"} />

              <div className=" text-center mb-3">
                <Link to={"/Login"} className="link ">
                  {t("YaTienesCuenta")}
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Registro;
