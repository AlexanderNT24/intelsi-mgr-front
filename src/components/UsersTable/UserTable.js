import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const initialUser = {
  name: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  rol: '', 
  enabled: true,
};

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Cargar datos iniciales aquí si lo deseas.
    fetch('http://localhost:3001/user') // Cambia la URL según tu configuración de servidor
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []);

  const handleSave = () => {
    if (isEditing) {
      // Realizar la actualización del usuario en la API
      fetch(`http://localhost:3001/user/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((updatedUser) => {
          const updatedUsers = users.map((user) =>
            user.id === formData.id ? updatedUser : user
          );
          setUsers(updatedUsers);
        })
        .catch((error) => console.error('Error al actualizar usuario:', error));
    } else {
      // Realizar la creación de un nuevo usuario en la API
      fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((newUser) => setUsers([...users, newUser]))
        .catch((error) => console.error('Error al crear usuario:', error));
    }
    setFormData(initialUser);
    setIsEditing(false);
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    // Realizar la eliminación del usuario en la API
    fetch(`http://localhost:3001/user/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      })
      .catch((error) => console.error('Error al eliminar usuario:', error));
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginLeft: '258px' }}>
        <h2>User Table</h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.rol}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(user)}>Edit</Button>
                    <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          label="First Name"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
        />
        <TextField
          label="Last Name"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
        />
        <TextField
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          label="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <Select
          label="Rol"
          value={formData.rol}
          onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
        >
          <MenuItem value="supervisor">Supervisor</MenuItem>
          <MenuItem value="administrador">Administrador</MenuItem>
          <MenuItem value="solicitante">Solicitante</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleSave}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </Paper>
    </Container>
  );
}
