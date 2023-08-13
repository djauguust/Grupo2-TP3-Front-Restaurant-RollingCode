import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./reserva.css";
import Image from "react-bootstrap/Image";
import Card from 'react-bootstrap/Card';
import axios from "axios";

const Reservas = () => {
  // Calendario
  let date = new Date();
  const [startDate, setStartDate] = useState(date);
  const handleDate = (date) => {
    setStartDate(date);
  };

  const convertDate = (date) => {
    const isoDateString = date.toISOString();
    const dateOnly = isoDateString.split("T")[0]; // Obtener la parte de la fecha
    return dateOnly;
  };
  const filterMinDay = () => {
    const nextDay = new Date();
    nextDay.setDate(date.getDate() + 1);
    return nextDay;
  };
  const filterMaxDay = () => {
    const limitDate = new Date();
    limitDate.setMonth(date.getMonth() + 1);
    return limitDate;
  };

  //Hora
  const [startTime, setStartTime] = useState(date);
  const handleTime = (time) => {
    setStartTime(time);
  };
  // console.log(startTime);
  const convertToNumericTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return hours * 100 + minutes;
  };
  const filterTime = (time) => {
    const hours = new Date(time).getHours();
    return hours >= 7 && hours <= 22;
  };

  //Formik y yup
  const initialValues = {
    people: "",
  };

  //Post a db
  const sendForm = async (values) => {
    try {
      const formattedDate = convertDate(startDate);
      const formattedTime = convertToNumericTime(startTime);

      const response = await axios.post("http://localhost:3000/reservas", {
        time: formattedTime,
        date: formattedDate,
        people: values.people,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues,
    validateOnChange: true,
    validateOnBlur: true,

    validationSchema: Yup.object({
      people: Yup.number()
        .typeError("La cantidad de personas debe ser un número")
        .required("La cantidad de personas es requerida")
        .positive("La cantidad de personas debe ser mayor a cero"),
    }),

    onSubmit: sendForm,
  });

  return (
    <>
      <main className="reservation-main">
        <Container className="reservation-container">
          <div className="small-box">
            <Row>
              <Col xs={6} md={4}>
                <Image
                  style={{ width: "60xp", height: "60px" }}
                  src="https://trello.com/1/cards/64b73c636625809102489870/attachments/64c047b08259f586953a21f3/download/logo_nuevo.png"
                  rounded
                />
                <Card.Link href="#">Registrarse</Card.Link>
              </Col>
            </Row>

            <Row>
              <Form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100px",
                }}
              >
                <Col md={4}>
                  <Form.Group controlId="people">
                    <Form.Control
                      className="inputReservation"
                      placeholder="N° de Personas"
                      type="number"
                      onChange={handleChange}
                      value={values.people}
                      required
                      min={1}
                      max={10}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="date">
                    <DatePicker
                      className="inputReservation"
                      selected={startDate}
                      onChange={handleDate}
                      minDate={filterMinDay()}
                      maxDate={filterMaxDay()}
                      dateFormat="dd/MM/yyyy"
                      filterDate={(date) => date.getDay() !== 1}
                      // value={values.date}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="time">
                    <DatePicker
                      className="inputReservation"
                      selected={startTime}
                      onChange={handleTime}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      filterTime={filterTime}
                      value={values.time}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    className="inputReservation m-3"
                  >
                    Reserva
                  </Button>
                </Col>
              </Form>
            </Row>
          </div>
        </Container>
      </main>
    </>
  );
};
export default Reservas;
