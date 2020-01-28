import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormCheck from "react-bootstrap/FormCheck";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Popup = props => {
  let [show] = props;
  return (
    <Modal show={show}>
      <Form>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="danger">Cancel</Button>
      </Form>
    </Modal>
  );
};

export default Popup;
