import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const LoginPage = props => {
  const { user, setUser } = useUser();
  //const history = useHistory();
  const handleLogin = e => {
    e.preventDefault();
    e.stopPropagation();

    let data = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value
    };
    //Handle POST to login
    let res = fetch("/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data)
    })
      .then(response => {
        console.log(response);
        // if(response.redirected)
        //   history.push(response.url.split('/')[3]);
        return response.json();
      })
      .catch(err => console.error(err));
    res.then(result => {
      console.log(result);
      //TODO: to save to local storage
      setUser(result);
    });
  };

  const handleLogout = () => {
    let res = fetch("/auth/logout", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.error(err));
    res.then(result => {
      console.log(result);
      //TODO: to clear from local storage
      setUser(null);
    });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control required placeholder="Enter Username" />
          <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>

        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
