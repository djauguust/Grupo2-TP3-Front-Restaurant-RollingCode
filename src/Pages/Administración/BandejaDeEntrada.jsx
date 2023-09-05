import axios from "axios";
import "./Administracion.css";
import React, { useEffect, useState } from "react";
import { Badge, Button, Container, Table } from "react-bootstrap";
import Swal from "sweetalert2";

export const BandejaDeEntrada = () => {
  const fechaDelDate = (d) => {
    if (d) {
      let fecha = d.split("-");

      return `${fecha[0]}-${fecha[1]}-${fecha[2].split("T")[0]}`;
    }
  };

  const [mensajesBackend, setMensajesBackend] = useState([]);

  /* Backend */
  const url = import.meta.env.VITE_API;

  const [actualizador, setActualizador] = useState(false);
  const actualizar = () => {
    setActualizador(!actualizador);
  };

  useEffect(() => {
    axios
      .get(`${url}/mensajes/`)
      .then(({ data }) => {
        setMensajesBackend(data);
      })
      .catch((error) => console.log(error));
  }, [actualizador]);
  /* FIN Backend */

  /* Handle confirm and delete */
  const handleConfirm = (mensaje) => {
    Swal.fire({
      title: "¿Marcar el mensaje como leído?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let aux = { leido: true };
        axios
          .put(`${url}/mensajes/${mensaje._id}`, aux)
          .then(({ data }) => {
            actualizar();
          })
          .catch((error) => console.log(error));
      }
    });
  };
  const handleDelete = (mensaje) => {
    Swal.fire({
      title: "¿Eliminar mensaje?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${url}/mensajes/${mensaje._id}`)
          .then(({ data }) => {
            actualizar();
          })
          .catch((error) => console.log(error));
      }
    });
  };
  /* FIN Handle confirm and delete */

  /* TO DO FUNCIÓN PARA MOSTRAR LOS NUEVOS ARRIBA */
  return (
    <>
      <Container>
        <h2 className="text-center mt-5">Mensajes recibidos</h2>

        <Table striped responsive className="my-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>E-mail</th>
              <th>Mensaje</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mensajesBackend?.map((r, index) => (
              <tr key={index}>
                <td className="text-center">
                  {index + 1}
                  {!r.leido && <Badge bg="success">¡NUEVO!</Badge>}
                </td>
                <td>{fechaDelDate(r.date)}</td>
                <td>{r.nombre}</td>
                <td>{r.email}</td>
                <td className="text-break">{r.mensaje}</td>
                <td>
                  {!r.leido && (
                    <Button
                      variant="success"
                      onClick={() => handleConfirm(r)}
                      className="btn-visto"
                    >
                      <i className="bi bi-check2"></i>
                    </Button>
                  )}

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(r)}
                    className="btn-borrar"
                  >
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
