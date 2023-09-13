import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UsuariosContext } from "./UserContext";

export const ReservasContexto = createContext();

export const ReservasProvider = ({ children }) => {
  //Url del .env
  const url = import.meta.env.VITE_API;

  const { Token } = useContext(UsuariosContext);

  const TokenPuro = localStorage.getItem("user");

  //Constante para guardar las reservas en general
  const [Reservas, SetReservas] = useState();
  //Constante para guardar una sola reserva
  const [Reserva, setReserva] = useState();
  //Constante que guarda el valor del Id para pasarlo al modal
  const [selectedReservaId, setSelectedReservaId] = useState("");
  //State para fechas no disponibles
  const [fechasNoDisponibles, setFechasNoDisponibles] = useState([])
  //State para horarios disponibles
  const [horariosDisponibles, setHorariosDisponibles] = useState([])


  //Funcion para traer una sola reserva
  const TraerUnaReserva = async () => {
    try {
      const res = await axios.get(`${url}/reservasByUsuario/${Token.id}`, {
        headers: {
          "auth-token": TokenPuro.replace(/^"(.*)"$/, "$1"),
        },
      });
      const reserva = await res.data;
      setReserva(reserva);
    } catch (error) {
      console.log(error);
    }
  };

  //Funcion para traer las fechas no disponibles
  const traerFechasNoDisponibles = async () => {
    try {
      const response = await axios.get(`${url}/fechasnd`,{
        headers: {
          "auth-token" : TokenPuro.replace(/^"(.*)"$/, "$1")
        }
      })
      //funcion para que por cada fecha le sume un dia por un bug que te toma la fecha anterior a la que pones
      setFechasNoDisponibles( response.data.map((res) => {
        const fecha = new Date(res.fecha);
        fecha.setDate(fecha.getDate() + 1); // Suma un día a la fecha
        return fecha.toISOString().slice(0, 10); // Formatea la fecha como "YYYY-MM-DD"
      }))
    } catch (error) {
      console.log(error);
    }
  }

  //Funcion para traer las horas disponibles
  const traerHorasDisponibles = async () => {
    //guardo las fechas disponibles aca para no tener que setear 2 veces los valores en el State
    let guardarHorariosDisponibles = ""
    try {
      const response = await axios.get(`${url}/restaurant`,{
        headers: {
          "auth-token" : TokenPuro.replace(/^"(.*)"$/, "$1")
        }
      })
      //ForEach para que pasar los horarios de array a objeto
      response.data.forEach(datos => {
        guardarHorariosDisponibles = datos.horario
      });
      //Todo esto es para poder pasar las horas desde numeros a string con : para separarlas entre horas y minutos
      const horarioDesdeString = guardarHorariosDisponibles.desde.toString()
      const horarioDesdeFormateado = `${horarioDesdeString.slice(0, 2)}:${horarioDesdeString.slice(2)}`
      const horarioHastaString = guardarHorariosDisponibles.hasta.toString()
      const horarioHastaFormateado = `${horarioHastaString.slice(0, 2)}:${horarioHastaString.slice(2)}`
      //Guardo los datos en el state con el : entre horas y minutos
      setHorariosDisponibles({
        desde : horarioDesdeFormateado,
        hasta : horarioHastaFormateado
      })  
    } catch (error) {
      console.log(error);
    }
  }
  
  //Constante para pasar todas las cosas del context, luego las simplifico mejor
  const PasarDatos = {
    Reservas,
    SetReservas,
    selectedReservaId,
    setSelectedReservaId,
    TraerUnaReserva,
    Reserva,
    traerFechasNoDisponibles,
    fechasNoDisponibles,
    setFechasNoDisponibles,
    traerHorasDisponibles,
    horariosDisponibles
  };

  return (
    <ReservasContexto.Provider value={PasarDatos}>
      {children}
    </ReservasContexto.Provider>
  );
};
