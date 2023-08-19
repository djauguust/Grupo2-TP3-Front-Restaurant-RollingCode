import Footer from "./components/footer/Footer";
import Header from "./components/navbar/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import RoutesNavbar from "./routes/RoutesNavbar";
import UserContext from "./context/UserContext";
import './i18n'
import { useState } from "react";

function App() {




  return (
    <>
      <UserContext>
        <RoutesNavbar />
      </UserContext>
    </>
  );
}

export default App;
