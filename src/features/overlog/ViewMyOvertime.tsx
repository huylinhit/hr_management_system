import {
    SelectChangeEvent,
    Container,
    Typography,
    Grid,
    TextField,
    Autocomplete,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    styled,
    tableCellClasses,
    Chip,
    Box,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { BorderColor } from "@mui/icons-material";
import { CiCircleMore } from "react-icons/ci";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import CreateOvertime from "./CreateOvertime";
import { FORMSTATUS } from "../../app/store/data";
import { Root } from "react-dom/client";
import axios from "axios";
import React from "react";
import { LogOvertime } from "../../app/models/logOvertime";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchLogOtsAsync, fetchLogOtsStaffAsync, logOvertimeSelectors } from "./overtimeSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ChipCustome from "../../app/components/Custom/Chip/ChipCustome";
import styles from './ViewMyOvertime.module.scss'
import classNames from "classnames/bind";
import CreateOvertimeForm from "./CreateOvertime2";
import AddIcon from "@mui/icons-material/Add";


const cx = classNames.bind(styles);


const headerStyle = {
    fontWeight: "bold",
};

const contentStyles = {
    fontSize: "14px",
}
function ViewMyOvertime() {
    const styles = {
        marginBottom: "10px",
    };

    function handleChange(
        event: SelectChangeEvent<unknown>,
        child: ReactNode
    ): void { }
    const [open, setOpen] = React.useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const dispatch = useAppDispatch();
    const listAll = useAppSelector(logOvertimeSelectors.selectAll);
    const { user } = useAppSelector(state => state.account);
    const list = listAll.filter(c => c.staffId === user?.userInfor.staffId);



    const { logOtAdded, logOtsLoaded, status } = useAppSelector(state => state.logot);
    useEffect(() => {
        if (!logOtsLoaded)
            dispatch(fetchLogOtsStaffAsync(user?.userInfor.staffId!));
    }, [dispatch, logOtAdded, logOtsLoaded]);
    if (status.includes('pending')) return <LoadingComponent message="Đang tải đơn làm thêm" />

    return (
        <>
            <Box className={cx("wrapper")}>
                <Typography variant="h4" sx={headerStyle} >
                    Danh sách đơn làm thêm giờ
                </Typography>
                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        my: "28px"
                    }}
                >
                    <Grid
                        item
                        xs={10}
                        sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Grid>
                            <TextField size="small" label="Tìm kiếm..." />
                        </Grid>
                    </Grid>
                    <Grid item xs={10}>
                        <Button
                            variant="contained"
                            sx={{ fontWeight: "bold", textTransform: "none", color: "#FFF" }}
                            disableElevation={true}
                            startIcon={<AddIcon />}
                            onClick={handleOpenDialog}
                        >
                            Tạo đơn mới
                        </Button>
                        <CreateOvertimeForm isOwn={true} open={open} onClose={handleCloseDialog} />
                    </Grid>
                </Grid>

                <TableContainer component={Paper} className={cx("container")}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Mã đơn</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Mã NV</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Tên NV</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Loại tăng ca</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Từ</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Đến</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Ngày</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Giờ</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Lương một ngày</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Tổng lương làm thêm</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Trạng thái</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Lý do</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Phản hồi</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Thời gian tạo</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "700", background: " rgb(244,246,247)", color: "#000" }}>Thời gian được duyệt</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list?.map(item => {
                                return (
                                    <TableRow
                                        key={item.otLogId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">
                                            <Link
                                                style={{ textDecoration: "none", color: "#000 " }}
                                                to={`${item.otLogId}/staffs/${item.staffId}`}>
                                                {item.otLogId}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link
                                                style={{ textDecoration: "none", color: "#000 " }}
                                                to={`${item.otLogId}/staffs/${item.staffId}`}>
                                                {item.staffId}
                                            </Link>
                                        </TableCell>
                                        {/* <TableCell align="center">
                                      <Avatar alt={item.staff.firstName} src="/static/images/avatar/1.jpg" />
                                  </TableCell> */}
                                        <TableCell align="center" style={contentStyles}>{item.staff.lastName} {item.staff.firstName}</TableCell>
                                        <TableCell align="center" style={contentStyles}>
                                            {item.otTypeId === 1 && <ChipCustome status="approved">{item.otType.typeName}</ChipCustome>}
                                            {item.otTypeId === 2 && <ChipCustome status="waiting">{item.otType.typeName}</ChipCustome>}
                                            {item.otTypeId === 3 && <ChipCustome status="rejected">{item.otType.typeName}</ChipCustome>}
                                        </TableCell>
                                        <TableCell align="center" style={contentStyles}>
                                            {moment(item.logStart).format("DD-MM-YYYY")}
                                        </TableCell>
                                        <TableCell align="center" style={contentStyles}>{moment(item.logEnd).format("DD-MM-YYYY")}</TableCell>
                                        <TableCell align="center" style={contentStyles}>
                                            <ChipCustome status="approved">{item.days} ngày</ChipCustome>

                                        </TableCell>
                                        <TableCell align="center" style={contentStyles}>
                                            <ChipCustome status="approved">{item.logHours} giờ</ChipCustome>

                                        </TableCell>
                                        <TableCell align="center" style={contentStyles}>
                                            <ChipCustome status="payment">
                                                {item.salaryPerDay.toLocaleString()}
                                            </ChipCustome>
                                        </TableCell>
                                        <TableCell align="center" style={contentStyles}>
                                            <ChipCustome status="payment">
                                                {item.amount.toLocaleString()}
                                            </ChipCustome>
                                        </TableCell>
                                        <TableCell align="center" style={contentStyles} sx={{ fontSize: "8px" }}>
                                            {item.status === 'pending' && <ChipCustome status="pending">Chờ duyệt</ChipCustome>}
                                            {item.status === 'approved' && <ChipCustome status="payment">Chấp nhận</ChipCustome>}
                                            {item.status === 'rejected' && <ChipCustome status="rejected">Từ chối</ChipCustome>}
                                            {item.status === 'cancel' && <ChipCustome status="cancel">Hủy</ChipCustome>}
                                        </TableCell>
                                        <TableCell align="center" style={contentStyles}>{item.reason}</TableCell>
                                        <TableCell align="center" style={contentStyles}>{item.processNote}</TableCell>
                                        <TableCell align="center" style={contentStyles}>{moment(item.createAt).format("DD-MM-YYYY")}</TableCell>
                                        <TableCell align="center" style={contentStyles}>{moment(item.changeStatusTime).format("DD-MM-YYYY")}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}

export default ViewMyOvertime;
