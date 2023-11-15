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
        const response = await axios.get("http://localhost:3001/request/supervisor/" + id);
        const mappedRequests = mapRequestsToColumns(response.data);
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
          description: `${request.comment} x ${request.price} ${request.size_unit}`,
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
    };
  };

  const handleCardMove = async (_card, source, destination) => {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setControlledBoard(updatedBoard);
  
    // Extraer el requestId y el nuevo requestStatus de las propiedades de la tarjeta
    const requestId = _card.id;
  
    // Obtener la columna de destino de la tarjeta
    const columnName = Object.keys(updatedBoard.columns).find(
      (col) => updatedBoard.columns[col].cards.some((card) => card.id === requestId)
    );
  
    const requestStatus = columnName ? columnName.toLowerCase() : 'pendiente'; 
    console.log(requestStatus)
    
    let requestName;
    if (requestStatus == 0) {
      requestName = 'pendiente'; // Listo
    } else if (requestStatus == 1) {
      requestName = 'listo'; // Enviado
    } else if (requestStatus == 2)  {
      requestName = 'enviado';// Pendiente por defecto si no se encuentra ninguna columna
    }
    console.log(requestName)
    try {
      // Hacer la llamada a la API para actualizar el estado
      await axios.patch(`http://localhost:3001/request/${requestId}/status`, { requestName });
    } catch (error) {
      console.error('Error al actualizar el estado de la solicitud:', error);
    }
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
