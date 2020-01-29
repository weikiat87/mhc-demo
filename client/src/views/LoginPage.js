import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const LoginPage = props => {

  const handleLogin = (e) => {
    const [username,password] = e.target.elements
    console.log(username, password)
    e.preventDefault();
  }

  return (
    <div>
        <h1>
            Login Page
        </h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control required placeholder="Enter Username" />
          <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
