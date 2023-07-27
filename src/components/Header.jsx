import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Header.css"

const Header = () => {
  return (
    <>
    <div className='superior text-end m-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg> Iniciar Sesion | Ubicacion | Idioma</div>
      <Navbar expand="lg" className="custom-navbar">
          <Navbar.Brand href="#home" className='ms-4'>
            <img
              alt=""
              src="public\logo nuevo.png"
              width="100"
              height="100"
              className="d-inline-block align-top m-0"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center'>
              <Nav className="ml-auto mb-2 mb-lg-0">
                <Nav.Link href="#home" className='text-dark m-2 botones'>INICIO</Nav.Link>
                <Nav.Link href="#link" className='text-dark m-2 botones'>QUIENES SOMOS</Nav.Link>
                <Nav.Link href="#link" className='text-dark m-2 botones'>GALERIA</Nav.Link>
                <Nav.Link href="#link" className='text-dark m-2 botones'>CONTACTO</Nav.Link>
                <Nav.Link href="#link" className=" text-light m-2 boton-reserva">
                  HAZ TU RESERVA
                </Nav.Link>
                {/* NavDropdown... */}
              </Nav>
          </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;