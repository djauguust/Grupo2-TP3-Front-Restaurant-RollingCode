import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import TablaUsuarios from "../../Components/TablaUsuarios";
import TablaReservas from "../../Components/TablaReservas";

const Admin = () =>{

    return(
        <>
            <Header/>
                <TablaUsuarios/>
                <TablaReservas/>
            <Footer/>
        </>
    )
}

export default Admin;