import React from 'react'
import { Button, Col, Stack } from 'react-bootstrap'

const contenedorReservas = () => {
  return (
    <>
        <Col xs={12} md={6} lg={6}>
              <div className="Contenedor-Reservas">
                <Stack gap={3}>
                  <div className="Contenedor-Fecha">
                    <h3>Reserva para el dia 10/08/2023</h3>
                  </div>
                  <div className="text-center">
                    <h4>Hora : 15:00</h4>
                    <h4 className="Contenedor-Cantidad-Personas">
                      Cantidad de Personas : 2
                    </h4>
                    <div className="mt-2 d-flex justify-content-around">
                      <Button>Editar</Button>
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