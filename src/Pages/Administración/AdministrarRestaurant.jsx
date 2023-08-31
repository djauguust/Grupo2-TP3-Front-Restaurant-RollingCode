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

        <Form>
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
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formOrganizacion">
                  <Form.Label>Nombre del Restaurant:</Form.Label>
                  <Form.Control
                    type="text"
                    value={formState.nombre}
                    name="nombre"
                    onChange={onInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formOrganizacion">
                  <Form.Label>Cantidad máxima de comensales:</Form.Label>
                  <Form.Control
                    type="number"
                    value={formState.maximoComensales}
                    name="maximoComensales"
                    onChange={onInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formOrganizacion">
              <Form.Label>Horarios del Restaurant:</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="time"
                    value={formState.desde}
                    name="desde"
                    onChange={onInputChange}
                  />
                </Col>
                a
                <Col>
                  <Form.Control
                    type="time"
                    value={formState.hasta}
                    name="hasta"
                    onChange={onInputChange}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formOrganizacion">
              <Row>
                <Col>
                  <Form.Label>
                    Cantidad máxima de reservas por Usuario:
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    value={formState.reservasMaxima}
                    name="reservasMaxima"
                    onChange={onInputChange}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formOrganizacion">
              <Row>
                <Col>
                  <Form.Label>
                    Tiempo máximo de cada turno: (en horas)
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    value={formState.tiempoMaximoReserva}
                    name="tiempoMaximoReserva"
                    onChange={onInputChange}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Form>
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
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
