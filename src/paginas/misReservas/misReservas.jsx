import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { ReservasContexto } from "../../contexto/contexto";
import "../../estilos/misReservas.css";
import ContenedorReservas from "./ContenedorReservas/contenedorReservas";
import ModalReservas from "./ModalReservas/modalReservas";

const misReservas = () => {


  const { TraerReservas, Reservas } = useContext(ReservasContexto);
  {
    Reservas === undefined && TraerReservas();
  }

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


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
              <ContenedorReservas onShowModal={handleShowModal} key={Reserva.id} />
            ))}
          </Row>
              <ModalReservas showModal={showModal} onCloseModal={handleCloseModal} />
        </Container>
      </div>
    </>
  );
};

export default misReservas;
