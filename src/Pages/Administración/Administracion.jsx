import React, { useState } from "react";
import "./administracion.css";
import { Container, Nav } from "react-bootstrap";
import { AdministrarReservas } from "./AdministrarReservas";
import { AdministrarUsuarios } from "./AdministrarUsuarios";
import { BandejaDeEntrada } from "./BandejaDeEntrada";
import { AdministrarRestaurant } from "./AdministrarRestaurant";
import Error404 from "../Error404/Error404";

export const Administracion = () => {
  const [showInterface, setShowInterface] = useState(0); // Nos dice que interfaz debe mostrar
  const [isDoorman, setIsDoorman] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setShowInterface(tabIndex);
    setActiveTab(tabIndex);
  };

  const obtenerToken = localStorage.getItem("user");
  let userToken;
  // Leo el LocalStorage
  if (obtenerToken) {
    userToken = JSON.parse(obtenerToken) || null;
  }
  console.log(userToken);
  return (
    <>
      {userToken ? (
        <>
          <h2 className="about-title mb-3">Administracion</h2>
          <Nav fill variant="tabs" defaultActiveKey="/administrador">
            <Nav.Item>
              <Nav.Link
                className={`color-elegido ${activeTab === 0 ? "active" : ""}`}
                onClick={() => handleTabClick(0)}
              >
                Reservas
              </Nav.Link>
            </Nav.Item>
            {!isDoorman && (
              <>
                <Nav.Item>
                  <Nav.Link
                    className={`color-elegido ${
                      activeTab === 1 ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(1)}
                  >
                    Usuarios
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className={`color-elegido ${
                      activeTab === 2 ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(2)}
                  >
                    Bandeja de Entrada
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className={`color-elegido ${
                      activeTab === 3 ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(3)}
                  >
                    Restaurant
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
          <Container fluid>
            {showInterface === 0 && (
              <AdministrarReservas isDoorman={isDoorman} />
            )}
            {!isDoorman && (
              <>
                {showInterface === 1 && <AdministrarUsuarios userToken={userToken} />}
                {showInterface === 2 && <BandejaDeEntrada />}
                {showInterface === 3 && <AdministrarRestaurant />}
              </>
            )}
          </Container>
        </>
      ) : (
        <Error404 />
      )}
    </>
  );
};
