import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import es from "date-fns/locale/es";
import { addDays, setHours, setMinutes } from "date-fns";
import { Formik, useFormik } from "formik";

const Reservas = () => {
  const fechaActual = new Date();
  const [startDate, setStartDate] = useState(fechaActual);

  //valores de mi formulario
  let initialValues = {
    numbersClients: "",
    reservationDate: "",
    reservationHour: ""
  };
  const sendForm = (data) => {
    console.log(data);
  };

  const formik = useFormik({
    initialValues,
    onSubmit : values => console.log(values)
  });

  return (
    <>
      <main
        style={{
          width: "100%",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
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
        <Container>
          <form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Select
                    onChange={formik.handleChange}
                    name="numbersClients"
                  >
                    <option>1 Persona</option>
                    <option>2 Personas</option>
                    <option>3 Personas</option>
                  </Form.Select>
                </Col>

                <Col>
                  <ReactDatePicker
                    name="reservationDate"
                    selected={startDate}
                    dateFormat={"dd/MM/yyyy"}
                    minDate={fechaActual}
                    filterDate={(date) => date.getDay() !== 1}
                    isClearable
                    onChange={formik.handleChange}
                  />
                </Col>

                <Col>
                  <input
                    name="reservationHour"
                    type="time"
                    className="form-control"
                    aria-describedby="basic-addon1"
                    onChange={formik.handleChange}
                  ></input>
                </Col>

                <Col>
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form.Group>
          </form>
        </Container>
      </main>
    </>
  );
}

export default Reservas


// function Reservas()  {
//   const fechaActual = new Date();
//   const [startDate, setStartDate] = useState(fechaActual);
//   const [clientNumber, setClientNumber] = useState("");
//   const [hour, setHour] = useState("");

//   //valores de mi formulario
//   let initialValues = {
//     numbersClients: "",
//     reservationDate: "",
//     reservationHour: "",
//   };
//   const sendForm = (data) => {
//     console.log(data);
//   };

//   const formik = useFormik({
//     initialValues,
//     onSumbit: sendForm,
//   });

//   return (
//     <>
//       <main
//         style={{
//           width: "100%",
//           height: "400px",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//         }}
//       >
//         <Row>
//           <Col>
//             <Image src="holder.js/171x180" thumbnail />
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <h1>Reserva tu mesa</h1>
//           </Col>
//           <Col>
//             <button>Registrate!</button>
//           </Col>
//         </Row>
//         <Container>
//           <form onSubmit={formik.handleSubmit}>
//             <Form.Group className="mb-3">
//               <Row>
//                 <Col>
//                   <Form.Select
//                     onChange={formik.handleChange}
//                     name="numbersClients"
//                   >
//                     <option>1 Persona</option>
//                     <option>2 Personas</option>
//                     <option>3 Personas</option>
//                   </Form.Select>
//                 </Col>

//                 <Col>
//                   <ReactDatePicker
//                     name="reservationDate"
//                     selected={startDate}
//                     dateFormat={"dd/MM/yyyy"}
//                     minDate={fechaActual}
//                     filterDate={(date) => date.getDay() !== 1}
//                     isClearable
//                     onChange={formik.handleChange}
//                   />
//                 </Col>

//                 <Col>
//                   <input
//                     name="reservationHour"
//                     type="time"
//                     className="form-control"
//                     aria-describedby="basic-addon1"
//                     onChange={formik.handleChange}
//                   ></input>
//                 </Col>

//                 <Col>
//                   <Button type="submit">Submit</Button>
//                 </Col>
//               </Row>
//             </Form.Group>
//           </form>
//         </Container>
//       </main>
//     </>
//   );
// }

// export default Reservas;
