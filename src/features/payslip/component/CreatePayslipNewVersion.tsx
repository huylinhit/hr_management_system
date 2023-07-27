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
    MenuItem,
    debounce,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import {
    GridRowSelectionModel,
} from "@mui/x-data-grid-pro";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import moment from "moment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SubjectIcon from "@mui/icons-material/Subject";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";
import { UserInfor } from "../../../app/models/userInfor";
import { useAppSelector, useAppDispatch } from "../../../app/store/configureStore";
import { userInforSelectors, fetchUserInforsAsync, setUserInforParams } from "../../department/userInforSlice";
import AvatarCustome from "../../../app/components/Custom/Avatar/AvatarCustome";
import style from './payslip.module.scss'
import classNames from "classnames/bind";
import agent from "../../../app/api/agent";
import { toast } from "react-toastify";
import { BootstrapInput } from "./CreatePayslipMainForm";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { fetchPayslipsAsync } from "../payslipSlice";

const cx = classNames.bind(style)

interface Props {
    open: boolean;
    onClose: () => void;
}


interface Time {
    id: number,
    month: number,
    year: number
}

const time: Time[] = [];

for (let id = 1; id <= 12; id++) {
    const month = id;
    const year = moment().year();

    time.push({ id, month, year });
}


export interface PayslipCreationDto {
    month: number
    year: number
    creatorId: number
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

const infoStyle = {
    fontWeight: 600,
    fontFamily: fontStyle,
    fontSize: "15px",
    color: "#000000",
    "& .MuiInputBaseInput.MuiDisabled?": {
        WebkitTextFillColor: "#000000",
    },
};

const textFieldInputProps = {
    disableUnderline: true,
    style: {
        ...infoStyle,
    },
};

export default function CreatePayslipNewVersion({
    open,
    onClose,
}: Props) {
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
    // const userInfors = useAppSelector((state) =>
    //     userInforSelectors.selectAll(state).filter((u) => u.departmentId !== department?.departmentId)
    // );
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const users = useAppSelector(userInforSelectors.selectAll);
    const { userInforsLoaded, filtersLoaded, status, userInforParams } = useAppSelector((state) => state.userInfor);
    const [rows, setRows] = useState<UserInfor[]>([]);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const [selectedTime, setSelectedTime] = useState(1);
    const [serchTerm, setSearchTerm] = useState(userInforParams.searchTerm);

    const debouncedSearch = debounce((e: any) => {
        dispatch(setUserInforParams({ searchTerm: e.target.value }))
    }, 2500)

    // If userInfors is not loaded, load it using dispatch
    useEffect(() => {
        if (!userInforsLoaded)
            dispatch(fetchUserInforsAsync());
    }, [userInforsLoaded, dispatch, users])

    // If userInfors is loaded, set rows
    useEffect(() => {
        if (userInforsLoaded) {
            const otherUsers = users.filter(c => c.staffId !== 1);
            setRows(otherUsers);
        }
    }, [userInforsLoaded, dispatch]);

    const handleTime = (e: any) => {
        setSelectedTime(e.target.value);
    };

    const handleSave = async () => {

        let updateStatus = false;


        const payslipCreateDto = {
            month: time[selectedTime - 1].month,
            year: time[selectedTime - 1].year,
            creatorId: user?.userInfor.staffId
        }

        if (rowSelectionModel.length !== 0) {
            for (const id of rowSelectionModel) {
                const staffId = parseInt(id.toString());
                try {
                    await agent.Payslip.createByStaffId(staffId, payslipCreateDto);
                    updateStatus = true;
                } catch (error) {

                    updateStatus = false;
                }
            }
        }



        if (updateStatus) {
            toast.success("Cập nhật thành công");
            dispatch(fetchPayslipsAsync());
        }

        onClose();
        setRowSelectionModel([]);
    };

    if (status.includes('pending')) return <LoadingComponent message="Đang tải nhân viên..." />

    return (
        <Dialog sx={{ padding: "100px" }} fullScreen open={open} onClose={onClose} maxWidth="lg">

            <DialogTitle sx={{ fontSize: 25, fontWeight: 600, marginBottom: 1 }}>
                Tạo bảng lương
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

                    <Grid item xs={4} display="flex" alignItems="center" height="100%" >
                        <Box sx={{ color: "#FF6969", fontWeight: "bold" }}>
                            <Box display="flex" alignItems="center">
                                <AccountCircleIcon sx={{ mr: "5px" }} />
                                <>
                                    Người tạo đơn: <span style={{ color: "#000", fontWeight: "bold", marginLeft: "3px" }}>
                                        {user?.userInfor.lastName} {user?.userInfor.firstName}
                                    </span>
                                </>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={4} display="flex" alignItems="center" height="100%" >
                        <Grid container display="flex" justifyContent="space-between" alignItems="center">
                            <Grid item xs={2}>
                                <Typography fontWeight="bold" flex={4}>Thời gian: </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                {time.length !== 0 && (
                                    <BootstrapInput
                                        fullWidth
                                        InputProps={textFieldInputProps}
                                        variant="standard"
                                        onChange={handleTime}
                                        value={selectedTime}
                                        select
                                    >
                                        {time.map((item) => (
                                            <MenuItem
                                                key={item.id} value={item.id}>
                                                {item.month}/{item.year}
                                            </MenuItem>
                                        ))}
                                    </BootstrapInput>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <DataGrid
                    getRowId={(row: any) => row.staffId}
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
                                pageSize: 100,
                            },
                        },
                    }}
                    // pageSizeOptions={[5]}
                    checkboxSelection
                    isRowSelectable={(params: GridRowParams) =>
                        params.row.staffId
                    }
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                    hideFooterSelectedRowCount
                    hideFooterPagination
                    hideFooter
                />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" sx={{ width: "70px", marginRight: "10px", marginBottom: "20px", borderRadius:"6px"}} onClick={onClose}>
                    Hủy
                </Button>
                <Button variant="contained" sx={{ width: "70px", marginRight: "15px", marginBottom: "20px", borderRadius:"6px"}} onClick={handleSave}>Lưu</Button>
            </DialogActions>
        </Dialog>
    );
}
