import { useContext } from "react";
import { Route, Routes } from "react-router";
import { UsuariosContext } from "../context/UserContext";
import PaginaPrincipal from "../Pages/PaginaPrincipal/PaginaPrincipal";
import ACercaDeNosotros from "../Pages/a-cerca-de-nosotros/ACercaDeNosotros";
import Contacto from "../Pages/Contacto/Contacto";
import Reservas from "../Pages/Reservas/Reservas";
import Galeria from "../components/galeria/Galeria";
import InicioSesion from "../Pages/Login/InicioSesion";
import Registro from "../Pages/Registro/Registro";
import Error404 from "../Pages/Error404/ErrorCuatrosCientosCuatro";
import { Administracion } from "../Pages/Administración/Administracion";
import DatosCuenta from "../Pages/Cuenta/Datos-Cuenta/datos-cuenta";
import MisReservas from "../Pages/misReservas/misReservas";

const Rutas = () => {
  const { Token } = useContext(UsuariosContext);

  return (
    <>
      <Routes>
        {/* Usar Navigate para la redirección condicional */}
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/acercadenosotros" element={<ACercaDeNosotros />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/contacto" element={<Contacto />} />
        {Token && ( // Si Token existe
          <>
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/mis-reservas" element={<MisReservas />} />
            <Route path="/configurar-cuenta" element={<DatosCuenta />} />
            {(Token.rol === 1 || Token.rol === 2) && (
              <>
                <Route path="/administrador" element={<Administracion />} />
              </>
            )}
          </>
        )}
      </Routes>
    </>
  );
};

export default Rutas;
