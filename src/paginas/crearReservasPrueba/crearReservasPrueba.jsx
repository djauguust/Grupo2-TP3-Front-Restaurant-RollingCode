import { useState } from "react";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Stack, Button } from "react-bootstrap";
import { format, getDay } from "date-fns";
import { subDays } from "date-fns";

const crearReservasPrueba = () => {
//Pagina de prueba para crear reservas para saber como funciona datepicker y para saber como llegan los datos

let date = new Date();

//Esquema de con .date para que guarde la fecha
  const esquema = Yup.object().shape({
    FechaReserva: Yup.date().required("Fecha es requerida"),

    HoraReserva: Yup.string()
    .required("La hora es requerida")
  });

  //Valores null porque no se puede tener vacio
  const valoresIniciales = {
    FechaReserva: null,
    HoraReserva: ""
  };
  
  //Formik para validar
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      //Sirve para formatear la fecha a formato tipo 12/08/2023, porque te llega con un valor largo y en ingles
      const fechaFormateada = format(values.FechaReserva, "dd/MM/yyyy", {
        locale: es,
      })
      const horaFormateada = format(values.HoraReserva, "HH:mm",{
        locale: es
      })
      
      
      
    },
  });

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0;
  };

  const filterMinDay = () => {
    const nextDay = new Date();
    nextDay.setDate(date.getDate() + 1);
    return nextDay;
  };
  const filterMaxDay = () => {
    const limitDate = new Date();
    limitDate.setMonth(date.getMonth() + 1);
    return limitDate;
  };

  let handleColor = (time) => {
    return time.getHours() > 11 ? "" : "d-none";
  };



  return (
    <>
      <Form onSubmit={formik.handleSubmit} noValidate>
        {/*Datepicker sensillo, no funciona con id ni formik.getfieldprops, porque parece que formik no acepta valores tipo fecha en ese formato*/ }
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
      />
      {formik.errors.FechaReserva && formik.touched.FechaReserva ? (
        <div>{formik.errors.FechaReserva}</div>
      ) : null}

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
         placeholderText="Selecciona una hora"
        />
 {formik.errors.HoraReserva && formik.touched.HoraReserva ? (
        <div>{formik.errors.HoraReserva}</div>
      ) : null}
      <Button type="submit">Enviar</Button>
    </Form>

    </>
  );
};
export default crearReservasPrueba;
