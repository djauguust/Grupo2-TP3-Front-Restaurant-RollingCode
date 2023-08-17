import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function ModalEditar(props) { //Recibe la reserva por props
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Constantes de la reserva
  const [fecha, setFecha] = useState(props.reserva.Fecha);
  const [cantPersonas, setCantPersonas] = useState(props.reserva.CantidadDePersonas);
  const [hora, setHora] = useState(props.reserva.Hora);

  // Guarda la reserva actualizada

  const reservaActualizada = {
    id : props.reserva.id,
    Fecha: fecha,
    CantidadDePersonas: cantPersonas,
    Hora: hora
  }
  
  // Actualiza la reserva
  const actualizar = async ()=>{

    console.log(reservaActualizada)
    console.log(`${props.url}/${props.reserva.id}`)

    try {
      const response = await axios.put(
        `${props.url}/${props.reserva.id}`,
        reservaActualizada
      );
      alert("Guardado exitoso");
      handleClose();
    } catch (error) {
      console.error('Error al actualizar la reservación:', error);
      alert("Error")
    } 
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar datos de la reserva</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          
        <Form>
      <Form.Group controlId="fecha">
        <Form.Label>Fecha</Form.Label>
        <Form.Control
          type="text"
          name="fecha"
          onChange={ev=> setFecha(ev.target.value)}
          value={fecha}
        />
      </Form.Group>

      <Form.Group controlId="cantidadDePersonas">
        <Form.Label>Cantidad de Personas</Form.Label>
        <Form.Control
          type="number"
          name="cantidadDePersonas"
          value={cantPersonas}
          onChange={ev=> setCantPersonas(ev.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="hora">
        <Form.Label>Hora</Form.Label>
        <Form.Control
          type="text"
          name="hora"
          value={hora}
          onChange={ev=> setHora(ev.target.value)}
        />
      </Form.Group>
    </Form>

        </Modal.Body>

        

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={actualizar}>
            Guardar cambios
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default ModalEditar;