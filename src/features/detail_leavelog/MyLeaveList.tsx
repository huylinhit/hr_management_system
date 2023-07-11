import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
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
import { Department } from "../../app/models/department";
import { Link, NavLink, useLocation } from "react-router-dom";

import moment from "moment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SubjectIcon from "@mui/icons-material/Subject";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { deepPurple } from "@mui/material/colors";
import { Ticket } from "../../app/models/ticket";
import { setHeaderTitle } from "../../app/layout/headerSlice";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import { fetchLogLeavesAsync, logleaveSelectors, setLogLeaveAdded } from "./logleaveSlice";
import { LogLeave } from "../../app/models/logLeave";
import NumbersIcon from "@mui/icons-material/Numbers";
import CreateLeaveForm from "./CreateLeaveForm";
import { ToastContainer } from "react-toastify";
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
const fontStyle = "Mulish";
const navStyle = {
  fontSize: 25,
  fontWeight: 800,
  fontFamily: fontStyle,
  textTransform: "none",
  color: "#333333",
  borderRadius: "10px",
  padding: "0px 10px 0px 10px",
  "&:hover": {
    backgroundColor: "#F8F8F8", // Set the hover background color
  },
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
const staffNameColors = [
  "#F1F1EF",
  "#F3EEEE",
  "#F8ECDF",
  "#FAF3DD",
  "#EEF3ED",
  "#E9F3F7",
  "#F6F3F8",
  "#F9F2F5",
  "#FAECEC",
];
export default function MyLeaveList() {
  const handleRowClick = () => {
    dispatch(
      setHeaderTitle([
        { title: "Đơn khác của tôi", path: "/mytickets" },
        { title: "Chỉnh sửa đơn", path: `` },
      ])
    );
  };
  const columns: GridColDef[] = [
    {
      field: "button",
      headerName: "",
      width: 60,
      align: "center",
      renderCell: (params) => (
        <IconButton
          component={Link}
          to={`/mytickets/${params.row.ticketId}`}
          onClick={handleRowClick}
        >
          <MoreHorizIcon />
        </IconButton>
      ),
    },
    {
      field: "leaveLogId",
      headerName: "ID",
      flex: 100,
    },
    {
      field: "staffName",
      headerName: "Tạo bởi",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <AccountCircleOutlinedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Tạo bởi</div>
        </Typography>
      ),
      renderCell: (params) => {
        const staffId = params.row.staffId;
        const staffName = `${params.row.staff.lastName}  ${params.row.staff.firstName}`;
        const rowIndex = staffId % staffNameColors.length;
        const staffNameColor = staffNameColors[rowIndex];
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <CandidateAvatar
              candidateId={staffId}
              candidateName={staffName}
              color={staffNameColor}
            /> */}
            <Typography>{staffName}</Typography>
          </Box>
        );
      },
    },
    {
      field: "leaveTypeName",
      headerName: "Loại đơn",
      width: 300,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Loại đơn</div>
        </Typography>
      ),
      renderCell: (params) => {
        const rowIndex = params.row.leaveTypeId % colors.length;
        const dotColor = colors[rowIndex];
        const leaveTypeName = params.row.leaveType.leaveTypeName;
        return (
          <Box display={"flex"} alignItems={"center"}>
            <span style={{ marginRight: 10, fontSize: "14px", color: dotColor }}>●</span>
            <Typography sx={{ textDecoration: "underline", fontWeight: 600, fontFamily: "Mulish" }}>
              {leaveTypeName}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "description",
      headerName: "Lí do làm đơn",
      width: 300,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Nội dung đơn</div>
        </Typography>
      ),
    },

    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      editable: true,
      align: "left",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Trạng thái</div>
        </Typography>
      ),
      renderCell(params) {
        return (
          <>
            {params.value === "Chấp nhận" ? (
              <Typography
                sx={{
                  backgroundColor: "#D0F9E5",
                  color: "#2B8465",
                  fontFamily: fontStyle,
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
            ) : params.value === "Chờ duyệt" ? (
              <Typography
                sx={{
                  backgroundColor: "#FFF5D1",
                  color: "#EF9423",
                  fontFamily: fontStyle,
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
                  backgroundColor: "#F4F6F7",
                  padding: "1px 10px ",
                  fontFamily: fontStyle,
                  borderRadius: "6px",
                  fontWeight: 700,
                  color: "#9BA6B2",
                  alignItems: "center",
                  display: "inline-block",
                  width: "fit-content",
                  ml: "5px",
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
      field: "salaryPerDay",
      headerName: "Lương mỗi ngày",
      width: 200,
      editable: true,
      align: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <div>Lương mỗi ngày</div>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.row.salaryPerDay} />,
    },
    {
      field: "processNote",
      headerName: "Ghi chú",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Ghi chú</div>
        </Typography>
      ),
    },
    {
      field: "respondenceName",
      headerName: "Người duyệt",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Người duyệt</div>
        </Typography>
      ),
    },
    {
      field: "leaveDays",
      headerName: "Số ngày nghỉ",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Số ngày nghỉ</div>
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <Box display={"flex"} alignItems={"center"}>
            <Typography sx={{ fontWeight: 600, fontFamily: "Mulish" }}>
              {params.value} ngày
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "leaveHours",
      headerName: "Số giờ nghỉ",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Số giờ nghỉ</div>
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <Box display={"flex"} alignItems={"center"}>
            <Typography sx={{ fontWeight: 600, fontFamily: "Mulish" }}>
              {params.value} giờ
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "leaveStart",
      headerName: "Ngày bắt đầu",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Ngày bắt đầu</div>
        </Typography>
      ),
      valueFormatter: (params) => moment(params.value).format("MMM Do, YYYY, HH:mm"),
    },
    {
      field: "leaveEnd",
      headerName: "Ngày kết thúc",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Ngày kết thúc</div>
        </Typography>
      ),
      valueFormatter: (params) => moment(params.value).format("MMM Do, YYYY, HH:mm"),
    },
    {
      field: "changeStatusTime",
      headerName: "Thời gian thay đổi",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Thời gian thay đổi</div>
        </Typography>
      ),
      valueFormatter: (params) => moment(params.value).format("MMM Do, YYYY, HH:mm"),
    },
  ];

  function CurrencyFormatter(value: any) {
    const formattedValue = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value.value);
    return <span>{formattedValue}</span>;
  }
  // function CandidateAvatar(candidate: any) {
  //   const [avatarUrl, setAvatarUrl] = useState("");
  //   const storageRef = ref(storage, `staffAvatars/${candidate.candidateId}`);
  //   useEffect(() => {
  //     getDownloadURL(storageRef)
  //       .then((url) => {
  //         setAvatarUrl(url);
  //       })
  //       .catch((error) => {});
  //   }, [logleavesLoaded]);
  //   return (
  //     <Avatar
  //       sx={{
  //         width: 34,
  //         height: 34,
  //         marginRight: 2,
  //         fontSize: "14px",
  //         bgcolor: "#BFBFBF",
  //         display: "flex",
  //         alignItems: "center", // Center the content vertically
  //         justifyContent: "center", // Center the content horizontally
  //         textAlign: "center", // Center the text horizontally
  //       }}
  //       src={avatarUrl}
  //       alt=""
  //     >
  //       {candidate.candidateName.charAt(0)}
  //     </Avatar>
  //   );
  // }
  const [gridHeight, setGridHeight] = useState(0);
  const logLeaves = useAppSelector(logleaveSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { logleavesLoaded, filtersLoaded, logLeaveAdded, status } = useAppSelector(
    (state) => state.logleave
  );
  const [rows, setRows] = useState<LogLeave[]>([]);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const prevLocation = useRef(location);
  const key = location.pathname;
  useLayoutEffect(() => {
    const handleResize = () => {
      setGridHeight(window.innerHeight - 0); // Adjust the value (200) as needed to leave space for other elements
    };

    handleResize(); // Set initial height
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    dispatch(setHeaderTitle([{ title: "Đơn khác của tôi", path: "/mytickets" }]));
  }, [location, dispatch]);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!logleavesLoaded || logLeaveAdded || prevLocation.current.key !== key) {
      dispatch(fetchLogLeavesAsync());
      dispatch(setLogLeaveAdded(false));
    }
    prevLocation.current = location;
  }, [dispatch, logleavesLoaded, logLeaveAdded, key]);

  console.log(logLeaves);
  useEffect(() => {
    if (logleavesLoaded) {
      setRows(logLeaves);
    }
  }, [logleavesLoaded, logLeaves]);

  return (
    <>
      <Box sx={{ paddingLeft: "2%", pt: "20px", paddingRight: "2%" }}>
      <ToastContainer autoClose={3000} pauseOnHover={false} theme="colored" />
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
              startIcon={<FilterAltOutlinedIcon />}
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
              startIcon={<ImportExportOutlinedIcon />}
              onClick={handleOpenDialog}
            >
              Sort
            </Button>
            <Button
              variant="text"
              sx={{ fontWeight: "bold", textTransform: "none", color: "#007FFF" }}
              disableElevation={true}
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
            >
              Tạo đơn mới
            </Button>
          </Grid>

          <CreateLeaveForm open={open} onClose={handleCloseDialog} />
        </Grid>
        <Box sx={{ borderBottom: "1px solid #C6C6C6" }} />
      </Box>

      <Box sx={{ width: "100%", margin: "0 auto", marginTop: "1%" }}>
        <DataGrid
          autoHeight
          density="standard"
          getRowId={(row: any) => row.leaveLogId}
          sx={{
            height: 700,
            border: "none",
            color: "#000000",
            fontSize: 16,
            fontWeight: 550,
            fontFamily: fontStyle,
          }}
          slots={{
            loadingOverlay: LinearProgress,
            //toolbar: CustomToolbar,
          }}
          loading={!logleavesLoaded || logLeaveAdded}
          rows={rows}
          columns={columns}
          showCellVerticalBorder
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
