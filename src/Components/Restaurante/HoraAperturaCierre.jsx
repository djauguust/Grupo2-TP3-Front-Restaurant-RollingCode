import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Swal from "sweetalert2";
import axios from "axios";
import es from "date-fns/locale/es";
import { AdministradorContexto } from "../../Contexto/ContextoAdmin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, getDay, parseISO, setHours, setMinutes } from "date-fns";


const HoraAperturaCierre = () => {

  const {traerFechasNoDisponibles} = useContext(AdministradorContexto)

  const url = import.meta.env.VITE_API_HORARIO

  const [horario, setHorario] = useState([]);
  const [IdHorario, setIdHorario] = useState(null);

  const TraerHorario = async () => {
    try {
      const res = await axios.get(url);
      setHorario(res.data);
    } catch (error) {
      /* console.log(error); */
    }
  };

  {horario.length === 0 && (
    TraerHorario()
  )}
  
  
  const setearIdHorario = () =>{
    if (horario) {
      const idhorario = horario[0]
      setIdHorario(idhorario)
      
    }    
  }


  
  useEffect(() =>{
    setearIdHorario()
  },[horario])




  //Esquema Yup
  const esquemaHoraAperturayCierre = Yup.object().shape({
    HoraApertura : Yup.string()
    .required("La hora de apertura es requerida"),

HoraCierre : Yup.string()
    .required("La hora de cierre es requerida")
  });

  //Valores Iniciales
  const valoresIniciales = {
    HoraApertura : "",
    HoraCierre : ""
  };

  const formik = useFormik({
    initialValues: valoresIniciales,
    validationSchema: esquemaHoraAperturayCierre,
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

          const horaDesdeFormateada = parseInt(format(values.HoraApertura, 'HHmm'))
          const horaHastaFormateada = parseInt(format(values.HoraCierre, 'HHmm'))
          
          const horario = {
            horario : {
              desde : horaDesdeFormateada,
              hasta : horaHastaFormateada
            }
          }

          handleResetForm()
traerFechasNoDisponibles()

          try {
            const res = await axios.put(url, 
              horario
            );
            // Resto de tu código
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

  
  //Funcion para que solo se vean las horas que son validas
  let handleColor = (time) => {
    return time.getHours() > 11 ? "" : "d-none";
  };

  
  //Funcion para deshabilitar horas
  const filterTime = (time) => {
    const hours = new Date(time).getHours();
    return hours > 11 && hours <= 23;
  };


  return (
    <>  
        <h1>Hora de apertura y de Cierre</h1>
     <Form onSubmit={formik.handleSubmit} noValidate>
        <div className="d-flex flex-column align-items-center">
          
          <Form.Group>
          <Form.Label>Hora de Apertura :</Form.Label>
              <Form.Label>Hora</Form.Label>
              <DatePicker
                onFocus={(e) => e.target.blur()}
                selected={formik.values.HoraApertura}
                onChange={(hora) => formik.setFieldValue("HoraApertura", hora)}
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
                    "is-invalid": formik.touched.HoraApertura && formik.errors.HoraApertura,
                  },
                  {
                    "is-valid": formik.touched.HoraApertura && !formik.errors.HoraApertura,
                  }
                )}
              ></DatePicker>
              {formik.touched.HoraApertura && formik.errors.HoraApertura && (
                <div>
                  <span role="alert" className="text-danger">
                    {formik.errors.HoraApertura}
                  </span>
                </div>
              )}
            </Form.Group>
            <Form.Group>
          <Form.Label>Hora de Cierre :</Form.Label>

              <DatePicker
                onFocus={(e) => e.target.blur()}
                selected={formik.values.HoraCierre}
                onChange={(hora) => formik.setFieldValue("HoraCierre", hora)}
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
                    "is-invalid": formik.touched.HoraCierre && formik.errors.HoraCierre,
                  },
                  {
                    "is-valid": formik.touched.HoraCierre && !formik.errors.HoraCierreHoraApertura,
                  }
                )}
              ></DatePicker>
              {formik.touched.HoraCierre && formik.errors.HoraCierre && (
                <div>
                  <span role="alert" className="text-danger">
                    {formik.errors.HoraCierre}
                  </span>
                </div>
              )}
            </Form.Group>
        </div>
        <Button variant="primary" type="submit" className='mt-2 mb-2' >
              Guardar cambios
            </Button>
      </Form>
    </>
  )
}

export default HoraAperturaCierre