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
  createOrAdd: boolean;
  departmentNameParam: string;
  departmentId: number;
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

export default function DepartmentForm({
  open,
  onClose,
  createOrAdd,
  departmentNameParam,
  departmentId,
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
          <IconButton onClick={() => handleAccountIconClick(params.row)}>
            <Tooltip title={selectedId === params.row.id ? "Manager" : "Staff"}>
              <AccountCircleIcon
                sx={{ color: selectedId === params.row.id ? "#F36554" : "#AEAEAE" }}
              />
            </Tooltip>
          </IconButton>

          <IconButton onClick={() => handleButtonClick(params.row.id)}>
            <MoreHorizIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const userInfors = useAppSelector(userInforSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { userInforsLoaded, filtersLoaded } = useAppSelector((state) => state.userInfor);
  const [rows, setRows] = useState<UserInfor[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [departmentName, setDepartmentName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerId, setManagerId] = useState("");
  
  const handleAccountIconClick = (row: any) => {
    setSelectedId((prevId) => (prevId === row.id ? "" : row.id));
    // Handle any additional logic for the button click
    setManagerName(row.fullName);
    setManagerId(row.staffId);
  };

  // If userInfors is not loaded, load it using dispatch
  useEffect(() => {
    if (!userInforsLoaded) dispatch(fetchUserInforsAsync());
    console.log(userInfors);
  }, [dispatch, userInforsLoaded]);

  // If userInfors is loaded, set rows
  useEffect(() => {
    if (userInforsLoaded) {
      setRows(userInfors);
    }
  }, [userInforsLoaded, userInfors]);

  const handleInputChange = (event: any) => {
    setDepartmentName(event.target.value);
  };

  const handleSave = () => {
    // Get Employees that are selected
    const selectedEmployees = rows.filter((row) => rowSelectionModel.includes(row.id));

    if (createOrAdd == false) {
      const departmentCreate = {
        DepartmentName: departmentName,
        ManagerId: 0,
        UserInfors: selectedEmployees,
      };
      agent.Department.create(departmentCreate)
        .then((response) => {
          console.log("Department created successfully:", response);
        })
        .catch((error) => {
          console.error("Error creating department:", error);
        });
    } else {
      const departmentUpdate = {
        DepartmentName: departmentNameParam,
        UserInfors: selectedEmployees,
      };
      agent.Department.update(departmentId, departmentUpdate)
        .then((response) => {
          console.log("Department updated successfully:", response);
        })
        .catch((error) => {
          console.error("Error updating department:", error);
        });
    }

    // Clear the selected rows
    setRowSelectionModel([]);
    onClose();

    //console.log(department.UserInfors);
  };

  return (
    <Dialog fullWidth={true} open={open} onClose={onClose} maxWidth="lg">
      {createOrAdd ? (
        <DialogTitle sx={{ fontSize: 25, fontWeight: 600, marginBottom: 1 }}>
          Thêm nhân viên
        </DialogTitle>
      ) : (
        <DialogTitle sx={{ fontSize: 25, fontWeight: 600, marginBottom: 1 }}>
          Tạo mới phòng ban
        </DialogTitle>
      )}

      <DialogContent sx={{ height: "600px" }}>
        {createOrAdd ? (
          <Typography sx={{ fontSize: 20, fontWeight: 600, marginBottom: 1 }}>
            {departmentNameParam}
          </Typography>
        ) : (
          <>
            <Grid container spacing={4} display="flex" alignItems="center">
              <Grid item xs={4}>
                <TextField
                  id="departmentName"
                  label="Tên Phòng Ban"
                  variant="standard"
                  sx={{ width: "100%" }}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item>
                <Typography variant="body1" sx={{ color: "#FF6969", fontWeight: "bold", mt: 3 }}>
                  <Box display="flex" alignItems="center">
                    <AccountCircleIcon sx={{ mr: "5px" }} />
                    <div>Quản lý mới: {managerName}</div>
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </>
        )}

        <DataGrid
          sx={{
            height: 500,
            width: "100%",
            marginTop: 3,
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
          checkboxSelection
          isRowSelectable={(params: GridRowParams) =>
            params.row.departmentName != departmentNameParam
          }
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

const handleButtonClick = (id: any) => {
  // Handle button click for the corresponding row ID
  console.log(`Button clicked for ID ${id}`);
};
