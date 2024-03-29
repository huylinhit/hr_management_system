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
  debounce,
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
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchUserInforsAsync, userInforSelectors } from "./userInforSlice";
import { useEffect, useState } from "react";
import { UserInfor } from "../../app/models/userInfor";
import agent from "../../app/api/agent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Department } from "../../app/models/department";
import moment from "moment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SubjectIcon from "@mui/icons-material/Subject";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setDepartmentChanged, setDepartmentEmployeeAdded } from "./departmentSlice";
import { fetchCurrentUser } from "../account/accountSlice";

interface Props {
  open: boolean;
  onClose: () => void;
  createOrAdd: boolean;
  departmentNameParam: string;
  department: Department | null;
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
const headerStyle = {
  color: "#7C7C7C",
  fontWeight: 700,
  fontFamily: "Mulish",
  fontSize: 15,
};
export default function DepartmentForm({
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
        <IconButton component={Link} to={`/departments/${params.row.departmentId}`}>
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
          <IconButton onClick={() => handleAccountIconClick(params.row)} disabled={createOrAdd}>
            <Tooltip title={selectedId === params.row.id ? "Manager" : "Staff"}>
              <AccountCircleIcon
                sx={{ color: selectedId === params.row.id ? "#F36554" : "#AEAEAE" }}
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
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <>Tên nhân viên</>
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
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <>Phòng ban</>
        </Typography>
      ),
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 200,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <PhoneIcon style={{ marginRight: 5 }} fontSize="small" /> <>Số điện thoại</>
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <>Email</>
        </Typography>
      ),
    },

    {
      field: "gioiTinh",
      headerName: "Giới tính",
      width: 150,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" /> <>Giới tính</>
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
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <>Địa chỉ</>
        </Typography>
      ),
    },
    {
      field: "country",
      headerName: "Quốc gia",
      width: 200,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <>Quốc gia</>
        </Typography>
      ),
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      width: 200,
      valueFormatter: (params) => moment(params.value).format("MMM Do, YYYY"),
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <>Ngày sinh</>
        </Typography>
      ),
    },
  ];
  const userInfors = useAppSelector((state) =>
    userInforSelectors.selectAll(state).filter((u) => u.departmentId !== department?.departmentId)
  );
  const dispatch = useAppDispatch();
  const { userInforsLoaded, filtersLoaded } = useAppSelector((state) => state.userInfor);
  const { departmentAdded } = useAppSelector((state) => state.department);
  const [rows, setRows] = useState<UserInfor[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [departmentName, setDepartmentName] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerId, setManagerId] = useState("");
  const [isDepartmentNameEmpty, setIsDepartmentNameEmpty] = useState(false);

  const handleAccountIconClick = (row: any) => {
    setSelectedId((prevId) => (prevId === row.id ? "" : row.id));
    setManagerName(row.fullName);
    setManagerId(row.staffId);
  };

  // If userInfors is not loaded, load it using dispatch
  useEffect(() => {
    if (!userInforsLoaded || departmentAdded) {
      dispatch(fetchUserInforsAsync());
    }
  }, [dispatch, userInforsLoaded, departmentAdded]);

  // // If userInfors is loaded, set rows
  useEffect(() => {
    if (userInforsLoaded) {
      setRows(userInfors);
    }
  }, [userInforsLoaded]);

  const handleClose = () => {
    onClose();
    setDepartmentName("");
  };
  const handleDepartmentNameInput = debounce((event: any) => {
    setDepartmentName(event.target.value);
  }, 750);

  const handleDepartmentNameBlur = (e: any) => {
    const departmentNameChecker = e.target.value === "";

    setIsDepartmentNameEmpty(departmentNameChecker);
  };

  const handleSave = () => {
    // Get Employees that are selected
    const selectedEmployees = rows.filter((row) => rowSelectionModel.includes(row.id));

    const newEmployees = selectedEmployees.map((row) => row.staffId);

    const updatedEmployees = selectedEmployees.map((employee) => ({
      ...employee,
      departmentId: departmentId,
      isManager: false,
    }));
    if (createOrAdd == false) {
      const departmentCreate = {
        DepartmentName: departmentName,
        ManagerId: managerId || 0,
        UserInfors: newEmployees,
      };

      if (departmentName === "") {
        toast.error("Bạn quên nhập tên phòng ban 😥");
        return;
      }

      agent.Department.create(departmentCreate)
        .then((response) => {
          console.log("Department created successfully:", response);
          toast.success("Thêm phòng ban thành công 😊");
          dispatch(fetchCurrentUser());
          dispatch(setDepartmentChanged(true));
        })
        .catch((error) => {
          console.error("Error creating department:", error);
          toast.error("Xảy ra lỗi khi thêm 😥");
        });
    } else {
      const departmentUpdate = {
        patchDocument: [
          {
            op: "replace",
            path: "/userInfors",
            value: updatedEmployees,
          },
        ],
      };
      agent.Department.patch(departmentId, departmentUpdate.patchDocument)
        .then((response) => {
          dispatch(setDepartmentEmployeeAdded(true));
          dispatch(setDepartmentChanged(true));
          dispatch(fetchCurrentUser());
          toast.success("Thêm nhân viên thành công 😊");
          console.log("Department updated successfully:", response);
        })
        .catch((error) => {
          toast.error("Xảy ra lỗi khi thêm 😥");
          console.error("Error updating department:", error);
        });
    }

    // Clear the selected rows
    setRowSelectionModel([]);
    onClose();

    //console.log(department.UserInfors);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      {createOrAdd ? (
        <DialogTitle sx={{ fontSize: 25, fontWeight: 600, marginBottom: 1 }}>
          Thêm nhân viên
        </DialogTitle>
      ) : (
        <DialogTitle sx={{ fontSize: 25, fontWeight: 600, marginBottom: 1 }}>
          Tạo mới phòng ban
        </DialogTitle>
      )}

      <DialogContent sx={{ height: "700px" }}>
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
                  onBlur={handleDepartmentNameBlur}
                  error={isDepartmentNameEmpty}
                  helperText={isDepartmentNameEmpty ? "Nhập tên phòng ban" : ""}
                  placeholder="Nhập tên phòng ban"
                  variant="standard"
                  sx={{ width: "100%" }}
                  onChange={handleDepartmentNameInput}
                />
              </Grid>

              <Grid item>
                <Typography variant="body1" sx={{ color: "#FF6969", fontWeight: "bold", mt: 3 }}>
                  <Box display="flex" alignItems="center">
                    <AccountCircleIcon sx={{ mr: "5px" }} />
                    <>Quản lý mới: {managerName}</>
                  </Box>
                </Typography>
              </Grid>
              <Grid></Grid>
            </Grid>
          </>
        )}

        <DataGrid
          sx={{
            height: "610px",
            mt: "10px",
            fontSize: 16,
            fontWeight: 550,
            fontFamily: "Mulish",
          }}
          slots={{
            loadingOverlay: LinearProgress,
          }}
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
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" sx={{ width: "70px", marginRight: "10px", marginBottom: "20px"}} onClick={onClose}>
          Hủy
        </Button>
        <Button variant="contained" sx={{ width: "70px", marginRight: "15px", marginBottom: "20px"}} onClick={handleSave}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}
