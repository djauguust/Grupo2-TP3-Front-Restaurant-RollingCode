import React from 'react'
import styles from '../styles/ButtonDefault.css'

function ButtonDefault({namebtn}) {
  return (
    <>
    <button className="btn mt-3 mb-3" type="submit">{namebtn}</button>
    </>
  )
}

export default ButtonDefault