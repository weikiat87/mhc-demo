import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Popup from "../components/PopupModal";

const VendorDashboardPage = props => {
  const [eventData, setEventData] = useState([]);
  const vendorid = "5e32540bd2927a4ae4f9b68a"; // Placeholder
  useEffect(() => {
    const getData = () => {
      return fetch(`/api/events/vendor/${vendorid}`).then(response => response.json());
    };
    getData().then(result => setEventData(result));
  }, []);

  console.log(eventData);

  return (
    <div>
      <h1>Vendor Dashboard</h1>
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
          {eventData.map(item => (
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
                <Button variant="primary" type="submit">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VendorDashboardPage;
