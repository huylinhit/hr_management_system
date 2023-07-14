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
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
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
import { setHeaderTitle } from "../../app/layout/headerSlice";
import moment from "moment";
import AvatarCustome from "../../app/components/Custom/Avatar/AvatarCustome";
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
const cellStyle = {
  fontSize: 15,
  fontWeight: 600,
  fontFamily: fontStyle,
  color: "#000000",
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
            <IconButton component={Link} to={`/staffs/${params.row.staffId}`}>
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
      renderCell: (params) => <Typography sx={cellStyle}>{params.value}</Typography>,
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
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AvatarCustome id={params.row.staffId} name={params.value} dependency={location} />
            <Typography sx={cellStyle}>{params.value}</Typography>
          </Box>
        );
      },
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
      renderCell: (params) => <Typography sx={cellStyle}>{params.value}</Typography>,
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
      renderCell: (params) => <Typography sx={cellStyle}>{params.value}</Typography>,
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
      renderCell: (params) => <Typography sx={cellStyle}>{params.value}</Typography>,
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
      renderCell: (params) => {
        return (
          <Typography sx={cellStyle}>{moment(params.value).format("MMM Do, YYYY")}</Typography>
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
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Địa chỉ</div>
        </Typography>
      ),
      renderCell: (params) => <Typography sx={cellStyle}>{params.value}</Typography>,
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
      renderCell: (params) => <Typography sx={cellStyle}>{params.value}</Typography>,
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
      renderCell: (params) => <Typography sx={cellStyle}>{params.value}</Typography>,
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
      <Box sx={{ paddingLeft: "3%", mt: "20px", paddingRight: "3%" }}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            {/* <TextField
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
            /> */}
          </Grid>

          <Grid item>
            {/* <Button
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
            </Button> */}
            <Tooltip title="Đổi quản lý">
              <Button
                variant="text"
                sx={{
                  fontSize: "15px",
                  fontWeight: 600,
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
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
              sx={{
                mb:'5px',
                textTransform: "none",
                fontFamily: "Mulish",
                height: "30px",
                color: "#FFFFFF",
                backgroundColor: "#007FFF",
                "&:hover": {
                  backgroundColor: "#0073E7",
                  color: "#FFFFFF",
                },
                "&:active": {
                  backgroundColor: "#0066CD",
                  color: "#FFFFFF",
                },
              }}
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

      <Box sx={{ width: "94%", margin: "0 auto", marginTop: "1%" }}>
        {department ? (
          <DataGrid
            density="standard"
            sx={{
              height: "83vh",
              //border: "none",
              color: "#000000",
              fontSize: 16,
              fontWeight: 550,
              fontFamily: "Mulish",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow effect
              backgroundColor: "rgba(255, 255, 255, 1)", // Set the opacity
            }}
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
                  pageSize: 20,
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
