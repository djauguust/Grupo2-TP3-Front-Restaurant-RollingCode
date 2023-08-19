import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import style from "./Portero.module.css"
import CardsReservasHoy from "../../Components/CardsReservasHoy";

const Portero = () =>{

    return(
        <>
            <div className={style.nav}>
                <Header/>
            </div>
            
            <div className={style.contenedor}>
                <div className="cards">
                    <CardsReservasHoy/>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default Portero;