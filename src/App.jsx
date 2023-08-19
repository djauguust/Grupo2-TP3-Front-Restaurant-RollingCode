
import Footer from "./components/footer/Footer";
import Header from "./components/navbar/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import RoutesNavbar from "./routes/RoutesNavbar";
import UserContext from "./context/UserContext";
import "./i18n";
import { useState } from "react";
import { NavbarContexto } from "./context/NavbarContext";

function App() {
  return (
    <>
      <NavbarContexto>
        <UserContext>
          <RoutesNavbar />
        </UserContext>
      </NavbarContexto>
    </>
  );
}

export default App;
