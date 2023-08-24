import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import axios from "axios";
import { AdministradorContexto } from "../../Contexto/ContextoAdmin";

const CantidadMaximaReservas = () => {

  const {traerFechasNoDisponibles} = useContext(AdministradorContexto)

  const url = import.meta.env.VITE_API_RESERVASMAXIMAS

  const [reservas, setReservas] = useState([]);
  const [IdReservasMaximas, setIdReservasMaximas] = useState(null);

  const traerComenzales = async () => {
    try {
      const res = await axios.get(url);
      setReservas(res.data);
    } catch (error) {
      /* console.log(error); */
    }
  };

  {reservas.length === 0 && (
    traerComenzales()
  )}
  

  
  const setearIdComenzales = () =>{
    if (reservas) {
      const idreserva = reservas[0]
      setIdReservasMaximas(idreserva)
      
    }    
  }
  
  useEffect(() =>{
    setearIdComenzales()
  },[reservas])



  //Esquema Yup
  const ersquemaReservasMaxima = Yup.object().shape({
    reservasMaxima: Yup.number()
      .required("La cantidad es requerida")
      .min(1, "No se puede mandar numeros menores a 1"),
  });

  //Valores Iniciales
  const valoresIniciales = {
    reservasMaxima: 1,
  };

  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: ersquemaReservasMaxima,
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
            const res = await axios.put(`${url}/${IdReservasMaximas.id}`, {
              reservasMaxima: values.reservasMaxima,
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
     <h1>Cambiar cantidad maxima de Reservas</h1>
     <Form onSubmit={formik.handleSubmit} noValidate>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label>Cantidad maxima de comenzales</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej:12"
            id="reservasMaxima"
            {...formik.getFieldProps("reservasMaxima")}
            className={clsx(
              "form.control", "w-50",
              {
                "is-invalid":
                  formik.touched.reservasMaxima &&
                  formik.errors.reservasMaxima,
              },
              {
                "is-valid":
                  formik.touched.reservasMaxima &&
                  !formik.errors.reservasMaxima,
              }
            )}
          />
          {formik.touched.reservasMaxima &&
            formik.errors.reservasMaxima && (
              <div className="d-inline-block">
                <span role="alert" className="text-danger">
                  {formik.errors.reservasMaxima}
                </span>
              </div>
            )}
        </Form.Group>
        <Button variant="primary" type="submit" className='mt-2 mb-2' >
              Guardar cambios
            </Button>
      </Form>
    </>
  )
}

export default CantidadMaximaReservas