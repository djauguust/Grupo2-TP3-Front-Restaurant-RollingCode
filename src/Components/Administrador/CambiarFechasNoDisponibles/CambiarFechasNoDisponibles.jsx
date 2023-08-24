import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import ModalEditar from '../../ModalEditarReserva';
import ModalCambiarFecha from './ModalCambiarFecha';
import { AdministradorContexto } from '../../../Contexto/ContextoAdmin';

const CambiarFechasNoDisponibles = () => {


    const { traerFechasNoDisponibles, FechasNoDisponibles} = useContext(AdministradorContexto)


    const [pagina, setPagina] = useState(1);
    const [conteo, setConteo] = useState(0);
    const [FechasNoDisponibles10, setFechasNoDisponibles10] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    //Valor externo para que traer una reserva funcione una vez y no sea un bucle infinito
    const [externalChange, setExternalChange] = useState(false);
  
    const [act, setAct] = useState(0);

    const url = import.meta.env.VITE_API_FECHASNODISPONIBLES

    

    useEffect(() => {
      if(externalChange) {
        traerFechasNoDisponibles()
        setExternalChange(false)
      }
    }, [externalChange])



    useEffect(() => {
        if (FechasNoDisponibles.length === 0) {
            setExternalChange(true)
        }
    },[FechasNoDisponibles])
    

    const eliminarFechaNoDisponible = async (id) => {
        try {
            const res = await axios.delete(`${url}/${id}`)

        } catch (error) {
      console.error("Error al actualizar la reservación:", error);
            
        }
    }



    const mostrarFechasNoDisponibles = () => {
        const inicio = (pagina - 1) * 10;
    const fin = inicio + 10;
    const fechasMostradas = busqueda === ""
      ? FechasNoDisponibles.slice(inicio, fin)
      : FechasNoDisponibles.filter(reserv => reserv.Fecha === busqueda);

    return fechasMostradas.map((reserv) => (
      <tr key={reserv.id}>
        <td>{reserv.Fecha}</td>


        <td>
          <ModalCambiarFecha reserva={reserv} url={URL} />
          <Button className="mx-2" onClick={() => eliminar(reserv.id)}>
            Eliminar
          </Button>
        </td>
      </tr>
    ));
    }



  return (
    <Container>
         <h2 className="my-3 text-center">Fechas No Disponibles</h2>
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
                    </tr>
                </thead>

                <tbody>
                    {mostrarFechasNoDisponibles()}
                    
                </tbody>

            </Table>
            <div>
                <p>Página: {pagina}</p>
                 <Button
                    onClick={()=>{
                        if(habBoton==true){
                            if(conteo+10 >= FechasNoDisponibles.length){
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
    </Container>
  )
}

export default CambiarFechasNoDisponibles