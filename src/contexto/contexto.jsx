import axios from 'axios'
import React, { createContext, useState } from 'react'

export const ReservasContexto = createContext()

export const ReservasProvider = ({children}) => {

    const UrlReservas = import.meta.env.VITE_API_RESERVAS


    const [Reservas,SetReservas] = useState()
    const [Reserva,setReserva] = useState()
    const [selectedReservaId, setSelectedReservaId] = useState("");


    const TraerReservas = async () =>{
        try {
            const res = await axios.get(UrlReservas);
            const reservas = await res.data;
            SetReservas(reservas)

          } catch (error) {
            console.error('Error:', error);
          }
    }

    const TraerUnaReserva = async () =>{
        try {
            const res = await axios.get(`${UrlReservas}/${selectedReservaId}`)
            const reserva = await res.data
            setReserva(reserva)
        } catch (error) {
            console.log(error);
        }
    }

    



    const PasarDatos = {
        TraerReservas,
        Reservas,
        SetReservas,
        selectedReservaId,
        setSelectedReservaId,
        TraerUnaReserva,
        Reserva
    }

  return (
    <ReservasContexto.Provider value={PasarDatos}>
        {children}
    </ReservasContexto.Provider>
  )
}
