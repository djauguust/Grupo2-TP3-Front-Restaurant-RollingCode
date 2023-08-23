import TablaUsuarios from "../../Components/TablaUsuarios";
import TablaReservas from "../../Components/TablaReservas";
import CardsReservas from "../../Components/CardsReservas";
import CardsUsuarios from "../../Components/CardsUsuarios";
import style from "./Administrador.module.css"

const Admin = () =>{

    return(
        <>
            <h1>Administracion</h1>
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
        </>
    )
}

export default Admin;