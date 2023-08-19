import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useFormik} from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import { format, getDay} from "date-fns";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./reserva.css";
import Image from "react-bootstrap/Image";
import axios from "axios";

const Reservas = () => {
  let date = new Date();

  //Token
  const token = localStorage.getItem("token")
  // const decodeToken =  

  //Estado de fecha seleccionada
  const [availableData, setAvailableData] = useState(null);

  //Get para solicitar si una fecha esta disponible o no
  useEffect(()=>{
    if(availableData){
      axios.get(` http://localhost:3000/reservas?date=${availableData}`)
      .then(response =>{
        console.log("Datos disponibles: ",response)
      })
      .catch(error =>{
        console.log("Error :", error)
      })
    }

  },[availableData])

  //Yup
  const eschema = Yup.object().shape({
    ReservationDate: Yup.date().required("Fecha es requerida"),

    ReservationTime: Yup.string().required("La hora es requerida"),

    People: Yup.string().required("La cantidad de personas es requerida"),
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
    eschema,
    validateOnChange: true,
    validateOnBlur: true,

    //Submit
    onSubmit: async (values) => {
      try {
        // Guardar los datos editados
        const Reserva = {
          Fecha: fechaFormateada(values.ReservationDate),
          Hora: horaFormateada(values.ReservationTime),
          CantidadDePersonas: formik.values.People,
        };

        const response = await axios.post("http://localhost:3000/reservas", {
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
  const fechaFormateada = (date)=>{
    return format(date, "dd/MM/yyyy",{
      locale:es,
    })
  }

  //Funcion para formatear hora
  const horaFormateada = (time)=>{
    return format(time, "HH:mm",{
      locale:es,
    })
  }

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
    return hours >= 7 && hours <= 22;
  };

  return (
    <>
      <main className="reservation-main">
        <Container fluid className="reservation-container">
          <Row className="d-flex justify-content-between align-items-center pb-3">
            <Col>
              <Image
                src="https://trello.com/1/cards/64b73c636625809102489870/attachments/64dfc537d5a51cfa5a6d7733/download/logo.png"
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
                    className="input-reservation"
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
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={3} className="p-0">
                <Form.Group controlId="time">
                  <DatePicker
                    className="input-reservation"
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
                    required
                    placeholderText="00:00"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={3} className="p-0">
                <Form.Group controlId="people">
                  <Form.Control
                    className="input-reservation"
                    placeholder="N° de Personas"
                    onChange={(e) =>
                      formik.setFieldValue("People", e.target.value)
                    }
                    type="number"
                    required
                    min={1}
                    max={10}
                  />
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
