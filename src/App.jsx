import { useState } from "react";

import "./i18n";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navbar/Header";
import Rutas from "./routes/Rutas";
import UserContext from "./context/UserContext";
import { NavbarContexto } from "./context/NavbarContext.jsx";
import { ReservasProvider } from "./context/ReservasContexto";

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
              <Toaster position="bottom-right" />
            </aside>
            <footer>
              <Footer />
            </footer>
          </ReservasProvider>
        </UserContext>
      </NavbarContexto>
    </>
  );
}

export default App;
