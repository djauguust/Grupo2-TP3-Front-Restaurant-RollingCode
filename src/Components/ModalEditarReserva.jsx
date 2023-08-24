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
import { AdministradorContexto } from "../Contexto/ContextoAdmin";

function ModalEditar(props) {

  const {NuevasFechas,TraerReservas} = useContext(AdministradorContexto)

  //Declaro la fecha de hoy para usarla en proximas funciones
  let date = new Date();

  //Constante para mostrar el modal
  const [show, setShow] = useState(false);

  const [act, setAct] = useState(0);


  //Para abrir y cerrar el modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    TraerReservas()

}, [act]);

 

  //Esquema de Yup
  const esquemaReserva = Yup.object().shape({
    Fecha: Yup.date().required("La fecha es requerida"),

    Hora: Yup.string().required("La hora es requerida"),

    CantidadDePersonas: Yup.number()
      .required("La cantidad de personas es requerida")
      .min(1, "No se aceptan 0 o numeros menores")
      .max(10, "Solo se puede como maximo 10 personas"),
  });

  //Valores Iniciales
  const valoresIniciales = {
    Fecha: null,
    Hora: "",
    CantidadDePersonas: "",
  };

  //Validacion con formik
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaReserva,
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
            const res = await axios.patch(`${props.url}/${props.reserva.id}`, {
              Fecha: fechaFormateada(values.Fecha),
              Hora: horaFormateada(values.Hora),
              CantidadDePersonas: values.CantidadDePersonas,
            });
            console.log(fechaFormateada(values.Fecha));
          handleClose();
          setAct(prevAct => prevAct + 1);
          TraerReservas()
            handleResetForm
          } catch (error) {
            console.log(error);
          }
          Swal.fire(
            "Reserva editada!",
            "Los cambios fueron aplicados con exito",
            "success"
          );
        }
      });
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

  //Funcion para parsear la fecha para hacerle el setfieldvalue pra el formik
  const parsearFecha = (customDate) => {
    const [day, month, year] = customDate.split("/");
    const fechaParseada = `${year}-${month}-${day}`;
    return parseISO(fechaParseada);
  };

  //Funcion para parsear la hora para hacerle el setfieldvalue pra el formik
  const parsearHora = (customTime) => {
  
    const [hour, minute] = customTime.split(":");
    const horaParseada = setMinutes(
      setHours(new Date(), parseInt(hour, 10)),
      parseInt(minute, 10)
    );
    return horaParseada;
   
  };

  //Funcion para establecer los datos en los form
  const EstablecerDatos = () => {
    if (props && props.reserva) {
      const { Fecha, Hora, CantidadDePersonas } = props.reserva;
      const fechaParseada = parsearFecha(Fecha);
      const horaParseada = parsearHora(Hora);

      formik.setFieldValue("Fecha", fechaParseada);
      formik.setFieldValue("Hora", horaParseada);
      formik.setFieldValue("CantidadDePersonas", CantidadDePersonas);
    }
  };

  //UseEffect que sirve para establecer los datos
  useEffect(() => {
    EstablecerDatos();
  }, [props]);

  const handleResetForm = () => {
    formik.resetForm();
  };


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
              <Form.Label className="mx-1">Fecha:</Form.Label>
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

            <Form.Group>
              <Form.Label>Cantidad de Personas</Form.Label>
              <Form.Control
                placeholder="N° de Personas"
                {...formik.getFieldProps("CantidadDePersonas")}
                type="number"
                min={1}
                max={10}
                className={clsx(
                  "form-control input-reservation",
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
              />
              {formik.touched.CantidadDePersonas &&
                formik.errors.CantidadDePersonas && (
                  <div className="text-center">
                    <span role="alert" className="text-danger text-span">
                      {formik.errors.CantidadDePersonas}
                    </span>
                  </div>
                )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Hora</Form.Label>
              <DatePicker
                onFocus={(e) => e.target.blur()}
                selected={formik.values.Hora}
                onChange={(hora) => formik.setFieldValue("Hora", hora)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={60}
                timeCaption="Hora"
                dateFormat="HH:mm"
                locale={es}
                timeClassName={handleColor}
                filterTime={filterTime}
                placeholderText="Selecciona una hora"
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.Hora && formik.errors.Hora,
                  },
                  {
                    "is-valid": formik.touched.Hora && !formik.errors.Hora,
                  }
                )}
              ></DatePicker>
              {formik.touched.Hora && formik.errors.Hora && (
                <div>
                  <span role="alert" className="text-danger">
                    {formik.errors.Hora}
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

export default ModalEditar;
