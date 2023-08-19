import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import TablaUsuarios from "../../Components/TablaUsuarios";
import TablaReservas from "../../Components/TablaReservas";
import style from "./Administrador.module.css"

const Admin = () =>{

    return(
        <>
            <div className={style.nav}>
                <Header/>
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