import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import axios from "axios";
import { AdministradorContexto } from "../../Contexto/ContextoAdmin";

const CantidadMaximaComenzales = () => {

  const {traerFechasNoDisponibles} = useContext(AdministradorContexto)

  const url = import.meta.env.VITE_API_MAXIMOCOMENZALES;

  const [comenzales, setComenzales] = useState([]);
  const [idComenzal, setIdComenzal] = useState(null);

  const traerComenzales = async () => {
    try {
      const res = await axios.get(url);
      setComenzales(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  {comenzales.length === 0 && (
    traerComenzales()
  )}
  

  
  const setearIdComenzales = () =>{
    if (comenzales) {
      const idComenzales = comenzales[0]
      setIdComenzal(idComenzales)
      
    }    
  }
  
  useEffect(() =>{
    setearIdComenzales()
  },[comenzales])



  //Esquema Yup
  const ersquemaComenzales = Yup.object().shape({
    MaximoComenzales: Yup.number()
      .required("La cantidad es requerida")
      .min(1, "No se puede mandar numeros menores a 1"),
  });

  //Valores Iniciales
  const valoresIniciales = {
    MaximoComenzales: "",
  };

  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: ersquemaComenzales,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log(values.MaximoComenzales);
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
            const res = await axios.put(`${url}/${idComenzal.id}`, {
              MaximoComenzales: values.MaximoComenzales,
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
      <h1>Cambiar cantidad Maxima de Comenzales</h1>
      <Form onSubmit={formik.handleSubmit} noValidate>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label>Cantidad maxima de comenzales</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej:12"
            id="MaximoComenzales"
            {...formik.getFieldProps("MaximoComenzales")}
            className={clsx(
              "form.control", "w-50",
              {
                "is-invalid":
                  formik.touched.MaximoComenzales &&
                  formik.errors.MaximoComenzales,
              },
              {
                "is-valid":
                  formik.touched.MaximoComenzales &&
                  !formik.errors.MaximoComenzales,
              }
            )}
          />
          {formik.touched.MaximoComenzales &&
            formik.errors.MaximoComenzales && (
              <div className="d-inline-block">
                <span role="alert" className="text-danger">
                  {formik.errors.MaximoComenzales}
                </span>
              </div>
            )}
        </Form.Group>
        <Button variant="primary" type="submit" className='mt-2 mb-2'>
              Guardar cambios
            </Button>
      </Form>
    </>
  );
};

export default CantidadMaximaComenzales;
