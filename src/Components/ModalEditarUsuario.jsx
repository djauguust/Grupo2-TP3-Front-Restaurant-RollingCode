import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';

function ModalEditarUsuario(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nombre, setNombre] = useState(props.usuario.Nombre);
  const [email, setEmail] = useState(props.usuario.Email);
  const [contrasena, setContrasena] = useState(props.usuario.Contrasena);
  const [rol, setRol] = useState(props.usuario.Rol);

  const usuarioActualizado = {
    id: props.usuario.id,
    Nombre: nombre,
    Email: email,
    Contrasena: contrasena,
    Rol: rol,
  };

  const actualizar = async () => {
    try {
      const response = await axios.put(
        `${props.url}/${props.usuario.id}`,
        usuarioActualizado
      );
      alert('Guardado exitoso');
      handleClose();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      alert('Error');
    }
  };

  const SignUpSchema = Yup.object().shape({
    nombre: Yup.string()
      .required('Debe introducir el nombre')
      .min(3, 'El nombre debe tener al menos 2 caracteres')
      .max(50, 'El nombre no debe exceder los 50 caracteres')
      .trim(),
    email: Yup.string()
      .email('Ingrese un email válido')
      .required('Debe introducir el email')
      .trim(),
    contrasena: Yup.string()
      .required('Debe introducir la contraseña')
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(20, 'La contraseña no debe exceder los 20 caracteres')
      .trim(),
    rol: Yup.string().required('Debe seleccionar un rol'),
  });

  const initialValues = {
    nombre: nombre,
    email: email,
    contrasena: contrasena,
    rol: rol,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: SignUpSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      actualizar();
    },
  });

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
                onChange={(ev) => {
                  formik.handleChange(ev);
                  setNombre(ev.target.value);
                }}
                className={clsx(
                  'form-control',
                  {
                    'is-invalid': formik.touched.nombre && formik.errors.nombre,
                  },
                  {
                    'is-valid': formik.touched.nombre && !formik.errors.nombre,
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
                  'form-control',
                  {
                    'is-invalid': formik.touched.email && formik.errors.email,
                  },
                  {
                    'is-valid': formik.touched.email && !formik.errors.email,
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
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasena"
                id="contrasena"

                {...formik.getFieldProps("contrasena")}
                onChange={(ev) => {
                  formik.handleChange(ev);
                  setContrasena(ev.target.value);
                }}
                className={clsx(
                  'form-control',
                  {
                    'is-invalid':
                      formik.touched.contrasena && formik.errors.contrasena,
                  },
                  {
                    'is-valid':
                      formik.touched.contrasena && !formik.errors.contrasena,
                  }
                )}
              />
              {formik.touched.contrasena && formik.errors.contrasena && (
                <div className="text-danger mt-1">
                  <span role="alert">{formik.errors.contrasena}</span>
                </div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Rol</Form.Label>
              <Form.Check
                type="radio"
                label="Usuario"
                name="rol"
                id="usuario"
                value="usuario"
                checked={rol === 'usuario'}
                onChange={(ev) => {
                  formik.handleChange(ev);
                  setRol(ev.target.value);
                }}
              />
              <Form.Check
                type="radio"
                label="Administrador"
                name="rol"
                id="administrador"
                value="administrador"
                checked={rol === 'administrador'}
                onChange={(ev) => {
                  formik.handleChange(ev);
                  setRol(ev.target.value);
                }}
              />
              {formik.touched.rol && formik.errors.rol && (
                <div className="text-danger mt-1">
                  <span role="alert">{formik.errors.rol}</span>
                </div>
              )}
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
