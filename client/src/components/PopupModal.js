import React from "react";
import Form from "react-bootstrap/Form";
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
