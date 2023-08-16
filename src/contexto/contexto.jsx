import axios from 'axios'
import React, { createContext, useState } from 'react'

export const ReservasContexto = createContext()

export const ReservasProvider = ({children}) => {

  //Url del .env
    const UrlReservas = import.meta.env.VITE_API_RESERVAS

//Constante para guardar las reservas en general
    const [Reservas,SetReservas] = useState()
    //Constante para guardar una sola reserva
    const [Reserva,setReserva] = useState()
    //Constante que guarda el valor del Id para pasarlo al modal
    const [selectedReservaId, setSelectedReservaId] = useState("");
    
    //Funcion para traer las reservas en general
    const TraerReservas = async () =>{
        try {
            const res = await axios.get(UrlReservas);
            const reservas = await res.data;
            SetReservas(reservas)
            
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    //Funcion para traer una sola reserva
    const TraerUnaReserva = async () =>{
        try {
            const res = await axios.get(`${UrlReservas}/${selectedReservaId}`)
            const reserva = await res.data
            setReserva(reserva)
        } catch (error) {
            console.log(error);
        }
    }
    
//Constante para pasar todas las cosas del context, luego las simplifico mejor
    const PasarDatos = {
        TraerReservas,
        Reservas,
        SetReservas,
        selectedReservaId,
        setSelectedReservaId,
        TraerUnaReserva,
        Reserva,

    }

  return (
    <ReservasContexto.Provider value={PasarDatos}>
        {children}
    </ReservasContexto.Provider>
  )
}
