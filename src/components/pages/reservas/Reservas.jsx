import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

function Reservas() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <main
        style={{
          width: "100%",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container>
          <Row>
            <Col>
              <Image src="holder.js/171x180" thumbnail />
            </Col>
          </Row>

          <Row>
            <Col>
              <h1>Reserva tu mesa</h1>
            </Col>
            <Col>
              <button>Registrate!</button>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Select>
                  <option>1 Persona</option>
                  <option>2 Personas</option>
                  <option>3 Personas</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                }}
              />
            </Col>
            <Col>
             <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default Reservas;
