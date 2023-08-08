import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useFormik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Reservas = () => {
  let day = new Date();
  const [startDate, setStartDate] = useState(day);
  const handleDate = (date) => {
    setStartDate(date);
  };


  const initialValues = {
    time: "",
    date: day,
    people: "",
  };

  // const validationSchema = Yup.object().shape({
  //   time: Yup.string().required("La hora es requerida"),
  //   date: Yup.date().required("La fecha es requerida"),
  //   people: Yup.number()
  //     .typeError("La cantidad de personas debe ser un número")
  //     .required("La cantidad de personas es requerida")
  //     .positive("La cantidad de personas debe ser mayor a cero"),
  // });

  const handleSubmit = (values) => {
    // Aquí puedes realizar alguna acción con los datos del formulario
    console.log("Hora:", values.time);
    console.log("Fecha:", startDate);
    console.log("Cantidad de personas:", values.people);
  };

  const formik = useFormik({
    initialValues: { initialValues },
    // validationSchema: { validationSchema },
    onSubmit: handleSubmit,
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
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="time">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    type="time"
                    onChange={formik.handleChange}
                    min="00:00"
                    max="06:00"
                  />
                </Form.Group>

                <Form.Group controlId="date">
                  <Form.Label>Fecha</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDate}
                    minDate={day}
                    dateFormat='dd/MM/yyyy'
                    filterDate={date=>date.getDay()!==1}
                  />
                </Form.Group>

                <Form.Group controlId="people">
                  <Form.Label>Cantidad de personas</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={formik.handleChange}
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
