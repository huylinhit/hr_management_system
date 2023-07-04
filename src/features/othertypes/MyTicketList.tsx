import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useLayoutEffect, useState } from "react";
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
  "#FAECEC"
]
export default function MyTicketList() {
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
      align:"center",
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
      field: "ticketId",
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
        const staffName = params.row.staffName;
        const rowIndex = staffId % staffNameColors.length;
        const staffNameColor = staffNameColors[rowIndex];
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CandidateAvatar candidateId={staffId} candidateName={staffName} color={staffNameColor}/>
            <Typography>{params.value}</Typography>
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
            <span style={{ marginRight: 10, fontSize: "14px", color: dotColor }}>●</span>
            <Typography sx={{textDecoration:"underline", fontWeight:600, fontFamily:"Mulish" }}>{params.value}</Typography>
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
    },
    {
      field: "ticketFile",
      headerName: "File",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <AttachFileIcon style={{ marginRight: 5 }} fontSize="small" /> <div>File đính kèm</div>
        </Typography>
      ),
    },
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
                  backgroundColor: "#FFE7E7",
                  color: "#D03D3D",
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
  const [gridHeight, setGridHeight] = useState(0);
  const tickets = useAppSelector(ticketsSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { ticketsLoaded, filtersLoaded, ticketAdded } = useAppSelector((state) => state.ticket);
  const [rows, setRows] = useState<Ticket[]>([]);
  const [open, setOpen] = useState(false);
  const location = useLocation();
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
    if (!ticketsLoaded || ticketAdded) {
      dispatch(fetchCurrentUserTicketsAsync());
      dispatch(setTicketAdded(false));
    }
  }, [dispatch, ticketsLoaded, ticketAdded, location]);

  console.log(tickets);
  useEffect(() => {
    if (ticketsLoaded) {
      // Update the rows when departments are loaded
      setRows(tickets);
    }
  }, [ticketsLoaded, tickets]);

  return (
    <>
      <Box sx={{ paddingLeft: "2%", pt: "20px", paddingRight: "2%"}}>
        {/* <Button
          variant="text"
          sx={{
            fontSize: 25,
            fontWeight: "bold",
            textTransform: "none",
            color: "#333333",
            borderRadius: "10px",
            padding: "0px 10px 0px 10px",
            "&:hover": {
              backgroundColor: "#F8F8F8", // Set the hover background color
            },
          }}
          disableElevation={true}
          component={NavLink}
          to={`/departments`}
          key={"/departments"}
        >
          Đơn khác của tôi
        </Button> */}
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

          <CreateTicketForm open={open} onClose={handleCloseDialog} />
        </Grid>
        <Box sx={{ borderBottom: "1px solid #C6C6C6" }} />
      </Box>

      <Box sx={{ width: "100%", margin: "0 auto", marginTop: "1%"}}>
        <DataGrid
          autoHeight
          density="standard"
          getRowId={(row: any) => row.ticketId}
          sx={{
            height: 700,
            border: "none",
            color:"#000000",
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
          slots={{
            loadingOverlay: LinearProgress,
            //toolbar: CustomToolbar,
          }}
          loading={!ticketsLoaded || ticketAdded}
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
