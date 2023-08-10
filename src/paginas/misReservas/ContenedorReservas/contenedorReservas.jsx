import React from 'react'
import { Button, Col, Stack } from 'react-bootstrap'

const contenedorReservas = ({ onShowModal, Reserva }) => {

    const clickEditar = () => {
        onShowModal(Reserva.id)
    }

  return (
    <>
        <Col xs={12} md={6} lg={6}>
              <div className="Contenedor-Reservas">
                <Stack gap={3}>
                  <div className="Contenedor-Fecha">
                    <h3>Reserva para el dia ${Reserva.Fecha}</h3>
                  </div>
                  <div className="text-center">
                    <h4>Hora : ${Reserva.Hora}</h4>
                    <h4 className="Contenedor-Cantidad-Personas">
                      Cantidad de Personas : ${Reserva.CantidadDePersonas}
                    </h4>
                    <div className="mt-2 d-flex justify-content-around">
                      <Button onClick={clickEditar}>Editar</Button>
                      <Button>Eliminar</Button>
                    </div>
                  </div>
                </Stack>
              </div>
            </Col>  
    </>
  )
}

export default contenedorReservas