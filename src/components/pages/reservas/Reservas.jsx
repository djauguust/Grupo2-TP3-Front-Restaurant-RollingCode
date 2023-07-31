import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import "bootstrap/dist/css/bootstrap.min.css"

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
            <h2>Calendar</h2>
          </Row>
        </Container>
      </main>
      {/* <main style={{
        width:'100%',
        height:'400px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}>

        <div className="container" style={{display:'flex', flexDirection:'column'}}>

          <div className="row" style={{display:'flex'}}>
            <div className="col">
              <Image src="holder.js/171x180" thumbnail />
            </div>

          </div>

          <div className="row" style={{display:'flex'}}>
            <div className="col">
              <h1>Reserva tu mesa</h1>
            </div>
            <div className="col">
              <button>Registrate!</button>
            </div>
          </div>  
            
            <div className="row" style={{display:'flex'}}>
              <h2>Calendar</h2>
            </div>
          
        </div>
      </main> */}

    </>
  )
}

export default Reservas