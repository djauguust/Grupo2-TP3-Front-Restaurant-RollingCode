import axios from "axios";
import React, { createContext, useContext, useState } from "react";
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

  const traerFechasNoDisponibles = async () => {
    try {
      const response = await axios.get(`${url}/fechasnd`,{
        headers: {
          "auth-token" : TokenPuro.replace(/^"(.*)"$/, "$1")
        }
      })
      setFechasNoDisponibles( response.data.map((res) => {
        const fecha = new Date(res.fecha);
        fecha.setDate(fecha.getDate() + 1); // Suma un día a la fecha
        return fecha.toISOString().slice(0, 10); // Formatea la fecha como "YYYY-MM-DD"
      }))
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
    traerFechasNoDisponibles,
    fechasNoDisponibles,
    setFechasNoDisponibles
  };

  return (
    <ReservasContexto.Provider value={PasarDatos}>
      {children}
    </ReservasContexto.Provider>
  );
};
