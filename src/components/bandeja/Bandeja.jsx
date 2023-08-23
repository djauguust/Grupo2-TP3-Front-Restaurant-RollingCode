import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bandeja.css'
import { ListGroup, Button } from 'react-bootstrap';

const Bandeja = () => {
  const [mensajes, setMensajes] = useState([]);

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
  }

  return (
    <div>
      <h1 className='mt-4'>Bandeja de entrada</h1>
      <ul className='lista-msj'>
        <ListGroup className='lista-mensajes'>
        {mensajes.map((mensaje) => (
          <>
            <ListGroup.Item className='mensaje-recibido'>{mensaje.hora} | Usuario: {mensaje.nombre} | Email: {mensaje.email}
            <Button variant="success">Ver mensaje</Button>
            <Button variant="danger">Eliminar mensaje</Button>
            </ListGroup.Item>
            </>
        ))}
         </ListGroup>
      </ul>

    </div>
  );
}

export default Bandeja;