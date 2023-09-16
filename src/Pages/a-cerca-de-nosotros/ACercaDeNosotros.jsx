import { useTranslation } from "react-i18next";
import { Container, Image, Col, Row, Card } from "react-bootstrap";
import "../../styles/aCercaDeNosotros.css";

const ACercaDeNosotros = () => {
  const { t } = useTranslation();

  return (
    <>
      <section>
        <article>
          <h1 className="about-title mb-3">{t("nosotros")}</h1>
          <p className="text-center px-5">{t("aboutDescripcion")}</p>
        </article>
        <article>
          <Container>
            <Row className="justify-content-center">
              <Col className="about-col mb-md-5" xs={12} md={6} lg={4}>
                <Card className="about-card shadow-lg">
                  <Image
                    className="about-img img-fluid"
                    src={
                      "https://live.staticflickr.com/65535/53173891373_6e8db5215a_o.jpg"
                    }
                    roundedCircle
                  />
                  <Card.Body className="about-card-body">
                    <Card.Title>Augusto</Card.Title>
                    <Card.Text>{t("descripcionAugusto")}</Card.Text>
                    <div>
                      <a href="http://github.com/djauguust" target="blank">
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
              <Col className="about-col mb-md-5" xs={12} md={6} lg={4}>
                <Card className="about-card shadow-lg">
                  <Image
                    className="about-img"
                    src={
                      "https://live.staticflickr.com/65535/53172811067_c629b85396_o.jpg"
                    }
                    roundedCircle
                  />
                  <Card.Body className="about-card-body">
                    <Card.Title>Leo</Card.Title>
                    <Card.Text>{t("descripcionLeo")}</Card.Text>
                    <div>
                      <a href="http://github.com/LeoAc92" target="blank">
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
              <Col className="about-col mb-md-5" xs={12} md={6} lg={4}>
                <Card className="about-card shadow-lg">
                  <Image
                    className="about-img"
                    src={
                      "https://live.staticflickr.com/65535/53173891353_c27a6f303d_o.jpg"
                    }
                    roundedCircle
                  />
                  <Card.Body className="about-card-body">
                    <Card.Title>Lucas</Card.Title>
                    <Card.Text>{t("descripcionLucasY")}</Card.Text>
                    <div>
                      <a href="http://github.com/Yudi454" target="blank">
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
              <Col className="about-col mb-md-5" xs={12} md={6} lg={6}>
                <Card className="about-card shadow-lg">
                  <Image
                    className="about-img"
                    src={
                      "https://live.staticflickr.com/65535/53173841815_49ae4ae428_o.jpg"
                    }
                    roundedCircle
                  />
                  <Card.Body className="about-card-body">
                    <Card.Title>Mauro</Card.Title>
                    <Card.Text>{t("descripcionMauro")}</Card.Text>
                    <div>
                      <a href="http://github.com/MauroSJ" target="blank">
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
              <Col className="about-col mb-md-5" xs={12} md={6} lg={6}>
                <Card className="about-card shadow-lg">
                  <Image
                    className="about-img"
                    src={
                      "https://live.staticflickr.com/65535/53172811077_7aee04067f_o.jpg"
                    }
                    roundedCircle
                  />
                  <Card.Body className="about-card-body">
                    <Card.Title>Pedro</Card.Title>
                    <Card.Text>{t("descripcionPedro")}</Card.Text>
                    <div>
                      <a href="http://github.com/PedroAntich" target="blank">
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
        </article>
      </section>
    </>
  );
};

export default ACercaDeNosotros;
