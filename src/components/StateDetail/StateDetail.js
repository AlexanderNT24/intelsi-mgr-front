import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import Paper from "@mui/material/Paper";
import UserDetail from "../UserDetail/UserDetail";

const ControlledBoardWithApi = () => {
  const { id } = useParams();
  const [controlledBoard, setControlledBoard] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3001/request/supervisor/"+id);
        const filteredRequests = response.data.filter(request => request.requeststatus !== "enviado");
        const mappedRequests = mapRequestsToColumns(filteredRequests);
        setControlledBoard({ columns: Object.values(mappedRequests) });
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const mapRequestsToColumns = (requests) => {
    const columnsMap = {
      pendiente: "Pendiente",
      listo: "Listo",
      enviado: "Enviado",
      
    };

    return requests.reduce((columns, request) => {
      const columnName = columnsMap[request.requeststatus] || "Pendiente";
      const columnIndex = Object.keys(columns).findIndex((col) => col === columnName);

      if (columnIndex !== -1) {
        columns[columnName].cards.push({
          id: request.id,
          title: `ID: ${request.id}`,
          description: `Status: ${request.requeststatus}, Price: $${request.price}`,
        });
      }

      return columns;
    }, initialColumnState());
  };

  const initialColumnState = () => {
    return {
      Pendiente: { id: 1, title: "Pendiente", cards: [] },
      Listo: { id: 3, title: "Listo", cards: [] },
      Enviado: { id: 4, title: "Enviado", cards: [] },
      // Ajusta más columnas según tus estados de solicitud
    };
  };

  const handleCardMove = (_card, source, destination) => {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setControlledBoard(updatedBoard);
  };

  return (
    <div className="dashboard">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
      <UserDetail></UserDetail>
      {controlledBoard ? (
        <Board onCardDragEnd={handleCardMove} disableColumnDrag>
          {controlledBoard}
        </Board>
      ) : (
        <Typography>Loading...</Typography>
      )}
      </Paper>
     
    </div>
  );
};

export default ControlledBoardWithApi;
