import React, { useContext } from 'react'
import { Button, Col, Stack } from 'react-bootstrap'
import { ReservasContexto } from '../../../context/ReservasContexto'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'


const contenedorReservas = ({ onShowModal, Reserva }) => {

  const url = import.meta.env.VITE_API;

  const TokenPuro = localStorage.getItem("user")


  const {TraerUnaReserva} = useContext(ReservasContexto)
  
  //Sirve para parasr el id al modal 
    const clickEditar = () => {
        onShowModal(Reserva)
    }

    const EliminarDatos = () =>{
      Swal.fire({
        title: 'Estas seguro de que deseas eliminar esta reserva??',
        text: "Una vez eliminada la reserva no puede ser recuperada",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro!',
        cancelButtonText: 'No'
      }).then((result) => {

        if (result.isConfirmed) {
          axios.delete(`${url}/reservas/${Reserva._id}`,{
            headers:{
              "auth-token" : TokenPuro.replace(/^"(.*)"$/, '$1')
            }
          })
          TraerUnaReserva()
          Swal.fire(
            'Reserva eliminada con exito!',
            'Su reserva fue eliminada exitosamente.',
            'success'
          )
        }
      })
    }

//Todo abajo es el contenido de las reservas, para el diseño
  return (
    <>
        <Col xs={12} md={6} lg={6}>
              <div className="Contenedor-Reservas">
                <Stack gap={3}>
                  <div className="Contenedor-Fecha">
                    <h3 className='TituloReservaParaDia'>Reserva para el dia {Reserva.fecha}</h3>
                  </div>
                  <div className="text-center">
                    <h4>Hora : {Reserva.hora}</h4>
                    <h4 className="Contenedor-Cantidad-Personas">
                      Cantidad de Personas : {Reserva.comensales}
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