import { Link } from "react-router-dom";
import "../styles/ButtonDefault.css";

function ButtonDefault({ namebtn, TipoBoton, funcion, to = null, Funcion }) {
  return (
    <>
      {to ? (
        <Link to={"/Registro"} className="lin0k">
          ¿No tienes cuenta? ¡Crea una!
        </Link>
      ) : (
        <button className="btn mt-3 mb-3" type={TipoBoton} onClick={Funcion}>
          {namebtn}
        </button>
      )}
    </>
  );
}

export default ButtonDefault;
