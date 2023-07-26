import React from 'react'
import { Container, Stack, Form } from 'react-bootstrap'
import "../../../style/configurar-cuenta.css"

const configurarContraseña = () => {
  return (
    <>
    <div className='Contenedor-Cambiar-Contraseña'>
    <div>
        <h1>Cambiar Contraseña</h1>
    </div>
    <Container>
        <div>
            <Form>
                <Stack gap={2}>
                    <Form.Group>
                        <Form.Label>Ingrese su contraseña actual :</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ingrese su nueva contraseña :</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ingrese nuevamente su nueva contraseña :</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Stack>
            </Form>
        </div>
    </Container>
    </div>
    </>
  )
}

export default configurarContraseña