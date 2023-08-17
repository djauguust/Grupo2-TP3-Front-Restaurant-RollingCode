import { useEffect, useState } from "react"
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ModalEditar from "./ModalEditarReserva";

const TablaReservas = () =>{
    const [reservas, setReservas] = useState([]);

    const URL= import.meta.env.VITE_API_RESERVAS;

    useEffect(()=>{
        const getReservas = async () =>{
            const respuesta = await axios.get(URL).then((res)=>{
                setReservas(res.data);
                console.log(res.data);
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


    // Elimina la reserva

    const eliminar = async (id)=>{

        console.log(`${URL}/${id}`)
    
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
            <h2 className="my-3">Reservas</h2>
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
                        reservas.map((reserv)=>(
                            <>
                                <tr>
                                    <td>{reserv.Fecha}</td>
                                    <td>{reserv.CantidadDePersonas}</td>
                                    <td>{reserv.Hora}</td>
                                    <td>
                                        <ModalEditar reserva={reserv} url={URL}/>
                                        <Button className="mx-2" onClick={() => eliminar(reserv.id)}>Eliminar</Button>
                                    </td>
                                </tr>
                            </>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default TablaReservas