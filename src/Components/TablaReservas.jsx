import { useEffect, useState } from "react"
import axios from "axios";
import { Table, Button, Alert } from "react-bootstrap";
import ModalEditar from "./ModalEditarReserva";

const TablaReservas = () =>{
    const [reservas, setReservas] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [conteo,setConteo] = useState(0);
    const [reservas10, setReservas10] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const [act, setAct] = useState(0);

    const URL= import.meta.env.VITE_API_RESERVAS;

    useEffect(()=>{
        const getReservas = async () =>{
            const respuesta = await axios.get(URL).then((res)=>{
                setReservas(res.data);
                
            }).catch ((response)=>{
                switch (response.response.status) {
                    case 404:
                            alert("Página no encontrada de usuarios");
                        break;
                    case 500:
                            alert("Sistema caído de usuarios");
                        break;
                }
            })
        }
        getReservas();
    }, []);

    useEffect(()=>{
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

    const eliminar = async (id)=>{
    
        try {
          const response = await axios.delete(
            `${URL}/${id}`
          );
          alert("Eliminado exitoso");
          handleClose();
        } catch (error) {
          console.error('Error al actualizar la reservación:', error);
        }
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
                                        <ModalEditar reserva={reserv} url={URL}/>
                                        <Button className="mx-2" onClick={() => eliminar(reserv.id)}>Eliminar</Button>
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
                                        <ModalEditar reserva={reserv} url={URL}/>
                                        <Button className="mx-2" onClick={() => eliminar(reserv.id)}>Eliminar</Button>
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
            <div>
                <p>Página: {pagina}</p>
                <Button
                    onClick={()=>{
                        setPagina(pagina+1);
                        setConteo(conteo+10);
                        setAct(act+1)
                    }}
                >Siguiente página</Button>
                <Button className="mx-2"
                    onClick={()=>{
                        if(pagina!=1){
                            setPagina(pagina-1);
                            setConteo(conteo-10);
                            
                        }
                        setAct(act+1)
                    }}
                >Anterior</Button>
            </div>
        </>
    )
}

export default TablaReservas