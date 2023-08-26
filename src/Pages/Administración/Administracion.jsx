import React, { useState } from "react";
import "./administracion.css";
import { Container, Nav } from "react-bootstrap";
import { AdministrarReservas } from "./AdministrarReservas";
import { AdministrarUsuarios } from "./AdministrarUsuarios";
import { BandejaDeEntrada } from "./BandejaDeEntrada";
import { AdministrarRestaurant } from "./AdministrarRestaurant";

export const Administracion = () => {
  const [showInterface, setShowInterface] = useState(0); // Nos dice que interfaz debe mostrar
  const [isDoorman, setIsDoorman] = useState(false);

  return (
    <>
      <h2 className="about-title mb-3">Administracion</h2>
      <Nav fill variant="tabs" defaultActiveKey="/administrador">
        <Nav.Item>
          <Nav.Link
            className="color-elegido"
            onClick={() => setShowInterface(0)}
          >
            Reservas
          </Nav.Link>
        </Nav.Item>
        {!isDoorman && (
          <>
            <Nav.Item>
              <Nav.Link
                className="color-elegido"
                onClick={() => setShowInterface(1)}
              >
                Usuarios
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="color-elegido"
                onClick={() => setShowInterface(2)}
              >
                Bandeja de Entrada
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="color-elegido"
                onClick={() => setShowInterface(3)}
              >
                Restaurant
              </Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
      <Container fluid>
        {showInterface == 0 && <AdministrarReservas isDoorman={isDoorman} />}
        {!isDoorman && (
          <>
            {showInterface == 1 && <AdministrarUsuarios />}
            {showInterface == 2 && <BandejaDeEntrada />}
            {showInterface == 3 && <AdministrarRestaurant />}
          </>
        )}
      </Container>
    </>
  );
};
