import { useContext, useEffect } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { ReservasContexto } from "../../contexto/contexto";
import "../../estilos/misReservas.css";
import ContenedorReservas from "./ContenedorReservas/contenedorReservas";

const misReservas = () => {
  const Url = import.meta.env.VITE_API_RESERVAS;

  const { TraerReservas, Reservas } = useContext(ReservasContexto);
  {
    Reservas === undefined && TraerReservas();
  }

  return (
    <>
      <div className="text-center mt-3">
        <h1>Mis Reservas</h1>
      </div>
      <div className="Ubicar-Contenedor-Reservas">
        <Container className="d-flex justify-content-center">
          <Row>
          {Reservas &&
            Reservas.map((Reserva) => (
              <ContenedorReservas />
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default misReservas;
