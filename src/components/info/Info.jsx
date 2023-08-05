import React from "react";
import "./Info.css";
import {Link} from "react-router-dom";
const Info = () => {
  return (
    <>
      <section className="mt-4 mb-4 text-center">
        <h3 className="titulo-custom">Don Luigi</h3>
        <p>
          Bienvenido a nuestro sofisticado rincón italiano en el corazón de
          Puerto Madero, Buenos Aires. En nuestro restaurante, deleitarás tus
          sentidos con una auténtica experiencia gastronómica italiana. Descubre
          la diversidad de sabores que ofrecemos, desde exquisitas pastas y
          pizzas artesanales hasta selectos vinos y deliciosos postres. Nuestro
          acogedor ambiente moderno te invita a disfrutar de momentos
          inolvidables con tus seres queridos. ¡Sumérgete en la cultura
          culinaria de Italia y déjate cautivar por nuestro sabor único y
          distinguido
        </p>
      </section>
      <div className="info-custom">
        <div className="cartel-custom">
          <h3 className="text-center mt-3">Informacion</h3>
          <hr />
          <p className="d-inline-block info-negra ms-2">Martes a Domingo </p>
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
          <p className="d-inline-block info-negra ms-2">Direccion</p>
          <p className="d-inline-block info-dorado ms-2 text-end">
            Olga Cossettini 750, CABA, Buenos Aires.
          </p>
          <Link className="boton-reserva-custom" to="/reservas">
            HAZ TU RESERVA
          </Link>
        </div>
      </div>
    </>
  );
};

export default Info;
