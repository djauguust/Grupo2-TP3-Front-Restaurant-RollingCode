import { useState } from "react";


import Footer from "./components/footer/Footer";
import NavBar from "./components/navbar/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./context/UserContext";
import "./i18n";
import { useContext } from "react";
import { NavbarContext, NavbarContexto } from "./context/NavbarContext.jsx";
import Rutas from "./routes/Rutas";
import Reservas from "./Pages/Reservas/Reservas";
import { ReservasProvider } from "./context/ReservasContexto";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <NavbarContexto>
        <UserContext>
          <ReservasProvider>
          <header>
            <NavBar />
          </header>
            <main>
            <Rutas />
            </main>
            <aside>
            <Toaster position="bottom-right"/>
            </aside>
            <footer >
            <Footer />
            </footer>
          </ReservasProvider>
        </UserContext>
      </NavbarContexto>
    </>
  );
}

export default App;
