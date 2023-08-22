import { useEffect, useState } from "react"
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ModalEditarUsuario from "./ModalEditarUsuario";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const CardsUsuarios = () =>{
    const [usuarios, setUsuarios] = useState([]);
    const [usuarios10, setusuarios10] = useState([]);
    const [act, setAct] = useState(0);
    const [busqueda, setBusqueda] = useState("");

    const [conteo,setConteo] = useState(0);

    const URL= import.meta.env.VITE_API_USUARIOS;

    useEffect(()=>{
        const getUsuarios = async () =>{
            const respuesta = await axios.get(URL).then((res)=>{
                setUsuarios(res.data);
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
        getUsuarios();
    }, []);

    useEffect(()=>{
        cargarPagina();
        
    });

    const cargarPagina = () => {

        for(let i=0; i<10; i++){
  
          if(i==9){
            setAct(-1);
          }
  
            if(usuarios.length > (conteo+i) && usuarios[conteo+i].id>=0){
                usuarios10[conteo+i]=usuarios[conteo+i];
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
        }
      }

    return(
        <>
            <h1 className="my-3 text-center text-light">Usuarios</h1>
            <input type="text" 
                value={busqueda}
                onChange={(ev)=>{
                    setBusqueda(ev.target.value);
                }}
                placeholder="Buscar por Nombre, Email o ID"
                className="my-2"
            />
                    {
                      busqueda == "" ?
                        usuarios10.map((user)=>(
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
                        :
                        usuarios.map((user)=>{
                          if(user.Nombre == busqueda || user.Email == busqueda || user.id == busqueda){
                            return(
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
                            );
                          } else {
                            return null;
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

export default CardsUsuarios