import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import { format, getDay, setHours } from "date-fns";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./reserva.css";
import Image from "react-bootstrap/Image";
import axios from "axios";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode"


const Reservas = () => {
  let date = new Date();


  //Token
   const token = localStorage.getItem("user")
   const decode = jwt_decode(token);
   
  const Url = import.meta.env.VITE_API

  //Estado de fecha seleccionada
  const [dates, setDates] = useState(null);
  //Estado tiempo seleccionado
  const [time, setTime] = useState(null);

  //Estado para deshabilitar inputs
  const [enableDate, setEnableDate] = useState(false);
  //Estado para deshabilitar inputs
  const [diseablePeople, setDiseablePeople] = useState(false);


  //Estado para filtrar horarios disponibles
  const [filterHour, setFilterHour] = useState([]);

  //Estado para filtrar cant de comensales dispnibles
  const [filterPeople, setFilterPeople] = useState([]);




  //Get para solicitar si una fecha esta disponible o no
  useEffect(() => {
    if (dates) {
      axios
        .get(`http://localhost:3000/reservas?fecha=${dates}`)
        .then((response) => {
          setFilterHour(response.data);
          // console.log("Horas disponibles: ", response.data);
        })
        .catch((error) => {
          console.log("Error :", error);
        });
    }
  }, [dates]);

  //Get para solicitar la cantidad de comensales disponibles
  useEffect(() => {
    const fetchData = async () => {
      if (time) {
        try {
          const response = await axios.get(
            `http://localhost:3000/reservas?fecha=${dates}&hora=${time}`
          );
          // const response = await axios.get(`http://localhost:3000/reservas`);
          setFilterPeople(response.data);
          console.log("Comensales disponibles: ", response.data);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    };

    fetchData();
  }, [time]);
  //Funcion para resetear valores de inputs cuando cambio la fecha
  const resetInputsFromDate = (date) => {
    setTime(null);
    formik.setFieldValue("ReservationTime", ""); // Limpio input de tiempo
    formik.setFieldValue("People", ""); // Limpio input de personas
    formik.touched.ReservationTime = false
    formik.touched.People = false
    
  };

  //Funcion para resetear valores de input people
  const resetInputsFromTime = (date) => {
    formik.setFieldValue("People", ""); // Limpio input de personas
    formik.touched.People = false
    
  };


  //Yup
  const validationSchema = Yup.object().shape({
    ReservationDate: Yup.date().required("Fecha es requerida"),

    ReservationTime: Yup.date().required("La hora es requerida"),

    People: Yup.number()
      .required("La cantidad de personas es requerida")
      .max(
        filterPeople[0],
        `Quedan disponibles ${filterPeople[0]} lugares en este horario`
      )
      
      .min(1, "Debes elegir al menos 1 persona"),
  });

  //Initial Values
  const initialValues = {
    ReservationDate: null,
    ReservationTime: "",
    People: "",
  };

  //Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,

    //Submit
    onSubmit: async (values, { resetForm }) => {
      console.log("Valores que llegan al form de formik: ", values);

      try {
        const Reserva = {
          Fecha: fechaFormateada(values.ReservationDate),
          Hora: horaFormateada(values.ReservationTime),
          CantidadDePersonas: parseInt(formik.values.People),
        };

        //Swal fire para confirmacion de reserva
        const result = await Swal.fire({
          title: "Estás por realizar una reserva",
          text: "¿Estás seguro?",
          icon: "warning",
          position: "top",
          showCancelButton: true,
          confirmButtonColor: "#B08D59",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, guardar mi reserva!",
        });

        //Post a db
        if (result.isConfirmed) {
          const response = await axios.post(`${Url}/reservas`, {
            fecha: Reserva.Fecha,
            hora: Reserva.Hora,
            comensales: Reserva.CantidadDePersonas,
             usuario: decode.id
          });

          console.log(response.data);

          Swal.fire(
            "Reserva Guardada",
            "Tu reserva ha sido guardada exitosamente.",
            "success"
          );

          resetForm();
        } else {
          Swal.fire(
            "Reserva Cancelada",
            "Tu reserva no ha sido guardada.",
            "info"
          );
          resetForm();
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Hubo un problema al guardar la reserva.", "error");
      }
    },
  });

  //Funcion para formatear fecha
  const fechaFormateada = (date) => {
    return format(date, "dd/MM/yyyy", {
      locale: es,
    });
  };

  //Funcion para formatear hora
  const horaFormateada = (time) => {
    return format(time, "HH:mm", {
      locale: es,
    });
  };

  //Funcion para que los domingos esten deshabilitados

  //Funcion para que el usuario no pueda elegir fechas de dias anteriores o del mismo dia
  const filterMinDay = () => {
    const nextDay = new Date();
    nextDay.setDate(date.getDate() + 1);
    return nextDay;
  };

  //Fucnion para que el usuario no pueda elegir fechas mas de 1 mes
  const filterMaxDay = () => {
    const limitDate = new Date();
    limitDate.setMonth(date.getMonth() + 1);
    return limitDate;
  };

  //Funcion para deshabilitar horas
  const filterTime = (time) => {
    const hours = new Date(time).getHours();
    return hours > 11 && hours <= 23;
  };

  //Funcion para que solo se vean las horas que son validas
  let handleColor = (time) => {
    return time.getHours() > 11 ? "" : "d-none";
  };

  return (
    <>
      <main className="reservation-main">
        <Container fluid className="reservation-container">
          <Row className="d-flex justify-content-between align-items-center pb-3">
            <Col>
              <Image
                src="https://trello.com/1/cards/64b73c636625809102489870/attachments/64e189b71cf6c64059cf2edc/previews/64e189b81cf6c64059cf2ef8/download/Texto_del_p%C3%A1rrafo__2_-removebg-preview_%281%29.png"
                rounded
                width={80}
                height={80}
              />
            </Col>
          </Row>

          <Form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Row>
              <Col xs={12} md={3} className="p-0">
                <Form.Group controlId="date">
                  <DatePicker
                    onFocus={(e) => e.target.blur()}
                    selected={formik.values.ReservationDate}
                    onChange={(date) => {
                      formik.setFieldValue("ReservationDate", date);
                      if (date) {
                        setEnableDate(true);
                        setDates(fechaFormateada(date));
                        resetInputsFromDate();
                      }
                    }}
                    minDate={filterMinDay()}
                    maxDate={filterMaxDay()}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Elige una fecha"
                    className={clsx(
                      "form-control input-reservation",
                      {
                        "is-invalid":
                          formik.touched.ReservationDate &&
                          formik.errors.ReservationDate,
                      },
                      {
                        "is-valid":
                          formik.touched.ReservationDate &&
                          !formik.errors.ReservationDate,
                      }
                    )}
                  />
                  {formik.touched.ReservationDate &&
                    formik.errors.ReservationDate && (
                      <div className="text-center">
                        <span role="alert" className="text-danger text-span">
                          {formik.errors.ReservationDate}
                        </span>
                      </div>
                    )}
                </Form.Group>
              </Col>

              <Col xs={12} md={3} className="p-0">
                <Form.Group controlId="time">
                  <DatePicker
                    onFocus={(e) => e.target.blur()}
                    selected={formik.values.ReservationTime}
                    onChange={(time) => {
                      formik.setFieldValue("ReservationTime", time);
                      if (time) {
                        resetInputsFromTime();
                        setDiseablePeople(true);
                        setTime(horaFormateada(time));
                      }
                    }}
                    disabled={!enableDate}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    filterTime={filterTime}
                    excludeTimes={filterHour.map(
                      (hour) => new Date(`2000-01-01 ${hour}`)
                    )}
                    // instancio cada elemento de mi array para setearle un formato date
                    placeholderText="Elija un horario"
                    timeClassName={handleColor}
                    className={clsx(
                      "form-control input-reservation",
                      {
                        "is-invalid":
                          formik.touched.ReservationTime &&
                          formik.errors.ReservationTime ,
                      },
                      {
                        "is-valid":
                          formik.touched.ReservationTime &&
                          !formik.errors.ReservationTime
                      }
                    )}
                  />
                  {formik.touched.ReservationTime &&
                    formik.errors.ReservationTime && (
                      <div className="text-center">
                        <span role="alert" className="text-danger text-span">
                          {formik.errors.ReservationTime}
                        </span>
                      </div>
                    )}
                </Form.Group>
              </Col>

              <Col xs={12} md={3} className="p-0">
                <Form.Group controlId="people">
                  <Form.Control
                    placeholder="N° de Personas"
                    onChange={(e) => {
                      formik.setFieldValue("People", e.target.value);
                    }}
                    disabled={!diseablePeople || !time}
                    type="number"
                    min={1}
                    value={formik.values.People}
                    className={clsx(
                      "form-control input-reservation",
                      {
                        "is-invalid":
                          formik.touched.People &&
                          formik.errors.People 
                      },
                      {
                        "is-valid":
                          formik.touched.People &&
                          !formik.errors.People 
                      }
                    )}
                  />
                  {formik.touched.People && formik.errors.People && (
                    <div className="text-center">
                      <span role="alert" className="text-danger text-span">
                        {formik.errors.People}
                      </span>
                    </div>
                  )}
                </Form.Group>
              </Col>

              <Col xs={12} md={3} className="p-0">
                <Button
                  className="reservation-boton"
                  variant="primary"
                  type="submit"
                >
                  Reservar
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </main>
    </>
  );
};

export default Reservas;
