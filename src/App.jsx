import { useState } from 'react'
import Navbar from './componentes/navbar'

import Footer from "./components/footer/Footer";
import Header from "./components/navbar/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./context/UserContext";
import "./i18n";
import { useContext } from "react";
import { NavbarContext, NavbarContexto } from "./context/NavbarContext.jsx";
import Rutas from "./routes/Rutas";
import Reservas from './Pages/Reservas/Reservas';
import { ReservasProvider } from './contexto/ReservasContexto';

function App() {

  return (
    <>
      <NavbarContexto>
        <UserContext>
          <ReservasProvider>
           <Header/> 
          <Rutas />
      <Footer/>
          </ReservasProvider>
        </UserContext>
      </NavbarContexto>
    </>
  );
}

export default App;
