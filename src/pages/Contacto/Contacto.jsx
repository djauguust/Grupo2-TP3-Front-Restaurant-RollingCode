import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Mapa from "../../components/Mapa"
import style from "./Contacto.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from "../../components/FormContacto";

const Contacto = () =>{

    return(
        <>
            <div className={style.container}>

                <div className={style.header}>
                    <Header/>
                </div>

                <div className={`text-center ${style.banner}`}>
                    <h1>CONTACTANOS</h1>
                </div>

                <h5 className={`mx-5 mt-5 text-center ${style.parrafo}`}>
                    ¡Tu satisfacción es nuestra prioridad! Si tienes alguna pregunta, inquietud o necesitas asistencia para hacer una reserva, no dudes en contactarnos. Nuestro equipo estará encantado de ayudarte en todo lo que necesites para que disfrutes de una experiencia inolvidable en nuestro restaurante.
                </h5>

                <div className={`p-5 ${style.mapa}`}>
                    <Mapa/>
                </div>

                <div className={`p-5 ${style.formContacto}`}>
                    <Formulario/>
                </div>

                <div className={style.footer}>
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default Contacto