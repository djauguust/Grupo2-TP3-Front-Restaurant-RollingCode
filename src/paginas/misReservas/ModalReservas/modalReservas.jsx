import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, FormCheck, Modal, Stack } from 'react-bootstrap'
import { ReservasContexto } from '../../../contexto/contexto'


const modalReservas = ({ showModal, onCloseModal,selectedReservaId }) => {

    const {TraerUnaReserva, Reserva} = useContext(ReservasContexto)
    const [externalChange, setExternalChange] = useState(false);

    
    useEffect(() => {
        if (selectedReservaId && externalChange) {
          TraerUnaReserva();
          setExternalChange(false); // Resetea el valor para evitar más cambios internos
        }
      }, [externalChange,TraerUnaReserva]);

      useEffect(() => {
        if (selectedReservaId) {
          setExternalChange(true);
        }
      }, [selectedReservaId]);


        console.log(Reserva);


  return (
    <>
         <Modal show={showModal} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edita tu Reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Stack gap={3}>
                <Form.Label>Edita la Fecha</Form.Label>

            </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onCloseModal}> Guardar Cambios </Button>
        <Button variant="secondary" onClick={onCloseModal}> Cerrar </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default modalReservas