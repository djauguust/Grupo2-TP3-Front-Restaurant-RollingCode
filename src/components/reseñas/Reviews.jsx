import { useTranslation } from "react-i18next";
import "./Reviews.css";

const Reviews = () => {
  const { t } = useTranslation();

  return (
    <>
      <article>
        <hr />
        <h1 className="titulo font-weight-bold mt-4">{t("reseñas")}</h1>
        <div className="cuerpo">
          <div className="contenedor">
            <div className="carta">
              <div className="imgBx">
                <img
                  src="https://live.staticflickr.com/65535/53171958311_0e93603d52_o.jpg"
                  height="260px"
                  alt=""
                />
              </div>
              <div className="content">
                <h3 className="nombre-cocinero">Donato De Santis</h3>
                <p className="texto-reseña">{t("reseña1")}</p>
              </div>
            </div>
            <div className="carta">
              <div className="imgBx">
                <img
                  src="https://live.staticflickr.com/65535/53172442418_18036984fa_o.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <h3 className="nombre-cocinero">Gordon Ramsay</h3>
                <p className="texto-reseña">{t("reseña2")}</p>
              </div>
            </div>
            <div className="carta">
              <div className="imgBx">
                <img
                  src="https://live.staticflickr.com/65535/53172389370_b4630e4432_o.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <h3 className="nombre-cocinero">Massimo Bottura</h3>
                <p className="texto-reseña">{t("reseña3")}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Reviews;
