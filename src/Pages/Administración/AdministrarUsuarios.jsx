import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { FormSearch } from "./components/FormSearch";
import { useForm } from "./hooks/useForm";
import Swal from "sweetalert2";
import axios from "axios";

export const AdministrarUsuarios = () => {
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

  /* handle */
  const handleDelete = (user) => {
    console.log(user);
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
    /* TO DO */
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
      .get(`${url}/usuarios/`)
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

  const handleSubmit = () => {
    if (validarForm()) {
      setButtonGuardarUsuario(true);

      axios
        .put(`${url}/usuarios/${formState._id}`, formState)
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
          Swal.fire("Error con servidor", `Error: ${response}`, "warning").then(
            async (result) => {
              actualizar();
            }
          );
        });
    }
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
        <Table striped responsive className="my-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Apellido</th>
              <th>Nombre</th>
              <th>E-mail</th>
              <th>¿Activo?</th>
              <th>¿Admin?</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {userFiltered?.map((r, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{r.apellido}</td>
                <td>{r.nombre}</td>
                <td>{r.email}</td>
                <td>{esActivoTraduccion(r.esActivo)}</td>
                <td>{adminComoString(r.esAdmin)}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleEdit(r)}
                    className="me-3 mb-2"
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(r)}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal
        show={ShowModalEdit}
        onHide={handleCloseModal}
        backdropClassName="custom-backdrop"
        className="modal-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modificar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formOrganizacion">
                  <Form.Label>Nombre:</Form.Label>
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
                  <Form.Label>Apellido:</Form.Label>
                  <Form.Control
                    type="text"
                    value={formState.apellido}
                    name="apellido"
                    onChange={onInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formOrganizacion">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                type="email"
                value={formState.email}
                name="email"
                onChange={onInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formOrganizacion">
              <Row>
                <Col>
                  <Form.Label>¿Es activo?</Form.Label>
                </Col>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    name="esActivo"
                    value={formState.esActivo}
                    onChange={onInputChange}
                  >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formOrganizacion">
              <Row>
                <Col>
                  <Form.Label>Rol:</Form.Label>
                </Col>
                <Col>
                  <Form.Select
                    aria-label="Default select example"
                    name="esAdmin"
                    value={formState.esAdmin}
                    onChange={onInputChange}
                  >
                    <option value="2">Administrador</option>
                    <option value="1">Portero</option>
                    <option value="0">Usuario</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
          </Form>
          {errores.length != 0 && (
            <Alert variant="warning">
              {errores.map((f) => (
                <p key={f.index}>{f}</p>
              ))}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button
            variant="sucess"
            onClick={handleSubmit}
            disabled={ButtonGuardarUsuario}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
