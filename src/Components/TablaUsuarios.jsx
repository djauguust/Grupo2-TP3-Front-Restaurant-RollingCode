import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ModalEditarUsuario from "./ModalEditarUsuario";
import { AdministradorContexto } from "../Contexto/ContextoAdmin";
import Swal from "sweetalert2";

const TablaUsuarios = () =>{

    const {TraerUsuarios, usuarios,TraerReservas} = useContext(AdministradorContexto)

    const [usuarios10, setReservas10] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [conteo,setConteo] = useState(0);
    const [busqueda, setBusqueda] = useState("");
    const [habBoton, setHabBoton]= useState(true);

    const [act, setAct] = useState(0);


    const URL= import.meta.env.VITE_API_USUARIOS;

        
    useEffect(() => {
        TraerUsuarios()

    }, [act]);

    


    useEffect(()=>{
        cargarPagina();
        if (usuarios.length === 0) {
            TraerUsuarios();
        }
    });

    const cargarPagina = () => {

        for(let i=0; i<10; i++){
            if(i==9){
                setAct(-1);
            }
            if(usuarios.length > (conteo+i) ){
                usuarios10[i]=usuarios[conteo+i];
                if(i==9){
                    setAct(-10);
                }

            } else{
                usuarios10[i]=[null];
            }
        }
        
    }

    // Elimina la reserva

    const eliminar = (id)=>{
        Swal.fire({
            title: 'Esta seguro de que desea borrar la reserva?',
            text: "La reserva fue eliminada exitosamente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro!',
            cancelButtonText: 'No quiero eliminarla!'
          }).then( async ( result) => {
            if (result.isConfirmed) {
                try {
                  const response = await axios.delete(
                    `${URL}/${id}`
                  );
                  Swal.fire(
                    'Su reserva fue eliminada!',
                    'Los datos de su reserva fueron eliminados exitosamente',
                    'success'
                ) 
                  setAct(1)
                } catch (error) {
                    console.log(error);
                }
            }
          })
    
      }


      const mostrarUsuarios = () => {
        const inicio = (pagina - 1) * 10;
    const fin = inicio + 10;
    const usuariosMostrados = busqueda === ""
      ? usuarios.slice(inicio, fin)
      : usuarios.filter(reserv => reserv.nombre=== busqueda);

    return usuariosMostrados.map((usuario) => (
        <tr key={usuario._id}>
        <td>{usuario.nombre}</td>
        <td>{usuario.email}</td>
        <td>{usuario.esAdmin === 0
      ? "Usuario"
      : usuario.esAdmin === 1
      ? "Portero"
      : usuario.esAdmin === 2
      ? "Administrador"
      : ""}</td>
        <td>
            <div className="ContenedorBotonesTablaUsuarios">
            <ModalEditarUsuario usuario={usuario}/>
            <Button className="mx-2" onClick={() => eliminar(usuario._id)}>Eliminar</Button>
            </div>
        </td>
    </tr>
    ));
    }

    return(
        <>
            <p style={{ color: '#F0E5D8' }}>{act}</p>
            <h2 className="my-3 text-center">Usuarios</h2>
            <input type="text" 
                value={busqueda}
                onChange={(ev)=>{
                    setBusqueda(ev.target.value);
                }}
                placeholder="Buscar por Nombre, Email o ID"
                className="my-2"
            />
            <div className="ContenedorTablaUsuario">

            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {mostrarUsuarios()} 

                </tbody>
            </Table>
            </div>
            <div>
                <p>Página: {pagina}</p>
                <Button
                    onClick={()=>{
                        if(habBoton==true){
                            if(conteo+10 >= usuarios.length){
                                setHabBoton(false);
                            } else {

                                setPagina(pagina+1);
                                setConteo(conteo+10);
                                setAct(act+1)
                            }
                        }
                    }}
                    >Siguiente página</Button>
                <Button className="mx-2"
                    onClick={()=>{
                        if(pagina!=1){
                            setPagina(pagina-1);
                            setConteo(conteo-10);
                            if (habBoton==false){
                                setHabBoton(true);
                            }
                        }
                        setAct(act+1)
                    }}
                >Anterior</Button>
            </div>
        </>
    )
}

export default TablaUsuarios