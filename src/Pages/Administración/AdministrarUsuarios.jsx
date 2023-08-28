import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { FormSearch } from "./components/FormSearch";
import { useForm } from "./hooks/useForm";
import Swal from "sweetalert2";
import axios from "axios";

export const AdministrarUsuarios = () => {
  const [Usuarios, setUsuarios] = useState([]);

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
  const handleDelete = () => {
    /* TO DO */
  };

  const handleEdit = () => {
    /* TO DO */
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
  const { formState, onInputChange } = useForm({ user: "" });
  const [userFiltered, setUserFiltered] = useState([]);

  useEffect(() => {
    if (formState.user == "") {
      setUserFiltered(Usuarios);
    } else {
      if (formState.user.length > 2) {
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

  return (
    <>
      <h2 className="text-center mt-5">Administrar Usuarios</h2>
      <Container>
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
                  <Button variant="danger" onClick={handleEdit} className="me-3">
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
