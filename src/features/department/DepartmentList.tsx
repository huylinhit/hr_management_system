import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { departmentSelectors, fetchDepartmentsAsync } from "./departmentSlice";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./DepartmentList.css";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Department } from "../../app/models/department";
import { Link, NavLink } from "react-router-dom";
import DepartmentForm from "./DepartmentForm";

const columns: GridColDef[] = [
  {
    field: "departmentId",
    headerName: "ID",
    flex: 0.5,
  },
  {
    field: "departmentName",
    headerName: "Tên Phòng Ban",
    flex: 1,
    editable: true,
    headerClassName: "custom-header-text",
  },
  {
    field: "manager",
    headerName: "Quản Lý",
    flex: 1,
    editable: true,
  },
  {
    field: "numberOfStaff",
    headerName: "Số Nhân Viên",
    flex: 1,
    editable: true,
  },
  {
    field: "managerMail",
    headerName: "Email",
    flex: 1,
    editable: true,
  },
  {
    field: "managerPhone",
    headerName: "Số Điện Thoại",
    flex: 1,
    editable: true,
  },
  {
    field: "button",
    headerName: "",
    flex: 0.5,
    renderCell: (params) => (
      // <IconButton onClick={() => handleButtonClick(params.row.id)}>
      //   <MoreHorizIcon />
      // </IconButton>
      <IconButton component={Link} to={`/departments/${params.row.departmentId}`}>
        <MoreHorizIcon />
      </IconButton>
    ),
  },
];
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function DepartmentList() {
  const departments = useAppSelector(departmentSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { departmentsLoaded, staffsLoaded, filtersLoaded } = useAppSelector(
    (state) => state.department
  );
  const [rows, setRows] = useState<Department[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!departmentsLoaded) dispatch(fetchDepartmentsAsync());
    console.log(departments);
  }, [dispatch, departmentsLoaded]);

  useEffect(() => {
    if (departmentsLoaded) {
      // Update the rows when departments are loaded
      setRows(departments);
    }
  }, [departmentsLoaded, departments]);

  return (
    <Container maxWidth="xl">
      <Button
        variant="text"
        sx={{
          fontSize: 25,
          fontWeight: "bold",
          textTransform: "none",
          color: "#333333",
          borderRadius: "10px",
          padding: "0px 10px 0px 10px",
          "&:hover": {
            backgroundColor: "#F8F8F8", // Set the hover background color
          },
        }}
        disableElevation={true}
        component={NavLink}
        to={`/departments`}
        key={"/departments"}
      >
        Danh sách phòng ban
      </Button>
      <Grid container justifyContent={"space-between"}>
        <TextField
          id="standard-basic"
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        <Button
          variant="text"
          sx={{ fontWeight: "bold", textTransform: "none", color: "#007FFF" }}
          disableElevation={true}
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Thêm phòng ban
        </Button>

        <DepartmentForm
          open={open}
          onClose={handleCloseDialog}
          createOrAdd={false}
          departmentNameParam=""
          departmentId={0}
        />
      </Grid>

      <Box sx={{ height: 400, width: "100%", margin: "0 auto", marginTop: "1%" }}>
        <DataGrid
          density="compact"
          sx={{
            height: 650,
            width: "100%",
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold !important",
              overflow: "visible !important",
              color: "#007FFF",
            },
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: "#E0F0FF",
            },
          }}
          slots={{
            loadingOverlay: LinearProgress,
            toolbar: CustomToolbar,
          }}
          loading={!departmentsLoaded}
          rows={rows}
          columns={columns}
          classes={{
            columnHeader: "custom-header",
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
}

const handleButtonClick = (id: any) => {
  // Handle button click for the corresponding row ID
  console.log(`Button clicked for ID ${id}`);
};
