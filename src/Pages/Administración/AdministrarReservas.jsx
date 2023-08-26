import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { FormSearch } from "./components/FormSearch";
import { useForm } from "./hooks/useForm";
import Swal from "sweetalert2";
import axios from "axios";

export const AdministrarReservas = ({ isDoorman = false }) => {
  const { formState, onInputChange } = useForm({ date: "" });

  /* UseEffect que busque reservas cada vez que cambia formState.date */

  /* Backend */
  const url = import.meta.env.VITE_API;

  const [actualizador, setActualizador] = useState(false);
  const actualizar = () => {
    setActualizador(!actualizador);
  };

  const today = new Date();
  const mesComoString = () => {
    let aux = today.getMonth() + 1;
    if (aux < 10) {
      return `0${aux}`;
    } else {
      return `${aux}`;
    }
  };
  const today2 = `${today.getFullYear()}-${mesComoString()}-${today.getDate()}`;
  const [reservasToday, setReservasToday] = useState(null);

  useEffect(() => {
    console.log("hola");
    axios
      .get(`${url}/reservas/${today2}`)
      .then(({ data }) => {
        console.log(data);
        setReservasToday(data);
      })
      .catch((error) => console.log(error));
  }, [actualizador]);

  /* FIN Backend */

  const handleDelete = () => {
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
        /* Elimina la reserva */
      }
    });
  };

  const handleConfirm = () => {
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
        /* Confirma la reserva */
      }
    });
  };
  console.log(reservasToday);
  return (
    <>
      <h2 className="text-center mt-5">Administrar Reservas</h2>
      <Container>
        <h2>Reservas del día</h2>
        <Table striped responsive className="mb-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Hora</th>
              <th>Apellido y Nombre</th>
              <th>Cantidad</th>
              <th>Fue usada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservasToday?.map((r, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{r.hora}</td>
                <td>{r.usuario}</td>
                <td>{r.comensales}</td>
                <td>{`${r.fueUsada}`}</td>
                <td>
                  <Button variant="success" onClick={handleConfirm}>
                    <i className="bi bi-check2"></i>
                  </Button>
                  {!isDoorman && (
                    <>
                      <Button variant="danger">
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button variant="danger" onClick={handleDelete}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row>
          <Col sm={9}>
            <h2>Buscar reservas por día: {formState.date}</h2>
          </Col>
          <Col>
            <FormSearch
              formState={formState}
              funcionOnInputChange={onInputChange}
            />
          </Col>
        </Row>
        <Table striped responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Hora</th>
              <th>Apellido y Nombre</th>
              <th>Cantidad</th>
              <th>Fue usada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
                <Button variant="success">
                  <i className="bi bi-check2"></i>
                </Button>
                {!isDoorman && (
                  <>
                    <Button variant="danger">
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                      <i className="bi bi-trash"></i>
                    </Button>
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      {/* Modales para confirmar/eliminar/editar reservas */}
      Swal.fire( "Usuario logueado con exito", "Tus datos ya fueron ingresados
      exitosamente", "success" );
      {/* FIN Modales para confirmar/eliminar/editar reservas */}
    </>
  );
};
