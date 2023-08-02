import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

const Reservas = () => {
  let actualDate = new Date();
  // console.log(actualDate)

  //Formik
  let initialValues = {
    numbersClients: "",
    reservationDate: "",
    reservationHour: "",
  };

  const { handleChange, handleSubmit } = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues,
    validationSchema: Yup.object({
      numbersClients: Yup.string().required(
        "Selecciona la cantidad de personas"
      ),
      reservationDate: Yup.string().required(
        "Selecciona una fecha para tu reserva"
      ),
      reservationHour: Yup.string().required(
        "Selecciona un horario para tu reserva"
      ),
    }),

    onSubmit: (values) => console.log(values),
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
        <Container>
          <Row className="w-75">
            <Col>
              <Image
                src="https://media.istockphoto.com/id/1144675344/es/vector/ilustraci%C3%B3n-de-dibujo-vectorial-de-dise%C3%B1o-de-logotipo-de-chef-italiano.jpg?s=612x612&w=0&k=20&c=dzrC6UP37nrVQoaaWJtmlVSenY5xrtVcuBCoVlNv5sc="
                thumbnail
                style={{ width: "80px", height: "80px" }}
              />
            </Col>
          </Row>
          <Row className="d-flex justify-content-evenly">
            <Col>
              <h1>Reserva tu mesa</h1>
            </Col>
            <Col>
              <Button variant="secondary">Registrarse</Button>
            </Col>
          </Row>
          <Container>
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Row>
                  <Col xs={"12"} md={"10"} lg={3} className="pb-2">
                    <Form.Select onChange={handleChange} name="numbersClients">
                      <option>N° de Personas</option>
                      <option>1 Persona</option>
                      <option>2 Personas</option>
                      <option>3 Personas</option>
                    </Form.Select>
                  </Col>
                  {/* 
                <Col>
                  {/* <ReactDatePicker
                    name="reservationDate"
                    selected={startDate}
                    dateFormat={"dd/MM/yyyy"}
                    minDate={fechaActual}
                    filterDate={(date) => date.getDay() !== 1}
                    isClearable
                    onChange={(date)=>setStartDate(date)}
                    

                  /> 
                </Col> */}

                  <Col xs={"12"} md={"10"} lg={3} className="pb-2">
                    <input
                      name="reservationDate"
                      type="date"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      min={"2023-08-20"}
                    ></input>
                  </Col>

                  <Col xs={"12"} md={"10"} lg={3} className="pb-2">
                    <input
                      name="reservationHour"
                      type="time"
                      className="form-control"
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                    ></input>
                  </Col>

                  <Col md={"7"}>
                    <Button type="submit">Submit</Button>
                  </Col>
                </Row>
              </Form.Group>
            </form>
          </Container>
        </Container>
      </main>
    </>
  );
};

export default Reservas;

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
//           <form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Row>
//                 <Col>
//                   <Form.Select
//                     onChange={handleChange}
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
//                     onChange={handleChange}
//                   />
//                 </Col>

//                 <Col>
//                   <input
//                     name="reservationHour"
//                     type="time"
//                     className="form-control"
//                     aria-describedby="basic-addon1"
//                     onChange={handleChange}
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
