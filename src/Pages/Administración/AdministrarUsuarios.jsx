import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import "./Administracion.css";
import { FormSearch } from "./components/FormSearch";
import { useForm } from "./hooks/useForm";
import Swal from "sweetalert2";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { NavbarContext } from "../../context/NavbarContext";

export const AdministrarUsuarios = ({ userToken }) => {
  const { theme } = useContext(NavbarContext);

  const newTheme =
    theme === "claro" ? "light" : theme === "oscuro" ? "dark" : theme;

  const useToken = { headers: { "auth-token": userToken } };
  const [Usuarios, setUsuarios] = useState([]);
  const initialForm = {
    apellido: "",
    nombre: "",
    email: "",
    esActivo: false,
    esAdmin: 0,
    user: "",
    _id: "",
  };
  const { formState, onInputChange, setFormState } = useForm(initialForm);

  const adminComoString = (a) => {
    if (a == 0) {
      return `Usuario general`;
    }
    if (a == 1) {
      return `Portero`;
    }
    if (a == 2) {
      return `Administrador`;
    }
  };

  const esActivoTraduccion = (a) => {
    if (a) {
      return `Si`;
    } else {
      return `No`;
    }
  };

  //Expresiones para validar
  const soloLetras = /^[a-zA-Z ]+$/;
  const email =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  //Esquema de Yup
  const esquemaUsuarios = Yup.object().shape({
    Nombre: Yup.string()
      .required("El nombre es requerido")
      .matches(soloLetras, "El nombre solo debe incluir letras")
      .min(4, "El nombre debe de ser menor a 4 letras")
      .max(25, "El nombre debe de ser menor a 25 letras"),

    Apellido: Yup.string()
      .required("El apellido es requerido")
      .matches(soloLetras, "El apellido solo debe incluir letras")
      .min(4, "El apellido debe de ser menor a 4 letras")
      .max(25, "El apellido debe de ser menor a 25 letras"),

    Email: Yup.string()
      .required("El email es requerido")
      .matches(email, "Ingrese un formato de email correcto")
      .min(16, "Ingrese un email mayor a 16 carácteres")
      .max(40, "Ingrese un email menor a 40 carácteres"),

    EsActivo: Yup.string().required("El campo es requerido"),

    Rol: Yup.string().required("Este campo es requerido"),
  });

  //Valores iniciales
  const valoresIniciales = {
    Nombre: "",
    Apellido: "",
    Email: "",
    EsActivo: false,
    Rol: 0,
  };

  //Validacion con Formik
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaUsuarios,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      Swal.fire({
        title: "Esta seguro que desea editar el usuario?",
        text: "Los cambios los puede editar luego",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!",
        cancelButtonText: "No, mejor no",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`${url}/usuarios/${formState._id}`, {
              apellido: values.Apellido,
              email: values.Email,
              esActivo: values.EsActivo,
              esAdmin: values.Rol,
              nombre: values.Nombre,
              user: "",
              _id: formState._id,
            })
            .then(({ data }) => {
              console.log(data);
              setShowModalEdit(false);
              Swal.fire(
                "Usuario modificado con éxito",
                "Tus modificaciones ya fueron integradas exitosamente",
                "success"
              ).then(async (result) => {
                actualizar();
              });
            })
            .catch(({ response }) => {
              console.log(response);
              setShowModalRestaurant(false);
              Swal.fire(
                "Error con servidor",
                `Error: ${response}`,
                "warning"
              ).then(async (result) => {
                actualizar();
              });
            });
        }
      });
    },
  });

  //Setear valores con formik

  const establecerDatos = () => {
    formik.setFieldValue("Nombre", formState.nombre);
    formik.setFieldValue("Apellido", formState.apellido);
    formik.setFieldValue("Email", formState.email);
    formik.setFieldValue("EsActivo", formState.esActivo);
    formik.setFieldValue("Rol", formState.esAdmin);
  };

  //UseEffect que sirve para establecer los datos
  useEffect(() => {
    establecerDatos();
  }, [formState._id]);

  /* handle */
  const handleDelete = (user) => {
    Swal.fire({
      title: `¿Realmente deseas eliminar el usuario ${user.nombre} ${user.apellido}?`,
      text: "Este cambio es irreversible y el email quedará librado para crear un usuario nuevo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${url}/usuarios/${user._id}`)
          .then(({ data }) => {
            Swal.fire(
              "Eliminación exitosa",
              "E-mail liberado para crear nuevo usuario",
              "success"
            ).then(async (result) => {
              actualizar();
            });
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const handleEdit = (user) => {
    setButtonGuardarUsuario(false);
    setErrores([]);
    let aux = {
      apellido: user.apellido,
      nombre: user.nombre,
      email: user.email,
      esActivo: user.esActivo,
      esAdmin: user.esAdmin,
      _id: user._id,
      user: "",
    };
    setFormState(aux);
    setShowModalEdit(true);
  };
  /* FIN handle */

  /* AXIOS */
  /* Backend */
  const url = import.meta.env.VITE_API;

  const [actualizador, setActualizador] = useState(false);
  const actualizar = () => {
    setActualizador(!actualizador);
  };

  useEffect(() => {
    axios
      .get(`${url}/usuarios/`, useToken)
      .then(({ data }) => {
        setUsuarios(data);
        setUserFiltered(data);
      })
      .catch((error) => console.log(error));
  }, [actualizador]);
  /* FIN Backend */
  /* FIN AXIOS */

  /* Buscador de usuarios */

  const [userFiltered, setUserFiltered] = useState([]);

  useEffect(() => {
    if (formState.user == "") {
      setUserFiltered(Usuarios);
    } else {
      if (formState.user?.length > 2) {
        let updatedData = [];
        let aux = [];
        const filterFirstName =
          Usuarios &&
          Usuarios.filter((item) => {
            const filter = item.nombre
              .toLowerCase()
              .includes(formState.user.toLowerCase());

            return filter ? filter : null;
          });

        const filterLastName =
          Usuarios &&
          Usuarios.filter((item) => {
            const filter = item.apellido
              .toLowerCase()
              .includes(formState.user.toLowerCase());

            return filter ? filter : null;
          });

        const result = filterFirstName
          ? filterFirstName.concat(filterLastName)
          : aux;

        updatedData = result.reduce((acc, item) => {
          if (!acc.includes(item)) {
            acc.push(item);
          }
          return acc;
        }, []);

        setUserFiltered(updatedData);
      } else {
        setUserFiltered(Usuarios);
      }
    }
  }, [formState.user]);

  /* FIN Buscador de usuarios */

  /* Editar usuarios */
  const [ShowModalEdit, setShowModalEdit] = useState(false);
  const [ButtonGuardarUsuario, setButtonGuardarUsuario] = useState(false);
  const handleCloseModal = () => {
    setShowModalEdit(false);
  };

  const [errores, setErrores] = useState([]);
  const validarForm = (form) => {
    let array = [];
    const patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (formState.nombre.length < 2) {
      array = [...array, "El nombre debe ser mas largo"];
    }
    if (formState.apellido.length < 2) {
      array = [...array, "El apellido debe ser mas largo"];
    }
    if (formState.email.length == 0) {
      array = [...array, "El campo e-mail no debe estar vacío"];
    }
    if (!patron.test(formState.email)) {
      array = [...array, "El campo e-mail debe contener un e-mail"];
    }
    setErrores(array);
    return array.length == 0;
  };

  /* FIN Editar usuarios */

  /* Paginación */
  let grupoDatos = [];
  const filasPorPagina = 10;
  const [currentPage, setCurrentPage] = useState(1);
  for (let i = 0; i < userFiltered.length; i += filasPorPagina) {
    const grupo = userFiltered.slice(i, i + filasPorPagina);
    grupoDatos.push(grupo);
  }
  /* Fin Paginación */

  /* Modal mostrar reservas de un usuario */
  const [showReservas, setShowReservas] = useState(null);
  const [reservasByUser, setReservasByUser] = useState(null);
  const [ShowModalList, setShowModalList] = useState(false);
  const handleCloseModalList = () => {
    setShowModalList(false);
    setShowReservas(null);
  };

  const handleShow = (user) => {
    setReservasByUser(null);
    setShowReservas(user);
    setShowModalList(true);
  };

  useEffect(() => {
    if (showReservas) {
      axios
        .get(`${url}/reservasByUsuario/${showReservas._id}`)
        .then(({ data }) => {
          setReservasByUser(data);
        })
        .catch((error) => console.log(error));
    } else {
      setReservasByUser(null);
    }
  }, [showReservas]);
  /* FIN  Modal mostrar reservas de un usuario */

  /* Badge de "fue usada" */
  const fueUsada = (usada) => {
    if (usada) {
      return (
        <>
          <Badge bg="success">SI</Badge>
        </>
      );
    } else {
      return (
        <>
          <Badge bg="secondary">NO</Badge>
        </>
      );
    }
  };
  /* FIN Badge de "fue usada" */
  return (
    <>
      <Container>
        <h2 className="text-center mt-5">Administrar Usuarios</h2>
        <h2>Usuarios</h2>
        <FormSearch
          formState={formState}
          funcionOnInputChange={onInputChange}
          tipo="text"
          placeholder="Buscar Usuario"
          name="user"
        />
        <Table
          striped
          responsive
          className="my-3"
          data-bs-theme={`${newTheme}`}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>E-mail</th>
              <th>¿Activo?</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {grupoDatos[currentPage - 1]?.map((r, index) => (
              <tr key={index}>
                <td>{index + 1 + (currentPage - 1) * filasPorPagina}</td>
                <td>{r.apellido}</td>
                <td>{r.nombre}</td>
                <td>{r.email}</td>
                <td>{esActivoTraduccion(r.esActivo)}</td>
                <td>{adminComoString(r.esAdmin)}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleShow(r)}
                    className="me-3 mb-2"
                  >
                    <i className="bi bi-card-list"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleEdit(r)}
                    className="me-3 mb-2"
                  >
                    <i className="bi bi-pencil">Editar</i>
                  </Button>
                  <Button
                    className="btn-trash"
                    variant="danger"
                    onClick={() => handleDelete(r)}
                  >
                    <i className="bi bi-trash">Borrar</i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup
            className="mx-auto my-3 align-center"
            aria-label="First group"
          >
            {grupoDatos?.map((r, index) => (
              <Button
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </ButtonGroup>
        </ButtonToolbar>
      </Container>

      <Modal
        show={ShowModalEdit}
        onHide={handleCloseModal}
        backdropClassName="custom-backdrop"
        className="modal-custom modificar-usuario-custom"
        data-bs-theme={`${newTheme}`}
      >
        <Modal.Header closeButton className={`custom-${theme}`}>
          <Modal.Title>Modificar Usuario</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={formik.handleSubmit}
          data-bs-theme={`${newTheme}`}
          noValidate
        >
          <Modal.Body className={`custom-${theme}`}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    type="text"
                    id="Nombre"
                    placeholder="Ej: Lucas"
                    minLength={4}
                    maxLength={25}
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
                  <Form.Label>Apellido:</Form.Label>
                  <Form.Control
                    type="text"
                    id="Apellido"
                    placeholder="Ej: Yudi"
                    minLength={4}
                    maxLength={25}
                    {...formik.getFieldProps("Apellido")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.Apellido && formik.errors.Apellido,
                      },
                      {
                        "is-valid":
                          formik.touched.Apellido && !formik.errors.Apellido,
                      }
                    )}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                type="email"
                id="Email"
                placeholder="Ej: ejemplo@gmail.com"
                minLength={16}
                maxLength={40}
                {...formik.getFieldProps("Email")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.Email && formik.errors.Email,
                  },
                  {
                    "is-valid": formik.touched.Email && !formik.errors.Email,
                  }
                )}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>¿Es activo?</Form.Label>
                </Col>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    id="EsActivo"
                    placeholder="Seleccione una Opcion"
                    {...formik.getFieldProps("EsActivo")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid":
                          formik.touched.EsActivo && formik.errors.EsActivo,
                      },
                      {
                        "is-valid":
                          formik.touched.EsActivo && !formik.errors.EsActivo,
                      }
                    )}
                  >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Rol:</Form.Label>
                </Col>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    id="Rol"
                    placeholder="Seleccione una opcion"
                    {...formik.getFieldProps("Rol")}
                    className={clsx(
                      "form-control",
                      {
                        "is-invalid": formik.touched.Rol && formik.errors.Rol,
                      },
                      {
                        "is-valid": formik.touched.Rol && formik.errors.Rol,
                      }
                    )}
                  >
                    <option value="2">Administrador</option>
                    <option value="1">Portero</option>
                    <option value="0">Usuario</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            {/*errores.length != 0 && (
            <Alert variant="warning">
              {errores.map((f) => (
                <p key={f.index}>{f}</p>
                ))}
            </Alert>
          )*/}
            {formik.touched.Nombre && formik.errors.Nombre && (
              <Alert variant="warning">{formik.errors.Nombre}</Alert>
            )}
            {formik.touched.Apellido && formik.errors.Apellido && (
              <Alert variant="warning">{formik.errors.Apellido}</Alert>
            )}
            {formik.touched.Email && formik.errors.Email && (
              <Alert variant="warning">{formik.errors.Email}</Alert>
            )}
            {formik.touched.EsActivo && formik.errors.EsActivo && (
              <Alert variant="warning">{formik.errors.EsActivo}</Alert>
            )}
            {formik.touched.Rol && formik.errors.Rol && (
              <Alert variant="warninig">{formik.errors.Rol}</Alert>
            )}
          </Modal.Body>
          <Modal.Footer className={`custom-${theme}`}>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
            <Button
              variant="sucess"
              //onClick={handleSubmit}
              disabled={ButtonGuardarUsuario}
              type="sumbit"
            >
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={ShowModalList}
        onHide={handleCloseModalList}
        backdropClassName="custom-backdrop"
        className="modal-custom"
        data-bs-theme={`${newTheme}`}
      >
        <Modal.Header closeButton className={`custom-${theme}`}>
          <Modal.Title>
            Reservas del usuario: {showReservas?.apellido},{" "}
            {showReservas?.nombre}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`custom-${theme}`}>
          {!reservasByUser ? (
            <>
              <Alert variant="danger">¡Usuario sin reservas registradas!</Alert>
            </>
          ) : (
            <>
              <Table striped responsive className="my-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Cant. de comensales</th>
                    <th>¿Fue usada?</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasByUser?.map((r, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{r.fecha}</td>
                      <td>{r.hora}</td>
                      <td>{r.comensales}</td>
                      <td>{fueUsada(r.fueUsada)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className={`custom-${theme}`}>
          <Button variant="secondary" onClick={handleCloseModalList}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
