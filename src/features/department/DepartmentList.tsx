import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  departmentSelectors,
  fetchDepartmentsAsync,
  setDepartmentChanged,
} from "./departmentSlice";
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
import { Department } from "../../app/models/department";
import { Link, useLocation } from "react-router-dom";
import DepartmentForm from "./DepartmentForm";
import { setHeaderTitle } from "../../app/layout/headerSlice";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import NumbersIcon from "@mui/icons-material/Numbers";
import SubjectIcon from "@mui/icons-material/Subject";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { deepPurple } from "@mui/material/colors";
import TypeCustome from "../../app/components/Custom/Type/TypeCustome";
import AvatarCustome from "../../app/components/Custom/Avatar/AvatarCustome";
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
const cellStyle = {
  fontSize: 15,
  fontWeight: 600,
  fontFamily: "Mulish",
  color: "#000000",
};
const fontStyle = "Mulish";
export default function DepartmentList() {
  const columns: GridColDef[] = [
    {
      field: "button",
      headerName: "",
      width: 75,
      renderCell: (params) => (
        <IconButton component={Link} to={`/departments/${params.row.departmentId}`}>
          <MoreHorizIcon />
        </IconButton>
      ),
    },
    {
      field: "departmentId",
      headerName: "ID",
      width: 100,
      renderCell: (params) => <Typography sx={cellStyle}>{params.value}</Typography>,
    },
    {
      field: "departmentName",
      headerName: "Tên phòng ban",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <AccountCircleOutlinedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Tên phòng ban</div>
        </Typography>
      ),
      renderCell: (params) => {
        const index = params.row.departmentId;
        const departmentName = params.row.departmentName;
        return <TypeCustome typeId={index}>{departmentName}</TypeCustome>;
      },
    },
    {
      field: "manager",
      headerName: "Quản lý",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <AccountCircleOutlinedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Quản lý</div>
        </Typography>
      ),
      renderCell: (params) => {
        if (params.row.manager == null) return;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AvatarCustome
              id={params.row.managerId}
              name={params.row.manager}
              dependency={departmentsLoaded}
            />
            <Typography sx={cellStyle}>{params.value}</Typography>
          </Box>
        );
      },
    },
    {
      field: "numberOfStaff",
      headerName: "Số Nhân Viên",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Số nhân viên</div>
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <Box display={"flex"} alignItems={"center"}>
            <Typography sx={{ ...cellStyle }}>{params.value}</Typography>
          </Box>
        );
      },
    },
    {
      field: "managerMail",
      headerName: "Email",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Email quản lý</div>
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <>
            <Typography sx={{ ...cellStyle }}>{params.value}</Typography>
          </>
        );
      },
    },
    {
      field: "managerPhone",
      headerName: "Số Điện Thoại",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <PhoneIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Số điện thoại</div>
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <>
            <Typography sx={{ ...cellStyle }}>{params.value}</Typography>
          </>
        );
      },
    },
  ];

  const currentUser = useAppSelector((state) => state.account);
  const departments = useAppSelector(departmentSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { departmentsLoaded, staffsLoaded, filtersLoaded, departmentsChanged } = useAppSelector(
    (state) => state.department
  );
  const [rows, setRows] = useState<Department[]>([]);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    dispatch(setHeaderTitle([{ title: "Danh sách phòng ban", path: "/departments" }]));
  }, [location, dispatch]);

  function ManagerAvatar(manager: any) {
    const [avatarUrl, setAvatarUrl] = useState("");
    const storageRef = ref(storage, `candidatesAvatar/${manager.managerId}`);

    useEffect(() => {
      getDownloadURL(storageRef)
        .then((url) => {
          setAvatarUrl(url);
        })
        .catch((error) => {});
    }, [departmentsLoaded]);
    return (
      <>
        {manager.managerName !== null ? (
          <Avatar
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
            {manager.managerName !== null ? manager.managerName.charAt(0) : ""}
          </Avatar>
        ) : (
          ""
        )}
      </>
    );
  }
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!departmentsLoaded || departmentsChanged) {
      dispatch(fetchDepartmentsAsync());
      dispatch(setDepartmentChanged(false));
    }
  }, [dispatch, departmentsLoaded, departmentsChanged]);

  useEffect(() => {
    if (departmentsLoaded) {
      // Update the rows when departments are loaded
      setRows(departments);
    }
  }, [departmentsLoaded, departments]);

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
              Thêm phòng ban
            </Button>
          </Grid>

          <DepartmentForm
            department={null}
            open={open}
            onClose={handleCloseDialog}
            createOrAdd={false}
            departmentNameParam=""
            departmentId={0}
          />
        </Grid>
        <Box sx={{ borderBottom: "1px solid #C6C6C6" }} />
      </Box>

      <Box sx={{ width: "94%", margin: "0 auto", marginTop: "1%" }}>
        <DataGrid
          density="standard"
          getRowId={(row: any) => row.departmentId}
          sx={{
            height: "82vh",
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
          loading={!departmentsLoaded || departmentsChanged}
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

const handleButtonClick = (id: any) => {
  // Handle button click for the corresponding row ID
  console.log(`Button clicked for ID ${id}`);
};
