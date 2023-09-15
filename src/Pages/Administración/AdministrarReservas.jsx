import React, { useEffect, useState, useContext } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { FormSearch } from "./components/FormSearch";
import { useForm } from "./hooks/useForm";
import Swal from "sweetalert2";
import axios from "axios";
import { NavbarContext } from "../../context/NavbarContext";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { ReservasContexto } from "../../context/ReservasContexto";
import {
  addMinutes,
  format,
  parse,
  parseISO,
  setHours,
  setMinutes,
  subMinutes,
} from "date-fns";

export const AdministrarReservas = ({ isDoorman = false, userToken }) => {
  const { theme } = useContext(NavbarContext);
  const useToken = { headers: { "auth-token": userToken } };
  const { t } = useTranslation();
  let date = new Date();
  const {
    traerFechasNoDisponibles,
    fechasNoDisponibles,
    traerHorasDisponibles,
    horariosDisponibles,
  } = useContext(ReservasContexto);

  const newTheme =
    theme === "claro" ? "light" : theme === "oscuro" ? "dark" : theme;

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
  const [reservasToday, setReservasToday] = useState(null);
  const initialForm = {
    date: today2,
    hora: "",
    fecha: "",
    comensales: "",
    fueUsada: false,
    _id: "",
  };
  const { formState, setFormState, onInputChange } = useForm(initialForm);

  /* UseEffect que busque reservas cada vez que cambia formState.date */
  const [reservaToShow, setReservaToShow] = useState([]);

  /* Backend */
  const url = import.meta.env.VITE_API;

  const [actualizador, setActualizador] = useState(false);
  const actualizar = () => {
    setActualizador(!actualizador);
  };

  useEffect(() => {
    axios
      .get(`${url}/reservas/${formState.date}`, useToken)
      .then(({ data }) => {
        setReservaToShow(data);
      })
      .catch((error) => console.log(error));
  }, [formState.date, actualizador]);

  useEffect(() => {
    axios
      .get(`${url}/reservas/${today2}`, useToken)
      .then(({ data }) => {
        setReservasToday(data);
      })
      .catch((error) => console.log(error));
  }, [actualizador]);

  /* FIN Backend */

  const handleDelete = (reserva) => {
    Swal.fire({
      title: "¿Realmente deseas eliminar la reserva?",
      text: "Este cambio es irreversible y no se le notificará al cliente de tu decisión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${url}/reservas/${reserva._id}`, useToken)
          .then(({ data }) => {
            Swal.fire(
              "Eliminación exitosa",
              "Reserva liberada para nuevos usuarios",
              "success"
            ).then(async (result) => {
              actualizar();
            });
          })
          .catch((error) => {
            console.log(error);
            actualizar();
          });
      }
    });
  };

  const handleConfirm = (reserva) => {
    Swal.fire({
      title: "¿Confirmar Reserva?",
      text: "Verificar que la cantidad de personas son al menos la mitad de lo indicada en la reserva",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${url}/reservas/usada/${reserva._id}`,
            { fueUsada: true },
            useToken
          )
          .then(({ data }) => {
            Swal.fire("Reserva marcada como usada", "", "success").then(
              async (result) => {
                actualizar();
              }
            );
          })
          .catch(({ response }) => {
            Swal.fire(
              "Error con servidor",
              `Error: ${response.data.message}`,
              "warning"
            ).then(async (result) => {
              actualizar();
            });
          });
      }
    });
  };

  /* Badge de "fue usada" */
  const fueUsada = (usada) => {
    if (usada) {
      return (
        <>
          <Badge bg="success">{t("si").toUpperCase()}</Badge>
        </>
      );
    } else {
      return (
        <>
          <Badge bg="secondary">{t("no").toUpperCase()}</Badge>
        </>
      );
    }
  };
  /* FIN Badge de "fue usada" */

  /* Alert de que no hay reservas en ese día */
  const sinReserva = (message = "Sin reservas para el día") => {
    return (
      <>
        <Alert key="warning" variant="warning" className="my-2">
          <b>{message}</b>
        </Alert>
      </>
    );
  };
  /* FIN Alert de que no hay reservas en ese día */

  /* EDITAR RESERVA */
  const [ShowModalEdit, setShowModalEdit] = useState(false);
  const [errores, setErrores] = useState([]);
  const [ButtonGuardarReserva, setButtonGuardarReserva] = useState(false);
  const handleCloseModal = () => {
    setShowModalEdit(false);
  };
  const handleEdit = (reserva) => {
    setShowModalEdit(true);
    let aux = {
      _id: reserva._id,
      date: formState.date,
      hora: reserva.hora,
      fecha: reserva.fecha,
      comensales: reserva.comensales,
      fueUsada: reserva.fueUsada,
    };
    setFormState(aux);
  };

  //Regex para validar

  //Esquema de validación
  const esquemaReserva = Yup.object().shape({
    Fecha: Yup.date().required("La fecha es requerida"),

    Hora: Yup.string().required("La hora es requerida"),

    CantidadDeComensales: Yup.number()
      .required("La cantidad de comensales es requerida")
      .min(1,"No se permiten valores menores a 1")
      .max(horariosDisponibles.maximoComensales, "La cantidad ingresada supera a la cantidad de comensales"),

    FueUsada: Yup.string().required("Este campo es requerido"),
  });

  //Valores iniciales
  const valoresiniciales = {
    Fecha: null,
    Hora: "",
    CantidadDeComensales: "",
    FueUsada: false,
  };
  //Validación con formik
  const formik = useFormik({
    initialValues: valoresiniciales,
    validationSchema: esquemaReserva,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      //Para formatear la fecha a un valor año/mes/dia
      const fechaFormateada = format(values.Fecha, "yyyy-MM-dd", {
        locale: es,
      });
      
      //Para formatear la hora a un valor Hora/Minutos
      const horaFormateada = format(values.Hora, "HH:mm", {
        locale: es,
    });

    
      axios
      .put(`${url}/reservas/${formState._id}`, {fecha : fechaFormateada,
        hora : horaFormateada,
        date : formState.date,
        comensales : values.CantidadDeComensales,
        fueUsada : values.FueUsada,
        _id : formState._id,
        comensalesInicial: formState.comensales,
        traerHorasDisponibles,
        maximoComensales : horariosDisponibles.maximoComensales}, useToken)
        
      .then(({ data }) => {
        setShowModalEdit(false);
        Swal.fire(
          "Reserva modificada con éxito",
          "La reserva fue modificada pero el usuario no fue notificado de esto.",
          "success"
        ).then(async (result) => {
          actualizar();
        });
      })
      .catch(({ response }) => {
        setShowModalEdit(false);
        Swal.fire(
          "Error con servidor",
          `Error: ${response.data.message}`,
          "warning"
        ).then(async (result) => {
          setFormState({ date: formState.fecha });
          setButtonGuardarReserva(false);
          actualizar();
        });
      });
    },
  });

  //UseEffect para traer las fehcas no disponibles
  useEffect(() => {
    traerFechasNoDisponibles();
  }, []);

  //useEffect para traer el horario disponible
  useEffect(() => {
    traerHorasDisponibles();
  }, []);

  //Funcion para que el usuario no pueda elegir fechas de dias anteriores o del mismo dia
  const filterMinDay = () => {
    const nextDay = new Date();
    nextDay.setDate(date.getDate() + 1);
    return nextDay;
  };

  //Fucnion para que el usuario no pueda elegir fechas mas de 1 mes
  const filterMaxDay = () => {
    const limitDate = new Date();
    limitDate.setMonth(date.getMonth() + 1);
    return limitDate;
  };

  //Guardo la hora minima que seria en la que abrimos el local mas 30 minutos
  const minTime = addMinutes(
    parse(horariosDisponibles.desde, `HH:mm`, new Date()),
    30
  );
  //Guardo la hora maxima que sera en la que cerramos el local menos 30 minutos
  const maxTime = subMinutes(
    parse(horariosDisponibles.hasta, `HH:mm`, new Date()),
    30
  );

  //Funcion para que solo se vean las horas que son validas
  let handleColor = (time) => {
    if (time >= minTime && time <= maxTime) {
      return "";
    } else {
      return "d-none";
    }
  };

  //Funcion que solo sirve para desformatear la fecha para setear los valores en el form
  const parsearFecha = (customDate) => {
    return parseISO(customDate);
  };

  //Funcion para lo mismo pero con la hora
  const parsearHora = (customTime) => {
    const [hour, minute] = customTime.split(":");
    const horaParseada = setMinutes(setHours(new Date(), hour), minute);
    return horaParseada;
  };

  //Setear valores con formik
  const establecerDatos = async () => {
    if (formState.fecha && formState.hora) {
      const Fecha = (await parsearFecha(formState.fecha)) || "";
      const Hora = (await parsearHora(formState.hora)) || "";
      formik.setFieldValue("Fecha", Fecha);
      formik.setFieldValue("Hora", Hora);
      formik.setFieldValue("CantidadDeComensales", formState.comensales);
      formik.setFieldValue("FueUsada", formState.fueUsada);
    }
  };

  //UseEffect que sirve para establecer los datos
  useEffect(() => {
    establecerDatos();
  }, [formState._id]);

  /* FIN EDITAR RESERVA */

  return (
    <>
      <h2 className="text-center mt-5">{t("adminReservas")}</h2>
      <Container className="mb-5">
        <h2>{t("reservasDia")}</h2>
        {reservasToday?.length == 0 ? (
          sinReserva("Sin reservas para el día de hoy")
        ) : (
          <>
            <Table
              striped
              responsive
              className="mb-5"
              data-bs-theme={`${newTheme}`}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("hora")}</th>
                  <th>{t("apellidoynombre")}</th>
                  <th>{t("cantidad")}</th>
                  <th>{t("fueUsada")}</th>
                  <th>{t("acciones")}</th>
                </tr>
              </thead>
              <tbody>
                {reservasToday?.map((r, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{r.hora}</td>
                    <td>
                      {r.usuario.apellido
                        ? `${r.usuario.apellido}, ${r.usuario.nombre}`
                        : `${r.usuario.nombre}`}
                    </td>
                    <td>{r.comensales}</td>
                    <td>{fueUsada(r.fueUsada)}</td>
                    <td>
                      {!r.fueUsada && (
                        <Button
                          variant="success"
                          onClick={() => handleConfirm(r)}
                          className="mx-2"
                        >
                          <i className="bi bi-check2"></i>
                        </Button>
                      )}
                      {!isDoorman && (
                        <>
                          <Button
                            variant="danger"
                            onClick={() => handleEdit(r)}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(r)}
                            className="mx-2"
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
        {!isDoorman && (
          <>
            <Row className="my-3">
              <Col sm={9}>
                <h2>
                  {t("buscarReservas")}: {formState.date}
                </h2>
              </Col>
              <Col>
                <FormSearch
                  formState={formState}
                  funcionOnInputChange={onInputChange}
                />
              </Col>
            </Row>
            {reservaToShow.length == 0 ? (
              sinReserva(`Sin reserva para el día ${formState.date}`)
            ) : (
              <>
                <Table striped responsive data-bs-theme={`${newTheme}`}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>{t("hora")}</th>
                      <th>{t("apellidoynombre")}</th>
                      <th>{t("cantidad")}</th>
                      <th>{t("fueUsada")}</th>
                      <th>{t("acciones")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservaToShow?.map((r, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{r.hora}</td>
                        <td>
                          {r.usuario.apellido
                            ? `${r.usuario.apellido}, ${r.usuario.nombre}`
                            : `${r.usuario.nombre}`}
                        </td>
                        <td>{r.comensales}</td>
                        <td>{fueUsada(r.fueUsada)}</td>
                        <td>
                          {!r.fueUsada && (
                            <Button
                              variant="success"
                              onClick={() => handleConfirm(r)}
                              className="mx-2"
                            >
                              <i className="bi bi-check2"></i>
                            </Button>
                          )}
                          {!isDoorman && (
                            <>
                              <Button
                                variant="danger"
                                onClick={() => handleEdit(r)}
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => handleDelete(r)}
                                className="mx-2"
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </>
        )}
      </Container>
      {/* Modales para confirmar/eliminar/editar reservas */}
      <Modal
        show={ShowModalEdit}
        onHide={handleCloseModal}
        backdropClassName="custom-backdrop"
        className="modal-custom letra-custom"
        data-bs-theme={`${newTheme}`}
      >
        <Modal.Header closeButton className={`custom-${theme}`}>
          <Modal.Title>{t("modificarReserva")}</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={formik.handleSubmit}
          data-bs-theme={`${newTheme}`}
          noValidate
        >
          <Modal.Body className={`custom-${theme}`}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>{t("fecha")}:</Form.Label>
                  <DatePicker
                    selected={formik.values.Fecha}
                    onChange={(date) => formik.setFieldValue("Fecha", date)}
                    excludeDates={fechasNoDisponibles.map(
                      (fecha) => new Date(fecha)
                    )}
                    closeOnScroll={true}
                    locale={es}
                    dateFormat="yyyy/MM/dd"
                    minDate={filterMinDay()}
                    maxDate={filterMaxDay()}
                    placeholderText={t("eligeFecha")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.Fecha && formik.errors.Fecha,
                      },
                      {
                        "is-valid":
                          formik.touched.Fecha && !formik.errors.Fecha,
                      }
                    )}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>{t("hora")}:</Form.Label>
                  <DatePicker
                    selected={formik.values.Hora}
                    onChange={(hora) => formik.setFieldValue("Hora", hora)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Hora"
                    dateFormat="HH:mm"
                    locale={es}
                    minTime={minTime}
                    maxTime={maxTime}
                    timeClassName={handleColor}
                    //filterTime={filterTime}
                    placeholderText={t("eligeHora")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid": formik.touched.Hora && formik.errors.Hora,
                      },
                      {
                        "is-valid": formik.touched.Hora && !formik.errors.Hora,
                      }
                    )}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>{t("cantidadComensales")}:</Form.Label>
              <Form.Control
                type="number"
                placeholder={`${t("Ejemplo")}: 1`}
                min={1}
                max={horariosDisponibles.maximoComensales}
                id="CantidadDeComensales"
                {...formik.getFieldProps("CantidadDeComensales")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.CantidadDeComensales &&
                      formik.errors.CantidadDeComensales,
                  },
                  {
                    "is-valid":
                      formik.touched.CantidadDeComensales &&
                      !formik.errors.CantidadDeComensales,
                  }
                )}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>¿{t("fueUsada")}?</Form.Label>
                </Col>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    id="FueUsada"
                    placeholder="Seleccione una opcion"
                    {...formik.getFieldProps("FueUsada")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.FueUsada && formik.errors.FueUsada,
                      },
                      {
                        "is-valid":
                          formik.touched.FueUsada && !formik.errors.FueUsada,
                      }
                    )}
                  >
                    <option value="true">{t("si")}</option>
                    <option value="false">{t("no")}</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            {errores.length != 0 && (
              <Alert variant="warning">
                {errores.map((f) => (
                  <p key={f.index}>{f}</p>
                ))}
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer className={`custom-${theme}`}>
            <Button variant="secondary" onClick={handleCloseModal}>
              {t("cerrar")}
            </Button>
            <Button variant="sucess" type="submit">
              {t("Guardar")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* FIN Modales para confirmar/eliminar/editar reservas */}
    </>
  );
};
