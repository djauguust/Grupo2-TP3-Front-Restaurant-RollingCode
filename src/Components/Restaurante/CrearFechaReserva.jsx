import React, { useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { format, getDay, parseISO, setHours, setMinutes } from "date-fns";
import es from "date-fns/locale/es";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { AdministradorContexto } from '../../Contexto/ContextoAdmin';

const CrearFechaReserva = () => {

  const {NuevasFechas,traerFechasNoDisponibles} = useContext(AdministradorContexto)

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


            
            const prueba ={
                Nombre: "Hola Mundo"
            }

            try {
                const res = await axios.post(url,{
                    Fecha: fechaFormateada
                })
                Swal.fire(
                "Reserva editada!",
                "Los cambios fueron aplicados con exito",
                "success"
                );
                traerFechasNoDisponibles()
                handleResetForm()
            } catch (error) {
                console.log(error);
            }
            
        }
      });
    },
  });

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

  const handleResetForm = () => {
    formik.resetForm();
  };

  return (
    <>
     <h1>Crear fecha no disponible</h1>
                <Form onSubmit={formik.handleSubmit} noValidate>
                    <Form.Group>
                        <Form.Label>Fecha no Disponible :</Form.Label>
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
                <Button variant="primary" type="submit" className='mt-2 mb-2'>
              Guardar cambios
            </Button>
                </Form>
    </>
  )
}

export default CrearFechaReserva