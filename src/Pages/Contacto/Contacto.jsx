import Mapa from "../../components/Mapa";
import style from "../../styles/Contacto.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Formulario from "./FormularioContacto/FormContacto";
import { useTranslation } from "react-i18next";
import { NavbarContext } from "../../context/NavbarContext";
import { useContext } from "react";

const Contacto = () => {
  const { t } = useTranslation();

  const { theme } = useContext(NavbarContext);

  const newTheme =
  theme === "claro" ? "light" : theme === "oscuro" ? "dark" : theme;


  return (
    <>
      <div className={`custom-${newTheme} ${style.container}`}>
        <div className={`text-center ${style.banner}`}>
          <p>{t("contacto")}</p>
        </div>

        <div className={style.container2}>
          <h4
            className={`mx-5 mt-5 text-center ${style.parrafo} ${style.titulo}`}
          >
            {t("contacto")}
          </h4>
          <div className={`p-5 ${style.formContacto}`}>
            <Formulario />
          </div>

          <div className={`p-5 ${style.mapa}`}>
            <Mapa />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacto;
