import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { format, getDay, parseISO, setHours, setMinutes } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useTranslation } from "react-i18next";
import { NavbarContext } from "../../../context/NavbarContext";
import { ReservasContexto } from "../../../context/ReservasContexto";

const modalReservas = ({ showModal, onCloseModal, selectedReservaId }) => {
  const { theme } = useContext(NavbarContext);
  const { traerFechasNoDisponibles, fechasNoDisponibles, horariosDisponibles } =
    useContext(ReservasContexto);
  const TokenPuro = localStorage.getItem("user");
  const { t } = useTranslation();

  const newTheme =
    theme === "claro" ? "light" : theme === "oscuro" ? "dark" : theme;

  //Traer cosas dle context
  const { TraerUnaReserva, Reserva, TraerReservas } =
    useContext(ReservasContexto);

  //Valor externo para que traer una reserva funcione una vez y no sea un bucle infinito
  const [externalChange, setExternalChange] = useState(false);

  let date = new Date();

  //La Url reservas es la del .env
  const url = import.meta.env.VITE_API;

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

  //UseEffect para traer las fehcas no disponibles
  useEffect(() => {
    traerFechasNoDisponibles();
  }, []);

  //Esquema simple y sencillo
  const esquema = Yup.object().shape({
    FechaReserva: Yup.date().required("Fecha es requerida"),

    HoraReserva: Yup.string().required("La hora es requerida"),

    CantidadDePersonas: Yup.number()
      .required("La cantidad de personas es requerida")
      .min(1, "Debes elegir al menos 1 persona")
      .max(
        horariosDisponibles.maximoComensales,
        "La cantidad ingresada supera a la cantidad de comensales"
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
      const fechaFormateada = format(values.FechaReserva, "yyyy-MM-dd", {
        locale: es,
      });

      //Para formatear la hora a un valor Hora/Minutos
      const horaFormateada = format(values.HoraReserva, "HH:mm", {
        locale: es,
      });

      //Guardar los datos editados
      const Reserva = {
        fecha: fechaFormateada,
        hora: horaFormateada,
        comensales: values.CantidadDePersonas,
        comensalesInicial: selectedReservaId.comensales,
        maximoComensales: horariosDisponibles.maximoComensales,
      };

      //Alert para preguntar si el usuario esta seguro
      Swal.fire({
        title: t("IngresasteDatosCorrectamente"),
        text: t("CambiosRevertir"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("SiEstoySeguro"),
        cancelButtonText: t("NoMejorNo"),
      }).then((result) => {
        if (result.isConfirmed) {
          const Url = `${url}/reservas/${selectedReservaId._id}`;
          //Peticion para editar la reserva
          axios
            .put(Url, Reserva, {
              headers: {
                "auth-token": TokenPuro.replace(/^"(.*)"$/, "$1"),
              },
            })
            .then((Response) => {
              onCloseModal();
              TraerUnaReserva();
              Swal.fire(
                t("ReservaEditada"),
                t("ReservaEditadaExitosamente"),
                "success"
              );
            })
            .catch((error) => {
              Swal.fire("Error", `${t(error.response.data.message)} ${error.response.data.cantidadDisponible}` );
            });
        }
      });
    },
  });

  //Funcion que solo sirve para desformatear la fecha para setear los valores en el form
  const parsearFecha = (customDate) => {
    return parseISO(customDate);
  };

  //Funcion para lo mismo pero con la hora
  const parsearHora = (customTime) => {
    const [hour, minute] = customTime.split(":");
    const horaParseada = setMinutes(setHours(new Date(), hour), minute);
    return horaParseada;
  };

  //Funcion para establecer los datos en los form
  const EstablecerDatos = async () => {
    if (selectedReservaId) {
      const Fecha = (await parsearFecha(selectedReservaId.fecha)) || "";
      const Hora = (await parsearHora(selectedReservaId.hora)) || "";
      const CantidadDePersonas = (await selectedReservaId.comensales) || "";
      formik.setFieldValue("FechaReserva", Fecha);
      formik.setFieldValue("HoraReserva", Hora);
      formik.setFieldValue("CantidadDePersonas", CantidadDePersonas);
    }
  };

  //UseEffect que sirve para establecer los datos
  useEffect(() => {
    EstablecerDatos();
  }, [selectedReservaId]);

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
    return hours >= 12 && hours <= 23;
  };

  return (
    <>
      {/*Estructura del modal*/}
      <Modal show={showModal} onHide={onCloseModal}>
        <Modal.Header closeButton className={`custom-${newTheme}`}>
          <Modal.Title>{t("editarReserva")}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Modal.Body className={`d flex flex-column custom-${newTheme}`}>
            <Form.Group>
              <Form.Label>{t("eligeFecha")} :</Form.Label>
              <DatePicker
                selected={formik.values.FechaReserva}
                onChange={(date) => formik.setFieldValue("FechaReserva", date)}
                excludeDates={fechasNoDisponibles.map(
                  (fecha) => new Date(fecha)
                )}
                closeOnScroll={true}
                locale={es}
                dateFormat="yyyy/MM/dd"
                minDate={filterMinDay()}
                maxDate={filterMaxDay()}
                placeholderText={t("eligeFecha")}
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
              <Form.Label>{t("hora")} :</Form.Label>
              <DatePicker
                selected={formik.values.HoraReserva}
                onChange={(hora) => formik.setFieldValue("HoraReserva", hora)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Hora"
                dateFormat="HH:mm"
                locale={es}
                timeClassName={handleColor}
                filterTime={filterTime}
                placeholderText={t("eligeHora")}
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
              <Form.Label>{t("cantidadComensales")} :</Form.Label>
              <Form.Control
                placeholder={t("cantidadComensales")}
                type="number"
                id="CantidadDePersonas"
                min={1}
                max={horariosDisponibles.maximoComensales}
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
              />
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
          <Modal.Footer className={`custom-${newTheme}`}>
            <Button type="sumbit"> {t("guardarCambios")} </Button>
            <Button variant="secondary" onClick={onCloseModal}>
              {t("cerrar")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default modalReservas;
