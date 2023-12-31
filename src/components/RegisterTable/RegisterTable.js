import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { Alert } from "@mui/material";
import Add from "@mui/icons-material/Add";
import ArrowDownward from "@mui/icons-material/ArrowDropDown";
import CheckCircle from "@mui/icons-material/CheckCircle";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Filter from "@mui/icons-material/Filter";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Close from "@mui/icons-material/Close";
import Save from "@mui/icons-material/Save";
import Search from "@mui/icons-material/Search";
import ViewList from "@mui/icons-material/ViewList";
import { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    padding: '20px',
    marginTop: '20px',
    marginLeft: '258px',
  },
}));

const tableIcons = {
  Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <CheckCircle {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <Save {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <Filter {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Close {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewList {...props} ref={ref} />),
};

const api = axios.create({
  baseURL: `http://localhost:3001`,
});

function RegisterTable() {
  const [data, setData] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const classes = useStyles(); // Aplicando estilos Material-UI

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("Error al obtener productos:", error);
      });
  }, []);

  const columns = [
    { title: "product_id", field: "product_id", hidden: true },
    { title: "Codigo Producto", field: "product_code" },
    { title: "Cantidad", field: "quantity" },
    { title: "Tamaño Unidad", field: "size_unit" },
    { title: "Comentario", field: "comment" },
    { title: "Estado", field: "state" },
    { title: "Ubicación", field: "location" },
    { title: "Categoría ID", field: "category_id" },
    { title: "Marca ID", field: "brand_id" },
  ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    // Validación y actualización de un producto existente
    api
      .put(`/products/${newData.id}`, newData) // Reemplaza con el endpoint correcto para actualizar productos
      .then(() => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve();
        setIserror(false);
        setErrorMessages([]);
      })
      .catch(() => {
        setErrorMessages(["Error al actualizar producto"]);
        setIserror(true);
        resolve();
      });
  };

  const handleRowAdd = (newData, resolve) => {
    // Validación y creación de un nuevo producto
    api
      .post("/products", newData) // Reemplaza con el endpoint correcto para crear productos
      .then((res) => {
        let dataToAdd = [...data];
        dataToAdd.push(res.data);
        setData(dataToAdd);
        resolve();
        setErrorMessages([]);
        setIserror(false);
      })
      .catch(() => {
        setErrorMessages([
          "No se pudo agregar el producto. ¡Error del servidor!",
        ]);
        setIserror(true);
        resolve();
      });
  };

  const handleRowDelete = (oldData, resolve) => {
    // Eliminación de un producto
    console.log(oldData.product_id); // Cambiar oldData.id a oldData.product_id
    api
      .delete(`/products/${oldData.product_id}`) // Cambiar oldData.id a oldData.product_id
      .then(() => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch(() => {
        setErrorMessages([
          "No se pudo eliminar el producto. ¡Error del servidor!",
        ]);
        setIserror(true);
        resolve();
      });
  };
  return (
    <div className="App">
      <Grid container spacing={1}  style={{marginLeft:"30px"}}>
        <Grid item xs={3} />
        <Grid item xs={7}>
          <div className={classes.tableContainer}>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div>
          <MaterialTable
            title="Productos"
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                }),
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve);
                }),
            }}
          />
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
  );
}

export default RegisterTable;
