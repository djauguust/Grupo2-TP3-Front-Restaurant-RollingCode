import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


export const AdministradorContexto = createContext()

export const AdministradorProvider = ({children}) => {

     //Constante que trae las fechas no disponibles desde el back
  const [FechasNoDisponibles, setFechasNoDisponibles] = useState([]);
  //Constante que guarda las fechas disponibles una vez moodificadas
  const [NuevasFechas, setNuevasFechas] = useState([]);

  //Url del .env
  const urlFechasNoDisponibles = import.meta.env.VITE_API_FECHASNODISPONIBLES;

  //Funcion para sumarle un dia a la fecha que le damos porque por un error con datepicker y validaciones
  const sumarUnDia = (fecha) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1);
    return nuevaFecha;
  };

  //Funcion para traer todas las fechas nos disponibles desde el back
  const traerFechasNoDisponibles = async () => {
    try {
      const res = await axios.get(urlFechasNoDisponibles);
      setFechasNoDisponibles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //UseEffect para que por cada fecha del array de fechas no disponibles del back me le sume un dia
  useEffect(() => {
    if (FechasNoDisponibles && FechasNoDisponibles.length > 0) {
      const nuevasFechas = FechasNoDisponibles.map((item) =>
        sumarUnDia(item.Fecha)
      );
      setNuevasFechas(nuevasFechas);
    }
  }, [FechasNoDisponibles]);

  //useEffect para que me realize la funcion de traer las fechas no disponibles
  useEffect(() => {
    if (FechasNoDisponibles.length === 0) {
      traerFechasNoDisponibles();
    }
  }, []);
  

  const pasarDatos = {
    NuevasFechas,
    traerFechasNoDisponibles,
    FechasNoDisponibles,
    FechasNoDisponibles
  }

  return (
    <AdministradorContexto.Provider value={pasarDatos}>
        {children}
    </AdministradorContexto.Provider>
  )
}

