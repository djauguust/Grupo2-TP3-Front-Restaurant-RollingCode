import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import style from "./Portero.module.css"
import CardsReservasHoy from "../../Components/CardsReservasHoy";

const Portero = () =>{

    return(
        <>
        <h1>Portero</h1>
            
            <div className={style.contenedor}>
                <div className="cards">
                    <CardsReservasHoy/>
                </div>
            </div>

        </>
    )
}

export default Portero;