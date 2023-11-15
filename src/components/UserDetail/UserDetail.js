import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const UserDetail = ({id} ) => {
  console.log("UserDetail - ID:", id);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/${id}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error al obtener detalles del usuario:", error);
      }
    };

    fetchUserDetail();
  }, [id]);

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Typography variant="h4">Detalles del Usuario</Typography>
      <Typography variant="subtitle1">Nombre: {user.name}</Typography>
      <Typography variant="subtitle1">
        Primer Nombre: {user.first_name}
      </Typography>
      <Typography variant="subtitle1">Apellido: {user.last_name}</Typography>
      <Typography variant="subtitle1">
        Correo Electrónico: {user.email}
      </Typography>
    </>
  );
};

export default UserDetail;
