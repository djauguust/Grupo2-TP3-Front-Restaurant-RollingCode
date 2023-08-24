import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import axios from "axios";
import { AdministradorContexto } from "../../Contexto/ContextoAdmin";
const TiempoDeReserva = () => {

  const {traerFechasNoDisponibles} = useContext(AdministradorContexto)

  const url = import.meta.env.VITE_API_TIEMPOMAXIMORESERVA


  //Esquema Yup
  const EsquemaTiempoMaximoReservas = Yup.object().shape({
    tiempoMaximoReserva: Yup.number()
      .required("La cantidad es requerida")
      .min(1, "No se puede mandar numeros menores a 1")
      .max(5, "No se pueden mandar numeros mayores a 5")
  });

  //Valores Iniciales
  const valoresIniciales = {
    tiempoMaximoReserva: "",
  };

  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: EsquemaTiempoMaximoReservas,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {

      Swal.fire({
        title: "Seguro que no quiere realizar ningun cambio?",
        text: "Tiene que ingresar otro numero para realizar un cambio",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!",
        cancelButtonText: "Mejor no",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.put(`${url}`, {
              tiempoMaximoReserva: values.tiempoMaximoReserva,
            });

            Swal.fire(
              "Cantidad maxima de comenzales agregada!",
              "Los cambios fueron hechos con exito",
              "success"
            );
            traerFechasNoDisponibles();
            handleResetForm()
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
  });

  const handleResetForm = () => {
    formik.resetForm();
  };

  return (
    <>
    <h1>Cambiar tiempo de reserva</h1>
      <Form onSubmit={formik.handleSubmit} noValidate>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label>Tiempo de reserva</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej:12"
            id="tiempoMaximoReserva"
            {...formik.getFieldProps("tiempoMaximoReserva")}
            className={clsx(
              "form.control", "w-50",
              {
                "is-invalid":
                  formik.touched.tiempoMaximoReserva &&
                  formik.errors.tiempoMaximoReserva,
              },
              {
                "is-valid":
                  formik.touched.tiempoMaximoReserva &&
                  !formik.errors.tiempoMaximoReserva,
              }
            )}
          />
          {formik.touched.tiempoMaximoReserva &&
            formik.errors.tiempoMaximoReserva && (
              <div className="d-inline-block">
                <span role="alert" className="text-danger">
                  {formik.errors.tiempoMaximoReserva}
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

export default TiempoDeReserva