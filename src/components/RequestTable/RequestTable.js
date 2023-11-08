import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    marginLeft: "258px",
  },
  tableContainer: {
    maxHeight: "400px",
    overflow: "auto",
  },
};

function RequestTable() {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:3001/request"); // Asegúrate de que la URL sea correcta
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        console.error("Error al obtener solicitudes:", response.status);
      }
    } catch (error) {
      console.error("Error al obtener solicitudes:", error);
    }
  };
  const fetchProd = async () => {
    try {
      const response = await fetch("http://localhost:3001/products"); // Asegúrate de que la URL sea correcta
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Error al obtener solicitudes:", response.status);
      }
    } catch (error) {
      console.error("Error al obtener solicitudes:", error);
    }
  };

  useEffect(() => {
    fetchProd();
  }, []);

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSave = async () => {
    if (
      formData.dateRequest &&
      formData.dateShipment &&
      formData.requestStatus &&
      formData.price &&
      formData.idProducto
    ) {
      try {
        if (isEditing) {
          const response = await fetch(`/request/${formData.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            fetchRequests(); // Actualiza la lista de solicitudes
          } else {
            console.error("Error al actualizar solicitud:", response.status);
          }
        } else {
          const response = await fetch("http://localhost:3001/request", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            fetchRequests(); // Actualiza la lista de solicitudes
          } else {
            console.error("Error al crear solicitud:", response.status);
          }
        }
        setFormData({});
        setIsEditing(false);
      } catch (error) {
        console.error("Error al guardar solicitud:", error);
      }
    } else {
      alert("Por favor, ingresa datos válidos.");
    }
  };

  const handleEdit = (request) => {
    setFormData({ ...request });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/request/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchRequests(); // Actualiza la lista de solicitudes
      } else {
        console.error("Error al eliminar solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error al eliminar solicitud:", error);
    }
  };

  function formatDateString(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <Container>
      <Paper elevation={3} style={styles.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2>Tabla de Pedidos</h2>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TableContainer style={{ maxHeight: "400px", overflow: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha de solicitud</TableCell>
                    <TableCell>Fecha de envío</TableCell>
                    <TableCell>Estado de solicitud</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>ID del Producto</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        {formatDateString(request.daterequest)}
                      </TableCell>
                      <TableCell>
                        {formatDateString(request.dateshipment)}
                      </TableCell>
                      <TableCell>{request.requeststatus}</TableCell>
                      <TableCell>{request.price}</TableCell>
                      <TableCell>{request.idproducto}</TableCell>
                      <TableCell>{request.idproducto}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEdit(request)}>
                          Editar
                        </Button>
                        <Button onClick={() => handleDelete(request.id)}>
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type="date"
              value={formData.dateRequest || ""}
              InputLabelProps={{
                shrink: formData.dateRequest ? true : false,
              }}
              onChange={(e) =>
                setFormData({ ...formData, dateRequest: e.target.value })
              }
            />
            <TextField
              type="date"
              value={formData.dateShipment || ""}
              InputLabelProps={{
                shrink: formData.dateShipment ? true : false,
              }}
              onChange={(e) =>
                setFormData({ ...formData, dateShipment: e.target.value })
              }
            />

            <FormControl sx={{ width: 300 }}>
              <InputLabel htmlFor="request-status">
                Estado de solicitud
              </InputLabel>
              <Select
                label="Estado de solicitud"
                id="request-status"
                value={formData.requestStatus || ""}
                onChange={(e) =>
                  setFormData({ ...formData, requestStatus: e.target.value })
                }
              >
                <MenuItem value="por-revisar">Por Revisar</MenuItem>
                <MenuItem value="revisado">Revisado</MenuItem>
                <MenuItem value="completo">Completo</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Precio"
              type="number"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <Autocomplete
              id="combo-box-demo"
              options={products}
              getOptionLabel={(option) => option.comment} // Display product comment
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Product" />
              )}
              value={
                products.find(
                  (product) => product.product_id === formData.idProducto
                ) || null
              }
              onChange={(event, newValue) => {
                setFormData({
                  ...formData,
                  idProducto: newValue ? newValue.product_id : "",
                });
              }}
            />

            <Button variant="contained" color="primary" onClick={handleSave}>
              {isEditing ? "Actualizar" : "Agregar"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default RequestTable;
