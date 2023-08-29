import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useForm } from "./hooks/useForm";
import axios from "axios";

export const AdministrarRestaurant = () => {
  const initialForm = {
    nombre: "",
    maximoComensales: 0,
    fechasNoDisponibles: [{ fecha: "", admin: "" }],
    horario: { desde: 0, hasta: 2359 },
    reservasMaxima: 0,
    tiempoMaximoReserva: 0,
  };

  const { formState, setFormState, onInputChange } = useForm(initialForm);

  const handleSubmit = () => {};
  const handleDelete = () => {};

  /* Backend */
  const url = import.meta.env.VITE_API;
  const [restaurant, setRestaurant] = useState();

  const [actualizador, setActualizador] = useState(false);
  const actualizar = () => {
    setActualizador(!actualizador);
  };

  useEffect(() => {
    axios
      .get(`${url}/restaurant/`)
      .then(({ data }) => {
        setRestaurant(data[0]);
        data[0] = {
          ...data[0],
          horario: {
            desde: numberToHour(data[0].horario.desde),
            hasta: numberToHour(data[0].horario.hasta),
          },
        };
        setFormState(data[0]);
      })
      .catch((error) => console.log(error));
  }, [actualizador]);
  /* FIN Backend */

  const numberToHour = (h) => {
    let aux = `${h}`.split("");
    return `${aux[0]}${aux[1]}:${aux[2]}${aux[3]}`;
  };

  return (
    <>
      <Container>
        <h2 className="text-center mt-5">Administrar Restaurante</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Nombre del Restaurant:</Form.Label>
            <Form.Control
              type="text"
              value={formState.nombre}
              onChange={onInputChange}
              name="nombre"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Cantidad máxima de comensales:</Form.Label>
            <Form.Control
              type="text"
              value={formState.maximoComensales}
              onChange={onInputChange}
              name="maximoComensales"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Horarios del Restaurant:</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="time"
                  value={formState.horario.desde}
                  onChange={onInputChange}
                  name="desde"
                  disabled
                />
              </Col>
              a
              <Col>
                <Form.Control
                  type="time"
                  value={formState.horario.hasta}
                  onChange={onInputChange}
                  name="hasta"
                  disabled
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Cantidad máxima de reservas por Usuario:</Form.Label>
            <Form.Control
              type="text"
              value={formState.reservasMaxima}
              onChange={onInputChange}
              name="reservasMaxima"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Tiempo máximo de cada turno: (en horas)</Form.Label>
            <Form.Control
              type="text"
              value={formState.tiempoMaximoReserva}
              onChange={onInputChange}
              name="tiempoMaximoReserva"
              disabled
            />
          </Form.Group>
        </Form>
        <h5 className="mt-3">Fechas NO disponibles para hacer reservas</h5>
        <Table striped responsive className="mb-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Admin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {formState?.fechasNoDisponibles.map((f, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{f.fecha}</td>
                <td>{f.admin}</td>
                <td>
                  <Button variant="danger" onClick={handleDelete}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
