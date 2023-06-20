import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { departmentSelectors, fetchDepartmentAsync } from "./departmentSlice";
import { useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  AppBar,
  Button,
  Container,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Tooltip,
  Typography,
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
import { NavLink, useParams } from "react-router-dom";
import DepartmentForm from "./DepartmentForm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DepartmentManagers from "./DepartmentManagers";
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
export default function DepartmentDetails() {
  const columns: GridColDef[] = [
    {
      //staffId
      field: "staffId",
      headerName: "Id",
      flex: 0.5,
    },
    {
      //fullName
      field: "fullName",
      headerName: "Tên Nhân Viên",
      flex: 1,
      editable: true,
      headerClassName: "custom-header-text",
    },
    {
      //position
      field: "position",
      headerName: "Chức vụ",
      flex: 1,
      editable: true,
    },
    {
      //phone
      field: "phone",
      headerName: "Số Điện Thoại",
      flex: 1,
      editable: true,
    },
    {
      //gioiTinh
      field: "gioiTinh",
      headerName: "Giới Tính",
      flex: 1,
      editable: true,
    },
    {
      //email
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      //bank
      field: "bank",
      headerName: "Ngân Hàng",
      flex: 1,
      editable: true,
    },
    {
      //bankAccount
      field: "bankAccount",
      headerName: "TK Ngân Hàng",
      flex: 1,
      editable: true,
    },
    {
      field: "button",
      headerName: "",
      flex: 0.5,
      renderCell(params) {
        return (
          <>
            <Tooltip
              title={
                params.row.isManager === true
                  ? "Manager"
                  : selectedId === params.row.id
                  ? "Manager"
                  : "Staff"
              }
            >
              <AccountCircleIcon
                sx={{
                  color:
                    params.row.isManager === true
                      ? "#007FFF"
                      : selectedId === params.row.id
                      ? "#FF5353"
                      : "#AEAEAE",
                }}
              />
            </Tooltip>

            <IconButton onClick={() => handleButtonClick(params.row.id)}>
              <MoreHorizIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  const [selectedId, setSelectedId] = useState("");

  const handleAccountIconClick = (id: any) => {
    setSelectedId((prevId) => (prevId === id ? "" : id));
    // Handle any additional logic for the button click
    handleButtonClick(id);
  };
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const department = useAppSelector((state) => departmentSelectors.selectById(state, id!));
  const [open, setOpen] = useState(false);
  const [openManager, setOpenManager] = useState(false);

  const managerRow = department?.userInfors.find((row) => row.isManager);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  const handleOpenManagerDialog = () => setOpenManager(true);
  const handleCloseManagerDialog = () => setOpenManager(false);

  const { status: departmentStatus } = useAppSelector((state) => state.department);

  useEffect(() => {
    if (!department && id) dispatch(fetchDepartmentAsync(parseInt(id)));
    console.log(department);
  }, [id, department, dispatch]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={0} alignContent="center">
        <Grid item>
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
        </Grid>

        <Grid item>
          <ArrowRightIcon sx={{ mt: 0.6, padding: 0 }} fontSize="large" />
        </Grid>

        <Grid item>
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
          >
            {department?.departmentName}
          </Button>
        </Grid>
      </Grid>

      <Grid container justifyContent={"space-between"}>
        <Grid container spacing={4} xs={6}>
          <Grid item>
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
          </Grid>
          <Grid item>
            <Tooltip title="Đổi quản lý">
              <Button
                variant="text"
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "10px",
                  marginTop: 3,
                  marginRight: 0,
                  padding: "0px 10px 0px 10px",
                  color: "#007FFF",
                }}
                disableElevation={true}
                startIcon={<AccountCircleIcon />}
                onClick={handleOpenManagerDialog}
              >
                Quản lý: {department?.manager}
              </Button>
            </Tooltip>
          </Grid>

          <DepartmentManagers
            departmentId={department?.departmentId ?? 0}
            open={openManager}
            onClose={handleCloseManagerDialog}
            departmentNameParam={department?.departmentName ?? ""}
            rows={department?.userInfors}
            oldManagerName={department?.manager ?? ""}
          />
        </Grid>

        <Grid item>
          <Grid item xs={12}>
            <Button
              variant="text"
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "10px",
                padding: "0px 10px 0px 10px",
                color: "#007FFF",
              }}
              disableElevation={true}
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
            >
              Thêm nhân viên
            </Button>
            <DepartmentForm
              open={open}
              onClose={handleCloseDialog}
              createOrAdd={true}
              departmentNameParam={department?.departmentName ?? "none"}
              departmentId={department?.departmentId ?? 0}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="text"
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "10px",
                padding: "0px 10px 0px 10px",
                color: "#757575",
              }}
              disableElevation={true}
              startIcon={<ModeEditIcon />}
            >
              Sửa phòng ban
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ height: 600, width: "100%", margin: "0 auto", marginTop: "1%" }}>
        {department ? (
          <DataGrid
            density="compact"
            sx={{
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
            loading={departmentStatus.includes("pending")}
            rows={department.userInfors}
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
        ) : (
          <AppBar />
        )}
      </Box>
    </Container>
  );
}

const handleButtonClick = (id: any) => {
  // Handle button click for the corresponding row ID
  console.log(`Button clicked for ID ${id}`);
};
