import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function navbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className="nav-link">Casa</Link>
            <Link to={"/Mis-Reservas"} className="nav-link">Mis Reservas</Link>
            <Link to={"/Crear-Reservas"} className="nav-link">Crear Reservas</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;