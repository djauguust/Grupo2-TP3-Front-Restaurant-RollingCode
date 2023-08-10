import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const modalReservas = ({ showModal, onCloseModal }) => {
  return (
    <>
         <Modal show={showModal} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal de Reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Contenido del modal */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default modalReservas