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
import { fetchCurrentUserTicketsAsync, fetchOtherUsersTicketsAsync, fetchTicketsAsync, setTicketAdded, ticketsSelectors } from "./ticketSlice";
import { Ticket } from "../../app/models/ticket";
import CreateTicketForm from "./CreateTicketForm";

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

export default function OtherUsersTicketList() {
  const columns: GridColDef[] = [
    {
      field: "ticketId",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "ticketName",
      headerName: "Loại đơn",
      flex: 1,
      editable: true,
    },
    {
      field: "ticketReason",
      headerName: "Lí do làm đơn",
      flex: 1,
      editable: true,
    },
    {
      field: "ticketFile",
      headerName: "File",
      flex: 1,
      editable: true,
    },
    {
      field: "ticketStatus",
      headerName: "Trạng thái",
      flex: 1,
      editable: true,
    },
    {
      field: "createAt",
      headerName: "Thời gian tạo",
      flex: 1,
      editable: true,
    },
    {
      field: "processNote",
      headerName: "Ghi chú",
      flex: 1,
      editable: true,
    },
    {
      field: "changeStatusTime",
      headerName: "Thời gian thay đổi",
      flex: 1,
      editable: true,
    },
    {
      field: "button",
      headerName: "",
      flex: 0.5,
      renderCell: (params) => (
        // <IconButton onClick={() => handleButtonClick(params.row.id)}>
        //   <MoreHorizIcon />
        // </IconButton>
        <IconButton component={Link} to={`/otheruserstickets/${params.row.ticketId}`}>
          <MoreHorizIcon />
        </IconButton>
      ),
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
    if (!ticketsLoaded || ticketAdded){
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
    <Container maxWidth="xl" sx={{ backgroundColor: "#FFFFFF", mt:'5%' }}>
      <Button
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
        Danh sách đơn khác
      </Button>
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

        <CreateTicketForm
          open={open}
          onClose={handleCloseDialog}
        />
      </Grid>

      <Box sx={{ height: 400, width: "100%", margin: "0 auto", marginTop: "1%" }}>
        <DataGrid
          density="compact"
          getRowId={(row: any) => row.ticketId}
          getRowHeight={() => 'auto'} 
          sx={{
            height: 650,
            width: "100%",
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold !important",
              overflow: "visible !important",
              color: "#007FFF",
            },
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: "#E0F0FF",
            },
          }}
          slots={{
            loadingOverlay: LinearProgress,
            toolbar: CustomToolbar,
          }}
          loading={!ticketsLoaded || ticketAdded}
          rows={rows}
          columns={columns}
          classes={{
            columnHeader: "custom-header",
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
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
