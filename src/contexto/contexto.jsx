import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const ReservasContexto = createContext()

export const ReservasProvider = ({children}) => {

  //Url del .env
    const UrlReservas = import.meta.env.VITE_API_RESERVAS

//Constante para guardar las reservas en general
    const [Reservas,SetReservas] = useState()
    //Constante para guardar una sola reserva
    const [Reserva,setReserva] = useState()
    //Constante para guardar la reserva que se edito que estoy trayendo del set dentro del formik de edicion
    const [ReservaEditada, setReservaEditada] = useState()
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
    
    //Fucnion para editar la reserva, no esta del todo bien hecha porque estaba probando distintas formas para que funcione
    //Cualquier cosa son libres de editarla como gusten
    const EditarReserva = async () =>{
        useEffect(() => {
            if (ReservaEditada) {
              const Url = `${UrlReservas}/${selectedReservaId}`;
              console.log("Reserva es", ReservaEditada);
              axios.put(Url, ReservaEditada)
                .then(Response => {
                  console.log("Reserva Actualizada");
                })
                .catch(error => {
                  console.log(error);
                });
            }
          }, [ReservaEditada]);
        
        
    }
    
    //UseEffect para tratar de que agarre el valor cuando este cargado, obviamente no funciona xd
    useEffect(() => {
      console.log(ReservaEditada);
      if (ReservaEditada) {
        setReservaEditada(ReservaEditada)
      }
    }, [])
    


//Constante para pasar todas las cosas del context, luego las simplifico mejor
    const PasarDatos = {
        TraerReservas,
        Reservas,
        SetReservas,
        selectedReservaId,
        setSelectedReservaId,
        TraerUnaReserva,
        Reserva,
        setReservaEditada,
        EditarReserva,
        ReservaEditada
    }

  return (
    <ReservasContexto.Provider value={PasarDatos}>
        {children}
    </ReservasContexto.Provider>
  )
}
