import React from 'react';
import "../../styles/Error404.css"
import { Button } from 'react-bootstrap';

const Error404 = () => {
  return (
    <>
     <div className='Imagen-Fondo'>
        <div className='Fondo-Oscuro'>
          <div className='Cuerpo-Error'>
          <div className='text-center mb-4'>
          <h1 className='mb-3'>Lost in the Pasta</h1>
          <h3>¡Oops! Parece que te has perdido en nuestra deliciosa pasta. 
	            siempre puedes volver a la página de inicio para encontrar el camino de regreso a la auténtica experiencia italiana que ofrecemos.</h3>
          </div>
          <div className='d-flex justify-content-center '>
          <Button className='btn-Volver'>Volver al Inicio</Button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
