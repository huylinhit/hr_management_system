import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, TextField, Avatar, Chip, IconButton, Button, Grid, makeStyles } from "@mui/material";
import { useEffect, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router-dom";
import moment from "moment";
import styles from './listLeave.module.scss';
import classNames from "classnames/bind";
import AddIcon from "@mui/icons-material/Add";
import ChipCustome from "../../app/components/Custom/Chip/ChipCustome";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { userInforSelectors, fetchUserInforsAsync } from "../department/userInforSlice";
import CreatePayslipMainForm from "../payslip/component/CreatePayslipMainForm";
import { payslipSelectors, fetchPayslipsAsync } from "../payslip/payslipSlice";
import { fetchLogLeavesAsync, logleaveSelectors } from "../detail_leavelog/logleaveSlice";
import CancelIcon from '@mui/icons-material/Cancel';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const cx = classNames.bind(styles);

function ListLeave() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const logLeaves = useAppSelector(logleaveSelectors.selectAll);
    const peopleLogLeaves = logLeaves.filter(c => c.staffId !== user?.userInfor.staffId);
    const { logleavesLoaded, status: logLeaveStatus } = useAppSelector(state => state.logleave);


    const [open, setOpen] = useState(false);
    const users = useAppSelector(userInforSelectors.selectAll);
    const { userInforsLoaded, status: userInforLoaded } = useAppSelector(state => state.userInfor);

    useEffect(() => {
        if (!logleavesLoaded)
            dispatch(fetchLogLeavesAsync());
    }, [logleavesLoaded])

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleClick = () => {
        console.log("Click Here: ");
    }
    return (

        <Box className={cx("wrapper")}>
            <Typography variant="h4">Danh Sách Ngày Nghỉ</Typography>

            <Grid
                container
                sx={{
                    justifyContent: "space-between",
                    my: "28px"
                }}>
                <Grid item xs={9}>
                    <TextField
                        label="Search"
                        sx={{
                            mr: "12px"
                        }}
                    />
                    <TextField
                        label="Filter"
                    />
                </Grid>
                <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        sx={{ fontWeight: "bold", textTransform: "none", color: "#FFF" }}
                        disableElevation={true}
                        startIcon={<AddIcon />}
                        onClick={handleOpenDialog}
                    >
                        Tạo Đơn Xin Nghỉ
                    </Button>
                    <CreatePayslipMainForm open={open} onClose={handleCloseDialog} />
                </Grid>
            </Grid>

            <TableContainer component={Paper} className={cx("container")}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead className={cx("header")}>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Id</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>MSNV</TableCell>
                            {/* <TableCell align="center"  sx={{fontWeight: "bold"}}>Ảnh</TableCell> */}
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Tên</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Loại</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>TG Bắt Đầu</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>TG Kết Thúc</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Ngày Nghỉ</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Giờ Nghỉ</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Khấu Trừ Ngày</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Tổng Khấu Trừ</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Trạng Thái</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Duyệt Đơn</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Lý Do</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Phản Hồi</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>TG Tạo</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>TG Thay Đổi</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Chi Tiết</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logLeaves?.map(item => {
                            const currentUserInfor = users.find(c => c.staffId === item.staffId);

                            return (
                                <TableRow
                                    key={item.leaveLogId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" >
                                        <Typography
                                            sx={{ textDecoration: "none", color: "#000", fontSize: "14px" }}
                                            component={Link}
                                            to={`${item.leaveLogId}/staffs/${item.staffId}`}>
                                            {item.leaveLogId}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" sx={{ textDecoration: "none", color: "#000" }}>
                                        <Typography
                                            sx={{ textDecoration: "none", color: "#000", fontSize: "14px" }}
                                            component={Link}
                                            to={`${item.leaveLogId}/staffs/${item.staffId}`}>
                                            {item.staffId}
                                        </Typography>
                                    </TableCell>
                                    {/* <TableCell align="center">
                                    <Avatar alt={item.staff.firstName} src="/static/images/avatar/1.jpg" />
                                </TableCell> */}
                                    <TableCell align="center">{`${item.staff.lastName} ${item.staff.firstName}`}</TableCell>
                                    {/* <TableCell align="center">Gross To Net</TableCell> */}
                                    <TableCell align="center">
                                        {item.leaveType.leaveTypeName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {moment(item.leaveStart).format("DD-MM-YYYY")}

                                    </TableCell>
                                    <TableCell align="center">
                                        {moment(item.leaveEnd).format("DD-MM-YYYY")}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.leaveDays} Ngày
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.leaveHours} Giờ
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.salaryPerDay.toLocaleString()}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell align="center">

                                        {item.enable === true && item.status === 'approved' && (
                                            <ChipCustome status="approved" >
                                                Chấp Nhận
                                            </ChipCustome>
                                        )}
                                        {item.enable === true && item.status === 'pending' && (
                                            <ChipCustome status="pending" >Chờ Duyệt</ChipCustome>
                                        )}
                                        {item.enable === false && (
                                            <ChipCustome status="rejected" >Từ Chối</ChipCustome>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton className={cx("button")}>
                                            <CheckCircleIcon className={cx("approve-button")} />
                                        </IconButton>

                                        <IconButton className={cx("button")}>
                                            <CancelIcon className={cx("cancel-button")} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.description}
                                    </TableCell>
                                    
                                    <TableCell align="center">
                                        {item.processNote}
                                    </TableCell>
                                    <TableCell align="center">
                                        {moment(item.createAt).format("DD-MM-YYYY")}
                                    </TableCell>
                                    <TableCell align="center">
                                        {moment(item.changeStatusTime).format("DD-MM-YYYY")}

                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            component={Link}
                                            to={`${item.leaveLogId}/staffs/${item.staffId}`}
                                        >
                                            <CiCircleMore style={{ fontSize: "30px", color: "black" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ListLeave;
