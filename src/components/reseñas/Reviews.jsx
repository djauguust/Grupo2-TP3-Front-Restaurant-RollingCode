import React from "react";
import "./Reviews.css";
import { useTranslation } from "react-i18next";

const Reviews = () => {

  const { t } = useTranslation(); 


  return (
    <>
    <hr />
      <h1 className="titulo font-weight-bold mt-4">{t('reseñas')}</h1>
      <div className="cuerpo">
        <div className="contenedor">
          <div className="carta">
            <div className="imgBx">
              <img src="public\donato2.jpg" alt="" />
            </div>
            <div className="content">
              <h3>Donato De Santis</h3>
              <p>
                {t('reseña1')}
              </p>
            </div>
          </div>
          <div className="carta">
            <div className="imgBx">
              <img src="public\GordonRamsay.jpg" alt="" />
            </div>
            <div className="content">
              <h3>Gordon Ramsay</h3>
              <p>
              {t('reseña2')}
              </p>
            </div>
          </div>
          <div className="carta">
            <div className="imgBx">
              <img src="public\Massimo-Bottura.jpg" alt="" />
            </div>
            <div className="content">
              <h3>Massimo Bottura</h3>
              <p>
              {t('reseña3')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
