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
  GridRowSelectionModel,
} from "@mui/x-data-grid-pro";

import { useEffect, useState } from "react";

import moment from "moment";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// component
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SubjectIcon from "@mui/icons-material/Subject";
import PhoneIcon from "@mui/icons-material/Phone";

// data
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { UserInfor } from "../../app/models/userInfor";
import { Department } from "../../app/models/department";
import {
  employeeSelectors,
  fetchEmployeesAsync,
} from "../../app/store/employee/employeeSlice";

// interface
interface Props {
  open: boolean;
  onClose: () => void;
  createOrAdd: boolean;
  departmentNameParam: string;
  department: Department | null;
  departmentId: number;
}

const headerStyle = {
  color: "#7C7C7C",
  fontWeight: 700,
  fontFamily: "Mulish",
  fontSize: 15,
};

export default function ContractForm({
  open,
  onClose,
  createOrAdd,
  departmentNameParam,
  departmentId,
  department,
}: Props) {
  const columns: GridColDef[] = [
    {
      field: "button",
      headerName: "",
      align: "center",
      width: 50,
      renderCell: (params) => (
        <IconButton
          component={Link}
          to={`/departments/${params.row.departmentId}`}
        >
          <MoreHorizIcon />
        </IconButton>
      ),
    },
    {
      field: "manager",
      headerName: "",
      align: "center",
      width: 50,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleAccountIconClick(params.row)}
            disabled={createOrAdd}
          >
            <Tooltip title={selectedId === params.row.id ? "Manager" : "Staff"}>
              <AccountCircleIcon
                sx={{
                  color: selectedId === params.row.id ? "#F36554" : "#AEAEAE",
                }}
              />
            </Tooltip>
          </IconButton>
        </>
      ),
    },
    {
      //staffId
      field: "staffId",
      headerName: "Id",
      width: 100,
    },
    {
      //fullName
      field: "fullName",
      headerName: "Tên Nhân Viên",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Tên nhân viên</div>
        </Typography>
      ),
    },
    {
      //departmentName
      field: "departmentName",
      headerName: "Phòng Ban",
      width: 200,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Phòng ban</div>
        </Typography>
      ),
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <PhoneIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Số điện thoại</div>
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Email</div>
        </Typography>
      ),
    },

    {
      field: "gioiTinh",
      headerName: "Giới tính",
      width: 150,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Giới tính</div>
        </Typography>
      ),

      renderCell(params) {
        return (
          <>
            {params.value === "Nam" ? (
              <Typography
                sx={{
                  backgroundColor: "#D1F2FB",
                  color: "#2E839A",
                  fontFamily: "Mulish",
                  fontWeight: 700,
                  padding: "1px 10px ",
                  borderRadius: "6px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {params.value}
              </Typography>
            ) : (
              <Typography
                sx={{
                  padding: "1px 10px ",
                  backgroundColor: "#F6D7D7",
                  color: "#D85858",
                  fontFamily: "Mulish",
                  fontWeight: 700,
                  borderRadius: "6px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {params.value}
              </Typography>
            )}
          </>
        );
      },
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Địa chỉ</div>
        </Typography>
      ),
    },
    {
      field: "country",
      headerName: "Quốc gia",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Quốc gia</div>
        </Typography>
      ),
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      width: 200,
      editable: true,
      valueFormatter: (params) => moment(params.value).format("MMM Do, YYYY"),
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Ngày sinh</div>
        </Typography>
      ),
    },
  ];
  const employees = useAppSelector((state) =>
    employeeSelectors
      .selectAll(state)
      .filter((u) => u.departmentId !== department?.departmentId)
  );
  const dispatch = useAppDispatch();
  const { employeesLoaded } = useAppSelector((state) => state.employee);
  const [rows, setRows] = useState<UserInfor[]>([]);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [departmentName, setDepartmentName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerId, setManagerId] = useState("");

  const handleAccountIconClick = (row: any) => {
    setSelectedId((prevId) => (prevId === row.id ? "" : row.id));
    setManagerName(row.fullName);
    setManagerId(row.staffId);
  };

  // If userInfors is not loaded, load it using dispatch
  useEffect(() => {
    if (!employeesLoaded) dispatch(fetchEmployeesAsync());
  }, [dispatch, employeesLoaded]);

  // // If userInfors is loaded, set rows
  useEffect(() => {
    if (employeesLoaded) {
      setRows(employees);
    }
  }, [employeesLoaded]);
  employeesLoaded;
  const handleInputChange = (event: any) => {
    setDepartmentName(event.target.value);
  };

  const handleSave = () => {};

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
                <Typography
                  variant="body1"
                  sx={{ color: "#FF6969", fontWeight: "bold", mt: 3 }}
                >
                  <Box display="flex" alignItems="center">
                    <AccountCircleIcon sx={{ mr: "5px" }} />
                    <div>Quản lý mới: {managerName}</div>
                  </Box>
                </Typography>
              </Grid>
              <Grid></Grid>
            </Grid>
          </>
        )}

        <DataGrid
          sx={{
            height: "550px",
            mt: "10px",
            fontSize: 16,
            fontWeight: 550,
            fontFamily: "Mulish",
          }}
          slots={{
            loadingOverlay: LinearProgress,
            //toolbar: CustomToolbar,
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
            params.row.departmentName != department?.departmentName
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
