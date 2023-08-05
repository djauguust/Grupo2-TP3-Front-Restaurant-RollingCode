import "./Galeria.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const Galeria = () => {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const seleccionarImagen = (urlImagen) => {
    setImagenSeleccionada(urlImagen);
  };

  const cerrarImagen = () => {
    setImagenSeleccionada(null);
  };

  return (
    <>
      <body className="body-galeria">
        <h2 className="text-center text-light"><br></br>GALERIA</h2>
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
            <Button className="boton-cerrado" variant="light" onClick={cerrarImagen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
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
      </body>
    </>
  );
};

export default Galeria;
