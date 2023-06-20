import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  LinearProgress,
  Typography,
  Grid,
  Tooltip,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid-pro";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchUserInforsAsync, userInforSelectors } from "./userInforSlice";
import { useEffect, useState } from "react";
import { UserInfor } from "../../app/models/userInfor";
import agent from "../../app/api/agent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
interface Props {
  open: boolean;
  onClose: () => void;
  departmentNameParam: string;
  departmentId: number;
  rows: any;
  oldManagerName: string;
}

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

export default function DepartmentManagers({
  open,
  onClose,
  departmentNameParam,
  departmentId,
  rows,
  oldManagerName,
}: Props) {
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
      //departmentName
      field: "departmentName",
      headerName: "Phòng Ban",
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
      //email
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      field: "button",
      headerName: "",
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleAccountIconClick(params.row)}
            disabled={params.row.isManager === true ? true : false}
          >
            <Tooltip title={selectedId === params.row.id ? "Manager" : "Staff"}>
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
          </IconButton>

          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [departmentName, setDepartmentName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerId, setManagerId] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const handleAccountIconClick = (row: any) => {
    setSelectedId((prevId) => (prevId === row.id ? "" : row.id));
    // Handle any additional logic for the button click
    setManagerName(row.fullName);
    setManagerId(row.staffId);
  };
  const handleInputChange = (event: any) => {
    setDepartmentName(event.target.value);
  };

  const handleSave = () => {
    // Get Employees that are selected
    const selectedEmployees = rows.filter((row: UserInfor) => rowSelectionModel.includes(row.id));

    const departmentUpdate = {
      ManagerName: "",
      userInfors: [],
      ManagerId: managerId,
    };
    agent.Department.update(departmentId, departmentUpdate)
      .then((response) => {
        console.log("Department created successfully:", response);
      })
      .catch((error) => {
        console.error("Error creating department:", error);
      });

    // Clear the selected rows
    setRowSelectionModel([]);
    onClose();
    //console.log(department.UserInfors);
  };

  return (
    <Dialog fullWidth={true} open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle sx={{ fontSize: 25, fontWeight: 600, marginBottom: 1 }}>
        Thay đổi quản lý
      </DialogTitle>

      <DialogContent sx={{ height: "600px" }}>
        <Grid container spacing={4} display="flex" alignItems="center">
          <Grid item>
            <Typography sx={{ fontSize: 20, fontWeight: 600, marginBottom: 0 }}>
              {departmentNameParam}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" sx={{ color: "#007FFF", fontWeight: "bold" }}>
              <Box display="flex" alignItems="center">
                <AccountCircleIcon sx={{ mr: "5px" }} />
                <div>Quản lý cũ: {oldManagerName}</div>
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" sx={{ color: "#FF6969", fontWeight: "bold" }}>
              <Box display="flex" alignItems="center">
                <AccountCircleIcon sx={{ mr: "5px" }} />
                <div>Quản lý mới: {managerName}</div>
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <DataGrid
          sx={{
            height: 500,
            width: "100%",
            marginTop: 2,
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
          //loading = {!departmentsLoaded}
          rows={rows}
          columns={columns}
          classes={{
            columnHeader: "custom-header",
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
            console.log(newRowSelectionModel);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#FF605C" }} onClick={onClose}>
          Hủy
        </Button>
        <Button onClick={handleSave}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}
