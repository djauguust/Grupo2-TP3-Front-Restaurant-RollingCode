import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsuariosContext } from "../../context/UserContext";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const Header = () => {
  const { logout } = useContext(UsuariosContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar fixed="top" expand="lg" className="custom-navbar bg-white">
        <Navbar.Brand href="/" className="ms-4">
          <img
            alt=""
            src="public\Diseño sin título.png"
            width=""
            height="80"
            className="d-inline-block align-top m-0 logo-custom"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center collapse-custom"
        >
          <Nav className="ml-auto mb-2 mb-lg-0">
            <Nav.Link
              as={Link}
              to="/"
              className="Nav.Link text-dark m-2 botones"
            >
              INICIO
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/acercadenosotros"
              className="text-dark m-2 botones"
            >
              QUIENES SOMOS
            </Nav.Link>
            <Nav.Link as={Link} to="/galeria" className="text-dark m-2 botones">
              GALERIA
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contacto"
              className="text-dark m-2 botones"
            >
              CONTACTO
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/reservas"
              className=" text-light m-2 boton-reserva"
            >
              HAZ TU RESERVA
            </Nav.Link>
          </Nav>
          <Nav
            style={{ display: "block", left: "50px", position: "relative" }}
            className="botones-izquierda"
          >
            {user ? (
              <>
                <Button
                  className=" boton-izq-custom"
                  as={Link}
                  onClick={handleShow}
                  variant="success"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                  </svg>
                  Ver perfil
                </Button>
                <Offcanvas show={show} onHide={handleClose} placement="end">
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                      <h3>Bienvenido {user.name}</h3>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body className="text-center">
                    <h5>Datos de usuario</h5>
                    <img
                      src="public\cocinero-icono-plano-chef-avatar-ilustracion-vectorial-diseno-dibujos-animados-chef-bigotudo-gorra-u-removebg-preview.png"
                      alt=""
                      height="200px"
                    />
                    <p>Nombre de usuario: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>ID: {user.id}</p>
                    <Button variant="danger" onClick={logout}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-box-arrow-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                        />
                      </svg>
                      Cerrar sesion
                    </Button>{" "}
                  </Offcanvas.Body>
                </Offcanvas>
              </>
            ) : (
              <Nav.Link
                className="text-dark boton-izq-custom"
                as={Link}
                to="/login"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>{" "}
                Iniciar Sesion
              </Nav.Link>
            )}
            <Nav.Link
              target="_blank"
              href="https://www.google.com/maps/place/Olga+Cossettini+750,+Buenos+Aires/@-34.6111001,-58.3780726,13.75z/data=!4m6!3m5!1s0x95a3352ec57d549b:0x5341533dfe791f9f!8m2!3d-34.6067233!4d-58.3638578!16s%2Fg%2F11fk3r6bhk?entry=ttu"
              className="text-dark boton-izq-custom"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>{" "}
              Ubicacion
            </Nav.Link>
            <Nav.Link className="text-dark boton-izq-custom">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-globe-americas"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
              </svg>{" "}
              Idioma
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
