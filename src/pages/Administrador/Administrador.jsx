import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import TablaUsuarios from "../../Components/TablaUsuarios";
import TablaReservas from "../../Components/TablaReservas";
import CardsReservas from "../../Components/CardsReservas";
import CardsUsuarios from "../../Components/CardsUsuarios";
import style from "./Administrador.module.css"

const Admin = () =>{

    return(
        <>
            <div className={style.nav}>
                <Header/>
            </div>
            
            <div className={style.cards}>
                <CardsReservas/>
            </div>

            <div className={style.cards}>
                <CardsUsuarios/>
            </div>

            <div className={style.tabla}>
                <TablaReservas/>
            </div>
            
            <div className={style.tabla}>
                <TablaUsuarios/>
            </div>
            <Footer/>
        </>
    )
}

export default Admin;