import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Popup from "../components/PopupModal";

const AdminDashboardPage = props => {
  const [eventData, setEventData] = useState([]);
  const adminid = "5e31a58e9c4a4c4a24ca3639";
  useEffect(() => {
    const getData = async () => {
      return fetch(`/api/events/admin/${adminid}`).then(response => response.json());
    };
    getData().then(result => setEventData(result));
  }, []);

  console.log(eventData);

  return (
    <div>
      <h1>Admin Dashboard</h1>
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
          {eventData.map(item => (
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

export default AdminDashboardPage;
