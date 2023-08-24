import React from 'react'
import styles from '../styles/ButtonDefault.css'
import { Link } from 'react-router-dom'

function ButtonDefault({ namebtn, TipoBoton, funcion, to = null }) {
  return (
    <>
      {to ?
       ( <Link to={"/Registro"} className="lin0k" >
          ¿No tienes cuenta? ¡Crea una!

        </Link>):(
         <button className="btn mt-3 mb-3" type={TipoBoton} >{namebtn}</button>

        )
      }
    </>
  )
}

export default ButtonDefault