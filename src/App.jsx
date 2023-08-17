import Footer from "./components/footer/Footer";
import Header from "./components/navbar/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import RoutesNavbar from "./routes/RoutesNavbar";
import UserContext from "./context/UserContext";
import './i18n'
import { useState } from "react";

function App() {

  const [theme, settheme] = useState('claro')

  const handleSwitch = (e) => {
    if(e.target.checked){
      settheme('oscuro')
    }  else {
      settheme('claro')
    }
  };


  return (
    <>
      <UserContext>
        <Header handleSwitch={handleSwitch} theme={theme} />
        <RoutesNavbar />
        <Footer theme={theme} />
      </UserContext>
    </>
  );
}

export default App;
