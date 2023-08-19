import { useEffect, useState } from "react"
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ModalEditarUsuario from "./ModalEditarUsuario";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const CardsUsuarios = () =>{
    const [usuarios, setUsuarios] = useState([]);

    const URL= import.meta.env.VITE_API_USUARIOS;

    useEffect(()=>{
        const getUsuarios = async () =>{
            const respuesta = await axios.get(URL).then((res)=>{
                setUsuarios(res.data);
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
        getUsuarios();
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
        }
      }

    return(
        <>
            <h1 className="my-3 text-center text-light">Usuarios</h1>
            
                    {
                        usuarios.map((user)=>(
                            <>
                                <Card className="w-100 my-3">
                            <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png" />
                            <Card.Body>
                              <Card.Title>{user.Rol}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                              <ListGroup.Item>Id: {user.id}</ListGroup.Item>
                              <ListGroup.Item>Nombre: {user.Nombre}</ListGroup.Item>
                              <ListGroup.Item>Email: {user.Email}</ListGroup.Item>
                              <ListGroup.Item>Contraseña: {user.Contrasena}</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <ModalEditarUsuario usuario={user} url={URL}/>
                                        <Button onClick={() => eliminar(user.id)} className="mx-2">Eliminar</Button>
                            </Card.Body>
                          </Card>
                            </>
                        ))
                    }
        </>
    )
}

export default CardsUsuarios