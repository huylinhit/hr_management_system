import {
  Grid,
  Button,
  Typography,
  Box,
  LinearProgress,
  IconButton,
  Tooltip,
  Avatar,
  debounce,
  MenuItem,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { UserInfor } from "../../app/models/userInfor";
import AddIcon from "@mui/icons-material/Add";
import CreateCandidate from "../candidate/CreateCandidate";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SubjectIcon from "@mui/icons-material/Subject";
import moment from "moment";
import {
  fetchFiltersUserInfor,
  fetchUserInforsAsync,
  resetUserInforParams,
  setPageNumber,
  setUserInforAdded,
  setUserInforParams,
  userInforSelectors,
} from "../department/userInforSlice";
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
import AvatarCustome from "../../app/components/Custom/Avatar/AvatarCustome";
import AppPagination from "../../app/components/Pagination/AppPagination";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { BootstrapInput } from "../payslip/component/CreatePayslipMainForm";
import ReplayIcon from '@mui/icons-material/Replay';

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
          <>Tên Nhân Viên</>
        </Typography>
      ),
      renderCell: (params) => {
        const staffId = params.row.staffId;
        const staffName = `${params.row.lastName} ${params.row.firstName}`;

        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AvatarCustome
              imageFile={params.row.imageFile}
              id={staffId}
              name={staffName}
              dependency={userInforsLoaded}
            />
            <Typography sx={cellStyle}>{staffName}</Typography>
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
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" /> <>Phòng ban</>
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
          <>Số Điện Thoại</>
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
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" /> <>Giới tính</>
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
          <>Email</>
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
          <>Ngân Hàng</>
        </Typography>
      ),
      renderCell: (params) => <Typography sx={cellStyle}>{params.value}</Typography>,
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <>Ngày sinh</>
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={cellStyle}>{moment(params.row.dob).format("LL")}</Typography>
      ),
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <>Địa chỉ</>
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
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <>Quốc gia</>
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
          <>TK Ngân Hàng</>
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
        .catch((error) => { });
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

  const { userInforsLoaded, userInforAdded, filtersLoaded, departments, userInforParams, metaData } = useAppSelector((state) => state.userInfor);
  // -------------------------- REDUX ---------------------------
  console.log(metaData)
  const userInfors = useAppSelector(userInforSelectors.selectAll);
  const activeEmployees = userInfors?.filter((e) => e.accountStatus !== false);
  const [serchTerm, setSearchTerm] = useState(userInforParams.searchTerm);

  const [selectedDepartment, setSelectedDepartment] = useState<string>("Toàn bộ phòng ban");


  const debouncedSearch = debounce((e: any) => {
    dispatch(setUserInforParams({ searchTerm: e.target.value }))
  }, 2500)
  //#region -------------------------- EFFECT --------------------------
  //Get userinfors
  useEffect(() => {
    if (!userInforsLoaded || userInforAdded) {
      dispatch(fetchUserInforsAsync());
      dispatch(setUserInforAdded(false));
    }
  }, [dispatch, userInforsLoaded, userInforAdded, filtersLoaded]);


  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersUserInfor());
  }, [dispatch, filtersLoaded])
  //If userInfors is loaded, set rows
  useEffect(() => {
    if (userInforsLoaded) {
      setRows(activeEmployees);
    }
  }, [userInfors]);

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

  const handleReset = () => {
    setSearchTerm("");
    setSelectedDepartment("Toàn bộ phòng ban");
    dispatch(resetUserInforParams())
  }

  const handleSelectedDepartments = (e: any) => {
    const value = e.target.value.toLowerCase();
    if (value.includes("toàn bộ phòng ban")) {
      dispatch(setUserInforParams({ departments: [] }))
      setSelectedDepartment("Toàn bộ phòng ban");
      return;

    }

    setSelectedDepartment(e.target.value);
    const array = [e.target.value]
    dispatch(setUserInforParams({ departments: array }))
  }

  if (!filtersLoaded) return <LoadingComponent message="Đang tải danh sách nhân viên..." />;
  //#endregion -------------------------- FUNCTION --------------------------

  // -------------------------- MAIN ----------------------------
  return (
    <>
      <Box sx={{ paddingLeft: "3%", mt: "20px", paddingRight: "3%" }}>
        <Grid container spacing={0} alignContent="center"></Grid>
        <Grid container justifyContent={"space-between"}
          sx={
            {
              background: "#fff",
              padding: "20px",
              boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
              //  mb: "5px",
              borderRadius: "4px",
              mr: "12px",
            }
          }>
          <Grid item xs={3} >
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
          <Grid item xs={4} alignItems={"center"} display="flex">
            <BootstrapInput

              sx={{ width: "50%", marginLeft: "12px", borderRadius: "12px" }}
              // InputProps={textFieldInputProps}
              variant="standard"
              onChange={handleSelectedDepartments}
              value={selectedDepartment}
              select
            // defaultValue={"Phòng ban"}
            >
              <MenuItem value="Toàn bộ phòng ban">Toàn bộ phòng ban</MenuItem>
              {departments?.map((item) => (
                <MenuItem
                  key={item} value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </BootstrapInput>
            <Button
              variant="outlined"
              onClick={handleReset}
              startIcon={<ReplayIcon/>}
              sx={{
                marginLeft: "12px",
                textTransform: "none",
                fontFamily: "Mulish",
                fontWeight: "bold",


                backgroundColor: "#fff",
                color: "rgb(57,219,57)",
                border: "1px solid rgb(57,219,57)",
                "&:hover": {
                  border: "1px solid rgb(57,219,57)",
                  color: "#fff",
                  backgroundColor: "rgb(57,219,57)",
                },
              }}
            >
              Làm mới
            </Button>

          </Grid>
          <Grid item xs={4} alignItems={"center"} display="flex" justifyContent={"end"}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              component={Link}
              to="/staffs/add"
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
          loading={!userInforsLoaded || userInforAdded}
          rows={rows}
          columns={columns}
          //showCellVerticalBorder
          // initialState={{
          //   pagination: {
          //     paginationModel: {
          //       pageSize: 20,
          //     },
          //   },
          // }}
          // pageSizeOptions={[5]}
          hideFooterPagination
          disableRowSelectionOnClick
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
