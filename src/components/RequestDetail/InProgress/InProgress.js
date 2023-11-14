import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const InProgress = () => {
  const [requests, setRequests] = useState([]);
  const [editedRequest, setEditedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/request")
      .then((response) => {
        const inProgressRequests = response.data.filter((request) => request.requeststatus === "enviado");
        setRequests(inProgressRequests);
      })
      .catch((error) => {
        console.error("Error while fetching in-progress requests", error);
      });
  }, []);

  const handleEditRequest = (request) => {
    setEditedRequest(request);
    setOpenDialog(true);
  };

  const handleUpdateRequest = () => {
    axios
      .put(`http://localhost:3001/request/${editedRequest.id}`, {
        requeststatus: "revisado",
        // Agregar otros campos actualizados según sea necesario
      })
      .then(() => {
        setRequests((prevRequests) => prevRequests.filter((req) => req.id !== editedRequest.id));
        setEditedRequest(null);
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("Error updating the request", error);
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container style={{ marginLeft: '250px' }}>
      <h2>In Progress Requests</h2>
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

export default InProgress;
