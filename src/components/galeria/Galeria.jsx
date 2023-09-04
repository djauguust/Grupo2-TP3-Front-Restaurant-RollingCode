import "./Galeria.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

const Galeria = ({theme}) => {

  const { t } = useTranslation();

  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const seleccionarImagen = (urlImagen) => {
    setImagenSeleccionada(urlImagen);
  };

  const cerrarImagen = () => {
    setImagenSeleccionada(null);
  };

  return (
    <>
    <hr />
      <div className={`body-galeria${theme} container`}>
        <h2 className="text-center titulo-galeria">
          <br></br>{t('galeria')}
        </h2>
        <div className="grid-container">
          <div
            className="grid-item img-1"
            onClick={() =>
              seleccionarImagen(
                "https://live.staticflickr.com/65535/53089577110_19c7c24c81_c.jpg"
              )
            }
          >
            <img
              src="https://live.staticflickr.com/65535/53089577110_19c7c24c81_c.jpg"
              alt=""
              className="img-1"
            />
          </div>
          <div
            className="grid-item img-2"
            onClick={() =>
              seleccionarImagen(
                "https://live.staticflickr.com/65535/53089666073_aa85769e74_k.jpg"
              )
            }
          >
            <img
              src="https://live.staticflickr.com/65535/53089666073_aa85769e74_k.jpg"
              alt=""
              className="img-1"
            />
          </div>
          <div
            className="grid-item tall img-3"
            onClick={() =>
              seleccionarImagen(
                "https://live.staticflickr.com/65535/53089359339_3d3a655272_b.jpg"
              )
            }
          >
            <img
              src="https://live.staticflickr.com/65535/53089359339_3d3a655272_b.jpg"
              alt=""
              className="img-1"
            />
          </div>
          <div
            className="grid-item img-4"
            onClick={() =>
              seleccionarImagen(
                "https://live.staticflickr.com/65535/53088605317_65a2f14066_c.jpg"
              )
            }
          >
            <img
              src="https://live.staticflickr.com/65535/53088605317_65a2f14066_c.jpg"
              alt=""
              className="img-1"
            />
          </div>
          <div
            className="grid-item img-5 wide"
            onClick={() =>
              seleccionarImagen(
                "https://live.staticflickr.com/65535/53089577120_d560464200_b.jpg"
              )
            }
          >
            <img
              src="https://live.staticflickr.com/65535/53089577120_d560464200_b.jpg"
              alt=""
              className="img-2"
            />
          </div>
          <div
            className="grid-item img-6"
            onClick={() =>
              seleccionarImagen(
                "https://live.staticflickr.com/65535/53089359329_12510fa21f_c.jpg"
              )
            }
          >
            <img
              src="https://live.staticflickr.com/65535/53089359329_12510fa21f_c.jpg"
              alt=""
              className="img-1"
            />
          </div>
        </div>
        {imagenSeleccionada && (
          <div className="modal">
            <Button
              className="boton-cerrado"
              variant="light"
              onClick={cerrarImagen}
            >
              <h4>X</h4>
            </Button>
            <div className="modal-content mt-5">
              <img
                src={imagenSeleccionada}
                alt=""
                className="imagen-ampliada"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Galeria;
