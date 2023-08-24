import TablaUsuarios from "../../Components/TablaUsuarios";
import TablaReservas from "../../Components/TablaReservas";
import CardsReservas from "../../Components/CardsReservas";
import CardsUsuarios from "../../Components/CardsUsuarios";

import "./Administrador.css"
import CambiarFechasNoDisponibles from "../../Components/Administrador/CambiarFechasNoDisponibles/CambiarFechasNoDisponibles";

const Admin = () =>{

    return(
        <>

            <div className="cards">
                <CardsReservas/>
            </div>

            <div className="cards">
                <CardsUsuarios/>
            </div>

            <div className="tabla">
                <TablaReservas/>
            </div>
            
            <div className="tabla">
                <TablaUsuarios/>
            </div>

            <div className="tabla">
                <CambiarFechasNoDisponibles />
            </div>
        </>
    )
}

export default Admin;