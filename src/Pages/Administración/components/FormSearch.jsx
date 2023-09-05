import React from "react";
import { Form } from "react-bootstrap";

export const FormSearch = ({
  formState,
  funcionOnInputChange,
  tipo = "date",
  placeholder = "",
  name = "date",
}) => {
  return (
    <Form>
      <Form.Control
        type={tipo}
        onChange={funcionOnInputChange}
        value={formState[name]}
        name={name}
        placeholder={placeholder}
      />
    </Form>
  );
};
