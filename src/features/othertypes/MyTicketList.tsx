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
import {
  fetchCurrentUserTicketsAsync,
  fetchTicketsAsync,
  setTicketAdded,
  ticketsSelectors,
} from "./ticketSlice";

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
import CreateTicketForm from "./CreateTicketForm";
import { setHeaderTitle } from "../../app/layout/headerSlice";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import DatagridCustome from "../../app/components/Custom/Datagrid/DatagridCustome";
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
export default function MyTicketList() {
  const columns: GridColDef[] = [
    {
      field: "button",
      headerName: "",
      width: 60,
      align: "center",
      renderCell: (params) => (
        <IconButton component={Link} to={`/own-tickets/${params.row.ticketId}`}>
          <MoreHorizIcon />
        </IconButton>
      ),
    },
    {
      field: "ticketId",
      headerName: "ID",
      flex: 100,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          ID
        </Typography>
      ),
      renderCell: (params) => <Typography sx={cellStyle}>{params.value}</Typography>,
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
        const staffName = params.row.staffName;
        const rowIndex = staffId % staffNameColors.length;
        const staffNameColor = staffNameColors[rowIndex];
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CandidateAvatar
              candidateId={staffId}
              candidateName={staffName}
              color={staffNameColor}
            />
            <Typography sx={cellStyle}>{params.value}</Typography>
          </Box>
        );
      },
    },
    {
      field: "ticketName",
      headerName: "Loại đơn",
      width: 300,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Loại đơn</div>
        </Typography>
      ),
      renderCell: (params) => {
        const rowIndex = params.row.ticketTypeId % colors.length;
        const dotColor = colors[rowIndex];

        return (
          <Box display={"flex"} alignItems={"center"}>
            <Typography style={{ marginRight: 10, fontSize: "18px", color: dotColor }}>
              ●
            </Typography>
            {/* <span style={{ marginRight: 10, fontSize: "18px", color: dotColor }}>●</span> */}
            <Typography sx={{ textDecoration: "underline", ...cellStyle }}>
              {params.value}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "ticketReason",
      headerName: "Lí do làm đơn",
      width: 300,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Nội dung đơn</div>
        </Typography>
      ),
      renderCell: (params) => (
        <Box>
          <Typography sx={cellStyle}>{params.value}</Typography>
        </Box>
      ),
    },
    // {
    //   field: "ticketFile",
    //   headerName: "File",
    //   width: 250,
    //   editable: true,
    //   renderHeader: () => (
    //     <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
    //       <AttachFileIcon style={{ marginRight: 5 }} fontSize="small" /> <div>File đính kèm</div>
    //     </Typography>
    //   ),
    // },
    {
      field: "ticketStatus",
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
      field: "processNote",
      headerName: "Ghi chú",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Ghi chú</div>
        </Typography>
      ),
      renderCell: (params) => (
        <Box>
          {params.value ? (
            <Typography sx={cellStyle}>{params.row.value}</Typography>
          ) : (
            <Typography sx={{ fontStyle: "italic", ...cellStyle, color: "#929292" }}>
              Chưa có ghi chú
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: "createAt",
      headerName: "Thời gian tạo",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Thời gian tạo</div>
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={cellStyle}>
          {moment(params.row.createAt).format("MMM Do, YYYY, HH:mm")}
        </Typography>
      ),
      // valueFormatter: (params) => moment(params.value).format("MMM Do, YYYY, HH:mm"),
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
      renderCell: (params) => (
        <Box>
          {params.value ? (
            <Typography sx={cellStyle}>
              {moment(params.value).format("MMM Do, YYYY, HH:mm")}
            </Typography>
          ) : (
            <Typography sx={cellStyle}>
              {moment(params.row.createAt).format("MMM Do, YYYY, HH:mm")}
            </Typography>
          )}
        </Box>
      ),
      //valueFormatter: (params) => moment(params.value).format("MMM Do, YYYY, HH:mm"),
    },
  ];
  function CandidateAvatar(candidate: any) {
    const [avatarUrl, setAvatarUrl] = useState("");
    const storageRef = ref(storage, `staffAvatars/${candidate.candidateId}`);
    useEffect(() => {
      getDownloadURL(storageRef)
        .then((url) => {
          setAvatarUrl(url);
        })
        .catch((error) => {});
    }, [ticketsLoaded]);
    return (
      <Avatar
        sx={{
          width: 34,
          height: 34,
          marginRight: 2,
          fontSize: "14px",
          bgcolor: "#BFBFBF",
          display: "flex",
          alignItems: "center", // Center the content vertically
          justifyContent: "center", // Center the content horizontally
          textAlign: "center", // Center the text horizontally
        }}
        src={avatarUrl}
        alt=""
      >
        {candidate.candidateName.charAt(0)}
      </Avatar>
    );
  }
  const currentUser = useAppSelector((state) => state.account);

  const tickets = useAppSelector(ticketsSelectors.selectAll);
  const myTickets = tickets.filter((c) => c.staffId === currentUser.user?.userInfor.staffId);
  const dispatch = useAppDispatch();
  const { ticketsLoaded, filtersLoaded, ticketAdded, mytickets, status } = useAppSelector(
    (state) => state.ticket
  );
  const [rows, setRows] = useState<Ticket[]>([]);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const prevLocation = useRef(location);
  const key = location.pathname;

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
    if (!ticketsLoaded || ticketAdded || prevLocation.current.key !== key) {
      dispatch(fetchTicketsAsync());
      dispatch(setTicketAdded(false));
    }
    prevLocation.current = location;
  }, [dispatch, ticketsLoaded, ticketAdded, key]);

  console.log(tickets);
  useEffect(() => {
    if (ticketsLoaded) {
      setRows(myTickets);
    }
  }, [ticketsLoaded, tickets]);

  return (
    <>
      <Box sx={{ paddingLeft: "3%", mt: "20px", paddingRight: "3%" }}>
        <ToastContainer />
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
              Tạo đơn mới
            </Button>
          </Grid>

          <CreateTicketForm open={open} onClose={handleCloseDialog} />
        </Grid>
        <Box sx={{ borderBottom: "1px solid #C6C6C6" }} />
      </Box>

      <Box sx={{ width: "94%", margin: "0 auto", marginTop: "1%" }}>
        <DataGrid
          density="standard"
          getRowId={(row: any) => row.ticketId}
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
            //  toolbar: CustomToolbar,
          }}
          loading={!ticketsLoaded || ticketAdded}
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
