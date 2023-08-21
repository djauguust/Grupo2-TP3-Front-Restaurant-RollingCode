import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import { format, getDay } from "date-fns";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./reserva.css";
import Image from "react-bootstrap/Image";
import axios from "axios";
import { parse } from "date-fns";
// import jwt from "jsonwebtoken";

const Reservas = () => {
  let date = new Date();

  //Token
  // const token = localStorage.getItem("token")
  // const decodeToken = jwt.decode(token)
  // const user = decodeToken.id


  

  //Estado de fecha seleccionada
  const [availableData, setAvailableData] = useState(null);

  //Get para solicitar si una fecha esta disponible o no
  useEffect(() => {
    if (availableData) {
      axios
        .get(` http://localhost:3000/reservas?date=${availableData}`)
        .then((response) => {
          console.log("Datos disponibles: ", response);
        })
        .catch((error) => {
          console.log("Error :", error);
        });
    }
  }, [availableData]);

  //Yup
  const validationSchema = Yup.object().shape({
    ReservationDate: Yup.date().required("Fecha es requerida"),

    ReservationTime: Yup.date().required("La hora es requerida")
    .test(
      "intervalos",
      "La hora debe ser entre las 11am y las 11pm",
      (value) => {
        console.log("Valor recibido en ReservationTime:", value);
  
        const hours = value.getHours();
        const minutes = value.getMinutes();
        console.log("Parsed Hours:", hours);
        console.log("Parsed Minutes:", minutes);
  
        return hours >= 11 && hours <= 23;
      }
    ),
    
    People: Yup.number()
      .required("La cantidad de personas es requerida")
      .max(10, "Maximo diez personas"),
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
    onSubmit: async (values) => {
      console.log("Valores que llegan al form de formik: ",values)

      try {
        // Guardar los datos editados
        const Reserva = {
          Fecha: fechaFormateada(values.ReservationDate),
          Hora: horaFormateada(values.ReservationTime),
          CantidadDePersonas: formik.values.People,
        };
        console.log("Val formateadod de fecha: ",Reserva.Fecha)
        console.log("Val formateadod de hora: ",Reserva.Hora)
        console.log("Val cant de personas: ",Reserva.CantidadDePersonas)

        const response = await axios.post("http://localhost:3000/reservas", {
          // reservaOF: userName,
          date: Reserva.Fecha,
          time: Reserva.Hora,
          people: Reserva.CantidadDePersonas,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  //Funcion para formatear fecha
  const fechaFormateada = (date) => {
    return format(date, "dd/MM/yyyy", {
      locale: es,
    });
  };

  //Funcion para formatear hora
  const horaFormateada = (time) => {
    return format(time, "HHmm", {
      locale: es,
    });
  };

  //Funcion para que los domingos esten deshabilitados
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0;
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
    return time.getHours() > 11 ? "" : "d-none";
  };

  return (
    <>
      <main className="reservation-main">
        <Container fluid className="reservation-container">
          <Row className="d-flex justify-content-between align-items-center pb-3">
            <Col>
              <Image
                src="https://trello.com/1/cards/64b73c636625809102489870/attachments/64e189b71cf6c64059cf2edc/previews/64e189b81cf6c64059cf2ef8/download/Texto_del_p%C3%A1rrafo__2_-removebg-preview_%281%29.png"
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
                    selected={formik.values.ReservationDate}
                    onChange={(date) => {
                      formik.setFieldValue("ReservationDate", date);
                      if (date) {
                        setAvailableData(fechaFormateada(date));
                      }
                    }}
                    minDate={filterMinDay()}
                    maxDate={filterMaxDay()}
                    dateFormat="dd/MM/yyyy"
                    filterDate={isWeekday}
                    placeholderText="Seleccione una fecha"
                    className={clsx("form-control input-reservation", {
                      "is-invalid":
                        formik.touched.ReservationDate &&
                        formik.errors.ReservationDate,
                    },{
                      "is-valid": formik.touched.ReservationDate &&
                      !formik.errors.ReservationDate,
                    })}
                  />
                  {formik.touched.ReservationDate &&
                    formik.errors.ReservationDate && (
                      <div >
                        <span role="alert" className="text-danger">
                          {formik.errors.ReservationDate}
                        </span>
                      </div>
                    )}
                </Form.Group>
              </Col>

              <Col xs={12} md={3} className="p-0">
                <Form.Group controlId="time">
                  <DatePicker
                    selected={formik.values.ReservationTime}
                    onChange={(time) =>
                      formik.setFieldValue("ReservationTime", time)
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    filterTime={filterTime}
                    placeholderText="00:00"
                    timeClassName={handleColor}
                    className={clsx("form-control input-reservation", {
                      "is-invalid":
                        formik.touched.ReservationTime &&
                        formik.errors.ReservationTime,
                    },{
                      "is-valid": formik.touched.ReservationTime &&
                      !formik.errors.ReservationTime,
                    })}
                  />
                  {formik.touched.ReservationTime &&
                    formik.errors.ReservationTime && (
                      <div>
                        <span role="alert" className="text-danger">
                          {formik.errors.ReservationTime}
                        </span>
                      </div>
                    )}
                </Form.Group>
              </Col>

              <Col xs={12} md={3} className="p-0">
                <Form.Group controlId="people">
                  <Form.Control
                    placeholder="N° de Personas"
                    onChange={(e) =>
                      formik.setFieldValue("People", e.target.value)
                    }
                    type="number"
                    min={1}
                    max={10}
                    className={clsx("form-control input-reservation", {
                      "is-invalid":
                        formik.touched.People && formik.errors.People,
                    },{
                      "is-valid": formik.touched.People &&
                      !formik.errors.People,
                    })}
                  />
                  {formik.touched.People && formik.errors.People && (
                    <div >
                      <span role="alert" className="text-danger">
                          {formik.errors.People}
                        </span>
                      
                    </div>
                  )}
                </Form.Group>
              </Col>

              <Col xs={12} md={3} className="p-0">
                <Button
                  className="reservation-boton"
                  variant="primary"
                  type="submit"
                >
                  Reservar
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </main>
    </>
  );
};

export default Reservas;
