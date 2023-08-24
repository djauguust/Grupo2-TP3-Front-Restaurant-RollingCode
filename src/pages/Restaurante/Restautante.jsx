import React from 'react'
import { Form } from 'react-bootstrap'
import HoraAperturaCierre from '../../Components/Restaurante/HoraAperturaCierre'

import TiempoDeReserva from '../../Components/Restaurante/TiempoDeReserva'
import CrearFechaReserva from '../../Components/Restaurante/CrearFechaReserva'
import CantidadMaximaComenzales from '../../Components/Restaurante/CantidadMaximaComenzales'
import CantidadMaximaReservas from '../../Components/Restaurante/CantidadMaximaReservas'

const Restautante = () => {
  return (
    <>
    <div className="ContenedorTablaUsuario text-center">
        <div className='ContenedorTablas'>
        <div className='tabla' >
            <div>
               <CrearFechaReserva />
            </div>
        </div>
        </div>
        <div className='ContenedorTablas'>
        <div className='tabla'>
            <div>
               <CantidadMaximaComenzales />
            </div>
        </div>
        </div>
        <div className='ContenedorTablas'>
        <div className='tabla'>
            <div>
                <TiempoDeReserva />
            </div>
        </div>
        </div>
        <div className='ContenedorTablas'>
        <div className='tabla'>
            <div>
               <CantidadMaximaReservas />
            </div>
        </div>
        </div>
        <div className='ContenedorTablas'>
        <div className='tabla'>
            <div>
                <HoraAperturaCierre />
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Restautante