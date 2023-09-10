import { createContext, useState } from "react";

export const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
  const [userId, setUserId] = useState("");

  const [mostrarDatos, setMostrarDatos] = useState(true);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarConfigurarPerfil, setMostrarConfigurarPerfil] = useState(false);

  //Funcion para traer los datos de un solo usuario dependiendo del ID

  const pasarStates = {
    mostrarDatos,
    mostrarConfigurarPerfil,
    mostrarContraseña,
    setMostrarDatos,
    setMostrarConfigurarPerfil,
    setMostrarContraseña,
  };

  const pasarDatos = {
    setUserId,
    userId,
    pasarStates,
  };

  return (
    <UsuariosContext.Provider value={pasarDatos}>
      {children}
    </UsuariosContext.Provider>
  );
};
