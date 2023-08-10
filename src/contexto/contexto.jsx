import axios from 'axios'
import React, { createContext, useState } from 'react'

export const ReservasContexto = createContext()

export const ReservasProvider = ({children}) => {

    const UrlReservas = import.meta.env.VITE_API_RESERVAS

    const [Reservas,SetReservas] = useState()

    const TraerReservas = async () =>{
        try {
            const res = await axios.get(UrlReservas);
            const reservas = await res.data;
            SetReservas(reservas)
            console.log(res.data);
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const PasarDatos = {
        TraerReservas,
        Reservas,
        SetReservas
    }

  return (
    <ReservasContexto.Provider value={PasarDatos}>
        {children}
    </ReservasContexto.Provider>
  )
}
