import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap"

const Formulario = () =>{
    const [nombre,setNombre]= useState("");
    const [correo,setCorreo]= useState("");
    const [mensaje, setMensaje]= useState("");

    const limpiar=()=>{
        setNombre("");
        setCorreo("");
        setMensaje("");
    }
    return(

        <>
            <h3 className="mb-5 text-center">Completa el formulario y lo contactaremos a la brevedad</h3>
            <Form onSubmit={ev =>{
                ev.preventDefault();
                limpiar();
            }}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control
                         type="text"
                         placeholder="Introduce tu nombre"
                         required
                         minLength={7}
                         maxLength={30}
                         value={nombre}
                         onChange={ev =>{ setNombre(ev.target.value) }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="ejemplo@gmail.com"
                        required
                        minLength={8}
                        maxLength={55}
                        value={correo}
                        onChange={ev =>{ setCorreo(ev.target.value) }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Motivo de contacto"
                        required
                        value={mensaje}
                        maxLength={500}
                        onChange={ev =>{ setMensaje(ev.target.value) }}
                    />
                </Form.Group>

                <Button variant="warning" className="w-100 p-2" type="submit">
                    Enviar
                </Button>

            </Form>
        </>
    )
}

export default Formulario