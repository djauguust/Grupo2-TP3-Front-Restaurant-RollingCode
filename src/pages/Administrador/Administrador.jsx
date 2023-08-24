import TablaUsuarios from "../../Components/TablaUsuarios";
import TablaReservas from "../../Components/TablaReservas";


import "./Administrador.css";
import CambiarFechasNoDisponibles from "../../Components/Administrador/CambiarFechasNoDisponibles/CambiarFechasNoDisponibles";
import { Accordion } from "react-bootstrap";
import Restautante from "../Restaurante/Restautante";

const Admin = () => {
  return (
    <>
      <Accordion defaultActiveKey="0" className="p-3 " alwaysOpen>
        <Accordion.Item eventKey="0" >
          <Accordion.Header >Administración Principal</Accordion.Header>
          <Accordion.Body>
            <div className="ContenedorTablas">
              <div className="tabla">
                <TablaReservas />
              </div>
            </div>
            <div className="ContenedorTablas">
              <div className="tabla">
                <TablaUsuarios />
              </div>
            </div>

            <div className="ContenedorTablas">
              <div className="tabla">
                <CambiarFechasNoDisponibles />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" >
          <Accordion.Header>Administrar Restaurant</Accordion.Header>
          <Accordion.Body>
            <Restautante />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default Admin;
