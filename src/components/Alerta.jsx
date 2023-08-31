import React, { useContext } from 'react'
import { Toast } from 'react-bootstrap'
import { NavbarContext } from '../context/NavbarContext'

const Alerta = () => {
    
const {toast, setToast} = useContext(NavbarContext)

  return (
    <>
     <div className=" contenedor-toast">
      <Toast onClose={() => setToast(false)} show={toast} delay={3000} autohide className="contenedorToast">
          <Toast.Header>
            <img
              src="../../../public/Diseño-Final-Final.png"
              className="icono-toast"
              alt=""
            />
          </Toast.Header>
          <Toast.Body>Usuario Logueado con éxito</Toast.Body>
        </Toast>
      </div>
    </>
  )
}

export default Alerta