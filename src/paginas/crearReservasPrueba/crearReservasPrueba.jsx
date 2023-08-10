import { useState } from "react";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Stack, Button } from "react-bootstrap";
import { format } from "date-fns";


const crearReservasPrueba = () => {
  const [startDate, setStartDate] = useState(new Date());

  const esquema = Yup.object().shape({
    selectedDate: Yup.date().required("Fecha es requerida"),
  });

  const valoresIniciales = {
    selectedDate: null,
  };
  
  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      {/*const fechaFormateada = format(values.FechaReserva, "dd/MM/yyyy", {
        locale: es,
      });*/}
      console.log(values);
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit} noValidate>
      <DatePicker
        selected={formik.values.selectedDate}
        onChange={(date) => formik.setFieldValue("selectedDate", date)}
      />
      {formik.errors.selectedDate && formik.touched.selectedDate ? (
        <div>{formik.errors.selectedDate}</div>
      ) : null}
      <Button type="submit">Enviar</Button>
    </Form>

    </>
  );
};
export default crearReservasPrueba;
