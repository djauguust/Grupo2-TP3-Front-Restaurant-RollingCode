import { useEffect, useState } from "react"
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ModalEditar from "./ModalEditarReserva";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import style from "./cardsHoy.css";
import Swal from "sweetalert2";

const CardsReservasHoy = () =>{
    const [reservas, setReservas] = useState([]);
    const fechaHoy = obtenerFechaActual();

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

    function obtenerFechaActual() {
      const fecha = new Date();
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
      const año = fecha.getFullYear();
    
      return `${dia}/${mes}/${año}`;
    }
    
      const reservaUsada =(id) => {
        Swal.fire({
          title: 'Estas seguro que la reserva fue usada?',
          text: "No podras revertir este cambio.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, estoy seguro!',
          cancelButtonText: 'No,me equivoque'
        }).then(async (result) => {
          if (result.isConfirmed) {
          
            try {
              const response = await axios.patch(`${URL}/${id}`,{
                FueUsada: true
              })
              console.log(response);
            } catch (error) {
              console.log(error);
            }
            Swal.fire(
              'Reserva usada!',
              'La reserva ya fue marcada como usa exitosamente.',
              'success'
            )
          }
        })
      }

    return(
        <>
            <h1 className="mt-5 text-center text-light">Portero</h1>
                    <div className="contenedor">
                    {
                        reservas.map((reserv)=>{



                            if(reserv.Fecha==fechaHoy){
                              return(
                                
                                  <Card className="caja text-center" key={reserv.id}>
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
                                    <Button className="mx-2" onClick={() => reservaUsada(reserv.id)}>Reserva Usada</Button>
                                    </Card.Body>
                                  </Card>
                                
                              );
                            } 
                            })
                    }
                    </div>
        </>
    )
}

export default CardsReservasHoy