import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ReservasContexto } from "../../../contexto/contexto";
import { format, getDay, parseISO, setHours, setMinutes } from "date-fns";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

const modalReservas = ({ showModal, onCloseModal, selectedReservaId }) => {
  //Traer cosas dle context
  const { TraerUnaReserva, Reserva, TraerReservas } =
    useContext(ReservasContexto);
  //Valor externo para que traer una reserva funcione una vez y no sea un bucle infinito
  const [externalChange, setExternalChange] = useState(false);

  let date = new Date();

  //La Url reservas es la del .env
  const UrlReservas = import.meta.env.VITE_API_RESERVAS;

  //UseEffect para que funcione traer una reserva de acuerdo al valor externo
  useEffect(() => {
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

    HoraReserva: Yup.string().required("La hora es requerida"),

    CantidadDePersonas: Yup.string().required(
      "La cantidad de personas es requerida"
    ),
  });

  //Valores iniciales
  const valoresIniciales = {
    FechaReserva: null,
    HoraReserva: "",
    CantidadDePersonas: "",
  };

  //Formik para validar
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      //Para formatear la fecha a un valor dia/mes/año
      const fechaFormateada = format(values.FechaReserva, "dd/MM/yyyy", {
        locale: es,
      });

      //Para formatear la hora a un valor Hora/Minutos
      const horaFormateada = format(values.HoraReserva, "HH:mm", {
        locale: es,
      });

      //Guardar los datos editados
      const Reserva = {
        Fecha: fechaFormateada,
        Hora: horaFormateada,
        CantidadDePersonas: values.CantidadDePersonas,
      };

      //Alert para preguntar si el usuario esta seguro
      Swal.fire({
        title: "Seguro de que realizo todos los cambios?",
        text: "No se preocupe si se equivoco, los datos los puede cambiar nuevamente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          const Url = `${UrlReservas}/${selectedReservaId}`;
          //Peticion para editar la reserva
          axios
            .put(Url, Reserva)
            .then((Response) => {
              console.log("Reserva Actualizada");
              onCloseModal();
              TraerReservas();
            })
            .catch((error) => {
              console.log(error);
            });
          Swal.fire(
            "Reserva actualizada con éxito!",
            "La reserva se realizo exitosamente.",
            "success"
          );
        }
      });
    },
  });

  //Funcion que solo sirve para desformatear la fecha para setear los valores en el form
  const parsearFecha = (customDate) => {
    const [day, month, year] = customDate.split("/");
    const fechaParseada = `${year}-${month}-${day}`;
    return parseISO(fechaParseada);
  };

  //Funcion para lo mismo pero con la hora
  const parsearHora = (customTime) => {
    const [hour, minute] = customTime.split(":");
    const horaParseada = setMinutes(setHours(new Date(), hour), minute);
    return horaParseada;
  };

  //Funcion para establecer los datos en los form
  const EstablecerDatos = async () => {
    if (Reserva) {
      const Fecha = (await parsearFecha(Reserva.Fecha)) || "";
      const Hora = (await parsearHora(Reserva.Hora)) || "";
      const CantidadDePersonas = (await Reserva.CantidadDePersonas) || "";
      formik.setFieldValue("FechaReserva", Fecha);
      formik.setFieldValue("HoraReserva", Hora);
      formik.setFieldValue("CantidadDePersonas", CantidadDePersonas);
    }
  };

  //UseEffect que sirve para establecer los datos
  useEffect(() => {
    EstablecerDatos();
  }, [Reserva]);

  //Funcion para que los domingos esten deshabilitados
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0;
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

  //Funcion para que solo se vean las horas que son validas
  let handleColor = (time) => {
    return time.getHours() > 11 ? "" : "d-none";
  };

  const filterTime = (time) => {
    const hours = new Date(time).getHours();
    return hours >= 12 && hours <= 23 
  };

  return (
    <>
      {/*Estructura del modal*/}
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
                closeOnScroll={true}
                locale={es}
                dateFormat="dd/MM/yyyy"
                minDate={filterMinDay()}
                maxDate={filterMaxDay()}
                filterDate={isWeekday}
                placeholderText="Selecciona una fecha"
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
              <DatePicker
                selected={formik.values.HoraReserva}
                onChange={(hora) => formik.setFieldValue("HoraReserva", hora)}
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
                    "is-invalid":
                      formik.touched.HoraReserva && formik.errors.HoraReserva,
                  },
                  {
                    "is-valid":
                      formik.touched.HoraReserva && !formik.errors.HoraReserva,
                  }
                )}
              ></DatePicker>
              {formik.touched.HoraReserva && formik.errors.HoraReserva && (
                <div>
                  <span role="alert" className="text-danger">
                    {formik.errors.HoraReserva}
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
              {formik.touched.CantidadDePersonas &&
                formik.errors.CantidadDePersonas && (
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
