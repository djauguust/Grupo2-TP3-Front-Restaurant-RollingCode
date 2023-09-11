import { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { ReservasContexto } from "../../context/ReservasContexto";
import "../../styles/misReservas.css";
import ContenedorReservas from "./ContenedorReservas/contenedorReservas";
import ModalReservas from "./ModalReservas/modalReservas";
import { UsuariosContext } from "../../context/UserContext";

const MisReservas = () => {
  //Traigo todo esto del context
  const {
    TraerUnaReserva,
    Reserva,
    selectedReservaId,
    setSelectedReservaId,
    Reservas,
  } = useContext(ReservasContexto);

  //Digo que si reservas no tiene valor me traiga todas la reservas para poder mostrarlas con el map

  useEffect(() => {
    TraerUnaReserva();
  }, []);

  //Funcion para el modal
  const [showModal, setShowModal] = useState(false);

  //Sirve para mostrar el modal y con el SelectReservaId paso el id al modal para poder usarlo
  const handleShowModal = (reservaId) => {
    setSelectedReservaId(reservaId);
    setShowModal(true);
  };

  //Lo mismo pero para cerrar el modal y borrar el valor del id para usarlo con la otra reserva
  const handleCloseModal = () => {
    setSelectedReservaId("");
    setShowModal(false);
  };

  return (
    <>
      <section className="contenedorMisReservas">
        <div className="text-center mt-3">
          <h1>Mis Reservas</h1>
        </div>
        <article className="Ubicar-Contenedor-Reservas">
          <div className="d-flex justify-content-center">
            <Row className="rowDeMisReservas">
              {/*Map para que recorra el id y me muestre las reservas*/}
              {Reserva &&
                Reserva.map((Reserva) => (
                  <ContenedorReservas
                    onShowModal={handleShowModal}
                    key={Reserva._id}
                    Reserva={Reserva}
                  />
                ))}
            </Row>
            {/*Modal*/}
            <ModalReservas
              showModal={showModal}
              selectedReservaId={selectedReservaId}
              onCloseModal={handleCloseModal}
            />
          </div>
        </article>
      </section>
    </>
  );
};

export default MisReservas;
