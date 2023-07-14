import {
  Grid,
  Button,
  Typography,
  TextField,
  Autocomplete,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  tableCellClasses,
  Container,
  Box,
  InputAdornment,
  LinearProgress,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { employeeSelectors, fetchEmployeesAsync } from "../../app/store/employee/employeeSlice";
import { UserInfor } from "../../app/models/userInfor";
import DeleteDialog from "./component/DeleteDialog";
import AddIcon from "@mui/icons-material/Add";
import CreateCandidate from "../candidate/CreateCandidate";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
import moment from "moment";
import { fetchUserInforsAsync, userInforSelectors } from "../department/userInforSlice";
import { setHeaderTitle } from "../../app/layout/headerSlice";
import { storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { deepPurple } from "@mui/material/colors";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid-pro";
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
const cellStyle = {
  fontSize: 15,
  fontWeight: 600,
  fontFamily: fontStyle,
  color: "#000000",
};
const headerStyle = {
  color: "#7C7C7C",
  fontWeight: 700,
  fontFamily: "Mulish",
  fontSize: 15,
};
const colors = [
  "#34BBE1",
  "#CC941A",
  "#32A772",
  "#5945B5",
  "#DB3535",
  "#FF8C00",
  "#008080",
  "#800080",
  "#FF69B4",
  "#008000",
  "#FF0000",
  "#0000FF",
  "#800000",
  "#FF00FF",
  "#00FFFF",
  "#FFD700",
];
export default function StaffList() {
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
      headerName: "",
      width: 60,
      align: "center",

      renderCell(params) {
        return (
          <>
            <Tooltip title={params.row.isManager === true ? "Manager" : "Staff"}>
              <AccountCircleIcon
                sx={{
                  color: params.row.isManager === true ? "#007FFF" : "#AEAEAE",
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
          ID
        </Typography>
      ),
      renderCell: (params) => <Typography sx={cellStyle}>{params.value}</Typography>,
    },
    {
      //fullName
      field: "fullName",
      headerName: "Tên Nhân Viên",
      width: 250,
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
        const staffId = params.row.staffId;
        const staffName = params.row.fullName;

        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CandidateAvatar candidateId={staffId} candidateName={staffName} />
            <Typography sx={cellStyle}>{params.value}</Typography>
          </Box>
        );
      },
    },
    {
      field: "departmentName",
      headerName: "Phòng ban",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Phòng ban</div>
        </Typography>
      ),
      renderCell: (params) => {
        const rowIndex = params.row.departmentId % colors.length;
        const dotColor = colors[rowIndex];

        return (
          <Box display={"flex"} alignItems={"center"}>
            <Typography style={{ marginRight: 10, fontSize: "18px", color: dotColor }}>
              ●
            </Typography>
            <Typography sx={{ textDecoration: "underline", ...cellStyle }}>
              {params.value}
            </Typography>
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
      renderCell: (params) => (
        <Typography sx={cellStyle}>
          {moment(params.row.dob).format("MMM Do, YYYY, HH:mm")}
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
  function CandidateAvatar(candidate: any) {
    const [avatarUrl, setAvatarUrl] = useState("");
    const storageRef = ref(storage, `staffsAvatar/${candidate.candidateId}`);
    useEffect(() => {
      getDownloadURL(storageRef)
        .then((url) => {
          setAvatarUrl(url);
        })
        .catch((error) => {});
    }, [userInforsLoaded]);
    return (
      <Avatar
        // variant="rounded"
        sx={{
          width: 32,
          height: 32,
          marginRight: 2,
          fontSize: "14px",
          bgcolor: deepPurple[500],
        }}
        src={avatarUrl}
        alt=""
      >
        {candidate.candidateName.charAt(0)}
      </Avatar>
    );
  }
  // -------------------------- VAR -----------------------------
  const dispatch = useAppDispatch();
  const location = useLocation();
  // -------------------------- STATE ---------------------------
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [employeeDeleted, setEmployeeDeleted] = useState<UserInfor>();
  const [rows, setRows] = useState<UserInfor[]>([]);
  const [open, setOpen] = useState(false);
  const { userInforsLoaded, userInforAdded } = useAppSelector((state) => state.userInfor);
  // -------------------------- REDUX ---------------------------
  const userInfors = useAppSelector(userInforSelectors.selectAll);
  const activeEmployees = userInfors?.filter((e) => e.accountStatus !== false);

  //#region -------------------------- EFFECT --------------------------
  //Get userinfors
  useEffect(() => {
    if (!userInforsLoaded) dispatch(fetchUserInforsAsync());
  }, [dispatch, userInforsLoaded]);

  //If userInfors is loaded, set rows
  useEffect(() => {
    if (userInforsLoaded) {
      setRows(activeEmployees);
    }
  }, [userInforsLoaded]);

  //Set header
  useEffect(() => {
    dispatch(setHeaderTitle([{ title: "Danh sách nhân viên", path: "/staffs" }]));
  }, [dispatch, location]);

  //#endregion -------------------------- EFFECT --------------------------

  //#region-------------------------- FUNCTION ------------------------
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  //#endregion -------------------------- FUNCTION --------------------------

  // -------------------------- MAIN ----------------------------
  return (
    <>
      <Box sx={{ paddingLeft: "3%", mt: "20px", paddingRight: "3%" }}>
        <Grid container spacing={0} alignContent="center"></Grid>
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
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              component={Link}
              to="/create-new-staff"
              sx={{
                mb: "5px",
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
          </Grid>
          <CreateCandidate open={open} onClose={handleCloseDialog} />
        </Grid>
        <Box sx={{ borderBottom: "1px solid #C6C6C6" }} />
      </Box>

      <Box sx={{ width: "94%", margin: "0 auto", marginTop: "1%" }}>
        <DataGrid
          density="standard"
          getRowId={(row: any) => row.staffId}
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
          loading={!userInforsLoaded || userInforAdded}
          rows={rows}
          columns={columns}
          //showCellVerticalBorder
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
      </Box>
    </>
  );
}
