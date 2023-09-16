import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Stack } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useTranslation } from "react-i18next";
import { NavbarContext } from "../../../context/NavbarContext";
import { ReservasContexto } from "../../../context/ReservasContexto";

const contenedorReservas = ({ onShowModal, Reserva }) => {
  const url = import.meta.env.VITE_API;
  const { t } = useTranslation();

  const { theme } = useContext(NavbarContext);

  const newTheme =
    theme === "claro" ? "light" : theme === "oscuro" ? "dark" : theme;

  const TokenPuro = localStorage.getItem("user");

  const [valorExtero, setValorExterno] = useState(false);

  const { TraerUnaReserva } = useContext(ReservasContexto);

  //Sirve para parasr el id al modal
  const clickEditar = () => {
    onShowModal(Reserva);
  };

  useEffect(() => {
    TraerUnaReserva();
    setValorExterno(false);
  }, [valorExtero]);

  const EliminarDatos = () => {
    Swal.fire({
      title: t("EliminarReserva"),
      text: t("EliminarAlgo"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("SiEstoySeguro"),
      cancelButtonText: t("NoMejorNo"),
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${url}/reservas/${Reserva._id}`, {
          headers: {
            "auth-token": TokenPuro.replace(/^"(.*)"$/, "$1"),
          },
        });
        setValorExterno(true);
        Swal.fire(
          t("ReservaEliminadaExitosamente"),
          t("EliminacionExitosa"),
          "success"
        );
      }
    });
  };

  //Todo abajo es el contenido de las reservas, para el diseño
  return (
    <>
      <Col xs={12} md={6} lg={6} className="ColMisReservas">
        <div className={`Contenedor-Reservas custom-${newTheme}`}>
          <Stack gap={3}>
            <div className="Contenedor-Fecha">
              <h3 className="TituloReservaParaDia">
                {`${t("reservasDia")} ${Reserva.fecha}`}
              </h3>
            </div>
            <div className="text-center">
              <h4>{`${t("hora")}: ${Reserva.hora}`}</h4>
              <h4 className="Contenedor-Cantidad-Personas">
                {`${t("cantidadComensales")}: ${Reserva.comensales}`}
              </h4>
              <div className="mt-2 d-flex justify-content-around">
                <Button onClick={clickEditar} className="me-1">
                  {t("editar")}
                </Button>
                <Button onClick={EliminarDatos} className="ms-1">
                  {t("borrar")}
                </Button>
              </div>
            </div>
          </Stack>
        </div>
      </Col>
    </>
  );
};

export default contenedorReservas;
