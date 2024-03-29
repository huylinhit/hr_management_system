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
  debounce,
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
import { fetchFiltersLogLeaves, fetchLogLeavesAsync, logleaveSelectors, setLogLeaveAdded, setLogLeaveParams, setPageNumber } from "./logleaveSlice";
import { LogLeave } from "../../app/models/logLeave";
import NumbersIcon from "@mui/icons-material/Numbers";
import CreateLeaveForm from "./CreateLeaveForm";
import { ToastContainer } from "react-toastify";
import AvatarCustome from "../../app/components/Custom/Avatar/AvatarCustome";
import AppPagination from "../../app/components/Pagination/AppPagination";
import LoadingComponent from "../../app/layout/LoadingComponent";
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
const cellStyle = {
  fontSize: 15,
  fontWeight: 600,
  fontFamily: fontStyle,
  color: "#000000",
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
export default function OthersLeaveList() {
  const columns: GridColDef[] = [
    {
      field: "button",
      headerName: "",
      width: 60,
      align: "center",
      renderCell: (params) => (
        <IconButton
          component={Link}
          to={`/log-leaves/${params.row.leaveLogId}/staffs/${params.row.staffId}`}
        >
          <MoreHorizIcon />
        </IconButton>
      ),
    },
    {
      field: "leaveLogId",
      headerName: "ID",
      flex: 100,
      renderCell: (params) => <Typography sx={cellStyle}>{params.value}</Typography>,
    },

    {
      field: "staffName",
      headerName: "Tạo bởi",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <AccountCircleOutlinedIcon style={{ marginRight: 5 }} fontSize="small" /> <>Tạo bởi</>
        </Typography>
      ),
      renderCell: (params) => {
        const staffId = params.row.staffId;
        const staffName = `${params.row.staff.lastName}  ${params.row.staff.firstName}`;
        const rowIndex = staffId % staffNameColors.length;
        const staffNameColor = staffNameColors[rowIndex];
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AvatarCustome
              imageFile={params.row.staff.imageFile}
              id={params.row.staffId}
              name={staffName}
              dependency={logleavesLoaded}
            />
            <Typography sx={cellStyle}>{staffName}</Typography>
          </Box>
        );
      },
    },
    {
      field: "leaveTypeName",
      headerName: "Loại đơn",
      width: 300,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" /> <>Loại đơn</>
        </Typography>
      ),
      renderCell: (params) => {
        const rowIndex = params.row.leaveTypeId % colors.length;
        const dotColor = colors[rowIndex];
        const leaveTypeName = params.row.leaveType.leaveTypeName;
        return (
          <Box display={"flex"} alignItems={"center"}>
            <span style={{ marginRight: 10, fontSize: "14px", color: dotColor }}>●</span>
            <Typography sx={{ textDecoration: "underline", ...cellStyle }}>
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
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <>Nội dung đơn</>
        </Typography>
      ),
      renderCell: (params) => (
        <>
          {params.value === "" ? (
            <Typography sx={{ fontStyle: "italic", ...cellStyle, color: "#929292" }}>
              Chưa có nội dung
            </Typography>
          ) : (
            <Typography sx={cellStyle}>{params.value}</Typography>
          )}
        </>
      ),
    },

    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      align: "left",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" /> <>Trạng thái</>
        </Typography>
      ),
      renderCell(params) {
        return (
          <>
            {params.value === "approved" ? (
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
                Chấp nhận
              </Typography>
            ) : params.value === "pending" ? (
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
                Chờ duyệt
              </Typography>
            ) : params.value === "rejected" ? (
              <Typography
                sx={{
                  backgroundColor: "#FFE7E7",
                  padding: "1px 10px ",
                  fontFamily: fontStyle,
                  borderRadius: "6px",
                  fontWeight: 700,
                  color: "#D03D3D",
                  alignItems: "center",
                  display: "inline-block",
                  width: "fit-content",
                  ml: "5px",
                }}
              >
                Từ chối
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
                Đã Hủy
              </Typography>
            )}
          </>
        );
      },
    },
    {
      field: "amount",
      headerName: "Lương mỗi ngày",
      width: 200,
      align: "right",
      headerAlign: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <>Khấu trừ</>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.row.salaryPerDay} />,
    },
    {
      field: "salaryPerDay",
      headerName: "Lương mỗi ngày",
      width: 200,
      align: "right",
      headerAlign: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <>Lương mỗi ngày</>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.row.salaryPerDay} />,
    },
    {
      field: "processNote",
      headerName: "Ghi chú",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <>Ghi chú</>
        </Typography>
      ),
      renderCell: (params) => (
        <>
          {params.value === null ? (
            <Typography sx={{ fontStyle: "italic", ...cellStyle, color: "#929292" }}>
              Chưa có ghi chú
            </Typography>
          ) : (
            <Typography sx={cellStyle}>{params.value}</Typography>
          )}
        </>
      ),
    },
    {
      field: "responsdenceName",
      headerName: "Người duyệt",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <>Người duyệt</>
        </Typography>
      ),
      renderCell: (params) => (
        <>
          {params.row.respondencesId === null ? (
            <Typography sx={{ fontStyle: "italic", ...cellStyle, color: "#929292" }}>
              Chưa có người duyệt
            </Typography>
          ) : (
            <Typography sx={cellStyle}>{params.value}</Typography>
          )}
        </>
      ),
    },
    {
      field: "leaveDays",
      headerName: "Số ngày nghỉ",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <>Số ngày nghỉ</>
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <Box display={"flex"} alignItems={"center"}>
            <Typography sx={{ ...cellStyle }}>{params.value} ngày</Typography>
          </Box>
        );
      },
    },
    {
      field: "leaveHours",
      headerName: "Số giờ nghỉ",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <>Số giờ nghỉ</>
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <Box display={"flex"} alignItems={"center"}>
            <Typography sx={{ ...cellStyle }}>{params.value} giờ</Typography>
          </Box>
        );
      },
    },
    {
      field: "leaveStart",
      headerName: "Ngày bắt đầu",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <>Ngày bắt đầu</>
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={cellStyle}>{moment(params.value).format("LLL")}</Typography>
      ),
    },
    {
      field: "leaveEnd",
      headerName: "Ngày kết thúc",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <>Ngày kết thúc</>
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={cellStyle}>{moment(params.value).format("LLL")}</Typography>
      ),
    },
    {
      field: "changeStatusTime",
      headerName: "Thời gian thay đổi",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <>Thời gian thay đổi</>
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={cellStyle}>{moment(params.value).format("LLL")}</Typography>
      ),
    },
  ];

  function CurrencyFormatter(value: any) {
    const formattedValue = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value.value);
    return <span>{formattedValue}</span>;
  }

  const currentUser = useAppSelector((state) => state.account);
  const logLeaves = useAppSelector(logleaveSelectors.selectAll);
  const otherUsersLogLeaves = logLeaves.filter(
    (logLeave) => logLeave.staffId !== currentUser.user?.userInfor.staffId && logLeave.enable
  );
  const dispatch = useAppDispatch();

  const { logleavesLoaded, filtersLoaded, logLeaveAdded, status, metaData, logleaveParams } = useAppSelector(
    (state) => state.logleave
  );
  const [rows, setRows] = useState<LogLeave[]>([]);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const prevLocation = useRef(location);
  const key = location.pathname;


  const [serchTerm, setSearchTerm] = useState(logleaveParams.searchTerm);

  const debouncedSearch = debounce((e: any) => {
    dispatch(setLogLeaveParams({ searchTerm: e.target.value }))
  }, 2500)



  useEffect(() => {
    dispatch(setHeaderTitle([{ title: "Đơn nghỉ của nhân viên", path: "/log-leaves" }]));
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


  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersLogLeaves());
  }, [dispatch, filtersLoaded])

  useEffect(() => {
    if (logleavesLoaded) {
      setRows(logLeaves);
    }
  }, [logleavesLoaded, logLeaves]);

  if (!filtersLoaded) return <LoadingComponent message="Đang tải đơn nghỉ phép..." />;
  

  return (
    <>
      <Box sx={{ paddingLeft: "3%", pt: "20px", paddingRight: "3%" }}>
        {/* <ToastContainer /> */}
        <Grid container justifyContent={"space-between"} alignItems={"center"}
          sx={{
            background: "#fff",
            padding: "20px",
            boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            //  mb: "5px",
            borderRadius: "4px",
            mr: "12px",
          }}
        >
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
            <Box display="flex" alignItems="center"
              // border="1px solid black"
              height="100%"
            >
              <TextField
                id=""
                // label="Tìm kiếm"
                variant="standard"
                placeholder="Tìm kiếm"
                value={serchTerm || ''}
                sx={{
                  width: "100%",
                  // height: "52px",
                  // border:"1px solid blue",
                  display: "inline-block"
                }}
                onChange={(e: any) => {
                  setSearchTerm(e.target.value);
                  debouncedSearch(e);
                }}
              />
            </Box>
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
            </Button> */}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
              sx={{
                textTransform: "none",
                fontFamily: "Mulish",
                height: "40px",
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
              Tạo đơn nghỉ phép
            </Button>
          </Grid>

          <CreateLeaveForm isOwn={false} open={open} onClose={handleCloseDialog} />
        </Grid>
        <Box sx={{ borderBottom: "1px solid #C6C6C6" }} />
      </Box>

      <Box sx={{ width: "94%", margin: "0 auto", marginTop: "1%" }}>
        <DataGrid
          density="standard"
          getRowId={(row: any) => row.leaveLogId}
          sx={{
            height: "74vh",
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
          loading={!logleavesLoaded || logLeaveAdded}
          rows={rows}
          columns={columns}
          hideFooter
        //showCellVerticalBorder
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 20,
        //     },
        //   },
        // }}
        // pageSizeOptions={[5]}
        // disableRowSelectionOnClick
        />
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
          />
        )}
      </Box>
    </>
  );
}
