import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useHistory } from 'react-router-dom'
import { useUser } from "../contexts/UserContext";
// date picker plugin
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminCreatePage = () => {
  const { user } = useUser()
  // states for create page
  const [vendorData, setVendorData] = useState([]);
  const [dates, setDates] = useState([new Date(), new Date(), new Date()]);
  const [eventType, setEventType] = useState([]);
  const history = useHistory();

  // get vendor data from backend
  useEffect(() => {
    const getData = () => {
      return fetch(`/api/vendors`)
        .then(response => response.json());
    };
    getData().then(result => setVendorData(result));
  }, []);
  // get event type data from backend
  useEffect(() => {
    const getData = () => {
      return fetch(`/api/eventtypes`)
        .then(response => response.json());
    };
    getData().then(result => setEventType(result));
  }, []);

  // date handler
  const updateDates = (date, index) => {
    let datesCopy = [...dates]
    datesCopy[index] = date;
    setDates(datesCopy);
  }

  const handleFormSubmit = event => {
    const form = event.currentTarget;
    let data = {
      eventType: eventType.find(item => item.name === form.EventName.value)._id,
      user: user._id,   // TODO: need to get hr admin id
      vendor: vendorData.find(item => item.username === form.VendorName.value)._id,
      proposedDate: [dates[0].toJSON(), dates[1].toJSON(), dates[2].toJSON()],
      location: form.EventLocation.value
    }

    console.log(JSON.stringify(data))

    event.preventDefault();
    event.stopPropagation();
    //Handle Create new Event
    let res = fetch('/api/events/create', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(json => { return json })
      .catch(err => console.error(err))

    res.then(
      result => {
        history.goBack();
      }
    )
  }

  return (
    <div>
      <h1>
        Admin Create
        </h1>
      <Form onSubmit={handleFormSubmit} >
        <Form.Group controlId="VendorName">
          <Form.Label>Vendor Name</Form.Label>
          <Form.Control as="select" >
            {vendorData.map((val, index) => (
              <option key={index}>{val.username}</option>
            ))}
          </Form.Control>
          <Form.Text>Select Vendor to Tag</Form.Text>
        </Form.Group>

        <Form.Group controlId="EventDates">
          <Form.Row>
            <Form.Label>Proposed Dates</Form.Label>
            {dates.map((date, index) => (
              <Col key={`${date}_${index}`}>
                <Form.Control as={DatePicker} selected={date} onChange={newDate => updateDates(newDate, index)}>
                </Form.Control>
              </Col>
            ))}

          </Form.Row>
        </Form.Group>
        <Form.Group as={Col} controlId="EventName">
          <Form.Row>
            <Form.Label>Event Name</Form.Label>
            <Form.Control as="select">
              {eventType.map((val, index) => (
                <option key={index}>{val.name}</option>
              ))}
            </Form.Control>
          </Form.Row>
        </Form.Group>

        <Form.Group required as={Col} controlId="EventLocation">
          <Form.Label>Event Location</Form.Label>
          <Form.Control required as="input">
          </Form.Control>
        </Form.Group>

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

export default AdminCreatePage;
