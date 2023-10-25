import React, { useState, useEffect } from "react";
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

function ProjectTable() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const generateUniqueCode = () => {
    return "CODE_" + Math.random().toString(36).substr(2, 9);
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:3001/project"); // Cambia la URL según tu configuración
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error("Error al obtener proyectos:", response.status);
      }
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async () => {
    if (formData.name && formData.execution_time) {
      try {
        if (isEditing) {
          const response = await fetch(`http://localhost:3001/project/${formData.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            fetchProjects(); // Actualiza la lista de proyectos
          } else {
            console.error("Error al actualizar proyecto:", response.status);
          }
        } else {
          const code = generateUniqueCode();
          const newProject = { ...formData, code };
          const response = await fetch("http://localhost:3001/project", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProject),
          });

          if (response.ok) {
            fetchProjects(); // Actualiza la lista de proyectos
          } else {
            console.error("Error al crear proyecto:", response.status);
          }
        }
        setFormData({});
        setIsEditing(false);
      } catch (error) {
        console.error("Error al guardar proyecto:", error);
      }
    } else {
      alert("Por favor, ingresa datos válidos.");
    }
  };

  const handleEdit = (project) => {
    setFormData({ ...project });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/project/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProjects(); // Actualiza la lista de proyectos
      } else {
        console.error("Error al eliminar proyecto:", response.status);
      }
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px", marginLeft: "258px" }}>
        <h2>Registro de Proyectos</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Código (Generado)</TableCell>
                <TableCell>Tiempo de Ejecución</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.code}</TableCell>
                  <TableCell>{project.execution_time}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(project)}>Editar</Button>
                    <Button onClick={() => handleDelete(project.id)}>Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TextField
          label="Nombre"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          label="Tiempo de Ejecución"
          type="number"
          value={formData.execution_time || ""}
          onChange={(e) =>
            setFormData({ ...formData, execution_time: e.target.value })
          }
        />x
        <Button variant="contained" color="primary" onClick={handleSave}>
          {isEditing ? "Actualizar" : "Agregar"}
        </Button>
      </Paper>
    </Container>
  );
}

export default ProjectTable;
