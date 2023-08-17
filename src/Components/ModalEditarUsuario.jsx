import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function ModalEditarUsuario(props) { // Recibe el usuario por props
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Constantes del usuario
  const [nombre, setNombre] = useState(props.usuario.Nombre);
  const [email, setEmail] = useState(props.usuario.Email);
  const [contrasena, setContrasena] = useState(props.usuario.Contrasena);

  // Guarda el usuario actualizado
  const usuarioActualizado = {
    id: props.usuario.id,
    Nombre: nombre,
    Email: email,
    Contrasena: contrasena,
  };
  
  // Actualiza el usuario
  const actualizar = async () => {
    console.log(usuarioActualizado);
    console.log(`${props.url}/${props.usuario.id}`);

    try {
      const response = await axios.put(
        `${props.url}/${props.usuario.id}`,
        usuarioActualizado
      );
      alert("Guardado exitoso");
      handleClose();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      alert("Error");
    } 
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar datos del usuario</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                onChange={(ev) => setNombre(ev.target.value)}
                value={nombre}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="contrasena">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="text"
                name="contrasena"
                value={contrasena}
                onChange={(ev) => setContrasena(ev.target.value)}
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

export default ModalEditarUsuario;
