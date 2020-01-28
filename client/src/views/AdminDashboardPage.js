import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Popup from "../components/PopupModal";

const AdminDashboardPage = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      return fetch(`events/`).then(response => response.json());
    };
    getData().then(result => setData(result));
  }, []);

  console.log(data);

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
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.eventName}</td>
              <td>{item.createdBy.name}</td>
              <td>
                {item.confirmDate === undefined
                  ? `${item.proposedDate[0]} ${item.proposedDate[1]} ${item.proposedDate[2]}`
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
