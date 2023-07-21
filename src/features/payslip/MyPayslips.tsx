import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useRef, useState } from "react";
import {
    Button,
    Grid,
    IconButton,
    LinearProgress,
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
import { fetchPayslipsAsync, fetchPayslipsStaffAsync, payslipSelectors } from "./payslipSlice";
import { Payslip } from "../../app/models/payslip";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ChipCustome from "../../app/components/Custom/Chip/ChipCustome";
import CreatePayslipMainForm from "./component/CreatePayslipMainForm";

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
                { title: "Danh sách lương của tôi", path: "/own-payslips" },
                // { title: "Chi tiết lương", path: `` },
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
                    to={`/own-payslips/${params.row.payslipId}`}
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
                    <>Lương Tháng</>
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
    const MyPayslips = payslips.filter(c => c.staffId === user?.userInfor.staffId);
    const dispatch = useAppDispatch();
    const { payslipsLoaded, status } = useAppSelector((state) => state.payslip);
    const [rows, setRows] = useState<Payslip[]>([]);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        dispatch(setHeaderTitle([{ title: "Danh sách lương của tôi", path: "/own-payslips" }]));
    }, [location, dispatch]);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!payslipsLoaded) dispatch(fetchPayslipsAsync());
    }, [payslipsLoaded, payslips, dispatch]);

    useEffect(() => {
        if (payslipsLoaded) {
            setRows(MyPayslips);
        }
    }, [payslipsLoaded, dispatch]);
    if (status.includes("pending"))
        return <LoadingComponent message="Đang tải danh sách lương..." />;
    return (
        <>
            <Box sx={{ paddingLeft: "3%", pt: "20px", paddingRight: "3%" }}>
                <ToastContainer autoClose={3000} pauseOnHover={false} theme="colored" />
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
                        {/* <Button
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
                            Tạo bảng lương
                        </Button> */}
                        <Box
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

                        </Box>
                    </Grid>

                    <CreatePayslipMainForm open={open} onClose={handleCloseDialog} />
                </Grid>
                <Box sx={{ borderBottom: "1px solid #C6C6C6" }} />
            </Box>

            <Box sx={{ width: "94%", margin: "0 auto", marginTop: "1%" }}>
                <DataGrid
                    // autoHeight
                    density="standard"
                    getRowId={(row: any) => row.payslipId}
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
                        //toolbar: CustomToolbar,
                    }}
                    loading={!payslipsLoaded}
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
