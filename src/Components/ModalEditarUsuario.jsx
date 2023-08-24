import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import { AdministradorContexto } from "../Contexto/ContextoAdmin";
import { matches } from "lodash";

function ModalEditarUsuario(props) {
  const URL = import.meta.env.VITE_API_USUARIOS;

  console.log(props);

  const { TraerUsuarios } = useContext(AdministradorContexto);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nombre, setNombre] = useState(props.usuario.nombre);
  const [email, setEmail] = useState(props.usuario.email);
  const [contrasena, setContrasena] = useState(props.usuario.contrasena);
  const [rol, setRol] = useState(props.usuario.esAdmin);

  const Url = import.meta.env.VITE_API;

  const [act, setAct] = useState(0);

  useEffect(() => {
    TraerUsuarios();
  }, [act]);

  const usuarioActualizado = {
    id: props.usuario._id,
    Nombre: props.usuario.nombre,
    Email: props.usuario.email,
    Rol:
      props.usuario.esAdmin === 0
        ? "Usuario"
        : props.usuario.esAdmin === 1
        ? "Portero"
        : props.usuario.esAdmin === 2
        ? "Administrador"
        : "",
  };

  const regex = /^[a-zA-Z]+$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Esquema de yup
  const esquemaUsuario = Yup.object().shape({
    nombre : Yup.string()
    .required("El nombre es requerido")
    .matches(regex,"El nombre solo debe de incluir letras sin espacios")
    .min(3,"Debe ingresar un nombre mayor o igual 3 letras")
    .max(15,"El nombre debe de ser menor a 15 palabras"),

    email : Yup.string()
    .required("El email es requerido")
    .email("El valor debe de ser de tipo Email")
    .min(6,"El email debe de ser mayor a 6 caracteres")
    .max(30,"El email debe de ser menor a 30 caracteres"),

    rol: Yup.string()
    .required("El rol es requerido")
  })

//Valores Iniciales
const valoresIniciales = {
  nombre: "",
  email: "",
  rol : ""
}

//Validacion de Formik
const formik = useFormik({
  initialValues: valoresIniciales,
  validationSchema: esquemaUsuario,
  validateOnChange: true,
  validateOnBlur: true,
  onSubmit: (values) => {
    Swal.fire({
      title: "Esta seguro de editar la reserva?",
      text: "Los cambio los podra revertir luego",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "Mejor no",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
        
          const res = await axios.put(`${Url}/usuarios/${props.usuario._id}`)
        } catch (error) {
          console.log(error);
        }

      }
    });
  },
});

//Funcion para establecer los datos en los form
const EstablecerDatos = () => {
  if (props && props.usuario) {
    formik.setFieldValue("nombre", props.usuario.nombre);
    formik.setFieldValue("email", props.usuario.email);
    formik.setFieldValue("rol", props.usuario.esAdmin === 0
    ? "Usuario"
    : props.usuario.esAdmin === 1
    ? "Portero"
    : props.usuario.esAdmin === 2
    ? "Administrador"
    : "",);
  }
};

//UseEffect que sirve para establecer los datos
useEffect(() => {
  EstablecerDatos();
}, [props]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar datos del usuario</Modal.Title>
        </Modal.Header>

        <Form onSubmit={formik.handleSubmit} noValidate>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                id="nombre"
                {...formik.getFieldProps("nombre")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.nombre && formik.errors.nombre,
                  },
                  {
                    "is-valid": formik.touched.nombre && !formik.errors.nombre,
                  }
                )}
              />
              {formik.touched.nombre && formik.errors.nombre && (
                <div className="text-danger mt-1">
                  <span role="alert">{formik.errors.nombre}</span>
                </div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                {...formik.getFieldProps("email")}
                onChange={(ev) => {
                  formik.handleChange(ev);
                  setEmail(ev.target.value);
                }}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.email && formik.errors.email,
                  },
                  {
                    "is-valid": formik.touched.email && !formik.errors.email,
                  }
                )}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger mt-1">
                  <span role="alert">{formik.errors.email}</span>
                </div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Rol :</Form.Label>
              <Form.Select
                as="selected"
                {...formik.getFieldProps("rol")}
                id="rol"
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.rol && formik.errors.rol,
                  },
                  {
                    "is-valid": formik.touched.rol && !formik.errors.rol,
                  }
                )}
              >
                <option value="Administrador">Admin</option>
                <option value="Usuario">Usuario</option>
                <option value="Portero">Portero</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Guardar cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalEditarUsuario;
