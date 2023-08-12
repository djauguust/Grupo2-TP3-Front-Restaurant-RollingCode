import React, { useContext } from 'react'
import { Button, Col, Stack } from 'react-bootstrap'
import { ReservasContexto } from '../../../contexto/contexto'
import axios from 'axios'

const contenedorReservas = ({ onShowModal, Reserva }) => {

  const {TraerReservas} = useContext(ReservasContexto)
  const UrlReservas = import.meta.env.VITE_API_RESERVAS


//Sirve para parasr el id al modal 
    const clickEditar = () => {
        onShowModal(Reserva.id)
    }

    const EliminarDatos = () =>{
      axios.delete(`${UrlReservas}/${Reserva.id}`)
      .then(response =>{
        console.log("Reserva Eliminada con exito");
      })
      .catch(error => {
        console.log("Error al eliminar la reserva");
      })
      TraerReservas()
    }

//Todo abajo es el contenido de las reservas, para el diseño
  return (
    <>
        <Col xs={12} md={6} lg={6}>
              <div className="Contenedor-Reservas">
                <Stack gap={3}>
                  <div className="Contenedor-Fecha">
                    <h3>Reserva para el dia {Reserva.Fecha}</h3>
                  </div>
                  <div className="text-center">
                    <h4>Hora : {Reserva.Hora}</h4>
                    <h4 className="Contenedor-Cantidad-Personas">
                      Cantidad de Personas : {Reserva.CantidadDePersonas}
                    </h4>
                    <div className="mt-2 d-flex justify-content-around">
                      <Button onClick={clickEditar}>Editar</Button>
                      <Button onClick={EliminarDatos} >Eliminar</Button>
                    </div>
                  </div>
                </Stack>
              </div>
            </Col>  
    </>
  )
}

export default contenedorReservas