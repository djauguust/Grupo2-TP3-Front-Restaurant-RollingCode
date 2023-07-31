import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import "bootstrap/dist/css/bootstrap.min.css"
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

function Reservas() {
  return (
    <>  
      <main style={{
         width:'100%',
         height:'400px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}>
        <Container>
          <Row>
            <Col>
              <Image src="holder.js/171x180" thumbnail />
            </Col>
          </Row>

          <Row>
            <Col>
              <h1>Reserva tu mesa</h1>
            </Col>
            <Col>
              <button>Registrate!</button>
            </Col>
          </Row>

          <Row>
            <ReactDatePicker/>
          </Row>
        </Container>
      </main>


    </>
  )
}

export default Reservas