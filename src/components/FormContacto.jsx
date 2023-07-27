import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap"

const Formulario = () =>{
    return(
        <>
            <h3 className="mb-5">Completa el formulario y lo contactaremos a la brevedad</h3>
            <Form>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control type="text" placeholder="Introduce tu nombre"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control type="email" placeholder="ejemplo@gmail.com"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Motivo de contacto"/>
                </Form.Group>

                <Button variant="warning" type="submit">
                    Enviar
                </Button>
            </Form>
        </>
    )
}

export default Formulario