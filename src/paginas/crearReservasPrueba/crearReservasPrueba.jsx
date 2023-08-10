import { useState } from "react";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Stack, Button } from "react-bootstrap";
import { format } from "date-fns";

const crearReservasPrueba = () => {


  const esquema = Yup.object().shape({
    FechaReserva: Yup.date().required("Fecha es requerida"),
  });

  const valoresIniciales = {
    FechaReserva: null,
  };
  
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      const fechaFormateada = format(values.FechaReserva, "dd/MM/yyyy", {
        locale: es,
      })
      console.log(fechaFormateada);
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit} noValidate>
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
