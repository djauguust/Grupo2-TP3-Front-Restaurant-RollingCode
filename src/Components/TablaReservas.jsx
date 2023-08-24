import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { Table, Button, Alert } from "react-bootstrap";
import ModalEditar from "./ModalEditarReserva";
import { AdministradorContexto } from "../Contexto/ContextoAdmin";
import Swal from "sweetalert2";


const TablaReservas = () =>{

    const {TraerReservas,reservas,TraerUsuarios,usuarios,setUsuarios} = useContext(AdministradorContexto)

    const [pagina, setPagina] = useState(1);
    const [conteo,setConteo] = useState(0);
    const [reservas10, setReservas10] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [habBoton, setHabBoton]= useState(true);

    const [act, setAct] = useState(0);

    const URL= import.meta.env.VITE_API_RESERVAS;



    useEffect(() => {
            TraerReservas()
    
        }, [act]);
    
    useEffect(()=>{
        {reservas.length === 0 && (
            TraerReservas()
        )}
        cargarPagina(); 
    });

    const cargarPagina = () => {

        for(let i=0; i<10; i++){
            if(i==9){
                setAct(-1);
            }

            if(reservas.length > (conteo+i) ){
                reservas10[i]=reservas[conteo+i];
                if(i==9){
                    setAct(-10);
                }
            } else{
                reservas10[i]=[null];
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
                    const response = await axios.delete(`${URL}/${id}`);
                    Swal.fire(
                        'Su reserva fue eliminada!',
                        'Los datos de su reserva fueron eliminados exitosamente',
                        'success'
                    );
                     setAct(1); // Llamar a TraerReservas() después de la eliminación exitosa
                  
                } catch (error) {
                    console.error('Error al actualizar la reservación:', error);
                }
            }
          })
      }

    return(
        <>
            <h2 className="my-3 text-center">Reservas</h2>
            <p style={{ color: '#F0E5D8' }}>{act}</p>
            <input type="text" 
                value={busqueda}
                onChange={(ev)=>{
                    setBusqueda(ev.target.value);
                }}
                placeholder="Buscar fecha"
                className="my-2"
            />
            <div className="ContenedorTablaUsuario">

            <Table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Personas</th>
                        <th>Hora</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {
                    busqueda == "" ?
                    reservas10.map((reserv) => {
                        if (reserv.id >=0) {
                            return (
                                <tr key={reserv.id}>
                                    <td>{reserv.Fecha}</td>
                                    <td>{reserv.CantidadDePersonas}</td>
                                    <td>{reserv.Hora}</td>
                                    <td>
                                        <div className="ContenedorBotonesTablaUsuarios">
                                        <ModalEditar reserva={reserv} url={URL}/>
                                        <Button className="mx-2" onClick={() => eliminar(reserv.id)}>Eliminar</Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        }
                        else {
                            return null; // No renderiza nada si reserv está vacío
                        }
                    })
                    : 
                    reservas.map((reserv) => {
                        if (reserv.id >=0 && busqueda==reserv.Fecha) {
                            return (
                                <tr>
                                    <td>{reserv.Fecha}</td>
                                    <td>{reserv.CantidadDePersonas}</td>
                                    <td>{reserv.Hora}</td>
                                    <td>
                                    <div className="ContenedorBotonesTablaUsuarios">
                                        <ModalEditar reserva={reserv} url={URL}/>
                                        <Button className="mx-2" onClick={() => eliminar(reserv.id)}>Eliminar</Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        }
                        else {
                            return null; // No renderiza nada si reserv está vacío
                        }
                    })
                    }
                </tbody>

            </Table>
            </div>
            <div>
                <p>Página: {pagina}</p>
                <Button
                    onClick={()=>{
                        if(habBoton==true){
                            if(conteo+10 >= reservas.length){
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

export default TablaReservas