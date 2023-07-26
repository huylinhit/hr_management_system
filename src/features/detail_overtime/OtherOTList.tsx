import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import { Link, useLocation } from "react-router-dom";

import moment from "moment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SubjectIcon from "@mui/icons-material/Subject";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { setHeaderTitle } from "../../app/layout/headerSlice";

import NumbersIcon from "@mui/icons-material/Numbers";

import AvatarCustome from "../../app/components/Custom/Avatar/AvatarCustome";
import {
  fetchFiltersLogOts,
  fetchLogOtsAsync,
  logOvertimeSelectors,
  resetlogotParams,
  setLogOvertimeAdded,
  setLogotParams,
  setPageNumber,
} from "../overlog/overtimeSlice";
import { LogOt } from "../../app/models/logOt";
import CreateOvertimeForm from "../overlog/CreateOvertime2";

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
export default function OtherOTList() {
  const handleRowClick = () => {
    dispatch(
      setHeaderTitle([
        { title: "Đơn tăng ca của nhân viên", path: "/log-overtimes" },
        { title: "Phản hồi đơn", path: `` },
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
          to={`/log-overtimes/${params.row.otLogId}/staffs/${params.row.staffId}`}
          onClick={handleRowClick}
        >
          <MoreHorizIcon />
        </IconButton>
      ),
    },
    {
      field: "otLogId",
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
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AvatarCustome
              imageFile={params.row.staff.imageFile}
              id={params.row.staffId}
              name={staffName}
              dependency={logOtsLoaded}
            />
            <Typography sx={cellStyle}>{staffName}</Typography>
          </Box>
        );
      },
    },
    {
      field: "otTypeName",
      headerName: "Loại đơn",
      width: 300,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" /> <>Loại đơn</>
        </Typography>
      ),
      renderCell: (params) => {
        const rowIndex = params.row.otTypeId % colors.length;
        const dotColor = colors[rowIndex];
        const otTypeName = params.row.otType.typeName;
        return (
          <Box display={"flex"} alignItems={"center"}>
            <span style={{ marginRight: 10, fontSize: "14px", color: dotColor }}>●</span>
            <Typography sx={{ textDecoration: "underline", ...cellStyle }}>{otTypeName}</Typography>
          </Box>
        );
      },
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
                Chấp Nhận
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
                Chờ Duyệt
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
                Từ Chối
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
      field: "salaryPerDay",
      headerName: "Lương một ngày",
      width: 200,
      align: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <>Lương một ngày</>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.row.salaryPerDay} />,
    },
    {
      field: "amount",
      headerName: "Tổng lương làm thêm",
      width: 200,
      align: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <>Tổng lương làm thêm</>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.row.amount} />,
    },
    {
      field: "logStart",
      headerName: "Ngày bắt đầu",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <>Ngày bắt đầu</>
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={cellStyle}>{moment(params.value).format("LL")}</Typography>
      ),
    },
    {
      field: "logEnd",
      headerName: "Ngày kết thúc",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <>Ngày kết thúc</>
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={cellStyle}>{moment(params.value).format("LL")}</Typography>
      ),
    },

    {
      field: "days",
      headerName: "Số ngày làm",
      width: 150,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{}} fontSize="small" /> <>Số ngày làm</>
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
      field: "logHours",
      headerName: "Số giờ làm",
      width: 150,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{}} fontSize="small" /> <>Số giờ làm</>
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
      field: "createAt",
      headerName: "Tạo vào lúc",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <>Tạo vào lúc</>
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

    {
      field: "reason",
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
      field: "respondenceName",
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
  ];

  function CurrencyFormatter(value: any) {
    const formattedValue = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value.value);
    return <Typography sx={cellStyle}>{formattedValue}</Typography>;
  }
  const [gridHeight, setGridHeight] = useState(0);
  const logOts = useAppSelector(logOvertimeSelectors.selectAll);
  const currentUser = useAppSelector((state) => state.account);
  const otherOts = logOts.filter((logOt) => logOt.staffId !== currentUser.user?.userInfor.staffId);
  const dispatch = useAppDispatch();
  const leaveDayDetail = useAppSelector((state) => state.leaveDayDetail);

  const [rows, setRows] = useState<LogOt[]>([]);
  const [open, setOpen] = useState(false);
  const { logOtAdded, logOtsLoaded, status, metaData, logotParams, departments, filtersLoaded } = useAppSelector((state) => state.logot);
  const location = useLocation();
  const prevLocation = useRef(location);
  const key = location.pathname;
  const [selectedDepartment, setSelectedDepartment] = useState<string>("Toàn bộ phòng ban");


  const [serchTerm, setSearchTerm] = useState(logotParams.searchTerm);

  const debouncedSearch = debounce((e: any) => {
    dispatch(setLogotParams({ searchTerm: e.target.value }))
  }, 2500)

  useEffect(() => {
    dispatch(setHeaderTitle([{ title: "Đơn tăng ca của nhân viên", path: "/log-overtimes" }]));
  }, [location, dispatch]);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedDepartment("Toàn bộ phòng ban");
    dispatch(resetlogotParams())
  }

  const handleSelectedDepartments = (e: any) => {

    const value = e.target.value.toLowerCase();

    if (value.includes("toàn bộ phòng ban")) {
      dispatch(setLogotParams({ departments: [] }))
      setSelectedDepartment("Toàn bộ phòng ban");
      return;

    }

    setSelectedDepartment(e.target.value);
    const array = [e.target.value]
    dispatch(setLogotParams({ departments: array }))
  }

  useEffect(() => {
    if (!logOtsLoaded || logOtAdded || prevLocation.current.key !== key) {
      dispatch(fetchLogOtsAsync());
      dispatch(setLogOvertimeAdded(false));
    }
    prevLocation.current = location;
  }, [dispatch, logOtAdded, logOtsLoaded, key]);


  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersLogOts());
  }, [dispatch, filtersLoaded])


  useEffect(() => {
    if (logOtsLoaded) {
      setRows(logOts);
    }
  }, [logOtsLoaded, logOts]);

  if (!filtersLoaded) return <LoadingComponent message="Đang tải đơn làm thêm..." />;

  return (
    <>
      <Box sx={{ paddingLeft: "3%", pt: "20px", paddingRight: "3%" }}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}
          sx={{
            background: "#fff",
            padding: "20px",
            boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            //  mb: "5px",
            borderRadius: "4px",
            mr: "12px",
          }}>
          <Grid item xs={4}>
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
                "&:active": {
                  // backgroundColor: "#0066CD",
                  // color: "#FFFFFF",
                },
              }}
            >
              Làm mới
            </Button>
          </Grid>
          <Grid item>
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
              Tạo đơn tăng ca
            </Button>
          </Grid>

          <CreateOvertimeForm isOwn={false} open={open} onClose={handleCloseDialog} />
        </Grid>
        <Box sx={{ borderBottom: "1px solid #C6C6C6" }} />
      </Box>

      <Box sx={{ width: "94%", margin: "0 auto", marginTop: "1%" }}>
        <DataGrid
          density="standard"
          getRowId={(row: any) => row.otLogId}
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
          loading={!logOtsLoaded || logOtAdded}
          rows={rows}
          columns={columns}
          //showCellVerticalBorder
          hideFooterPagination
          hideFooter
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
