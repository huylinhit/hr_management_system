import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import {
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
import { Link, NavLink } from "react-router-dom";
import {
  fetchCurrentUserTicketsAsync,
  fetchOtherUsersTicketsAsync,
  fetchTicketsAsync,
  setTicketAdded,
  ticketsSelectors,
} from "./ticketSlice";
import { Ticket } from "../../app/models/ticket";
import CreateTicketForm from "./CreateTicketForm";
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
export default function OtherUsersTicketList() {
  const columns: GridColDef[] = [
    {
      field: "button",
      headerName: "",
      width: 75,
      renderCell: (params) => (
        // <IconButton onClick={() => handleButtonClick(params.row.id)}>
        //   <MoreHorizIcon />
        // </IconButton>
        <IconButton component={Link} to={`/otheruserstickets/${params.row.ticketId}`}>
          <MoreHorizIcon />
        </IconButton>
      ),
    },
    {
      field: "ticketId",
      headerName: "ID",
      width: 100,
    },
    {
      field: "ticketName",
      headerName: "Loại đơn",
      width: 250,
      editable: true,
    },
    {
      field: "ticketReason",
      headerName: "Lí do làm đơn",
      width: 250,
      editable: true,
    },
    {
      field: "ticketFile",
      headerName: "File",
      width: 200,
      editable: true,
    },
    {
      field: "ticketStatus",
      headerName: "Trạng thái",
      width: 200,
      editable: true,
      align: "right",
      renderCell(params) {
        return (
          <>
            {params.value === "Chấp nhận" ? (
              <Typography
                sx={{
               
                  backgroundColor: "#D9EFD6",
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
                  padding: "1px 10px ",
                  backgroundColor:"#FFF5D1",
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
                  backgroundColor:"#FFD1D1",
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
      }
    },
    {
      field: "processNote",
      headerName: "Ghi chú",
      width: 250,
      editable: true,
    },
    {
      field: "createAt",
      headerName: "Thời gian tạo",
      width: 200,
      editable: true,
      valueFormatter: (params) => moment(params.value).format("MMM Do, YYYY, HH:mm"),
    },

    {
      field: "changeStatusTime",
      headerName: "Thời gian thay đổi",
      width: 200,
      editable: true,
      valueFormatter: (params) => moment(params.value).format("MMM Do, YYYY, HH:mm"),
    },
  ];
  const tickets = useAppSelector(ticketsSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { ticketsLoaded, filtersLoaded, ticketAdded } = useAppSelector((state) => state.ticket);
  const [rows, setRows] = useState<Ticket[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!ticketsLoaded || ticketAdded) {
      dispatch(fetchOtherUsersTicketsAsync());
      dispatch(setTicketAdded(false));
    }
  }, [dispatch, ticketsLoaded, ticketAdded]);

  useEffect(() => {
    if (ticketsLoaded) {
      // Update the rows when departments are loaded
      setRows(tickets);
    }
  }, [ticketsLoaded, tickets]);

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#FFFFFF", mt: "5%" }}>
      <Grid container spacing={0} alignContent="center">
        <Grid item>
          <Button
            variant="text"
            sx={navStyle}
            disableElevation={true}
            component={NavLink}
            to={`/otheruserstickets`}
            key={"/otheruserstickets"}
          >
            Danh sách đơn khác
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent={"space-between"}>
        <TextField
          id="standard-basic"
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        <Button
          variant="text"
          sx={{ fontWeight: "bold", textTransform: "none", color: "#007FFF" }}
          disableElevation={true}
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Tạo đơn mới
        </Button>

        <CreateTicketForm open={open} onClose={handleCloseDialog} />
      </Grid>

      <Box sx={{ height: 700, width: "100%", margin: "0 auto", marginTop: "1%" }}>
        <DataGrid
          density="compact"
          getRowId={(row: any) => row.ticketId}
          sx={{
            height: 700,

            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold !important",
              overflow: "visible !important",
              color: "#007FFF",
            },
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: "#E0F0FF",
            },
            fontSize: 16,
            fontWeight: 550,
            fontFamily: fontStyle,
          }}
          slots={{
            loadingOverlay: LinearProgress,
            toolbar: CustomToolbar,
          }}
          loading={!ticketsLoaded || ticketAdded}
          rows={rows}
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
      </Box>
    </Container>
  );
}

const handleButtonClick = (id: any) => {
  // Handle button click for the corresponding row ID
  console.log(`Button clicked for ID ${id}`);
};
