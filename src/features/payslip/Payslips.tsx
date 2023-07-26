import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Pagination,
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
import AddIcon from "@mui/icons-material/Add";
import { Link, useLocation } from "react-router-dom";

import moment from "moment";
import "moment/locale/vi";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { setHeaderTitle } from "../../app/layout/headerSlice";

import NumbersIcon from "@mui/icons-material/Numbers";

import { ToastContainer } from "react-toastify";
import AvatarCustome from "../../app/components/Custom/Avatar/AvatarCustome";
import { fetchFiltersPayslips, fetchPayslipsAsync, payslipSelectors, resetPayslipParams, setPageNumber, setPayslipParams } from "./payslipSlice";
import { Payslip } from "../../app/models/payslip";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ChipCustome from "../../app/components/Custom/Chip/ChipCustome";
import CreatePayslipMainForm, { BootstrapInput, textFieldInputProps } from "./component/CreatePayslipMainForm";
import { CheckCircle } from "@mui/icons-material";
import ConfirmPayslips from "./component/ConfirmPayslips";
import CreatePayslipNewVersion from "./component/CreatePayslipNewVersion";
import AppPagination from "../../app/components/Pagination/AppPagination";
import classNames from "classnames/bind";

import styles from './component/payslip.module.scss';

const cx = classNames.bind(styles);

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
export default function Payslips() {
  const handleRowClick = () => {
    dispatch(
      setHeaderTitle([
        { title: "Danh sách lương nhân viên", path: "/payslips" },
        // { title: "Chỉnh sửa lương", path: `` },
      ])
    );
  };
  const columns: GridColDef[] = [
    {
      field: "button",
      headerName: "",
      width: 60,
      align: "right",
      renderCell: (params) => (
        <IconButton
          component={Link}
          to={`/payslips/${params.row.payslipId}/staffs/${params.row.staffId}`}
          onClick={handleRowClick}
        >
          <MoreHorizIcon />
        </IconButton>
      ),
    },
    {
      field: "payslipId",
      headerName: "ID",
      flex: 100,
      renderCell: (params) => (
        <Typography sx={cellStyle}>{params.value}</Typography>
      ),
    },
    {
      field: "staffName",
      headerName: "Tên nhân viên",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"right"} sx={headerStyle}>
          <AccountCircleOutlinedIcon
            style={{ marginRight: 5 }}
            fontSize="small"
          />{" "}
          Nhân Viên
        </Typography>
      ),
      renderCell: (params) => {
        const staffId = params.row.staffId;
        const staffName = `${params.row.staff.lastName}  ${params.row.staff.firstName}`;
        const rowIndex = staffId % staffNameColors.length;
        const imageFile = params.row.staff.imageFile;
        const staffNameColor = staffNameColors[rowIndex];
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AvatarCustome
              imageFile={imageFile}
              id={params.row.staffId}
              name={staffName}
              dependency={payslipsLoaded}
            />
            <Typography sx={cellStyle}>{staffName}</Typography>
          </Box>
        );
      },
    },

    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      align: "left",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <>Trạng thái</>
        </Typography>
      ),
      renderCell(params) {
        return (
          <>
            {params.value === "pending" ? (
              <ChipCustome status="pending">Chờ duyệt</ChipCustome>
            ) : params.value === "waiting" ? (
              <ChipCustome status="waiting">Chờ thanh toán</ChipCustome>
            ) : params.value === "approved" ? (
              <ChipCustome status="payment">Đã thanh toán</ChipCustome>
            ) : params.value === 'rejected' ? (
              <ChipCustome status="rejected">Đã hủy</ChipCustome>
            ) : (
              <ChipCustome status="cancel">Không hợp lệ</ChipCustome>
            )
            }
          </>
        );
      },
    },

    {
      field: "departmentName",
      headerName: "Số giờ nghỉ",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <>Phòng ban</>
        </Typography>
      ),
      renderCell: (params) => {
        const departmentName = params.row.staff.department.departmentName;
        const rowIndex =
          params.row.staff.department.departmentId % colors.length;
        const dotColor = colors[rowIndex];
        return (
          <Box display={"flex"} alignItems={"center"}>
            <Typography
              style={{ marginRight: 10, fontSize: "18px", color: dotColor }}
            >
              ●
            </Typography>
            <Typography sx={{ textDecoration: "underline", ...cellStyle }}>
              {departmentName}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "payday",
      headerName: "Thời gian thay đổi",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <>Thời gian</>
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={cellStyle}>
          {moment(params.value).format("LL")}
        </Typography>
      ),
    },
    {
      field: "grossStandardSalary",
      headerName: "Lương mỗi ngày",
      width: 200,
      headerAlign: "right",
      align: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <>Gross thỏa thuận</>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.value} />,
    },
    {
      field: "grossActualSalary",
      headerName: "Lương mỗi ngày",
      width: 200,
      headerAlign: "right",
      align: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <>Gross thực tế</>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.value} />,
    },
    {
      field: "netStandardSalary",
      headerName: "Lương mỗi ngày",
      width: 200,
      headerAlign: "right",
      align: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <>Net thỏa thuận</>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.value} />,
    },
    {
      field: "netActualSalary",
      headerName: "Lương mỗi ngày",
      width: 200,
      headerAlign: "right",
      align: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <>Net thực tế</>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.value} />,
    },
    {
      field: "totalCompInsured",
      width: 200,
      headerAlign: "right",
      align: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <>Bảo hiểm công ty</>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.value} />,
    },
    {
      field: "totalCompPaid",
      width: 200,
      align: "right",
      headerAlign: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <>Công ty chi trả</>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.value} />,
    },
    {
      field: "otTotal",
      headerName: "Số ngày nghỉ",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Tăng ca</div>
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <Box display={"flex"} alignItems={"right"}>
            <CurrencyFormatter value={params.value} />
          </Box>
        );
      },
    },
    {
      field: "leaveDays",
      headerName: "Số ngày nghỉ",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <>Số ngày nghỉ</>
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
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <>Số giờ nghỉ</>
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
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <>Tạo vào lúc</>
        </Typography>
      ),
      renderCell: (params) => {
        moment.locale("vi");
        return (
          <Typography sx={cellStyle}>
            {moment(params.value).format("LL")}
          </Typography>
        );
      },
    },
    {
      field: "changeStatusTime",
      headerName: "Thời gian thay đổi",
      width: 250,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <>Thời gian thay đổi</>
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={cellStyle}>
          {moment(params.value).format("LL")}
        </Typography>
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
  const { user } = useAppSelector((state) => state.account);
  const payslips = useAppSelector(payslipSelectors.selectAll);
  const otherPayslips = payslips.filter(c => c.staffId !== user?.userInfor.staffId);
  const dispatch = useAppDispatch();
  const { payslipsLoaded, status, filtersLoaded, departments, payslipParams, metaData } = useAppSelector((state) => state.payslip);
  const [rows, setRows] = useState<Payslip[]>([]);
  const [open, setOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("Toàn bộ phòng ban");
  const location = useLocation();
  const prevLocation = useRef(location);
  const key = location.pathname;

  const [serchTerm, setSearchTerm] = useState(payslipParams.searchTerm);

  const CustomFooter = () => {
    // Customize the footer component if needed
    // For now, we return null to remove the footer
    return null;
  };


  const debouncedSearch = debounce((e: any) => {
    dispatch(setPayslipParams({ searchTerm: e.target.value }))
  }, 2500)

  useEffect(() => {
    dispatch(setHeaderTitle([{ title: "Danh sách lương nhân viên", path: "/payslips" }]));
  }, [location, dispatch]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedDepartment("Toàn bộ phòng ban");
    dispatch(resetPayslipParams())
  }
  const handleSelectedDepartments = (e: any) => {

    const value = e.target.value.toLowerCase();

    if (value.includes("toàn bộ phòng ban")) {
      dispatch(setPayslipParams({ departments: [] }))
      setSelectedDepartment("Toàn bộ phòng ban");
      return;

    }

    setSelectedDepartment(e.target.value);
    const array = [e.target.value]
    dispatch(setPayslipParams({ departments: array }))
  }

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true)
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false)
  };

  useEffect(() => {
    if (!payslipsLoaded) dispatch(fetchPayslipsAsync());
  }, [payslipsLoaded, payslips, filtersLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersPayslips());
  }, [dispatch, filtersLoaded])

  useEffect(() => {
    if (payslipsLoaded) {
      setRows(payslips);
    }
  }, [payslipsLoaded, payslips, dispatch]);
  // if (status.includes("pending") || !metaData)
  //   return <LoadingComponent message="Đang tải danh sách lương..." />;
  if (!filtersLoaded) return <LoadingComponent message="Đang tải danh sách lương..." />;
  return (
    <>
      <Box sx={{ paddingLeft: "3%", pt: "20px", paddingRight: "3%" }}>
        <ToastContainer autoClose={3000} pauseOnHover={false} theme="colored" />
        <Grid container justifyContent={"space-between"} alignItems={"center"}
          sx={{
            background: "#fff",
            padding: "20px",
            boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            //  mb: "5px",
            borderRadius: "4px",
            mr: "12px",
            // height: "52px",
            // border: "1px solid black"
          }}>
          <Grid item xs={4} >
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
          <Grid item xs={4} >
            <Box display="flex" justifyContent="end" alignItems="center">
              <Button
                variant="outlined"
                startIcon={<CheckCircle />}
                onClick={handleOpenConfirmDialog}
                sx={{
                  marginRight: "12px",
                  border: "1px solid rgb(57,219,57)",
                  textTransform: "none",
                  fontFamily: "Mulish",
                  fontWeight: "bold",
                  height: "40px",
                  color: "#fff",
                  backgroundColor: "rgb(57,219,57)",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "rgb(57,219,57)",
                    border: "1px solid rgb(57,219,57)"
                  },
                  "&:active": {
                    // backgroundColor: "#0066CD",
                    // color: "#FFFFFF",
                  },
                }}
              >
                Duyệt lương
              </Button>

              <ConfirmPayslips
                payslips={payslips}
                department={null}
                open={openConfirmDialog}
                onClose={handleCloseConfirmDialog}
                createOrAdd={false}
                departmentNameParam=""
                departmentId={0}
              />

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
                Tạo bảng lương
              </Button>
            </Box>
          </Grid>

          <CreatePayslipNewVersion
            open={open}
            onClose={handleCloseDialog}
          />

          {/* <CreatePayslipMainForm open={open} onClose={handleCloseDialog} /> */}
        </Grid>
        <Box sx={{ borderBottom: "1px solid #C6C6C6" }} />
      </Box>

      <Box sx={{ width: "94%", margin: "0 auto", marginTop: "1%"}}>
        <DataGrid
          // autoHeight
          density="standard"
          getRowId={(row: any) => row.payslipId}
          sx={{
            height: "74vh",
            // height:"100%",
            //border: "none",
            color: "#000000",
            fontSize: 16,
            fontWeight: 550,
            fontFamily: "Mulish",
            // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow effect
            // boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
            boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            backgroundColor: "rgba(255, 255, 255, 1)", // Set the opacity
          }}
          slots={{
            loadingOverlay: LinearProgress,
          }}
          loading={!payslipsLoaded}
          rows={rows}
          columns={columns}
          // pageSizeOptions={[5, 10, 25]}
          // initialState={{
          //   pagination: {
          //     paginationModel: {
          //       pageSize: 30,
          //       // page: metaData?.currentPage,   
          //     }
          //   },
          // }}
          // hideFooterSelectedRowCount
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
