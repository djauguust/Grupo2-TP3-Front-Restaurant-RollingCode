import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Menu.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Menu = () => {
  return (
    <>
      <div className="custom-menu">
        <div className="contenedor-tabs mt-4">
          <h2 className="text-center">Menu</h2>
          <Tabs
            defaultActiveKey="Pastas"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab
              eventKey="Pastas"
              title={<span className="tab-title">Pastas</span>}
            >
              <h3 className="text-center">SPAGHETTI ALLA BOLOGNESE</h3>
              <p className="text-center">
                Exquisito Spaghetti con salsa bolognesa, carne de res y hierbas
                aromáticas
              </p>
              <h4 className="text-center">$1650</h4>
              <hr />
              <h3 className="text-center">RAVIOLI ALLA CARBONARA</h3>
              <p className="text-center">
                Ravioles con cremosa salsa carbonara y panceta crujiente.
              </p>
              <h4 className="text-center">$1800</h4>
              <p className="text-center">Ricota | Verdura | Queso</p>
              <hr />
              <h3 className="text-center">CANNELLONI DI POLLO</h3>
              <p className="text-center">
                {" "}
                Canelones de pollo y verdura, gratinados con queso y bañados en
                una suave salsa.
              </p>
              <h4 className="text-center">$1900</h4>
              <hr />
              <h3 className="text-center">LASAGNE DI CARNE</h3>
              <p className="text-center">
                {" "}
                Lasaña de carne con capas de pasta, sabroso ragú y gratinado
                queso derretido.
              </p>
              <h4 className="text-center">$2000</h4>
            </Tab>
            <Tab
              eventKey="Pizzas"
              title={<span className="tab-title">Pizzas</span>}
            >
              <h3 className="text-center">MARGHERITA</h3>
              <p className="text-center">
                {" "}
                Con tomate maduro, mozzarella fresca, albahaca fragante y un
                toque de aceite de oliva.
              </p>
              <h4 className="text-center">$2200</h4>
              <hr />

              <h3 className="text-center">MARINARA</h3>
              <p className="text-center">
                {" "}
                Con salsa de tomate, ajo, orégano y aceitunas, evocando la
                esencia mediterránea.
              </p>
              <h4 className="text-center">$1900</h4>
              <hr />

              <h3 className="text-center">QUATTRO FORMAGGI</h3>
              <p className="text-center">
                {" "}
                Con cuatro quesos diferentes: mozzarella, gorgonzola, parmesano
                y provolone.
              </p>
              <h4 className="text-center">$2500</h4>
              <hr />

              <h3 className="text-center">NAPOLETANA</h3>
              <p className="text-center">
                {" "}
                De estilo napolitano, con tomate, mozzarella de búfala, albahaca
                y aceite de oliva.
              </p>
              <h4 className="text-center">$2300</h4>
            </Tab>
            <Tab
              eventKey="Bebidas"
              title={<span className="tab-title">Bebidas</span>}
            >
              <h2 className="text-center">VINOS</h2>
              <Container>
                <Row>
                  <Col>
                    <h4>CHIANTI</h4>
                    <p>Veneto, Italia</p>
                    <h5>$6.900</h5>
                    <hr />
                  </Col>
                  <Col>
                    <h4>VAROLO</h4>
                    <p>Piamonte, Italia</p>
                    <h5>$9.500</h5>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  {" "}
                  <Col>
                    <h4>AMARONE</h4>
                    <p>Toscana, Italia</p>
                    <h5>$55.000</h5>
                    <hr />
                  </Col>
                  <Col>
                    <h4>BRUNELLO </h4>
                    <p>Toscana, Italia</p>
                    <h5>$5.700</h5>
                    <hr />
                  </Col>
                </Row>
              </Container>
              <h3 className="text-center">GASEOSAS</h3>
              <p className="text-center">350cc</p>
              <p className="text-center">COCA-COLA | FANTA | SPRITE</p>
              <h5 className="text-center">$500</h5>
              <hr />
            </Tab>
            <Tab
              eventKey="Postres"
              title={<span className="tab-title">Postres</span>}
            >
              <h3 className="text-center">TIRAMISÚ</h3>
              <h5 className="text-center">$800</h5>
              <hr />
              <h3 className="text-center">GELATO</h3>
              <h5 className="text-center">$650</h5>
              <p>Vainilla | Chocolate | Frutilla</p>
              <hr />
              <h3 className="text-center">CANNOLI</h3>
              <h5 className="text-center">$600</h5>
              <hr />
              <h3 className="text-center">PANNA COTTA</h3>
              <h5 className="text-center">$900</h5>
              <hr />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Menu;
