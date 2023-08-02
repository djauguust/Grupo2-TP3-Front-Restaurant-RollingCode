import React from "react";
import "./Reviews.css";

const Reviews = () => {
  return (
    <>
      <h1 className="titulo font-weight-bold mt-4">Reseñas</h1>
      <div className="cuerpo">
        <div className="contenedor">
          <div className="carta">
            <div className="imgBx">
              <img src="public\donato2.jpg" alt="" />
            </div>
            <div className="content">
              <h3>Donato De Santis</h3>
              <p>
                "Experiencia gastronómica italiana excepcional: auténticos
                sabores, servicio impecable y ambiente acogedor. ¡Delicia para
                los sentidos!"
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
                "Una auténtica joya italiana: deliciosos platos, encantador
                ambiente y servicio excepcional. ¡Una visita obligada!"
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
                "El sabor de Italia en su máximo esplendor: platos exquisitos,
                ambiente acogedor y atención impecable. Increíble."
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
