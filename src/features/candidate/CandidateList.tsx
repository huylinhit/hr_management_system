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

import { Ticket } from "../../app/models/ticket";

import moment from "moment";
import { candidatesSelectors, fetchCandidatesAsync, setCandidateAdded } from "./candidateSlice";
import { Candidate } from "../../app/models/candidate";

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
      renderCell: (params) => {
        return (

          <IconButton component={Link} to={`/otheruserstickets/${params.row.ticketId}`}>
            <MoreHorizIcon />
          </IconButton>
        );
      },
    },
    {
      field: "candidateId",
      headerName: "ID",
      width: 100,
    },
    {
      field: "imageFile",
      headerName: "Ảnh",
      width: 300,
      editable: true,
    },
    {
      field: "name",
      headerName: "Tên ứng viên",
      width: 300,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 200,
      editable: true,
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      width: 300,
      editable: true,
      valueFormatter: (params) => moment(params.value).format("MMM Do, YYYY, HH:mm"),
    },
    {
      field: "gioiTinh",
      headerName: "Giới tính",
      width: 300,
      editable: true,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 200,
      editable: true,
    },
    {
      field: "department",
      headerName: "Phòng ban",
      width: 200,
      editable: true,
    },
    {
      field: "expectedSalary",
      headerName: "Lương mong muốn",
      width: 200,
      editable: true,
    },
    {
      field: "resumeFile",
      headerName: "Hồ sơ",
      width: 200,
      editable: true,
    },
    {
      field: "applyDate",
      headerName: "Ngày ứng tuyển",
      width: 200,
      editable: true,
      valueFormatter: (params) => moment(params.value).format("MMM Do, YYYY, HH:mm"),
    },
    {
      field: "result",
      headerName: "Kết quả",
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
                  backgroundColor: "#FFF5D1",
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
                  backgroundColor: "#FFD1D1",
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
  ];
  const candidates = useAppSelector(candidatesSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { candidateAdded, filtersLoaded, candidatesLoaded } = useAppSelector(
    (state) => state.candidate
  );
  const [rows, setRows] = useState<Candidate[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!candidatesLoaded || candidateAdded) {
      dispatch(fetchCandidatesAsync());
      dispatch(setCandidateAdded(false));
    }
  }, [dispatch, candidatesLoaded, candidateAdded]);

  useEffect(() => {
    if (candidatesLoaded) {
      // Update the rows when departments are loaded
      setRows(candidates);
    }
  }, [candidatesLoaded, candidates]);

  return (
    <>
      <Box sx={{ paddingLeft: "10%", mt: "5%", paddingRight: "5%" }}>
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
              Danh sách ứng viên
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
            Tạo ứng viên
          </Button>
        </Grid>
      </Box>

      <Box sx={{ height: 700, width: "100%", margin: "0 auto", marginTop: "1%" }}>
        <DataGrid
          density="compact"
          getRowId={(row: any) => row.candidateId}
          sx={{
            height: 700,
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
          loading={!candidatesLoaded || candidateAdded}
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
    </>
  );
}

const handleButtonClick = (id: any) => {
  // Handle button click for the corresponding row ID
  console.log(`Button clicked for ID ${id}`);
};
