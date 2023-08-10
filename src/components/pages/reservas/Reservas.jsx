import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Reservas = () => {
  // Calendario
  let day = new Date();
  const [startDate, setStartDate] = useState(day);
  const handleDate = (date) => {
    setStartDate(date);
  };
  const filterMinDay = () => {
    const nextDay = new Date();
    nextDay.setDate(day.getDate() + 1);
    return nextDay;
  };

  //Hora
  const [startTime, setStartTime] = useState(day);
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

  //Formik
  const initialValues = {
    time: convertToNumericTime(startTime),
    date: startDate,
    people: "",
  };

  const sendForm = (values) => {
    console.log("Hora:", convertToNumericTime(startTime));
    console.log("Fecha:", startDate);
    console.log("Cantidad de personas:", values.people);
  };

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues,
    validateOnChange: true,
    validateOnBlur: true,

    validationSchema: Yup.object({
      time: Yup.number().required("La hora es requerida"),
      date: Yup.date().required("La fecha es requerida"),
      people: Yup.number()
        .typeError("La cantidad de personas debe ser un número")
        .required("La cantidad de personas es requerida")
        .positive("La cantidad de personas debe ser mayor a cero"),
    }),

    onSubmit: sendForm,
  });

  return (
    <>
      <main
        style={{
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="time">
                  <Form.Label>Hora</Form.Label>
                  <DatePicker
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

                <Form.Group controlId="date">
                  <Form.Label>Fecha</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDate}
                    minDate={filterMinDay()}
                    dateFormat="dd/MM/yyyy"
                    filterDate={(date) => date.getDay() !== 1}
                    value={values.date}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="people">
                  <Form.Label>Cantidad de personas</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={handleChange}
                    value={values.people}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};
export default Reservas;
