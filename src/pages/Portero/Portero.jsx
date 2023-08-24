import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import style from "./Portero.module.css"
import CardsReservasHoy from "../../Components/CardsReservasHoy";

const Portero = () =>{

    return(
        <>
            <div className={style.contenedor}>
                <div className="ContenedorTablas">
                <div className="tabla">
                    <CardsReservasHoy/>
                </div>
                </div>
            </div>

        </>
    )
}

export default Portero;