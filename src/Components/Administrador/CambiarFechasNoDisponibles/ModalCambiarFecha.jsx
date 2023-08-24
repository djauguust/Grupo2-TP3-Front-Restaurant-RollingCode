import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { format, getDay, parseISO, setHours, setMinutes } from "date-fns";
import es from "date-fns/locale/es";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { AdministradorContexto } from "../../../Contexto/ContextoAdmin";

function ModalCambiarFecha(props) {

  const {traerFechasNoDisponibles} = useContext(AdministradorContexto)

    const {NuevasFechas} = useContext(AdministradorContexto)

     //Declaro la fecha de hoy para usarla en proximas funciones
  let date = new Date();

  //Esquema Yup
  const esquemaFecha = Yup.object().shape({
    Fecha : Yup.date()
    .required("La fecha es requerida")
  })

  const url = import.meta.env.VITE_API_FECHASNODISPONIBLES



  //Valores Iniciales
  const valoresIniciales = {
    Fecha : null
  }

  //Validacion con Formik
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaFecha,
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

            const fechaFormateada = format(values.Fecha, "yyyy-MM-dd");
            
            try {
                const res = await axios.patch(`${url}/${props.reserva.id}`,{
                    Fecha : fechaFormateada
                })
            } catch (error) {
                console.log(error);
            }

            handleClose()
            traerFechasNoDisponibles()


            Swal.fire(
            "Reserva editada!",
            "Los cambios fueron aplicados con exito",
            "success"
          );
        }
      });
    },
  });

  //Constante para mostrar el modal
  const [show, setShow] = useState(false);

  //Para abrir y cerrar el modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

   //Funcion para parsear la fecha para hacerle el setfieldvalue pra el formik
   const parsearFecha = (customDate) => {

    return parseISO(customDate);
  };


  //Funcion para establecer los datos en los form
  const EstablecerDatos = () => {
    if (props && props.reserva) {
      const { Fecha} = props.reserva;
      const fechaParseada = parsearFecha(Fecha);


      formik.setFieldValue("Fecha", fechaParseada);
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
          <Modal.Title>Editar datos de la reserva</Modal.Title>
        </Modal.Header>

        
            <Form onSubmit={formik.handleSubmit} noValidate>
          <Modal.Body>
                <Form.Group>
                    <Form.Label>Fecha :</Form.Label>
                    <DatePicker
                onFocus={(e) => e.target.blur()}
                selected={formik.values.Fecha}
                onChange={(date) => formik.setFieldValue("Fecha", date)}
                closeOnScroll={true}
                locale={es}
                dateFormat="dd/MM/yyyy"
                excludeDates={NuevasFechas}
                minDate={filterMinDay()}
                maxDate={filterMaxDay()}
                placeholderText="Selecciona una fecha"
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.Fecha && formik.errors.Fecha,
                  },
                  {
                    "is-valid": formik.touched.Fecha && !formik.errors.Fecha,
                  }
                )}
              />
              {formik.touched.Fecha && formik.errors.Fecha && (
                <div>
                  <span role="alert" className="text-danger">
                    {formik.errors.Fecha}
                  </span>
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

export default ModalCambiarFecha;
