import { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { addMinutes, format, parse, subMinutes } from "date-fns";
import es from "date-fns/locale/es";
import { useTranslation } from "react-i18next";
import { UsuariosContext } from "../../context/UserContext";
import { ReservasContexto } from "../../context/ReservasContexto";
import "../../styles/reserva.css";
import toast from "react-hot-toast";

const Reservas = () => {
  const { t } = useTranslation();
  let date = new Date();
  const Url = import.meta.env.VITE_API;

  const { Token } = useContext(UsuariosContext);
  const {
    traerFechasNoDisponibles,
    fechasNoDisponibles,
    traerHorasDisponibles,
    horariosDisponibles,
  } = useContext(ReservasContexto);

  const TokenPuro = localStorage.getItem("user");

  //Estado de fecha seleccionada
  const [dates, setDates] = useState(null);
  //Estado tiempo seleccionado
  const [time, setTime] = useState(null);

  //Estado para deshabilitar inputs
  const [enableDate, setEnableDate] = useState(false);
  //Estado para deshabilitar inputs
  const [diseablePeople, setDiseablePeople] = useState(false);

  //useEffect para traer las fechas no disponibles
  useEffect(() => {
    traerFechasNoDisponibles();
  }, []);

  //useEffect para traer el horario disponible
  useEffect(() => {
    traerHorasDisponibles();
  }, []);

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

  //Funcion para resetear valores de inputs cuando cambio la fecha
  const resetInputsFromDate = (date) => {
    setTime(null);
    formik.setFieldValue("ReservationTime", ""); // Limpio input de tiempo
    formik.setFieldValue("People", ""); // Limpio input de personas
    formik.touched.ReservationTime = false;
    formik.touched.People = false;
  };

  //Funcion para resetear valores de input people
  const resetInputsFromTime = (date) => {
    formik.setFieldValue("People", ""); // Limpio input de personas
    formik.touched.People = false;
  };

  //Yup
  const validationSchema = Yup.object().shape({
    ReservationDate: Yup.date().required("Fecha es requerida"),

    ReservationTime: Yup.date().required("La hora es requerida"),

    People: Yup.number()
      .required("La cantidad de personas es requerida")
      .min(1, "Debes elegir al menos 1 persona")
      .max(
        horariosDisponibles.maximoComensales,
        "La cantidad ingresada supera a la cantidad de comensales"
      ),
  });

  //Initial Values
  const initialValues = {
    ReservationDate: null,
    ReservationTime: "",
    People: "",
  };

  //Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,

    //Submit
    onSubmit: async (values, { resetForm }) => {
      try {
        const Reserva = {
          Fecha: fechaFormateada(values.ReservationDate),
          Hora: horaFormateada(values.ReservationTime),
          CantidadDePersonas: parseInt(formik.values.People),
        };

        //Get para saber si el usuario ya realizo 2 reservas

        let userReservation = [];

        try {
          const reservationByUser = await axios.get(
            `${Url}/reservasByUsuario/${Token.id}`,
            {
              headers: {
                "auth-token": TokenPuro.replace(/^"(.*)"$/, "$1"),
              },
            }
          );
          userReservation = reservationByUser.data;
        } catch (error) {
          toast.error(error.response.data.message, {
            style: {
              border: "1px solid #B08D59",
              color: "#B08D59",
            },
            iconTheme: {
              primary: "#B08D59",
              secondary: "#FFFAEE",
            },
          })
        }

        if (userReservation.length >= 2) {
          Swal.fire("Error", t("UsuarioRealizoDosReservas"), "error");
          return;
        }

        //Swal fire para confirmacion de reserva
        const result = await Swal.fire({
          title: t("EstasPorRealizarUnaReserva"),
          text: t("EstasSeguro"),
          icon: "warning",
          position: "top",
          showCancelButton: true,
          confirmButtonColor: "#B08D59",
          cancelButtonColor: "#d33",
          confirmButtonText: t("SiEstoySeguro"),
          cancelButtonText: t("NoMejorNo"),
        });
        //Post a db
        if (result.isConfirmed) {
          const response = await axios.post(
            `${Url}/reservas`,
            {
              fecha: Reserva.Fecha,
              hora: Reserva.Hora,
              comensales: Reserva.CantidadDePersonas,
              usuario: Token.id,
              comensalesInicial: 0,
              maximoComensales: horariosDisponibles.maximoComensales,
            },
            {
              headers: {
                "auth-token": TokenPuro.replace(/^"(.*)"$/, "$1"),
              },
            }
          );

          Swal.fire(t("ReservaGuardada"), t("ReservaExitosa"), "success");

          resetForm();
        } else {
          Swal.fire(t("ReservaCancelada"), t("ReservaNoGuardada"), "info");
          resetForm();
        }
      } catch (error) {
        Swal.fire("Error", `${t(error.response.data.message)} ${error.response.data.cantidadDisponible}` );
      }
    },
  });

  //Funcion para formatear fecha
  const fechaFormateada = (date) => {
    return format(date, "yyyy-MM-dd", {
      locale: es,
    });
  };

  //Funcion para formatear hora
  const horaFormateada = (time) => {
    return format(time, "HH:mm", {
      locale: es,
    });
  };

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

  //Funcion para deshabilitar horas
  const filterTime = (time) => {
    const hours = new Date(time).getHours();
    return hours > 11 && hours <= 23;
  };

  //Funcion para que solo se vean las horas que son validas
  let handleColor = (time) => {
    if (time >= minTime && time <= maxTime) {
      return "";
    } else {
      return "d-none";
    }
  };

  return (
    <>
      <section className="reservation-main">
        <article>
          <Container fluid className="reservation-container">
            <Row className="d-flex justify-content-between align-items-center pb-3">
              <Col>
                <Image
                  src="https://live.staticflickr.com/65535/53172154974_d7af7b89f9_o.png"
                  alt="Logo del Restaurante"
                  rounded
                  width={80}
                  height={80}
                />
              </Col>
            </Row>

            <Form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Row>
                <Col xs={12} md={3} className="p-0">
                  <Form.Group controlId="date">
                    <DatePicker
                      onFocus={(e) => e.target.blur()}
                      selected={formik.values.ReservationDate}
                      onChange={(date) => {
                        formik.setFieldValue("ReservationDate", date);

                        if (date) {
                          setEnableDate(true);
                          setDates(fechaFormateada(date));
                          resetInputsFromDate();
                        }
                      }}
                      excludeDates={fechasNoDisponibles.map(
                        (fecha) => new Date(fecha)
                      )}
                      minDate={filterMinDay()}
                      maxDate={filterMaxDay()}
                      dateFormat="dd/MM/yyyy"
                      placeholderText={t("eligeFecha")}
                      className={clsx(
                        "form-control input-reservation",
                        {
                          "is-invalid":
                            formik.touched.ReservationDate &&
                            formik.errors.ReservationDate,
                        },
                        {
                          "is-valid":
                            formik.touched.ReservationDate &&
                            !formik.errors.ReservationDate,
                        }
                      )}
                    />
                    {formik.touched.ReservationDate &&
                      formik.errors.ReservationDate && (
                        <div className="text-center">
                          <span role="alert" className="text-danger text-span">
                            {formik.errors.ReservationDate}
                          </span>
                        </div>
                      )}
                  </Form.Group>
                </Col>

                <Col xs={12} md={3} className="p-0">
                  <Form.Group controlId="time">
                    <DatePicker
                      onFocus={(e) => e.target.blur()}
                      selected={formik.values.ReservationTime}
                      onChange={(time) => {
                        formik.setFieldValue("ReservationTime", time);
                        if (time) {
                          resetInputsFromTime();
                          setDiseablePeople(true);
                          setTime(horaFormateada(time));
                        }
                      }}
                      disabled={!enableDate}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      minTime={minTime}
                      maxTime={maxTime}
                      placeholderText={t("eligeHora")}
                      timeClassName={handleColor}
                      className={clsx(
                        "form-control input-reservation",
                        {
                          "is-invalid":
                            formik.touched.ReservationTime &&
                            formik.errors.ReservationTime,
                        },
                        {
                          "is-valid":
                            formik.touched.ReservationTime &&
                            !formik.errors.ReservationTime,
                        }
                      )}
                    />
                    {formik.touched.ReservationTime &&
                      formik.errors.ReservationTime && (
                        <div className="text-center">
                          <span role="alert" className="text-danger text-span">
                            {formik.errors.ReservationTime}
                          </span>
                        </div>
                      )}
                  </Form.Group>
                </Col>

                <Col xs={12} md={3} className="p-0">
                  <Form.Group controlId="people">
                    <Form.Control
                      placeholder={t("numeroPersonas")}
                      onChange={(e) => {
                        formik.setFieldValue("People", e.target.value);
                      }}
                      disabled={!diseablePeople || !time}
                      type="number"
                      min={1}
                      max={horariosDisponibles.maximoComensales}
                      value={formik.values.People}
                      className={clsx(
                        "form-control input-reservation",
                        {
                          "is-invalid":
                            formik.touched.People && formik.errors.People,
                        },
                        {
                          "is-valid":
                            formik.touched.People && !formik.errors.People,
                        }
                      )}
                    />
                    {formik.touched.People && formik.errors.People && (
                      <div className="text-center">
                        <span role="alert" className="text-danger text-span">
                          {formik.errors.People}
                        </span>
                      </div>
                    )}
                  </Form.Group>
                </Col>

                <Col xs={12} md={3} className="p-0 d-flex align-items-center">
                  <Button
                    className="reservation-boton"
                    variant="primary"
                    type="submit"
                  >
                    {t("reservar")}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </article>
      </section>
    </>
  );
};

export default Reservas;
