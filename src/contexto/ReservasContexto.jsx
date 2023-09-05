import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { UsuariosContext } from '../context/UserContext';


export const ReservasContexto = createContext()

export const ReservasProvider = ({children}) => {

  //Url del .env
  const url = import.meta.env.VITE_API;


    const {Token,TokenPuro} = useContext(UsuariosContext)
   


//Constante para guardar las reservas en general
    const [Reservas,SetReservas] = useState()
    //Constante para guardar una sola reserva
    const [Reserva,setReserva] = useState()
    //Constante que guarda el valor del Id para pasarlo al modal
    const [selectedReservaId, setSelectedReservaId] = useState("");
    
    
    //Funcion para traer una sola reserva
    const TraerUnaReserva = async () =>{
        try {
            const res = await axios.get(`${url}/reservasByUsuario/${Token.id}`,{
                headers:{
                  "auth-token" : TokenPuro.replace(/^"(.*)"$/, '$1')
                }
              })
            const reserva = await res.data
            setReserva(reserva)
        } catch (error) {
            console.log(error);
        }
    }

    //TraerUnaReserva()

//Constante para pasar todas las cosas del context, luego las simplifico mejor
    const PasarDatos = {
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
