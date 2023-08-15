import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./reserva.css";
import Image from "react-bootstrap/Image";
import axios from "axios";
import Card from "react-bootstrap/Card";

const Reservas = () => {
  //Context
  // const {isSignUp, usuarios} = useContext()

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
  const [startTime, setStartTime] = useState(null);
  const handleTime = (time) => {
    setStartTime(time);
  };
  const convertToNumericTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return hours * 100 + minutes;
  };
  const filterTime = (time) => {
    const hours = new Date(time).getHours();
    return hours >= 7 && hours <= 22;
  };

  //Funcion para actualizar num de reservas
  const updateReservation = (user)=>{

  }

  //Formik y yup
  const initialValues = {
    people: "",
  };

  //Get y Post a db
  const sendForm = async (values) => {
    try {
      const formattedDate = convertDate(startDate);
      const formattedTime = convertToNumericTime(startTime);


      //const userReservation = user.reservations
      //if(userReservation >=2){
      //   alert(`Has alcanzado el limite de reservas`)
      //   return
      // }

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
        <Container fluid className="reservation-container">
            <Row className="d-flex justify-content-between align-items-center pb-3">
              <Col xs={6} md={4}>
                <Image
                  src="https://trello.com/1/cards/64b73c636625809102489870/attachments/64c047b08259f586953a21f3/download/logo_nuevo.png"
                  rounded
                  width={60}
                  height={60}

                />
              </Col>
              <Col xs={6} md={4} className="text-right">
                <Card.Link href="#">Iniciar Sesion</Card.Link>
              </Col>
            </Row>
            
              <Form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width:"100%"
                }}
              >
                <Row>
                <Col  xs={12} md={3} className="p-0">
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

                <Col  xs={12} md={3} className="p-0">
                  <Form.Group controlId="date">
                    <DatePicker
                      className="inputReservation"
                      selected={filterMinDay()}
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

                <Col  xs={12} md={3} className="p-0">
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
                      placeholderText="00:00"
                    />
                  </Form.Group>
                </Col>
                <Col  xs={12} md={3} className="p-0">
                  <Button
                    variant="primary"
                    type="submit"
                    className="inputReservation"
                  >
                    Reserva
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
