import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const LoginPage = props => {
  return (
    <div>
        <h1>
            Login Page
        </h1>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter Username" />
          <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
