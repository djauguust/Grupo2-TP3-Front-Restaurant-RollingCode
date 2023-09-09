import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "../../styles/aCercaDeNosotros.css";
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
              <Card.Body className="about-card-body">
                <Card.Title>Augusto</Card.Title>
                <Card.Text>
                Hola, soy Augusto.Mi principal objetivo es mantenernos en el camino correcto y asegurarme de que trabajemos de manera ágil y eficiente. Creo en la importancia de la colaboración y la comunicación constante para alcanzar nuestros objetivos. Estoy emocionado por ser parte de este proyecto.
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
              <Card.Body className="about-card-body">
                <Card.Title>Leo</Card.Title>
                <Card.Text>
                Hola, soy Leo. Mi enfoque es el apoyo constante al equipo. Siempre estoy dispuesto a ayudar y aportar mi experiencia en cualquier área que se necesite. Creo que el compañerismo y la colaboración son esenciales para lograr nuestros objetivos.
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
              <Card.Body className="about-card-body">
                <Card.Title>Lucas</Card.Title>
                <Card.Text>
                ¡Hola! Soy Lucas y me encanta codificar. Tengo un enfoque meticuloso para resolver problemas y una pasión por el desarrollo web. Mi objetivo es asegurarme de que nuestra página web sea técnicamente sólida y ofrezca una experiencia excepcional a los usuarios.
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
              <Card.Body className="about-card-body">
                <Card.Title>Mauro</Card.Title>
                <Card.Text>
                ¡Hola, soy Mauro! Mi energía positiva es contagiosa, y siempre trato de mantener un ambiente de trabajo optimista. Creo que el trabajo en equipo y la actitud positiva son clave para superar cualquier obstáculo.
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
              <Card.Body className="about-card-body">
                <Card.Title>Pedro</Card.Title>
                <Card.Text>
                Soy Pedro. Mi pasión es crear experiencias visuales impactantes. Cada elemento visual en nuestra página web es cuidadosamente diseñado para atraer y cautivar a los visitantes. Mi objetivo es que cada detalle sea estéticamente atractivo.
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
              <Card.Body className="about-card-body">
                <Card.Title>Nombre</Card.Title>
                <Card.Text>
                  Hola soy lucasy
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
