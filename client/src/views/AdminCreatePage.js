import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormCheck from "react-bootstrap/FormCheck";
import Button from "react-bootstrap/Button";
const AdminDashboardPage = props => {
  return (
    <div>
        <h1>
            Admin Create
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
        
        <Button variant="primary" >
          Back
        </Button>
      </Form>
    </div>
  );
};

export default AdminDashboardPage;
