import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Modal, Button, Table } from "react-bootstrap";

const AdminDashboardPage = () => {
  const { user, setUser } = useUser()
  const [eventData, setEventData] = useState([]);       // event state
  const [show, setShow] = useState(false)                // modal state
  const [eventIndex, setEventIndex] = useState(null)     // selected event
  const adminid = user._id;

  useEffect(() => {
    console.log("fetching data for admin")
    const getData = () => {
      return fetch(`/api/events/admin/${adminid}`).then(response => response.json());
    };
    getData().then(result => setEventData(result));
  }, [adminid]);  

  const handleLogout = () => {
    console.log("preparing to logout")
    let res = fetch("/auth/logout", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.error(err));
    res.then(setUser(null));
  };

  const handleShowModal = (index) => {
    setEventIndex(index)
    setShow(true)
  }
  const handleCloseModal = () => {
    setShow(false)
  }
  const dynamicModal = () => {
    if (eventIndex !== null) {
      let data = eventData[eventIndex]
      console.log(data)
      return (
        <Modal show={show} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{data._id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Created By: {data.createdBy.user.username} <br/>
            Created For: {data.vendor.username} <br/> 
            Created Date: {data.createdBy.date} <br/>
            Event Name: {data.eventType.name} <br/>
            Status: {data.status} <br/>
            {data.confirmDate === undefined
              ? `Proposed Date: ${data.proposedDate[0]} ${data.proposedDate[1]} ${data.proposedDate[2]}`
              : `Confirmed Date: ${data.confirmDate}`} <br/>
            {data.status === 'REJECTED' ? `Remark: ${data.remark}` : ""}
          </Modal.Body>
        </Modal>
      );
    }
  }
  
  return (
    <>
      <h1>Admin Dashboard</h1>
      <Link to="/admin/create"> Create new Event</Link>

      <Button onClick={handleLogout}>Logout</Button>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Vendor Name</th>
            <th>Event Dates</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {eventData.map((item, index) => (
            <tr key={item._id}>
              <td>{item.eventType.name}</td>
              <td>{item.vendor.username}</td>
              <td>
                {item.confirmDate === undefined
                  ? `${item.proposedDate[0]}|${item.proposedDate[1]}|${item.proposedDate[2]}`
                  : item.confirmDate}
              </td>
              <td>{item.status}</td>
              <td>{item.createdBy.date}</td>
              <td>
                <Button variant="primary" onClick={(e) => handleShowModal(index)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {dynamicModal()}
    </>
  );
};

export default AdminDashboardPage;
