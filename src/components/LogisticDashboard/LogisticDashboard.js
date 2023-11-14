import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "../../Css/Components/Dashboard.css";

const LogisticDashboard = () => {
  const [logisticaUsers, setLogisticaUsers] = useState([]);

  useEffect(() => {
    const fetchLogisticaUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/user');
        const users = await response.json();

        // Filtrar usuarios con rol "logistica"
        const logisticaUsers = users.filter(user => user.rol === 'logistica');
        setLogisticaUsers(logisticaUsers);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchLogisticaUsers();
  }, []); // El segundo parámetro es un array vacío para que se ejecute solo una vez al montar el componente

  return (
    <>
      <div className="dashboard">
        <h1>Supervisores</h1>
        <div className="grid">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Correo Electrónico</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logisticaUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Link to={`/user-detail/${user.id}`}>{user.name}{' '}{user.first_name}</Link>
                    </TableCell>

                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default LogisticDashboard;
