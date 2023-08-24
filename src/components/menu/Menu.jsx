import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Menu.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";

const Menu = ({theme}) => {

  const { t } = useTranslation(); 

  
  return (
    <>
      <div className="custom-menu">
        <div className={`contenedor-tabs${theme} mt-4`}>
          <h2 className="text-center mt-4">Menu</h2>
          <Tabs
            defaultActiveKey="Pastas"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab
              eventKey="Pastas"
              title={<span className={`tab-title${theme}`}>{t('pastas')}</span>}
            >
              <h3 className={`text-center mt-3 color-info${theme}`}>SPAGHETTI ALLA BOLOGNESE</h3>
              <p className="text-center">
              {t('descripcionSpageti')}
              </p>
              <h4 className="text-center">$1650</h4>
              <hr />
              <h3 className={`text-center mt-3 color-info${theme}`}>RAVIOLI ALLA CARBONARA</h3>
              <p className="text-center">
              {t('descripcionRavioles')}
              </p>
              <h4 className="text-center">$1800</h4>
              <p className="text-center">{t('opcionesRavioles')}</p>
              <hr />
              <h3 className={`text-center mt-3 color-info${theme}`}>CANNELLONI DI POLLO</h3>
              <p className="text-center">
                {" "}
                {t('descripcionCanelones')}
              </p>
              <h4 className="text-center">$1900</h4>
              <hr />
              <h3 className={`text-center mt-3 color-info${theme}`}>LASAGNE DI CARNE</h3>
              <p className="text-center">
                {" "}
                {t('descripcionLasagna')}
              </p>
              <h4 className="text-center">$2000</h4>
            </Tab>
            <Tab
              eventKey="Pizzas"
              title={<span className={`tab-title${theme}`}>{t('pizzas')}</span>}
            >
              <h3 className={`text-center mt-3 color-info${theme}`}>MARGHERITA</h3>
              <p className="text-center">
                {" "}
                {t('pizza1')}
              </p>
              <h4 className="text-center">$2200</h4>
              <hr />

              <h3 className={`text-center mt-3 color-info${theme}`}>MARINARA</h3>
              <p className="text-center">
                {" "}
                {t('pizza2')}
              </p>
              <h4 className="text-center">$1900</h4>
              <hr />

              <h3 className={`text-center mt-3 color-info${theme}`}>QUATTRO FORMAGGI</h3>
              <p className="text-center">
                {" "}
                {t('pizza3')}
              </p>
              <h4 className="text-center">$2500</h4>
              <hr />

              <h3 className={`text-center mt-3 color-info${theme}`}>NAPOLETANA</h3>
              <p className="text-center">
                {" "}
                {t('pizza4')}
              </p>
              <h4 className="text-center">$2300</h4>
            </Tab>
            <Tab
              eventKey="Bebidas"
              title={<span className={`tab-title${theme}`}>{t('bebidas')}</span>}
            >
              <h2 className="text-center">{t('vino')}</h2>
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
              <h3 className={`text-center mt-3 color-info${theme}`}>{t('gaseosas')}</h3>
              <p className="text-center">350cc</p>
              <p className="text-center">COCA-COLA | FANTA | SPRITE</p>
              <h5 className="text-center">$500</h5>
              <hr />
            </Tab>
            <Tab
              eventKey="Postres"
              title={<span className={`tab-title${theme}`}>{t('postres')}</span>}
            >
              <h3 className={`text-center mt-3 color-info${theme}`}>TIRAMISÚ</h3>
              <h5 className="text-center">$800</h5>
              <hr />
              <h3 className={`text-center mt-3 color-info${theme}`}>GELATO</h3>
              <h5 className="text-center">$650</h5>
              <p>{t('opcionesHelado')}</p>
              <hr />
              <h3 className={`text-center mt-3 color-info${theme}`}>CANNOLI</h3>
              <h5 className="text-center">$600</h5>
              <hr />
              <h3 className={`text-center mt-3 color-info${theme}`}>PANNA COTTA</h3>
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
