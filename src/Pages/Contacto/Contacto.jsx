import { useTranslation } from "react-i18next";
import { NavbarContext } from "../../context/NavbarContext";
import { useContext } from "react";
import Mapa from "../../components/Mapa";
import Formulario from "./FormularioContacto/FormContacto";
import style from "../../styles/Contacto.module.css";

const Contacto = () => {
  const { t } = useTranslation();

  const { theme } = useContext(NavbarContext);

  const newTheme =
    theme === "claro" ? "light" : theme === "oscuro" ? "dark" : theme;

  return (
    <>
      <section>
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
            <article>
              <div className={`p-5 ${style.formContacto}`}>
                <Formulario />
              </div>
            </article>
            <article>
              <div className={`p-5 ${style.mapa}`}>
                <Mapa />
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contacto;
