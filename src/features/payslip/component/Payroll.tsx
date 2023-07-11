import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, TextField, Avatar, Chip, IconButton, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { fetchPayslipsAsync, payslipSelectors } from "../payslipSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router-dom";
import moment from "moment";
import ChipCustome from "../../../app/components/Custom/Chip/ChipCustome";
import styles from './payslip.module.scss';
import classNames from "classnames/bind";
import CreatePayslipDialog from "./CreatePayslipDialog";

const cx = classNames.bind(styles);

function Payroll() {
    const dispatch = useAppDispatch();
    const payslips = useAppSelector(payslipSelectors.selectAll);
    const { payslipsLoaded, status } = useAppSelector(state => state.payslip);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (!payslipsLoaded) dispatch(fetchPayslipsAsync());
    }, [payslipsLoaded]);

    if (status.includes('pending')) return <LoadingComponent message="Loading Payroll..." />

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };


    return (

        <Box className={cx("wrapper")}>
            <Typography variant="h4">Danh sách lương nhân viên</Typography>

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
                        onClick={handleClickOpen}
                        variant="contained">
                        Tạo bảng lương
                    </Button>
                    <CreatePayslipDialog open={open} handleClose={handleClose} />

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
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Gross thỏa thuận</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Gross thực tế</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Net Thỏa Thuận</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Net Thực Tế</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Trạng Thái</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Bảo Hiểm Công Ty</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Công ty chi trả</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Thời gian tạo</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Chi Tiết</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payslips?.map(item => {
                            const date = new Date(item.changeAt);
                            return (
                                <TableRow
                                    key={item.payslipId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" >
                                        <Typography
                                            sx={{ textDecoration: "none", color: "#000", fontSize: "14px" }}
                                            component={Link}
                                            to={`${item.payslipId}/staffs/${item.staffId}`}>
                                            {item.payslipId}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" sx={{ textDecoration: "none", color: "#000" }}>
                                        <Typography
                                            sx={{ textDecoration: "none", color: "#000", fontSize: "14px" }}
                                            component={Link}
                                            to={`${item.payslipId}/staffs/${item.staffId}`}>
                                            {item.staffId}
                                        </Typography>
                                    </TableCell>
                                    {/* <TableCell align="center">
                                    <Avatar alt={item.staff.firstName} src="/static/images/avatar/1.jpg" />
                                </TableCell> */}
                                    <TableCell align="center">{`${item.staff.lastName} ${item.staff.firstName}`}</TableCell>
                                    {/* <TableCell align="center">Gross To Net</TableCell> */}
                                    <TableCell align="center">
                                        <ChipCustome status="payment">
                                            {item.grossStandardSalary.toLocaleString()}
                                        </ChipCustome>
                                    </TableCell>
                                    <TableCell align="center">
                                        <ChipCustome status="payment">
                                            {item.grossActualSalary.toLocaleString()}
                                        </ChipCustome>
                                    </TableCell>
                                    <TableCell align="center">
                                        <ChipCustome status="withdrawn">
                                            {item.netStandardSalary.toLocaleString()}
                                        </ChipCustome>
                                    </TableCell>
                                    <TableCell align="center">
                                        <ChipCustome status="withdrawn">
                                            {item.netActualSalary.toLocaleString()}
                                        </ChipCustome>
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.payslipStatus ? (
                                            <ChipCustome status="approved">Đã thanh toán</ChipCustome>
                                        ) : (
                                            <ChipCustome status="rejected">Đã hủy</ChipCustome>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <ChipCustome status="waiting">
                                            {item.totalCompInsured.toLocaleString()}
                                        </ChipCustome>
                                    </TableCell>
                                    <TableCell align="center">
                                        <ChipCustome status="waiting">
                                            {item.totalCompPaid.toLocaleString()}
                                        </ChipCustome>
                                    </TableCell>
                                    <TableCell align="center">{moment(item.changeAt).format("DD-MM-YYYY")}</TableCell>

                                    <TableCell align="center">
                                        <IconButton
                                            component={Link}
                                            to={`${item.payslipId}/staffs/${item.staffId}`}
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

export default Payroll;
