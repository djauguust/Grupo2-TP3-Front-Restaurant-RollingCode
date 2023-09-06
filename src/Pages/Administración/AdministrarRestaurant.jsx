import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useForm } from "./hooks/useForm";
import axios from "axios";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";

function despuesDe(obj, value) {
  try {
    if (value.split("-")[0] > obj.split("-")[0]) {
      return false;
    } else if (value.split("-")[0] == obj.split("-")[0]) {
      if (value.split("-")[1] > obj.split("-")[1]) {
        return false;
      } else if (value.split("-")[1] == obj.split("-")[1]) {
        if (value.split("-")[2] > obj.split("-")[2]) {
          return false;
        }
      }
    }
    return true;
  } catch (e) {
    return false;
  }
}

export const AdministrarRestaurant = () => {
  const initialForm = {
    nombre: "",
    maximoComensales: 0,
    fecha: "",
    admin: "",
    desde: 0,
    hasta: 2359,
    reservasMaxima: 0,
    tiempoMaximoReserva: 0,
  };

  const { formState, setFormState, onInputChange, onResetForm } =
    useForm(initialForm);

  //Expresiones para validar
  const soloLetras = /^[a-zA-Z ]+$/;

  //Esquema de Yup
  const esquemaRestaurante = Yup.object().shape({
    Nombre: Yup.string()
      .required("El nombre es requerido")
      .matches(soloLetras, "El nombre solo debe incluir letras")
      .min(4, "El nombre debe de ser menor a 4 letras")
      .max(25, "El nombre debe de ser menor a 25 letras"),

    CantidadMaximaComensales: Yup.number()
      .required("La cantidad es requerida")
      .min(1, "La cantidad Maxima de comensales debe de ser al menos 1"),
    HorarioRestauranteDesde: Yup.string().required("La hora es requerida"),

    HorarioRestauranteHasta: Yup.string().required("La hora es requerida"),

    CantidadMaximaDeReservas: Yup.number()
      .required("La cantidad maxima es requerida")
      .min(1, "La cantidad maxima de reservas tiene que ser al menos 1"),

    TiempoEntreTurnos: Yup.number()
      .required("El tiempo es requerido")
      .min(1, "El tiempo tiene que ser al menos 1"),
  });

  //Valores Iniciales
  const valoresIniciales = {
    Nombre: "",
    CantidadMaximaComensales: 0,
    HorarioRestauranteDesde: "",
    HorarioRestauranteHasta: "",
    CantidadMaximaDeReservas: 0,
    TiempoEntreTurnos: 0,
  };

  //Validar con formik
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaRestaurante,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log(values);
      //Falta poner aqui todo el contenido de handleSubmit, y que pase los values de los input
    },
  });

  //Funcion para setear los valores a los input

  const establecerDatos = async () => {
    //If para que espere a que formState.horarior.desde exista
    if (formState.horario && formState.horario.desde) {
      formik.setFieldValue("Nombre", formState.nombre);
      formik.setFieldValue(
        "CantidadMaximaComensales",
        formState.maximoComensales
      );
      formik.setFieldValue("HorarioRestauranteDesde", formState.horario.desde);
      formik.setFieldValue("HorarioRestauranteHasta", formState.horario.hasta);
      formik.setFieldValue(
        "CantidadMaximaDeReservas",
        formState.reservasMaxima
      );
      formik.setFieldValue("TiempoEntreTurnos", formState.tiempoMaximoReserva);
    }
  };

  //UseEffect que sirve para establecer los datos
  useEffect(() => {
    establecerDatos();
  }, [formState._id]);

  console.log(formState);
  const handleSubmit = () => {
    let init = formState.horario.desde.split(":");
    let fin = formState.horario.hasta.split(":");
    let aux = {
      nombre: formState.nombre,
      maximoComensales: formState.maximoComensales,
      horario: {
        desde: parseInt(`${init[0]}${init[1]}`),
        hasta: parseInt(`${fin[0]}${fin[1]}`),
      },
      reservasMaxima: formState.reservasMaxima,
      tiempoMaximoReserva: formState.tiempoMaximoReserva,
    };

    if (validarForm(aux)) {
      setButtonGuardarRestaurant(true);

      axios
        .put(`${url}/restaurant/`, aux)
        .then(({ data }) => {
          console.log(data);
          setShowModalRestaurant(false);
          Swal.fire(
            "Restaurant modificado con éxito",
            "Tus modificaciones ya fueron integradas exitosamente",
            "success"
          ).then(async (result) => {
            actualizar();
          });
        })
        .catch(({ response }) => {
          console.log(response);
          setShowModalRestaurant(false);
          Swal.fire("Error con servidor", `Error: ${response}`, "warning").then(
            async (result) => {
              actualizar();
            }
          );
        });
    }
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Realmente deseas eliminar la fecha no disponible?",
      text: "Para deshacer este cambio deberás clickear en el botón 'Agregar fecha no disponible'",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${url}/fechasnd/${id}`)
          .then(({ data }) => {
            actualizar();
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const [ButtonGuardarRestaurant, setButtonGuardarRestaurant] = useState(false);
  const [ShowModalRestaurant, setShowModalRestaurant] = useState(false);
  const handleRestaurant = () => {
    setErrores([]);
    setButtonGuardarRestaurant(false);
    onResetForm();
    setShowModalRestaurant(true);
    setFormState({
      ...restaurant,
      desde: restaurant.horario.desde,
      hasta: restaurant.horario.hasta,
    });
  };
  const handleCloseModalRestaurant = () => {
    setShowModalRestaurant(false);
  };

  /* Backend */
  const url = import.meta.env.VITE_API;
  const [restaurant, setRestaurant] = useState();
  const [fechasND, setfechasND] = useState([]);

  const [actualizador, setActualizador] = useState(false);
  const actualizar = () => {
    setActualizador(!actualizador);
  };

  useEffect(() => {
    axios
      .get(`${url}/restaurant/`)
      .then(({ data }) => {
        data[0] = {
          ...data[0],
          horario: {
            desde: numberToHour(data[0].horario.desde),
            hasta: numberToHour(data[0].horario.hasta),
          },
        };
        setRestaurant(data[0]);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${url}/fechasnd/`)
      .then(({ data }) => {
        setfechasND(data);
      })
      .catch((error) => console.log(error));
  }, [actualizador]);
  /* FIN Backend */

  const numberToHour = (h) => {
    let aux = `${h}`.split("");
    return `${aux[0]}${aux[1]}:${aux[2]}${aux[3]}`;
  };

  /* MODALES */
  const [showModal, setShowModal] = useState(false);
  const [buttonGuardarFecha, setButtonGuardarFecha] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setButtonGuardarFecha(false);
    onResetForm();
    setShowModal(true);
  };

  const handleSubmitModal = () => {
    setShowAlert(false);
    setButtonGuardarFecha(true);
    let aux = {
      fecha: formState.fecha,
      idAdmin: "64e6934cab45fce72db39fda", // TO DO Tiene que ser el id del admin logueado!!
      idRestaurant: "64e6a45a0367aebe3bef0158",
    };
    if (despuesDe(formState.fecha, today2)) {
      //La fecha es posterior a hoy
      axios
        .post(`${url}/fechasnd/`, aux)
        .then(({ data }) => {
          console.log(data);
          setButtonGuardarFecha(false);
          // TO DO mostrar cartel que fue agregado con éxito
          setShowModal(false);
          actualizar();
        })
        .catch(({ response }) => {
          console.log(response);
          setButtonGuardarFecha(false);
          // TO DO mostrar cartel que hubo problemas.
          setShowModal(false);
          actualizar();
        });
    } else {
      //La fecha es anterior a hoy
      setShowAlert(true);
      setButtonGuardarFecha(false);
    }
  };

  useEffect(() => {
    setShowAlert(false);
  }, [formState.fecha]);

  const alertFechaIncorrecta = (
    message = "La fecha no puede ser fecha pasada"
  ) => {
    return (
      <>
        <Alert key="warning" variant="warning" className="my-2">
          <b>{message}</b>
        </Alert>
      </>
    );
  };
  /* FIN MODALES */

  /* HOY Y FECHAS NO DISPONIBLES FUTURAS */
  const today = new Date();
  const mesComoString = () => {
    let aux = today.getMonth() + 1;
    if (aux < 10) {
      return `0${aux}`;
    } else {
      return `${aux}`;
    }
  };
  const diaComoString = () => {
    let aux = today.getDate();
    if (aux < 10) {
      return `0${aux}`;
    } else {
      return `${aux}`;
    }
  };
  const today2 = `${today.getFullYear()}-${mesComoString()}-${diaComoString()}`;
  /* FIN HOY Y FECHAS NO DISPONIBLES FUTURAS */

  /* VALIDACIÓN FORM RESTAURANT */
  const [errores, setErrores] = useState([]);

  const validarForm = (aux) => {
    let array = [];
    if (formState.nombre.length <= 3) {
      array = [...array, "Nombre demasiado corto"];
    }
    if (formState.nombre.length > 20) {
      array = [...array, "Nombre demasiado largo"];
    }
    if (formState.maximoComensales < 1) {
      array = [...array, "Cantidad máxima de comensales debe ser positiva"];
    }
    if (formState.maximoComensales == "") {
      array = [...array, "Debe ingresar cantidad máxima de comensales"];
    }
    if (formState.maximoComensales > 200) {
      array = [
        ...array,
        "Cantidad máxima de comensales demasiado grande (límite del plan: 200)",
      ];
    }
    if (aux.horario.desde > aux.horario.hasta) {
      array = [
        ...array,
        "La hora de cierre no puede ser anterior a la hora de apertura",
      ];
    }
    if (formState.reservasMaxima < 1) {
      array = [...array, "Reservas máximas por comensales debe ser positiva"];
    }
    if (formState.reservasMaxima == "") {
      array = [
        ...array,
        "Debe ingresar cantidad máxima de reservas por usuario",
      ];
    }
    if (formState.tiempoMaximoReserva < 1) {
      array = [...array, "Tiempo de turno de una reserva debe ser positivo"];
    }
    if (!Number.isInteger(formState.tiempoMaximoReserva)) {
      array = [
        ...array,
        "Tiempo de turno de una reserva en horas, debe ser un número entero",
      ];
    }
    if (formState.tiempoMaximoReserva == "") {
      array = [...array, "Debe ingresar tiempo máximo de una reserva"];
    }
    setErrores(array);
    return array.length == 0;
  };
  /* FIN VALIDACIÓN FORM RESTAURANT */

  return (
    <>
      <Container>
        <h2 className="text-center mt-5">Administrar Restaurante</h2>

        <Form onSubmit={formik.handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Nombre del Restaurant:</Form.Label>
            <Form.Control
              type="text"
              value={restaurant?.nombre}
              name="nombre"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Cantidad máxima de comensales:</Form.Label>
            <Form.Control
              type="text"
              value={restaurant?.maximoComensales}
              name="maximoComensales"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Horarios del Restaurant:</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="time"
                  value={restaurant?.horario.desde}
                  name="desde"
                  disabled
                />
              </Col>
              a
              <Col>
                <Form.Control
                  type="time"
                  value={restaurant?.horario.hasta}
                  name="hasta"
                  disabled
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Cantidad máxima de reservas por Usuario:</Form.Label>
            <Form.Control
              type="text"
              value={restaurant?.reservasMaxima}
              name="reservasMaxima"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formOrganizacion">
            <Form.Label>Tiempo máximo de cada turno: (en horas)</Form.Label>
            <Form.Control
              type="text"
              value={restaurant?.tiempoMaximoReserva}
              name="tiempoMaximoReserva"
              disabled
            />
          </Form.Group>
        </Form>
        <h5 className="mt-3">Fechas NO disponibles para hacer reservas</h5>
        <Table striped responsive className="mb-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Creado por:</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {fechasND.map((f, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{f.fecha}</td>
                <td>
                  {f.apellido}, {f.nombre}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDelete(f._id);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="col-12 mb-4 d-grid">
          <Button type="submit" variant="warning" onClick={handleRestaurant}>
            <strong>Administrar Restaurant</strong>
          </Button>
        </div>
        <div className="col-12 mb-4 d-grid">
          <Button type="submit" variant="warning" onClick={handleShowModal}>
            <strong>Agregar fecha No disponible</strong>
          </Button>
        </div>
      </Container>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdropClassName="custom-backdrop"
        className="modal-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar Fecha No Disponible</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formOrganizacion">
              <Form.Label>Fecha:</Form.Label>
              <Form.Control
                type="date"
                value={formState.fecha}
                onChange={onInputChange}
                name="fecha"
              />
            </Form.Group>
          </Form>
          {showAlert && alertFechaIncorrecta()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button
            variant="sucess"
            onClick={handleSubmitModal}
            disabled={buttonGuardarFecha}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={ShowModalRestaurant}
        onHide={handleCloseModalRestaurant}
        backdropClassName="custom-backdrop"
        className="modal-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>Administrar Restaurant</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Restaurant:</Form.Label>
                  <Form.Control
                    type="text"
                    id="Nombre"
                    placeholder="Ej: Gusteau´s"
                    min={4}
                    max={25}
                    {...formik.getFieldProps("Nombre")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.Nombre && formik.errors.Nombre,
                      },
                      {
                        "is-valid":
                          formik.touched.Nombre && !formik.errors.Nombre,
                      }
                    )}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Cantidad máxima de comensales:</Form.Label>
                  <Form.Control
                    type="number"
                    id="CantidadMaximaComensales"
                    placeholder="Ej: 1"
                    {...formik.getFieldProps("CantidadMaximaComensales")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.CantidadMaximaComensales &&
                          formik.errors.CantidadMaximaComensales,
                      },
                      {
                        "is-valid":
                          formik.touched.CantidadMaximaComensales &&
                          !formik.errors.CantidadMaximaComensales,
                      }
                    )}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Horarios del Restaurant:</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="time"
                    id="HorarioRestauranteDesde"
                    placeholder="Eliga una hora"
                    {...formik.getFieldProps("HorarioRestauranteDesde")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.HorarioRestauranteDesde &&
                          formik.errors.HorarioRestauranteDesde,
                      },
                      {
                        "is-valid":
                          formik.touched.HorarioRestauranteDesde &&
                          !formik.errors.HorarioRestauranteDesde,
                      }
                    )}
                  />
                </Col>
                a
                <Col>
                  <Form.Control
                    type="time"
                    id="HorarioRestauranteHasta"
                    placeholder="Elige una hora"
                    {...formik.getFieldProps("HorarioRestauranteHasta")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.HorarioRestauranteHasta &&
                          formik.errors.HorarioRestauranteHasta,
                      },
                      {
                        "is-valid":
                          formik.touched.HorarioRestauranteHasta &&
                          !formik.errors.HorarioRestauranteHasta,
                      }
                    )}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>
                    Cantidad máxima de reservas por Usuario:
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    id="CantidadMaximaDeReservas"
                    placeholder="Eliga una cantidad maxima"
                    {...formik.getFieldProps("CantidadMaximaDeReservas")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.CantidadMaximaDeReservas &&
                          formik.errors.CantidadMaximaDeReservas,
                      },
                      {
                        "is-valid":
                          formik.touched.CantidadMaximaDeReservas &&
                          !formik.errors.CantidadMaximaDeReservas,
                      }
                    )}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>
                    Tiempo máximo de cada turno: (en horas)
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    id="TiempoEntreTurnos"
                    placeholder="Elige un tiempo maximo"
                    {...formik.getFieldProps("TiempoEntreTurnos")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.TiempoEntreTurnos &&
                          formik.errors.TiempoEntreTurnos,
                      },
                      {
                        "is-valid":
                          formik.touched.TiempoEntreTurnos &&
                          !formik.errors.TiempoEntreTurnos,
                      }
                    )}
                  />
                </Col>
              </Row>
            </Form.Group>
            {errores.length != 0 && (
              <Alert variant="warning">
                {errores.map((f) => (
                  <p>{f}</p>
                ))}
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalRestaurant}>
              Cerrar
            </Button>
            <Button
              variant="sucess"
              onClick={handleSubmit}
              disabled={ButtonGuardarRestaurant}
              //Cuando ya se pase el contenido de handleSubmit al formik descomente el type y comente la funcion onClick
              //type="sumbit"
            >
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
