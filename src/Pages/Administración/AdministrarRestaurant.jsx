import React, { useEffect, useState, useContext } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useForm } from "./hooks/useForm";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { NavbarContext } from "../../context/NavbarContext";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { setHours, setMinutes } from "date-fns";


function despuesDe(obj, value) {
  try {
    if (value.split("-")[0] > obj.split("-")[0]) {
      return false;
    } else if (value.split("-")[0] == obj.split("-")[0]) {
      if (value.split("-")[1] > obj.split("-")[1]) {
        return false;
      } else if (value.split("-")[1] == obj.split("-")[1]) {
        if (value.split("-")[2] > obj.split("-")[2]) {
          return false;
        }
      }
    }
    return true;
  } catch (e) {
    return false;
  }
}

export const AdministrarRestaurant = ({ userToken }) => {
  const { theme } = useContext(NavbarContext);
  const useToken = { headers: { "auth-token": userToken } };
  const { t } = useTranslation();

  const newTheme =
    theme === "claro" ? "light" : theme === "oscuro" ? "dark" : theme;

  const initialForm = {
    nombre: "",
    maximoComensales: 0,
    fecha: "",
    admin: "",
    desde: 0,
    hasta: 2359,
    reservasMaxima: 0,
    tiempoMaximoReserva: 0,
  };

  const { formState, setFormState, onInputChange, onResetForm } =
    useForm(initialForm);

    
    const handleDelete = (id) => {
      Swal.fire({
        title: t("EliminarFechaNoDisponible"),
      text: t("EliminarSinProblema"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("SiEstoySeguro"),
      cancelButtonText: t("NoMejorNo"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${url}/fechasnd/${id}`, useToken)
          .then(({ data }) => {
            actualizar();
          })
          .catch((error) => console.log(error));
      }
    });
  };
  
  const [ButtonGuardarRestaurant, setButtonGuardarRestaurant] = useState(false);
  const [ShowModalRestaurant, setShowModalRestaurant] = useState(false);
  const handleRestaurant = () => {
    setErrores([]);
    setButtonGuardarRestaurant(false);
    onResetForm();
    setShowModalRestaurant(true);
    setFormState({
      ...restaurant,
      desde: restaurant.horario.desde,
      hasta: restaurant.horario.hasta,
    });
  };
  const handleCloseModalRestaurant = () => {
    setShowModalRestaurant(false);
  };

  /* Backend */
  const url = import.meta.env.VITE_API;
  const [restaurant, setRestaurant] = useState();
  const [fechasND, setfechasND] = useState([]);

  const [actualizador, setActualizador] = useState(false);
  const actualizar = () => {
    setActualizador(!actualizador);
  };

  //Axios para traer valores del Restaurante
  useEffect(() => {
    axios
    .get(`${url}/restaurant/`, useToken)
    .then(({ data }) => {
      data[0] = {
        ...data[0],
        horario: {
          desde: numberToHour(data[0].horario.desde),
          hasta: numberToHour(data[0].horario.hasta),
        },
      };
      setRestaurant(data[0]);
    })
    .catch((error) => console.log(error));
    axios
    .get(`${url}/fechasnd/`, useToken)
    .then(({ data }) => {
      setfechasND(data);
    })
    .catch((error) => console.log(error));
  }, [formState._id]);
  /* FIN Backend */
  
  //Expresiones para validar
  const soloLetras = /^[a-zA-Z ']+$/;

  //Esquema de Yup
  const esquemaRestaurante = Yup.object().shape({
    Nombre: Yup.string()
      .required("El nombre es requerido")
      .matches(soloLetras, "El nombre solo debe incluir letras")
      .min(4, "El nombre debe de ser menor a 4 letras")
      .max(25, "El nombre debe de ser menor a 25 letras"),

    CantidadMaximaComensales: Yup.number()
      .required("La cantidad es requerida")
      .min(1, "La cantidad Maxima de comensales debe de ser al menos 1"),
    HorarioRestauranteDesde: Yup.string().required("La hora es requerida"),

    HorarioRestauranteHasta: Yup.string().required("La hora es requerida"),

    CantidadMaximaDeReservas: Yup.number()
      .required("La cantidad maxima es requerida")
      .min(1, "La cantidad maxima de reservas tiene que ser al menos 1"),

    TiempoEntreTurnos: Yup.number()
      .required("El tiempo es requerido")
      .min(1, "El tiempo tiene que ser al menos 1"),
  });

  //Valores Iniciales
  const valoresIniciales = {
    Nombre: "",
    CantidadMaximaComensales: 0,
    HorarioRestauranteDesde: "",
    HorarioRestauranteHasta: "",
    CantidadMaximaDeReservas: 0,
    TiempoEntreTurnos: 0,
  };

  //Validar con formik
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaRestaurante,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      Swal.fire({
        title: t("ActualizarDatosRestaurante"),
        text: t("CambiosRevertir"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("SiEstoySeguro"),
        cancelButtonText: t("NoMejorNo"),
      }).then((result) => {
        if (result.isConfirmed) {
          let init = values.HorarioRestauranteDesde.split(":");
          let fin = values.HorarioRestauranteHasta.split(":");
          axios
            .put(
              `${url}/restaurant/`,
              {
                nombre: values.Nombre,
                maximoComensales: values.CantidadMaximaComensales,
                horario: {
                  desde: parseInt(`${init[0]}${init[1]}`),
                  hasta: parseInt(`${fin[0]}${fin[1]}`),
                },
                reservasMaxima: values.CantidadMaximaDeReservas,
                tiempoMaximoReserva: values.TiempoEntreTurnos,
              },
              useToken
            )
            .then(({ data }) => {
              setShowModalRestaurant(false);
              Swal.fire(
                t("RestauranteEditadoExito"),
                t("RestauranteCambiosGuardados"),
                "success"
              ).then(async (result) => {
                actualizar();
              });
            })
            .catch(({ response }) => {
              setShowModalRestaurant(false);
              Swal.fire(
                t("ErrorServidor"),
                `Error: ${response}`,
                "warning"
              ).then(async (result) => {
                actualizar();
              });
            });
        }
      });
    },
  });

  //Funcion para lo mismo pero con la hora
  const parsearHora = (customTime) => {
    const [hour, minute] = customTime.split(":");
    const horaParseada = setMinutes(setHours(new Date(), hour), minute);
    return horaParseada;
  };

  //Funcion para setear los valores a los input

  const establecerDatos = async () => {
    //If para que espere a que formState.horarior.desde exista
    if (restaurant && restaurant.horario.desde) {
      const HoraDesde = (await parsearHora(restaurant.horario.desde)) || "";
      const HoraHasta = (await parsearHora(restaurant.horario.hasta)) || "";
      formik.setFieldValue("Nombre", restaurant.nombre);
      formik.setFieldValue(
        "CantidadMaximaComensales",
        restaurant.maximoComensales
      );
      formik.setFieldValue("HorarioRestauranteDesde", HoraDesde);
      formik.setFieldValue("HorarioRestauranteHasta", HoraHasta);
      formik.setFieldValue(
        "CantidadMaximaDeReservas",
        restaurant.reservasMaxima
      );
      formik.setFieldValue("TiempoEntreTurnos", restaurant.tiempoMaximoReserva);
    }
  };

  //UseEffect que sirve para establecer los datos
  useEffect(() => {
    establecerDatos();
  }, [restaurant]);

  const numberToHour = (h) => {
    let aux = `${h}`.split("");
    return `${aux[0]}${aux[1]}:${aux[2]}${aux[3]}`;
  };

  /* MODALES */
  const [showModal, setShowModal] = useState(false);
  const [buttonGuardarFecha, setButtonGuardarFecha] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setButtonGuardarFecha(false);
    onResetForm();
    setShowModal(true);
  };

  const handleSubmitModal = () => {
    Swal.fire({
      title: t("CrearFechaNoDisponible"),
      text: t("EliminarLuego"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("SiEstoySeguro"),
      cancelButtonText: t("NoMejorNo"),
    }).then((result) => {
      if (result.isConfirmed) {
        setShowAlert(false);
        setButtonGuardarFecha(true);
        let aux = {
          fecha: formState.fecha,
          idAdmin: "64e6934cab45fce72db39fda", // TO DO Tiene que ser el id del admin logueado!!
          idRestaurant: "64e6a45a0367aebe3bef0158",
        };
        if (despuesDe(formState.fecha, today2)) {
          //La fecha es posterior a hoy
          axios
            .post(`${url}/fechasnd/`, aux, useToken)
            .then(({ data }) => {
              setButtonGuardarFecha(false);
              // TO DO mostrar cartel que fue agregado con éxito
              setShowModal(false);
              actualizar();
            })
            .catch(({ response }) => {
              setButtonGuardarFecha(false);
              // TO DO mostrar cartel que hubo problemas.
              setShowModal(false);
              actualizar();
            });
        } else {
          //La fecha es anterior a hoy
          setShowAlert(true);
          setButtonGuardarFecha(false);
        }
      }
    });
  };

  useEffect(() => {
    setShowAlert(false);
  }, [formState.fecha]);

  const alertFechaIncorrecta = (
    message = "La fecha no puede ser fecha pasada"
  ) => {
    return (
      <>
        <Alert key="warning" variant="warning" className="my-2">
          <b>{message}</b>
        </Alert>
      </>
    );
  };
  /* FIN MODALES */

  /* HOY Y FECHAS NO DISPONIBLES FUTURAS */
  const today = new Date();
  const mesComoString = () => {
    let aux = today.getMonth() + 1;
    if (aux < 10) {
      return `0${aux}`;
    } else {
      return `${aux}`;
    }
  };
  const diaComoString = () => {
    let aux = today.getDate();
    if (aux < 10) {
      return `0${aux}`;
    } else {
      return `${aux}`;
    }
  };
  const today2 = `${today.getFullYear()}-${mesComoString()}-${diaComoString()}`;
  /* FIN HOY Y FECHAS NO DISPONIBLES FUTURAS */

  /* VALIDACIÓN FORM RESTAURANT */
  const [errores, setErrores] = useState([]);

  return (
    <>
      <Container>
        <h2 className="text-center mt-5">{t("adminRestaurant")}</h2>

        <Form
          onSubmit={formik.handleSubmit}
          data-bs-theme={`${newTheme}`}
          noValidate
        >
          <Form.Group className="mb-3">
            <Form.Label>{t("nombreRestaurant")}:</Form.Label>
            <Form.Control
              type="text"
              id="Nombre"
              {...formik.getFieldProps("Nombre")}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t("cantidadMaximaComensales")}:</Form.Label>
            <Form.Control
              type="text"
              id="CantidadMaximaComensales"
              {...formik.getFieldProps("CantidadMaximaComensales")}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t("horariosRestaurant")}:</Form.Label>
            <Row>
              <Col>
                  <DatePicker
                    selected={formik.values.HorarioRestauranteDesde}
                    disabled
                    dateFormat="HH:mm"
                    className="form-control"
                  />
              </Col>
              a
              <Col>
              <DatePicker
                    selected={formik.values.HorarioRestauranteHasta}
                    disabled
                    dateFormat="HH:mm"
                    className="form-control"
                  />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t("cantidadMaxima")}:</Form.Label>
            <Form.Control
              type="text"
              id="CantidadMaximaDeReservas"
              {...formik.getFieldProps("CantidadMaximaDeReservas")}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t("tiempoMaximo")}</Form.Label>
            <Form.Control
              type="text"
              id="TiempoEntreTurnos"
              {...formik.getFieldProps("TiempoEntreTurnos")}
              disabled
            />
          </Form.Group>
        </Form>
        <h5 className="mt-3">{t("fechasNoDisponibles")}</h5>
        <Table
          striped
          responsive
          className="mb-3"
          data-bs-theme={`${newTheme}`}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>{t("fecha")}</th>
              <th>{t("creadoPor")}:</th>
              <th>{t("acciones")}</th>
            </tr>
          </thead>
          <tbody>
            {fechasND.map((f, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{f.fecha}</td>
                <td>
                  {f.apellido}, {f.nombre}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDelete(f._id);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="col-12 mb-4 d-grid">
          <Button type="submit" variant="warning" onClick={handleRestaurant}>
            <strong>{t("adminRestaurant")}</strong>
          </Button>
        </div>
        <div className="col-12 mb-4 d-grid">
          <Button type="submit" variant="warning" onClick={handleShowModal}>
            <strong>{t("agregarFechaNoDisponible")}</strong>
          </Button>
        </div>
      </Container>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdropClassName="custom-backdrop"
        className="modal-custom customizacion"
        data-bs-theme={`${newTheme}`}
      >
        <Modal.Header closeButton className={`custom-${theme}`}>
          <Modal.Title>{t("agregarFechaNoDisponible")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`custom-${theme}`}>
          <Form data-bs-theme={`${newTheme}`}>
            <Form.Group className="mb-3" controlId="formOrganizacion">
              <Form.Label>{t("fecha")}:</Form.Label>
              <Form.Control
                type="date"
                value={formState.fecha}
                onChange={onInputChange}
                name="fecha"
              />
            </Form.Group>
          </Form>
          {showAlert && alertFechaIncorrecta()}
        </Modal.Body>
        <Modal.Footer className={`custom-${theme}`}>
          <Button variant="secondary" onClick={handleCloseModal}>
            {t("cerrar")}
          </Button>
          <Button
            variant="sucess"
            onClick={handleSubmitModal}
            disabled={buttonGuardarFecha}
          >
            {t("Guardar")}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={ShowModalRestaurant}
        onHide={handleCloseModalRestaurant}
        backdropClassName="custom-backdrop"
        className="modal-custom letra-custom"
        data-bs-theme={`${newTheme}`}
      >
        <Modal.Header closeButton className={`custom-${theme}`}>
          <Modal.Title>{t("adminRestaurant")}</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={formik.handleSubmit}
          noValidate
          data-bs-theme={`${newTheme}`}
        >
          <Modal.Body className={`custom-${theme}`}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>{t("nombreRestaurant")}:</Form.Label>
                  <Form.Control
                    type="text"
                    id="Nombre"
                    placeholder={`${t("Ejemplo")}: Gusteau´s`}
                    min={4}
                    max={25}
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
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>{t("cantidadMaximaComensales")}:</Form.Label>
                  <Form.Control
                    type="number"
                    id="CantidadMaximaComensales"
                    placeholder={`${t("Ejemplo")}: 1`}
                    min={1}
                    {...formik.getFieldProps("CantidadMaximaComensales")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.CantidadMaximaComensales &&
                          formik.errors.CantidadMaximaComensales,
                      },
                      {
                        "is-valid":
                          formik.touched.CantidadMaximaComensales &&
                          !formik.errors.CantidadMaximaComensales,
                      }
                    )}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>{t("horariosRestaurant")}:</Form.Label>
              <Row>
                <Col>
                <DatePicker
                    selected={formik.values.HorarioRestauranteDesde}
                    onChange={(hora) => formik.setFieldValue("HorarioRestauranteDesde", hora)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Hora"
                    dateFormat="HH:mm"
                    locale={es}
                    placeholderText={t("eligeHora")}
                    className="form-control"
                  />
                </Col>
                a
                <Col>
                <DatePicker
                    selected={formik.values.HorarioRestauranteHasta}
                    onChange={(hora) => formik.setFieldValue("HorarioRestauranteHasta", hora)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Hora"
                    dateFormat="HH:mm"
                    locale={es}
                    placeholderText={t("eligeHora")}
                    className="form-control"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>
                    {t("cantidadMaxima")}:
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    id="CantidadMaximaDeReservas"
                    placeholder={t("EligeUnaCantidadMaxima")}
                    min={1}
                    {...formik.getFieldProps("CantidadMaximaDeReservas")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.CantidadMaximaDeReservas &&
                          formik.errors.CantidadMaximaDeReservas,
                      },
                      {
                        "is-valid":
                          formik.touched.CantidadMaximaDeReservas &&
                          !formik.errors.CantidadMaximaDeReservas,
                      }
                    )}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>
                    {t("tiempoMaximo")}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    id="TiempoEntreTurnos"
                    placeholder={t("EligeTiempoMaximo")}
                    min={1}
                    {...formik.getFieldProps("TiempoEntreTurnos")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.TiempoEntreTurnos &&
                          formik.errors.TiempoEntreTurnos,
                      },
                      {
                        "is-valid":
                          formik.touched.TiempoEntreTurnos &&
                          !formik.errors.TiempoEntreTurnos,
                      }
                    )}
                  />
                </Col>
              </Row>
            </Form.Group>
            {errores.length != 0 && (
              <Alert variant="warning">
                {errores.map((f) => (
                  <p>{f}</p>
                ))}
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer className={`custom-${theme}`}>
            <Button variant="secondary" onClick={handleCloseModalRestaurant}>
              {t("cerrar")}
            </Button>
            <Button
              variant="sucess"
              //onClick={handleSubmit}
              disabled={ButtonGuardarRestaurant}
              //Cuando ya se pase el contenido de handleSubmit al formik descomente el type y comente la funcion onClick
              type="sumbit"
            >
              {t("Guardar")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
