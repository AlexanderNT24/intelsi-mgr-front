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
        const completoRequests = response.data.filter((request) => request.requeststatus === "completo");
        setRequests(completoRequests);
      })
      .catch((error) => {
        console.error("Error while fetching completo requests", error);
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
      })
      .then(() => {
        setRequests((prevRequests) => prevRequests.filter((request) => request.id !== editedRequest.id));
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
    <Container style={{marginLeft:'250px'}}>
      <h2>Completo Requests</h2>
      <List>
        {requests.map((request) => (
          <ListItem key={request.id}>
            <ListItemText primary={`Request ID: ${request.id}`} secondary={`Price: $${request.price}`} />
            <Button onClick={() => handleEditRequest(request)}>Edit</Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Request</DialogTitle>
        <DialogContent>
          <p>Request ID: {editedRequest && editedRequest.id}</p>
          {/* Mostrar otros campos de la solicitud para su edición */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateRequest} color="primary">
            Mark as Revisado
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InProgress;
