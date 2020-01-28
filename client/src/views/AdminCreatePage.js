import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Button, Col, Form } from "react-bootstrap";
import { useHistory } from 'react-router-dom'

import "react-datepicker/dist/react-datepicker.css";

const AdminDashboardPage = props => {
  // event type can be ported to backend api if needed
  const eventTypes = ["Health Talk", "Onsite Screening", "Event 3", "Event 4"]
  const history = useHistory();
  const [dates, setDates] = useState([new Date(), new Date(), new Date()]);
  const [validated, setValidated] = useState(false);
  const [event, setEvent] = useState(eventTypes[0]);

  const updateDates = (date, index) => {
    let datesCopy = [...dates]
    datesCopy[index] = date;
    setDates(datesCopy);
  }

  const handleFormSubmit = target => {
    let form = target.currentTarget;
    console.log(form)
    if (form.checkValidity() === false) {
      target.preventDefault();
      target.stopPropagation();
    }
    setValidated(true)
  }

  return (
    <div>
      <h1>
        Admin Create
        </h1>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} >
        <Form.Group controlId="CompanyName">
          <Form.Label>Company Name</Form.Label>
          <Form.Control required disabled defaultValue="HR Company" />
          <Form.Text>Auto Generated Company Name</Form.Text>
        </Form.Group>

        <Form.Group controlId="Dates">
          <Form.Row>
            <Form.Label>Proposed Dates</Form.Label>
            {dates.map((date, index) => (
              <Col key={`${date}_${index}`} >
                <DatePicker selected={date} onChange={newDate => updateDates(newDate, index)}></DatePicker>
              </Col>
            ))}

          </Form.Row>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="Events Name">

            <Form.Label>Event Name</Form.Label>
            <Form.Control as="select" onChange={option => {
              setEvent(option.currentTarget.value)
            }}>
              {eventTypes.map((val, index) => (
                <option key={index}>{val}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group required as={Col} controlId="Location">

            <Form.Label>Event Location</Form.Label>
            <Form.Control required as="input" onChange={option => {
              console.log(option.currentTarget.value)
            }}>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>

          <Col>
            <Button variant="primary" type="submit">
              Submit
        </Button>

          </Col>
          <Col>

            <Button variant="primary" onClick={
              () => history.goBack()
            }>
              Back
        </Button>
          </Col>
        </Form.Row>

      </Form>
    </div>
  );
};

export default AdminDashboardPage;
