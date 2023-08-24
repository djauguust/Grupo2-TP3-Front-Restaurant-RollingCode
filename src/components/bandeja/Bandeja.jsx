import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bandeja.css";
import { ListGroup, Button, Modal } from "react-bootstrap";

const Bandeja = () => {
  const [mensajes, setMensajes] = useState([]);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);

  useEffect(() => {
    getMensajes();
  }, []);

  const getMensajes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/mensajes");
      setMensajes(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error al obtener mensajes:", error);
    }
  };

  const openModal = (message) => {
    setMensajeSeleccionado(message);
  };

  const closeModal = () => {
    setMensajeSeleccionado(null);
  };

  return (
    <>
      <div className="asd">
        <h3 className="mt-4 text-center">Bandeja de entrada</h3>
        <ul className="lista-msj">
          <ListGroup className="lista-mensajes">
            {mensajes.map((mensaje) => (
              <ListGroup.Item
                key={mensaje.id}
                className="mensaje-recibido d-flex justify-content-between"
              >
                {mensaje.hora} | Usuario: {mensaje.nombre} | Email:{" "}
                {mensaje.email}
                <div>
                  <Button variant="success" onClick={() => openModal(mensaje)}>
                    Ver mensaje
                  </Button>
                  <Button variant="danger">Eliminar mensaje</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ul>
      </div>
      <Modal
        show={mensajeSeleccionado !== null}
        onHide={closeModal}
        backdropClassName="custom-backdrop"
      >
        <Modal.Header closeButton>
          <Modal.Body>
            {"Mensaje de: "}
            {mensajeSeleccionado !== null ? mensajeSeleccionado.nombre : ""}
          </Modal.Body>
        </Modal.Header>
        <Modal.Body>
          {mensajeSeleccionado !== null ? mensajeSeleccionado.mensaje : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Bandeja;
