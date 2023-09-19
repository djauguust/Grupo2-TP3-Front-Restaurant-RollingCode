import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ButtonDefault from "../../components/ButtonDefault";
import "../../styles/Error404.css";

const ErrorCuatrosCientosCuatro = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const volverInicio = () => {
    navigate("/");
  };

  return (
    <>
      <section>
        <article>
          <div className="Imagen-Fondo">
            <div className="Fondo-Oscuro">
              <div className="Cuerpo-Error">
                <div className="text-center mb-4">
                  <h1 className="tituloError404 mb-3">Lost in the Pasta</h1>
                  <h3 className="textoError404">{t("TextoError404")}</h3>
                </div>
                <div className="d-flex justify-content-center ">
                  <ButtonDefault
                    namebtn={t("volvereInicio")}
                    Funcion={volverInicio}
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default ErrorCuatrosCientosCuatro;
