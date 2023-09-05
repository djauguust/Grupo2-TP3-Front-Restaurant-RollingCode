import axios from "axios";
import "./Administracion.css";
import React, { useEffect, useState } from "react";
import { Badge, Button, Container, Modal, Table } from "react-bootstrap";
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

  /* Funcion para mostrar parcialmente el mensaje */
  const recortarMensaje = (c, m) => {
    //c:contenido,m:mensaje
    let corteDeMensaje = 30;
    if (c.length < corteDeMensaje) {
      return <>{c}</>;
    }
    if (c.length >= corteDeMensaje) {
      return (
        <>
          <Button variant="success" onClick={() => handleRead(m)}>
            <i className="bi bi-chat-dots-fill"></i>
          </Button>
        </>
      );
    }
  };
  const [ShowModal, setShowModal] = useState(false);
  const [messageToShow, setMessageToShow] = useState("");
  const handleRead = (m) => {
    setMessageToShow(m);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  /* FIN Funcion para mostrar parcialmente el mensaje */

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
                  {!r.leido && (
                    <p>
                      <Badge bg="success">¡NUEVO!</Badge>
                    </p>
                  )}
                </td>
                <td>{fechaDelDate(r.date)}</td>
                <td>{r.nombre}</td>
                <td>{r.email}</td>
                <td>{recortarMensaje(r.mensaje, r)}</td>
                <td>
                  {!r.leido && (
                    <Button
                      variant="success"
                      className="me-2 mb-2"
                      onClick={() => handleConfirm(r)}
                    >
                      <i className="bi bi-check2"></i>
                    </Button>
                  )}

                  <Button
                    variant="danger"
                    className="mb-2"
                    onClick={() => handleDelete(r)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Modal
        show={ShowModal}
        onHide={handleCloseModal}
        backdropClassName="custom-backdrop"
        className="modal-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>Mensaje recibido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped responsive className="my-3">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>E-mail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{fechaDelDate(messageToShow.date)}</td>
                <td>{messageToShow.nombre}</td>
                <td>{messageToShow.email}</td>
              </tr>
            </tbody>
          </Table>
          Mensaje: <h2>{messageToShow.mensaje}</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
