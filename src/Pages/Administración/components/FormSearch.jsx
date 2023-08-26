import React from "react";
import { Form } from "react-bootstrap";

export const FormSearch = ({ formState , funcionOnInputChange}) => {
  return (
    <Form>
      <Form.Control
        type="date"
        onChange={funcionOnInputChange}
        value={formState.date}
        name="date"
      />
    </Form>
  );
};
