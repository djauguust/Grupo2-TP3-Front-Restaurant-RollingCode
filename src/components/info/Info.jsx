import React from "react";
import "./Info.css";
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";

const Info = ( {theme}) => {
  const { t } = useTranslation(); 

  return (
    <>
      <section className="mt-4 mb-4 text-center">
        <h3 className="titulo-custom">Gusteau's</h3>
        <p>
         {t('descripcion')}
        </p>
      </section>
      <div className="info-custom">
        <div className={`cartel-custom${theme}`}>
          <h3 className="text-center mt-3 color-info">{t('informacion')}</h3>
          <hr />
          <p className="d-inline-block info-negra ms-2">{t('dias')} </p>
          <p className="d-inline-block info-dorado ms-2">11:30 am - 12:00 pm</p>
          <hr />
          <p className="d-inline-block info-negra ms-2">Whatsapp</p>
          <p className="d-inline-block info-dorado ms-2">+54 381 5401253</p>
          <hr />
          <p className="d-inline-block info-negra ms-2">Email</p>
          <p className="d-inline-block info-dorado ms-2">
            donluigi@rollinggourmet.com
          </p>
          <hr />
          <div></div>
          <p className="d-inline-block info-negra ms-2">{t('direccion')}</p>
          <p className="d-inline-block info-dorado ms-2 text-end">
            Olga Cossettini 750, CABA, Buenos Aires.
          </p>
          <Link className="boton-reserva-custom" to="/reservas">
            {t('reserva')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Info;
