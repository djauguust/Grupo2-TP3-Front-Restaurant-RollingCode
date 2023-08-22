import { useEffect, useState } from "react"
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ModalEditar from "./ModalEditarReserva";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import style from "./cardsHoy.css";

const CardsReservasHoy = () =>{
    const [reservas, setReservas] = useState([]);
    const fechaHoy = obtenerFechaActual();

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

    function obtenerFechaActual() {
      const fecha = new Date();
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1); // Los meses van de 0 a 11
      const año = fecha.getFullYear();
    
      return `${dia}/${mes}/${año}`;
    }

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
            <h1 className="mt-5 text-center text-light">Reservas</h1>
                    <div className="contenedor">
                    {
                        reservas.map((reserv)=>{

                          console.log("fecha", reserv.Fecha)
                          console.log(fechaHoy, "la de hoy");
                            if(reserv.Fecha==fechaHoy){
                              return(
                                <>
                                  <Card className="caja">
                                    <Card.Img variant="top" src="https://marketing4ecommerce.co/wp-content/uploads/2018/06/Ahora-puedes-hacer-reservaciones-en-restaurantes-desde-Google-Maps-Colombia-compressor-1280x720.jpg" />
                                    <Card.Body>
                                      <Card.Title>Reservación</Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                      <ListGroup.Item>Fecha: {reserv.Fecha}</ListGroup.Item>
                                      <ListGroup.Item>Cantidad de personas: {reserv.CantidadDePersonas}</ListGroup.Item>
                                      <ListGroup.Item>Hora: {reserv.Hora}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body>
                                    <ModalEditar reserva={reserv} url={URL}/>
                                    <Button className="mx-2" onClick={() => eliminar(reserv.id)}>Eliminar</Button>
                                    </Card.Body>
                                  </Card>
                                </>
                              );
                            } 
                            })
                    }
                    </div>
        </>
    )
}

export default CardsReservasHoy