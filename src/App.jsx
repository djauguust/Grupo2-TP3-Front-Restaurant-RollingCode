import Footer from "./components/footer/Footer";
import Header from "./components/navbar/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import RoutesNavbar from "./routes/RoutesNavbar";
import UserContext from "./context/UserContext";
import "./i18n";
import { useContext, useState } from "react";
import { NavbarContext, NavbarContexto } from "./context/NavbarContext.jsx";

function App() {

  return (
    <>
      <NavbarContexto>
        <UserContext>
           <Header/> 
          <RoutesNavbar />
          
        </UserContext>
      </NavbarContexto>
    </>
  );
}

export default App;
