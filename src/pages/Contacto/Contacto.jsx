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


                <div className={`text-center ${style.banner}`}>
                    <p>CONTACTANOS</p>
                </div>

                <div className={style.container2}>
                    <h4 className={`mx-5 mt-5 text-center ${style.parrafo} ${style.titulo}`}>
                        ¡Tu satisfacción es nuestra prioridad! Si tienes alguna pregunta, inquietud o necesitas asistencia para hacer una reserva, no dudes en contactarnos.
                    </h4>
                    <div className={`p-5 ${style.formContacto}`}>
                        <Formulario/>
                    </div>

                    <div className={`p-5 ${style.mapa}`}>
                        <Mapa/>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Contacto