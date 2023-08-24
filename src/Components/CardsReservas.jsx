import { useEffect, useState } from "react"
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ModalEditar from "./ModalEditarReserva";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const CardsReservas = () =>{
    const [reservas, setReservas] = useState([]);
    const [reservas10, setReservas10] = useState([]);
    const [act, setAct] = useState(0);
    const [busqueda, setBusqueda] = useState("");

    const [conteo,setConteo] = useState(0);


    const URL= import.meta.env.VITE_API_RESERVAS;

    useEffect(()=>{
        const getReservas = async () =>{
            const respuesta = await axios.get(URL).then((res)=>{
                setReservas(res.data);
                cargarPagina();
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

          if(reservas.length > (conteo+i) && reservas[conteo+i].id>=0){
              reservas10[conteo+i]=reservas[conteo+i];
              if(i==9){
                setAct(-10);
            }
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
            <h1 className="my-3 text-center text-light">Reservas</h1>
            <input type="text" 
                value={busqueda}
                onChange={(ev)=>{
                    setBusqueda(ev.target.value);
                }}
                placeholder="Buscar fecha"
                className="my-2"
            />
                    {
                      busqueda == "" ?
                        reservas10.map((reserv)=>(
                            <Card className="w-100 my-3" key={reserv.id}>
                            <Card.Img variant="top" src="https://marketing4ecommerce.co/wp-content/uploads/2018/06/Ahora-puedes-hacer-reservaciones-en-restaurantes-desde-Google-Maps-Colombia-compressor-1280x720.jpg" />
                            <Card.Body>
                              <Card.Title>Reservación</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                            <ListGroup.Item>ID: {reserv.id}</ListGroup.Item>
                              <ListGroup.Item>Fecha: {reserv.Fecha}</ListGroup.Item>
                              <ListGroup.Item>Cantidad de personas: {reserv.CantidadDePersonas}</ListGroup.Item>
                              <ListGroup.Item>Hora: {reserv.Hora}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                            <ModalEditar reserva={reserv} url={URL}/>
                            <Button className="mx-2" onClick={() => eliminar(reserv.id)}>Eliminar</Button>
                            </Card.Body>
                          </Card>
                        ))
                        :
                        reservas.map((reserv)=>{
                          if(reserv.id >=0 && busqueda==reserv.Fecha){
                            return(
                              <Card className="w-100 my-3" key={reserv.id}>
                          <Card.Img variant="top" src="https://marketing4ecommerce.co/wp-content/uploads/2018/06/Ahora-puedes-hacer-reservaciones-en-restaurantes-desde-Google-Maps-Colombia-compressor-1280x720.jpg" />
                          <Card.Body>
                            <Card.Title>Reservación</Card.Title>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                          <ListGroup.Item>ID: {reserv.id}</ListGroup.Item>
                            <ListGroup.Item>Fecha: {reserv.Fecha}</ListGroup.Item>
                            <ListGroup.Item>Cantidad de personas: {reserv.CantidadDePersonas}</ListGroup.Item>
                            <ListGroup.Item>Hora: {reserv.Hora}</ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                          <ModalEditar reserva={reserv} url={URL}/>
                          <Button className="mx-2" onClick={() => eliminar(reserv.id)}>Eliminar</Button>
                          </Card.Body>
                        </Card>
                            );
                          } else {
                            return null; // No renderiza nada si reserv está vacío
                        }
                        })
                    }
                  <Button size="lg"
                    onClick={()=>{
                          setConteo(conteo+5);
                          setAct(act+1)
                    }}
                >Ver más</Button>
        </>
    )
}

export default CardsReservas