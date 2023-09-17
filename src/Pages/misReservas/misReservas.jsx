import { useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ContenedorReservas from "./ContenedorReservas/contenedorReservas";
import ModalReservas from "./ModalReservas/modalReservas";
import { ReservasContexto } from "../../context/ReservasContexto";
import "../../styles/misReservas.css";

const MisReservas = () => {
  //Traigo todo esto del context
  const { TraerUnaReserva, Reserva, selectedReservaId, setSelectedReservaId } =
    useContext(ReservasContexto);

  const { t } = useTranslation();

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
          <h1>{t("misreservas")}</h1>
        </div>
        <article className="Ubicar-Contenedor-Reservas">
          <div className="d-flex justify-content-center">
              {/*Map para que recorra el id y me muestre las reservas*/}
              {Reserva ? (
            <Row className="rowDeMisReservas">
                {Reserva.map((Reserva) => (
                  <ContenedorReservas
                    onShowModal={handleShowModal}
                    key={Reserva._id}
                    UnaReserva={Reserva}
                  />
                ))}
            </Row>
                
                ):(
                  <div className="text-center">

                    <h2>{t("NoHizoNingunaReserva")}</h2>
                  </div>
                )}
            
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
