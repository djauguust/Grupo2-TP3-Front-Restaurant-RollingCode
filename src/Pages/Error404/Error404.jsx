import React from "react";
import "../../styles/Error404.css";
import ButtonDefault from "../../components/ButtonDefault";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  const volverInicio = () => {
    navigate("/");
  };

  return (
    <>
      <div className="Imagen-Fondo">
        <div className="Fondo-Oscuro">
          <div className="Cuerpo-Error">
            <div className="text-center mb-4">
              <h1 className="tituloError404 mb-3">Lost in the Pasta</h1>
              <h3 className="textoError404">
                ¡Oops! Parece que te has perdido en nuestra deliciosa pasta.
                siempre puedes volver a la página de inicio para encontrar el
                camino de regreso a la auténtica experiencia italiana que
                ofrecemos.
              </h3>
            </div>
            <div className="d-flex justify-content-center ">
              <ButtonDefault
                namebtn="Volver al inicio"
                Funcion={volverInicio}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
