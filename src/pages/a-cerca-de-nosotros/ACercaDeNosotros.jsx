import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./aCercaDeNosotros.css";
import augusto from "./img/augusto.jpeg"
import leo from "./img/leo.jpeg"
import lucas from "./img/lucas.jpeg"
import mauro from "./img/mauro.jpeg"
import pedro from "./img/pedro.jpeg"
import lucasy from "./img/lucasy.jpeg"
import { useTranslation } from "react-i18next";

const ACercaDeNosotros = () => {

  const  { t } = useTranslation();

  return (
    <>
      <h1 className="about-title mb-3">{t('nosotros')}</h1>
      <p className="text-center px-5">{t('aboutDescripcion')}</p>

      <Container>
        <Row>
          <Col className="about-col" xs={12} md={6} lg={4}>
            <Card
              className="about-card shadow-lg"
            >
              <Image
                className="about-img img-fluid"
                src={augusto}
                roundedCircle
              />
              <Card.Body className="text-center">
                <Card.Title>Nombre</Card.Title>
                <Card.Text>
                  Descripcion breve. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Dicta non voluptate dolore dolores unde
                  similique sequi assumenda ducimus laudantium enim.
                </Card.Text>
                <div>
                  <a href="">
                    <i className="bi bi-github m-2"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin m-2"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-instagram m-2"></i>
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="about-col" xs={12} md={6} lg={4}>
            <Card
              
              className="about-card shadow-lg"
            >
              <Image
                className="about-img"
                src={leo}
                roundedCircle
              />
              <Card.Body className="text-center">
                <Card.Title>Nombre</Card.Title>
                <Card.Text>
                  Descripcion breve. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Dicta non voluptate dolore dolores unde
                  similique sequi assumenda ducimus laudantium enim.
                </Card.Text>
                <div>
                  <a href="">
                    <i className="bi bi-github m-2"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin m-2"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-instagram m-2"></i>
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="about-col" xs={12} md={6} lg={4}>
            <Card
             
              className="about-card shadow-lg"
            >
              <Image
                className="about-img"
                src={lucas}
                roundedCircle
              />
              <Card.Body className="text-center">
                <Card.Title>Nombre</Card.Title>
                <Card.Text>
                  Descripcion breve. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Dicta non voluptate dolore dolores unde
                  similique sequi assumenda ducimus laudantium enim.
                </Card.Text>
                <div>
                  <a href="">
                    <i className="bi bi-github m-2"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin m-2"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-instagram m-2"></i>
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="about-col mb-5" xs={12} md={6} lg={4}>
            <Card
             
              className="about-card shadow-lg"
            >
              <Image
                className="about-img"
                src={mauro}
                roundedCircle
              />
              <Card.Body className="text-center">
                <Card.Title>Nombre</Card.Title>
                <Card.Text>
                  Descripcion breve. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Dicta non voluptate dolore dolores unde
                  similique sequi assumenda ducimus laudantium enim.
                </Card.Text>
                <div>
                  <a href="">
                    <i className="bi bi-github m-2"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin m-2"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-instagram m-2"></i>
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="about-col mb-5" xs={12} md={6} lg={4}>
            <Card
            
              className="about-card shadow-lg"
            >
              <Image
                className="about-img"
                src={pedro}
                roundedCircle
              />
              <Card.Body className="text-center">
                <Card.Title>Nombre</Card.Title>
                <Card.Text>
                  Descripcion breve. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Dicta non voluptate dolore dolores unde
                  similique sequi assumenda ducimus laudantium enim.
                </Card.Text>
                <div>
                  <a href="">
                    <i className="bi bi-github m-2"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin m-2"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-instagram m-2"></i>
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="about-col mb-5" xs={12} md={6} lg={4}>
            <Card
              className="about-card shadow-lg"
            >
              <Image
                className="about-img"
                src={lucasy}
                roundedCircle
              />
              <Card.Body className="text-center">
                <Card.Title>Nombre</Card.Title>
                <Card.Text>
                  Descripcion breve. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Dicta non voluptate dolore dolores unde
                  similique sequi assumenda ducimus laudantium enim.
                </Card.Text>
                <div>
                  <a href="">
                    <i className="bi bi-github m-2"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin m-2"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-instagram m-2"></i>
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    </>
  );
};

export default ACercaDeNosotros;
