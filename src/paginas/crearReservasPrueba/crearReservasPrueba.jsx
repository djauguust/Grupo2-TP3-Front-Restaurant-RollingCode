import { useState } from "react";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Stack, Button } from "react-bootstrap";
import { format } from "date-fns";

const crearReservasPrueba = () => {
//Pagina de prueba para crear reservas para saber como funciona datepicker y para saber como llegan los datos

//Esquema de con .date para que guarde la fecha
  const esquema = Yup.object().shape({
    FechaReserva: Yup.date().required("Fecha es requerida"),
  });

  //Valores null porque no se puede tener vacio
  const valoresIniciales = {
    FechaReserva: null,
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
      console.log(fechaFormateada);
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit} noValidate>
        {/*Datepicker sensillo, no funciona con id ni formik.getfieldprops, porque parece que formik no acepta valores tipo fecha en ese formato*/ }
      <DatePicker
        selected={formik.values.FechaReserva}
        onChange={(date) => formik.setFieldValue("FechaReserva", date)}
      />
      {formik.errors.FechaReserva && formik.touched.FechaReserva ? (
        <div>{formik.errors.FechaReserva}</div>
      ) : null}
      <Button type="submit">Enviar</Button>
    </Form>

    </>
  );
};
export default crearReservasPrueba;
