import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Mapa from "../../components/Mapa"
import style from "./Contacto.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Contacto = () =>{

    return(
        <>
            <div className={style.container}>

                <div className={style.header}>
                    <Header/>
                </div>

                <h5 className={`m-5 text-center ${style.parrafo}`}>
                    ¡Tu satisfacción es nuestra prioridad! Si tienes alguna pregunta, inquietud o necesitas asistencia para hacer una reserva, no dudes en contactarnos. Nuestro equipo estará encantado de ayudarte en todo lo que necesites para que disfrutes de una experiencia inolvidable en nuestro restaurante.
                </h5>

                <div className={`m-5 p-5 ${style.mapa}`}>
                    <Mapa></Mapa>
                </div>

                <div className={style.footer}>
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default Contacto