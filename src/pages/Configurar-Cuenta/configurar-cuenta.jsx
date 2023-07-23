import React from 'react'
import { Button, Container, Form, Stack } from 'react-bootstrap'
import "../../style/configurar-cuenta.css"

const configurarCuenta = () => {
  return (
    <>
    <div className='Contenedor-Cuerpo'>
    <div className='text-center'>
        <h1>Cambia los datos de tu cuenta :</h1>
    </div>
    <h3></h3>
    <Container>
        <div className='Contenedor-Form d-flex justify-content-center mt-3'>    
        <Form>
        <Stack gap={2}>
            <Form.Group>
                <Form.Label>Nombre :</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Label>Apellido :</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email :</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Label>Contraseña   :</Form.Label>
                <Form.Control />
            </Form.Group>
        </Stack>
            <Button className='btn-Volver mt-3'>Guardar Cambios</Button>
        </Form>
        </div>
    </Container>
    </div>
    </>
  )
}

export default configurarCuenta