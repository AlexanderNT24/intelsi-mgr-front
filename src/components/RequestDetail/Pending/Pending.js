import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, List, ListItem, ListItemText, Button } from "@mui/material";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const userId = localStorage.getItem("id");
  
  useEffect(() => {
    // Asegúrate de que el servidor tiene un endpoint que maneje las solicitudes por supervisor_id
    axios
      .get(`http://localhost:3001/request/supervisor/${userId}`)
      .then((response) => {
        const pendingRequests = response.data.filter((request) => request.requeststatus === "pendiente");
        setRequests(pendingRequests);
      })
      .catch((error) => {
        console.error("Error while fetching requests", error);
      });
  }, [userId]);


  const handleUpdateRequest = (request) => {
    axios
      .put(`http://localhost:3001/request/${request.id}`, {
        requeststatus: "revisado",
        // Agregar otros campos actualizados según sea necesario
      })
      .then(() => {
        setRequests((prevRequests) => prevRequests.filter((req) => req.id !== request.id));
      })
      .catch((error) => {
        console.error("Error updating the request", error);
      });
  };

  return (
    <Container style={{ marginLeft: '250px' }}>
      <h2>Pending Requests (Por-Revisar)</h2>
      <List>
        {requests.map((request) => (
          <ListItem key={request.id} style={{ border: '1px solid #ccc', marginBottom: '10px', borderRadius: '5px' }}>
            <ListItemText primary={`Request ID: ${request.id}`} secondary={`Price: $${request.price}`} />
            <Button variant="contained" color="primary" onClick={() => handleUpdateRequest(request)}>Mark as Revisado</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PendingRequests;
