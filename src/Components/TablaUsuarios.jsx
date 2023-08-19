import { useEffect, useState } from "react"
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import ModalEditarUsuario from "./ModalEditarUsuario";

const TablaUsuarios = () =>{
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
            <h2 className="my-3">Usuarios</h2>
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Contraseña</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        usuarios.map((user)=>(
                            <>
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.Nombre}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.Contrasena}</td>
                                    <td>{user.Rol}</td>
                                    <td>
                                        <ModalEditarUsuario usuario={user} url={URL}/>
                                        <Button onClick={() => eliminar(user.id)} className="mx-2">Eliminar</Button>
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

export default TablaUsuarios