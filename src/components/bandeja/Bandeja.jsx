import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bandeja.css";
import { ListGroup, Button, Modal, Form } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Swal from 'sweetalert2';


const Bandeja = () => {
  const [mensajes, setMensajes] = useState([]);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);

  useEffect(() => {
    getMensajes();
  }, []);

  const getMensajes = async () => {
    try {
      const response = await axios.get(
        "https://rollingcode-comision46i-tp3-grupo2.onrender.com/api/mensajes"
      );
      setMensajes(response.data);
      
    } catch (error) {
      
    }
  };

  const eliminarMensaje = async (mensaje) => {
    try {
      await axios.delete(`https://rollingcode-comision46i-tp3-grupo2.onrender.com/api/mensajes/${mensaje._id}`);
      const updatedMensajes = mensajes.filter((m) => m._id !== mensaje._id);
      setMensajes(updatedMensajes);
  
      Swal.fire({
        icon: 'success',
        title: 'El mensaje ha sido eliminado',
        showConfirmButton: false,
        timer: 1500
      });
  
      if (mensajeSeleccionado && mensajeSeleccionado._id === mensaje._id) {
        closeModal();
      }
    } catch (error) {
      
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
        <h3 className="text-center titulo-bandeja">Bandeja de entrada</h3>

        {mensajes.length === 0 ? (
          <Alert variant="danger" className="text-center">
            No hay mensajes en la bandeja de entrada.
          </Alert>
        ) : (
          <ul className="lista-msj">
            <ListGroup className="lista-mensajes">
              {mensajes.map((mensaje) => (
                <ListGroup.Item
                  key={mensaje.id}
                  className="mensaje-recibido d-flex justify-content-between"
                >
                  {" "}
                  {mensaje.date} | Usuario: {mensaje.nombre} | Email:{" "}
                  {mensaje.email}
                  <div>
                    <Button
                      variant="success"
                      onClick={() => openModal(mensaje)}
                    >
                      Ver mensaje
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => eliminarMensaje(mensaje)}
                    >
                      Eliminar mensaje
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ul>
        )}
      </div>
      <Modal
        show={mensajeSeleccionado !== null}
        onHide={closeModal}
        backdropClassName="custom-backdrop"
        className="modal-custom"
    
      >
        <Modal.Header closeButton onHide={closeModal}>
          <Modal.Body>
            {"Mensaje de: "}
            {mensajeSeleccionado !== null ? mensajeSeleccionado.email : ""}
          </Modal.Body>
        </Modal.Header>
        <Modal.Body>
          {mensajeSeleccionado !== null ? mensajeSeleccionado.mensaje : ""}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Bandeja;
