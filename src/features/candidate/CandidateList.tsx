import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
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
import { Link, NavLink, useLocation } from "react-router-dom";

import moment from "moment";
import { candidatesSelectors, fetchCandidatesAsync, setCandidateAdded } from "./candidateSlice";
import { Candidate } from "../../app/models/candidate";
import { deepPurple } from "@mui/material/colors";
import { storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NumbersIcon from "@mui/icons-material/Numbers";
import CreateCandidate from "./CreateCandidate";
import SubjectIcon from "@mui/icons-material/Subject";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { candidateSkillsSelectors, fetchCandidateSkillsAsync } from "./candidateSkillSlice";
import { setHeaderTitle } from "../../app/layout/headerSlice";
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
const headerStyle = {
  color: "#7C7C7C",
  fontWeight: 700,
  fontFamily: "Mulish",
  fontSize: 15,
};

export default function OtherUsersTicketList() {
  const columns: GridColDef[] = [
    {
      field: "button",
      headerName: "",
      width: 75,

      renderCell: (params) => {
        return (
          <IconButton component={Link} to={`/candidates/${params.row.candidateId}`}>
            <MoreHorizIcon />
          </IconButton>
        );
      },
    },
    {
      field: "candidateId",
      headerName: "ID",
      width: 100,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <div>ID</div>
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Tên ứng viên",
      width: 300,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <AccountCircleOutlinedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Tên ứng viên</div>
        </Typography>
      ),
      renderCell: (params) => {
        const candidateId = params.row.candidateId;
        const candidateName = params.row.name;

        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CandidateAvatar candidateId={candidateId} candidateName={candidateName} />
            <Typography>{params.value}</Typography>
          </Box>
        );
      },
    },
    {
      field: "result",
      headerName: "Kết quả",
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
            {params.value === "Đạt" ? (
              <Typography
                sx={{
                  backgroundColor: "#FFF7D5",
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
                  color: "#FF9F28",
                  fontWeight: 700,
                  fontFamily: "Mulish",
                  borderRadius: "6px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {params.value}
              </Typography>
            ) : params.value === "Phỏng vấn" ? (
              <Typography
                sx={{
                  padding: "1px 10px ",
                  backgroundColor: "#EAE6FF",
                  color: "#766EA3",
                  fontWeight: 700,
                  fontFamily: "Mulish",
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
    {
      field: "email",
      headerName: "Email",
      width: 300,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Email</div>
        </Typography>
      ),
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <PhoneIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Điện thoại</div>
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
      field: "address",
      headerName: "Địa chỉ",
      width: 300,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Địa chỉ</div>
        </Typography>
      ),
    },
    {
      field: "department",
      headerName: "Phòng ban",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Phòng ban</div>
        </Typography>
      ),
    },
    {
      field: "expectedSalary",
      headerName: "Lương mong muốn",
      width: 200,
      editable: true,
      align: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <div>Lương mong muốn</div>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.row.expectedSalary} />,
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
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Ngày ứng tuyển</div>
        </Typography>
      ),
      valueFormatter: (params) => moment(params.value).format("MMM Do, YYYY"),
    },
  ];

  function CurrencyFormatter(value: any) {
    const formattedValue = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value.value);
    return <span>{formattedValue}</span>;
  }

  //Set avatar each row
  function CandidateAvatar(candidate: any) {
    const [avatarUrl, setAvatarUrl] = useState("");
    const storageRef = ref(storage, `candidatesAvatar/${candidate.candidateId}`);
    useEffect(() => {
      getDownloadURL(storageRef)
        .then((url) => {
          setAvatarUrl(url);
        })
        .catch((error) => {});
    }, [candidatesLoaded]);
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
  const candidates = useAppSelector(candidatesSelectors.selectAll);
  const candidateSkills = useAppSelector(candidateSkillsSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { candidateAdded, filtersLoaded, candidatesLoaded } = useAppSelector(
    (state) => state.candidate
  );
  const { candidateSkillAdded, candidateSkillsLoaded } = useAppSelector(
    (state) => state.candidateSkill
  );
  const [rows, setRows] = useState<Candidate[]>([]);
  const [open, setOpen] = useState(false);
  
  const location = useLocation();
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(setHeaderTitle([{ title: "Toàn bộ ứng viên", path: "/candidates" }]));
  }, [dispatch, location]);
  // Get all candidates
  useEffect(() => {
    if (!candidatesLoaded || candidateAdded) {
      dispatch(fetchCandidatesAsync());
      dispatch(setCandidateAdded(false));
    }
  }, [dispatch, candidatesLoaded, candidateAdded]);

  //Get all candidate skills
  useEffect(() => {
    if (!candidateSkillsLoaded) {
      dispatch(fetchCandidateSkillsAsync());
    }
  }, [dispatch, candidateSkillsLoaded]);

  useEffect(() => {
    if (candidatesLoaded) {
      // Update the rows when departments are loaded
      setRows(candidates);
    }
  }, [candidatesLoaded, candidates]);

  return (
    <>
      <Box sx={{ paddingLeft: "2%", mt: "20px", paddingRight: "2%" }}>
        <Grid container spacing={0} alignContent="center">
          {/* <Grid item>
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
          </Grid> */}
        </Grid>
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
          <CreateCandidate open={open} onClose={handleCloseDialog} />
        </Grid>
        <Box sx={{ borderBottom: "1px solid #C6C6C6" }} />
      </Box>

      <Box sx={{ width: "100%", margin: "0 auto", marginTop: "1%" }}>
        <DataGrid
          density="standard"
          getRowId={(row: any) => row.candidateId}
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
