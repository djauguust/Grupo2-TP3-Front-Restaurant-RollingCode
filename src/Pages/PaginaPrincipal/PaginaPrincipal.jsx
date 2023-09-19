import CarruselPrincipal from "../../components/carrusel/CarruselPrincipal";
import Info from "../../components/info/Info";
import Menu from "../../components/menu/Menu";
import Reviews from "../../components/reseñas/Reviews";
import Galeria from "../../components/galeria/Galeria";
import { useContext } from "react";
import { NavbarContext } from "../../context/NavbarContext";

const PaginaPrincipal = () => {
  const { theme } = useContext(NavbarContext);
  return (
    <>
      <section>
        <CarruselPrincipal />
        <Info theme={theme} />
        <Menu theme={theme} />
        <Reviews theme={theme} />
        <Galeria theme={theme} />
      </section>
    </>
  );
};

export default PaginaPrincipal;
