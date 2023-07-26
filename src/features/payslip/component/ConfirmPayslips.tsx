import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    LinearProgress,
    Typography,
    Grid,
    Tooltip,
    Box,
    debounce,
    MenuItem,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridRowId,
    GridRowSelectionModel,
} from "@mui/x-data-grid-pro";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import moment from "moment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import NumbersIcon from "@mui/icons-material/Numbers";
import SubjectIcon from "@mui/icons-material/Subject";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import agent from "../../../app/api/agent";
import { Department } from "../../../app/models/department";
import { UserInfor } from "../../../app/models/userInfor";
import { useAppSelector, useAppDispatch } from "../../../app/store/configureStore";
import { setDepartmentChanged, setDepartmentEmployeeAdded } from "../../department/departmentSlice";
import { userInforSelectors, fetchUserInforsAsync } from "../../department/userInforSlice";
import { Payslip } from "../../../app/models/payslip";
import { fetchPayslipsAsync, setPayslipParams } from "../payslipSlice";
import AvatarCustome from "../../../app/components/Custom/Avatar/AvatarCustome";
import ChipCustome from "../../../app/components/Custom/Chip/ChipCustome";
import style from './payslip.module.scss'
import classNames from "classnames/bind";
import { BootstrapInput } from "./CreatePayslipMainForm";

const cx = classNames.bind(style)

interface Props {
    open: boolean;
    onClose: () => void;
    payslips: Payslip[];
    createOrAdd: boolean;
    departmentNameParam: string;
    department: Department | null;
    departmentId: number;
}

interface PayslipUpdate {
    changerId: number
    enable: boolean
    status: string
}


interface PayslipParticalUpdate {
    path: string
    op: string
    value: string
}


const fontStyle = "Mulish";

const headerStyle = {
    color: "#7C7C7C",
    fontWeight: 700,
    fontFamily: "Mulish",
    fontSize: 15,
};


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

function CurrencyFormatter(value: any) {
    const formattedValue = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value.value);
    return <Typography sx={cellStyle}>{formattedValue}</Typography>;
}
export default function ConfirmPayslips({
    open,
    onClose,
    payslips,
    createOrAdd,
    departmentNameParam,
    departmentId,
    department,
}: Props) {

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
                // onClick={handleRowClick}
                >
                    <MoreHorizIcon />
                </IconButton>
            ),
        },
        {
            field: "payslipId",
            headerName: "ID",
            // flex: 100,
            width: 100,
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
                return (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* <AvatarCustome
                            imageFile={imageFile}
                            id={params.row.staffId}
                            name={staffName}
                            dependency={payslipsLoaded}
                        /> */}
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
                        ) : params.value === "payment" ? (
                            <ChipCustome status="payment">Đã thanh toán</ChipCustome>
                        ) : (
                            <ChipCustome status="rejected">Đã hủy</ChipCustome>
                        )}
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
    const userInfors = useAppSelector((state) =>
        userInforSelectors.selectAll(state).filter((u) => u.departmentId !== department?.departmentId)
    );
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const { userInforsLoaded, filtersLoaded } = useAppSelector((state) => state.userInfor);
    const { payslipParams, departments } = useAppSelector(state => state.payslip)
    const [rows, setRows] = useState<Payslip[]>([]);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const [departmentName, setDepartmentName] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [managerName, setManagerName] = useState("");
    const [managerId, setManagerId] = useState("");

    const [serchTerm, setSearchTerm] = useState(payslipParams.searchTerm);

    const debouncedSearch = debounce((e: any) => {
        dispatch(setPayslipParams({ searchTerm: e.target.value }))
    }, 2500)

    const handleAccountIconClick = (row: any) => {
        setSelectedId((prevId) => (prevId === row.id ? "" : row.id));
        setManagerName(row.fullName);
        setManagerId(row.staffId);
    };

    // If userInfors is not loaded, load it using dispatch

    // // If userInfors is loaded, set rows
    // useEffect(() => {
    //     if (userInforsLoaded) {
    //         setRows(userInfors);
    //     }
    // }, [userInforsLoaded]);

    useEffect(() => {
        const otherPayslips = payslips.filter(c => c.status === 'pending')
        setRows(otherPayslips);
    }, [payslips])

    const handleInputChange = (event: any) => {
        setDepartmentName(event.target.value);
    };

    const handleSave = async () => {
        let updateStatus = false;

        let updatePayslip: PayslipUpdate = {
            changerId: user?.userInfor.staffId!,
            enable: true,
            status: "approved"
        }

        if (rowSelectionModel.length !== 0) {
            for (const id of rowSelectionModel) {
                const PayslipId = parseInt(id.toString());
                try {
                    await agent.Payslip.update(PayslipId, updatePayslip);
                    //   console.log("thanh cong");
                    updateStatus = true;
                } catch (error) {
                    //   console.log("that bai", error);
                    updateStatus = false;
                }
            }
        }

        console.log(updateStatus);

        if (updateStatus) {
            console.log("Cap nhat thanh cong")
            toast.success("Cập nhật thành công");
            dispatch(fetchPayslipsAsync());
        }

        onClose();
        setRowSelectionModel([]);
    };
    const [selectedDepartment, setSelectedDepartment] = useState<string>("Toàn bộ phòng ban");

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

    const handleDeleteSalary = async () => {
        let updateStatus = false;

        let particalUpdatePayslip: PayslipParticalUpdate[] = [
            {
                path: "/enable",
                op: "replace",
                value: "false"
            },
            {
                path: "/status",
                op: "replace",
                value: "rejected"
            },
            {
                path: "/changerId",
                op: "replace",
                value: `${user?.userInfor.staffId.toString()}`
            }
        ]
        if (rowSelectionModel.length !== 0) {
            for (const id of rowSelectionModel) {
                const PayslipId = parseInt(id.toString());
                try {
                    await agent.Payslip.patch(PayslipId, particalUpdatePayslip);
                    //   console.log("thanh cong");
                    updateStatus = true;
                } catch (error) {
                    //   console.log("that bai", error);
                    updateStatus = false;
                }
            }
        }
        if (updateStatus) {
            console.log("Cap nhat thanh cong")
            toast.success("Hủy bảng lương thành công");
            dispatch(fetchPayslipsAsync());
        }

        onClose();
        setRowSelectionModel([]);
    }

    return (
        <Dialog sx={{ padding: "100px" }} fullScreen open={open} onClose={onClose} maxWidth="lg">

            <DialogTitle sx={{ fontSize: 25, fontWeight: 600, marginBottom: 1 }}>
                Duyệt bảng lương
            </DialogTitle>

            <DialogContent >
                <Grid
                    container
                    //  spacing={4} 
                    mb="4px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"

                    height="50px">
                    <Grid item xs={4} display="flex" alignItems="center" height="100%">
                        <Box display="flex" alignItems="center">
                            {/* <TextField
                                id="departmentName"
                                // label="Tìm kiếm"
                                variant="standard"
                                placeholder="Tìm kiếm"
                                sx={{ width: "100%" }}
                                onChange={handleInputChange}
                            /> */}
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
                    <Grid item xs={3} display="flex" alignItems="center" height="100%">
                        <BootstrapInput

                            sx={{ width: "50%", marginLeft: "52px", borderRadius: "12px" }}
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
                    </Grid>

                    <Grid item xs={3} display="flex" alignItems="center" height="100%" >
                        <Box sx={{ color: "#FF6969", fontWeight: "bold" }}>
                            <Box display="flex" alignItems="center">
                                <AccountCircleIcon sx={{ mr: "5px" }} />
                                <>
                                    Người duyệt đơn: <span style={{ color: "#000", fontWeight: "bold", marginLeft: "3px" }}>
                                        {user?.userInfor.lastName} {user?.userInfor.firstName}
                                    </span>
                                </>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={2} display="flex" alignItems="center" height="100%" >
                        <Box display="flex" justifyContent="end" width="100%">
                            <Button
                                className={cx("delete-salary-button")}
                                variant="contained"
                                onClick={handleDeleteSalary}
                            >
                                Hủy bảng lương
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <DataGrid
                    getRowId={(row: any) => row.payslipId}
                    sx={{
                        height: "92%",
                        fontSize: 16,
                        fontWeight: 550,
                        fontFamily: "Mulish",
                    }}
                    slots={{
                        loadingOverlay: LinearProgress,
                        //toolbar: CustomToolbar,
                    }}
                    //loading = {!departmentsLoaded}
                    rows={rows}
                    columns={columns}
                    classes={{
                        columnHeader: "custom-header",
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    isRowSelectable={(params: GridRowParams) =>
                        params.row.payslipId
                    }
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                />
            </DialogContent>
            {user?.roles?.includes("HRManager") && (
                <DialogActions>
                    <Button sx={{ color: "#FF605C" }} onClick={onClose}>
                        Hủy
                    </Button>
                    <Button onClick={handleSave}>Lưu</Button>
                </DialogActions>
            )}

        </Dialog>
    );
}
