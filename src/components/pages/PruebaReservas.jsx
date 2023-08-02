import React from "react";
import { Formik, useFormik } from "formik";

const PruebaReservas = () => {

  // let initialValues={
  //   uno:"",
  //   dos:"",
  //   tres:"",
  //   cuatro:"",
  // }

  // const enviar = (data)=>{
  //   console.log(data)
  // }

  const formik = useFormik({
    initialValues:{
      uno:"",
      dos:"",
      tres:"",
      cuatro:"",
    },
    onSubmit : values => console.log(values)
  })


  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input onChange={formik.handleChange} name="uno" type="text" />
        <input onChange={formik.handleChange} name="dos" type="text" />
        <input onChange={formik.handleChange} name="tres" type="text" />
        <input onChange={formik.handleChange} name="cuatro" type="text" />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default PruebaReservas;
