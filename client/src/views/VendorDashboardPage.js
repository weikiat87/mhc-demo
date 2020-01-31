import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { useUser } from "../contexts/UserContext";

const VendorDashboardPage = props => {
  const { user, setUser } = useUser()
  const [eventData, setEventData] = useState([]);
  const [showFirst, setShowFirst] = useState(false)         // 1st modal state
  const [showSecond, setShowSecond] = useState(false)       // 2nd modal state (for accepting rejecting)
  const [action, SetAction] = useState(null)                 // accept or reject action
  const [eventIndex, setEventIndex] = useState(null)        // selected event
  const vendorid = user._id

  useEffect(() => {
    const getData = () => {
      return fetch(`/api/events/vendor/${vendorid}`).then(response => response.json());
    };
    getData().then(result => setEventData(result));
  }, [showSecond,vendorid]);  // refetch data if any of these state/object change


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

  const handleApprove = event => {
    const [selection] = event.currentTarget

    event.preventDefault();
    event.stopPropagation();
    let data = {
      confirmDate: selection.value
    }
    fetch(`/api/events/id/${eventData[eventIndex]._id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data)
    }).then(setShowSecond(false)) // force it to dashboard to refetch data
  }

  const handleReject = (event) => {
    const [selection] = event.currentTarget

    event.preventDefault();
    event.stopPropagation();
    let data = {
      remark: selection.value
    }
    fetch(`/api/events/id/${eventData[eventIndex]._id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data)
    }).then(setShowSecond(false)) // force it to dashboard to refetch data
  }

  const handleShowModal = (index) => {
    setEventIndex(index)
    setShowFirst(true)
  }
  const handleCloseModal = () => {
    setShowFirst(false)
  }
  const handleShowSecondModal = (type) => {
    setShowFirst(false)
    setShowSecond(true)
    SetAction(type)
  }

  const handleCloseSecondModal = () => {
    setShowFirst(false)
    setShowSecond(false)
  }
  const firstModal = () => {
    if (eventIndex !== null) {
      let data = eventData[eventIndex]
      console.log(data)
      return (
        <Modal show={showFirst} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{data._id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button variant="success" onClick={(e) => handleShowSecondModal('approve')}> Approve </Button>
            <Button variant="danger" onClick={(e) => handleShowSecondModal('reject')}> Reject </Button>
          </Modal.Body>
        </Modal>
      );
    }
  }

  const secondModal = () => {
    if (eventIndex !== null) {
      let data = eventData[eventIndex]
      if (action === 'approve')
        return (
          <Modal show={showSecond} onHide={handleCloseSecondModal}>
            <Modal.Header closeButton>
              <Modal.Title>{data._id}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleApprove}>

              <Modal.Body>
                <Form.Control as="select">
                  {data.proposedDate.map((val, index) => (
                    <option key={index}>{val}</option>
                  ))}
                </Form.Control>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit">Submit Approval</Button>
              </Modal.Footer>

            </Form>
          </Modal>
        )
      else
        return (
          <Modal show={showSecond} onHide={handleCloseSecondModal}>
            <Modal.Header closeButton>
              <Modal.Title>{data._id}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleReject}>

              <Modal.Body>
                <Form.Control as="input" required>
                </Form.Control>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit">Submit Rejection</Button>
              </Modal.Footer>

            </Form>
          </Modal>
            );
        }
      }
    
      return (
    <>
              <h1>Vendor Dashboard</h1>
              <Button onClick={handleLogout}>Logout</Button>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Admin Name</th>
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
                      <td>{item.createdBy.user.username}</td>
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
              {firstModal()}
              {secondModal()}
            </>
            );
          };
          
          export default VendorDashboardPage;
