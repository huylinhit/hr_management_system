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
import { NavLink, useLocation, useParams } from "react-router-dom";
import DepartmentForm from "./DepartmentForm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DepartmentManagers from "./DepartmentManagers";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import TextFormatOutlinedIcon from "@mui/icons-material/TextFormatOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NumbersIcon from "@mui/icons-material/Numbers";
import SubjectIcon from "@mui/icons-material/Subject";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "../../app/layout/App.css";
import { setHeaderTitle } from "../../app/layout/headerSlice";
import moment from "moment";
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
const fontStyle = "Mulish";
const headerStyle = {
  color: "#7C7C7C",
  fontWeight: 700,
  fontFamily: "Mulish",
  fontSize: 15,
};

export default function DepartmentDetails() {
  const columns: GridColDef[] = [
    {
      field: "button",
      headerName: "",
      width: 60,
      align: "center",
      renderCell(params) {
        return (
          <>
            <IconButton onClick={() => handleButtonClick(params.row.id)}>
              <MoreHorizIcon />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "manager",
      headerName: "Chức Vụ",
      width: 60,
      align: "center",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <AccountCircleIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <div></div>
        </Typography>
      ),
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
          </>
        );
      },
    },
    {
      //staffId
      field: "staffId",
      headerName: "Id",
      width: 75,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <div>ID</div>
        </Typography>
      ),
    },
    {
      //fullName
      field: "fullName",
      headerName: "Tên Nhân Viên",
      width: 200,
      editable: true,
      headerClassName: "custom-header-text",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <div>Tên Nhân Viên</div>
        </Typography>
      ),
    },
    {
      //phone
      field: "phone",
      headerName: "Số Điện Thoại",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <PhoneIcon style={{ marginRight: 5 }} fontSize="small" /> {/* Add the phone icon here */}
          <div>Số Điện Thoại</div>
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
      //email
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <div>Email</div>
        </Typography>
      ),
    },
    {
      //bank
      field: "bank",
      headerName: "Ngân Hàng",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <div>Ngân Hàng</div>
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
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Ngày sinh</div>
        </Typography>
      ),
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Địa chỉ</div>
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
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Quốc gia</div>
        </Typography>
      ),
    },
    {
      //bankAccount
      field: "bankAccount",
      headerName: "TK Ngân Hàng",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersOutlinedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <div>TK Ngân Hàng</div>
        </Typography>
      ),
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
  const location = useLocation();

  useEffect(() => {
    if (!department && id) dispatch(fetchDepartmentAsync(parseInt(id)));
  }, [id, department, dispatch]);

  useEffect(() => {
    dispatch(
      setHeaderTitle([
        { title: "Danh sách phòng ban", path: "/departments" },
        { title: `${department?.departmentName}`, path: "" },
      ])
    );
  }, [location, dispatch, id, department]);
  
  return (
    <>
      <Box sx={{ paddingLeft: "2%", mt: "20px", paddingRight: "2%" }}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <TextField
              id="standard-basic"
              placeholder="Nhập để tìm..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                disableUnderline: true,
                style: { fontFamily: fontStyle },
              }}
              variant="standard"
            />
          </Grid>

          <Grid item>
            <Button
              variant="text"
              sx={{
                fontFamily: "Mulish",
                fontWeight: "600",
                textTransform: "none",
                color: "#7C7C7C",
              }}
              disableElevation={true}
              onClick={handleOpenDialog}
            >
              Filter
            </Button>
            <Button
              variant="text"
              sx={{
                fontFamily: "Mulish",
                fontWeight: "600",
                textTransform: "none",
                color: "#7C7C7C",
              }}
              disableElevation={true}
              onClick={handleOpenDialog}
            >
              Sort
            </Button>
            <Tooltip title="Đổi quản lý">
              <Button
                variant="text"
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "10px",

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
            <Button
              variant="text"
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "10px",
                padding: "0px 10px 0px 10px",
                color: "#007FFF",
                fontFamily: "Montserrat",
              }}
              disableElevation={true}
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
            >
              Thêm nhân viên
            </Button>
            <DepartmentForm
              department={department ?? null}
              open={open}
              onClose={handleCloseDialog}
              createOrAdd={true}
              departmentNameParam={department?.departmentName ?? "none"}
              departmentId={department?.departmentId ?? 0}
            />
            <Button
              variant="text"
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "10px",
                padding: "0px 10px 0px 10px",
                color: "#757575",
                fontFamily: "Montserrat",
              }}
              disableElevation={true}
              startIcon={<ModeEditIcon />}
            >
              Sửa phòng ban
            </Button>
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
        <Box sx={{ borderBottom: "1px solid #C6C6C6" }} />
      </Box>

      <Box sx={{ height: 600, width: "100%", margin: "0 auto", marginTop: "1%" }}>
        {department ? (
          <DataGrid
            density="standard"
            autoHeight
            sx={{
              border: "none",
              // ".MuiDataGrid-columnHeaderTitle": {
              //   fontWeight: "bold !important",
              //   overflow: "visible !important",
              //   color: "#007FFF",
              // },
              // ".MuiDataGrid-columnHeaders": {
              //   backgroundColor: "#E0F0FF",
              // },
              fontSize: 16,
              fontWeight: 550,
              fontFamily: fontStyle,
            }}
            showCellVerticalBorder
            slots={{
              loadingOverlay: LinearProgress,
              //toolbar: CustomToolbar,
            }}
            loading={departmentStatus.includes("pending")}
            rows={department.userInfors}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        ) : (
          <AppBar />
        )}
      </Box>
    </>
  );
}

const handleButtonClick = (id: any) => {
  // Handle button click for the corresponding row ID
  console.log(`Button clicked for ID ${id}`);
};
