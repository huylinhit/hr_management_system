import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, TextField, Avatar, Chip, IconButton, Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { fetchPayslipsAsync, payslipSelectors } from "../payslipSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router-dom";
import moment from "moment";
import ChipCustome from "../../../app/components/Custom/Chip/ChipCustome";
import styles from './payslip.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Payroll() {
    const dispatch = useAppDispatch();
    const payslips = useAppSelector(payslipSelectors.selectAll);
    const { payslipsLoaded, status } = useAppSelector(state => state.payslip);

    useEffect(() => {
        if (!payslipsLoaded) dispatch(fetchPayslipsAsync());
    }, [payslipsLoaded]);

    if (status.includes('pending')) return <LoadingComponent message="Loading Payroll..." />
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
                    <Button variant="contained">Tạo bảng lương cho nhân viên</Button>
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
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Lương thỏa thuận</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Lương căn bản</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Lương Gross</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Lương Net</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Lương Thực Nhận</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Bảo Hiểm Công Ty</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Công Ty Trả</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Thời gian thay đổi</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Trạng Thái</TableCell>
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
                                    <TableCell align="center">
                                        <Link
                                            to={`${item.payslipId}/staffs/${item.staffId}`}>
                                            {item.payslipId}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Link
                                            to={`${item.payslipId}/staffs/${item.staffId}`}>
                                            {item.staffId}
                                        </Link>
                                    </TableCell>
                                    {/* <TableCell align="center">
                                    <Avatar alt={item.staff.firstName} src="/static/images/avatar/1.jpg" />
                                </TableCell> */}
                                    <TableCell align="center">{`${item.staff.lastName} ${item.staff.firstName}`}</TableCell>
                                    <TableCell align="center">Gross To Net</TableCell>
                                    <TableCell align="center">{item.grossStandardSalary.toLocaleString()}</TableCell>
                                    <TableCell align="center">{item.grossActualSalary.toLocaleString()}</TableCell>
                                    <TableCell align="center">{item.netStandardSalary.toLocaleString()}</TableCell>
                                    <TableCell align="center">
                                        {item.netActualSalary.toLocaleString()}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.totalCompInsured.toLocaleString()}
                                    </TableCell>
                                    <TableCell align="center">{item.totalCompPaid.toLocaleString()}</TableCell>
                                    <TableCell align="center">{moment(item.changeAt).format("DD-MM-YYYY")}</TableCell>
                                    <TableCell align="center">
                                        {item.payslipStatus ? (
                                            <ChipCustome status="approved">Đã thanh toán</ChipCustome>

                                        ) : (
                                            <ChipCustome status="rejected">Đã hủy</ChipCustome>
                                        )}

                                    </TableCell>
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