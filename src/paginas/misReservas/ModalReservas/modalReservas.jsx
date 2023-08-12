import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormCheck, Modal, Stack } from "react-bootstrap";
import { ReservasContexto } from "../../../contexto/contexto";
import { format, parseISO } from "date-fns";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const modalReservas = ({ showModal, onCloseModal, selectedReservaId }) => {
  //Traer cosas dle context
  const { TraerUnaReserva, Reserva, setReservaEditada, EditarReserva,ReservaEditada, TraerReservas} = useContext(ReservasContexto);
  //Valor externo para que traer una reserva funcione una vez y no sea un bucle infinito
  const [externalChange, setExternalChange] = useState(false);

  //La Url reservas es la del .env 
  const UrlReservas = import.meta.env.VITE_API_RESERVAS
  
//UseEffect para que funcione traer una reserva de acuerdo al valor externo
  useEffect( () => {
    if (selectedReservaId && externalChange) {
      TraerUnaReserva();
      
      
      setExternalChange(false); // Resetea el valor para evitar más cambios internos
    }
  }, [externalChange, TraerUnaReserva]);

  
  //UseEffect para el valor externo
  useEffect(() => {
      if (selectedReservaId) {
          setExternalChange(true);
        }
  }, [selectedReservaId]);

  //Esquema simple y sencillo
  const esquema = Yup.object().shape({
      FechaReserva: Yup.date().required("Fecha es requerida"),
      
      Horario: Yup.string().required("La hora es requerida"),
      
      CantidadDePersonas: Yup.string().required(
      "La cantidad de personas es requerida"
    ),
  });

  //Valores iniciales
  const valoresIniciales = {
      FechaReserva: null,
      Horario: "",
      CantidadDePersonas: "",
    };

    //Formik para validar
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      //Lo mismo para formatear la fecha
      const fechaFormateada = format(values.FechaReserva, "dd/MM/yyyy", {
          locale: es,
        });

        //Guardar los datos editados
        const Reserva = {
            Fecha: fechaFormateada,
            Hora: values.Horario,
            CantidadDePersonas: values.CantidadDePersonas,
        };

        //Setear los valores editados en un usesstate para usarlo en el context
        setReservaEditada(Reserva)
        //Lamando a la funcion de editar reservas que esta en el context
        /* EditarReserva() */
        const Url = `${UrlReservas}/${selectedReservaId}`;
              console.log("Reserva es", Reserva);
              axios.put(Url, Reserva)
                .then(Response => {
                  console.log("Reserva Actualizada");
                  console.log(Reserva)
                  onCloseModal()
                  TraerReservas()
                })
                .catch(error => {
                  console.log(error);
                });
        
        console.log(ReservaEditada);
    },
});

//Funcion que solo sirve para desformatear la fecha para setear los valores en el form
const parseCustomDate = (customDate) => {
    const [day, month, year] = customDate.split("/");
    const isoDate = `${year}-${month}-${day}`;
    return parseISO(isoDate);
};

//Funcion para establecer los datos en los form
const EstablecerDatos = async () =>{

    if (Reserva) {
      const Fecha = await parseCustomDate(Reserva.Fecha) || ""
        const Hora = await Reserva.Hora || ""
        const CantidadDePersonas =  await Reserva.CantidadDePersonas || ""
        formik.setFieldValue("FechaReserva", Fecha)
        formik.setFieldValue("Horario", Hora)
        formik.setFieldValue("CantidadDePersonas", CantidadDePersonas)
    }
}

//UseEffect que sirve para establecer los datos
useEffect(() => {
    EstablecerDatos();
  }, [Reserva]);

  


  return (
    <>
    {/*Estructura del modal*/ }
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edita tu Reserva</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Modal.Body className="d-flex flex-column">
            <Form.Group>
              <Form.Label>Edita la Fecha</Form.Label>
              <DatePicker
                selected={formik.values.FechaReserva}
                onChange={(date) => formik.setFieldValue("FechaReserva", date)}
                placeholderText="Ingrese una fecha"
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.FechaReserva && formik.errors.FechaReserva,
                  },
                  {
                    "is-valid":
                      formik.touched.FechaReserva &&
                      !formik.errors.FechaReserva,
                  }
                )}
              />
              {formik.touched.FechaReserva && formik.errors.FechaReserva && (
                <div>
                  <span role="alert" className="text-danger">
                    {formik.errors.FechaReserva}
                  </span>
                </div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Hora :</Form.Label>
              <Form.Select
                id="Horario"
                {...formik.getFieldProps("Horario")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.Horario && formik.errors.Horario,
                  },
                  {
                    "is-valid":
                      formik.touched.Horario && !formik.errors.Horario,
                  }
                )}
              >
                <option>Ingrese un Horario</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
              </Form.Select>
              {formik.touched.Horario && formik.errors.Horario && (
                <div>
                  <span role="alert" className="text-danger">
                    {formik.errors.Horario}
                  </span>
                </div>
              )}
            </Form.Group>
            <Form.Group>
                <Form.Label>Cantidad de Personas :</Form.Label>
              <Form.Select
                id="CantidadDePersonas"
                {...formik.getFieldProps("CantidadDePersonas")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.CantidadDePersonas &&
                      formik.errors.CantidadDePersonas,
                  },
                  {
                    "is-valid":
                      formik.touched.CantidadDePersonas &&
                      !formik.errors.CantidadDePersonas,
                  }
                )}
              >
                <option>Ingrese la cantidad de personas</option>
                <option value="2">2 personas</option>
                <option value="3">3 personas</option>
                <option value="4">4 personas</option>
                <option value="5">5 personas</option>
              </Form.Select>
              {formik.touched.CantidadDePersonas && formik.errors.CantidadDePersonas && (
                <div>
                  <span role="alert" className="text-danger">
                    {formik.errors.CantidadDePersonas}
                  </span>
                </div>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="sumbit"> Guardar Cambios </Button>
            <Button variant="secondary" onClick={onCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default modalReservas;
