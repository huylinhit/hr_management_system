import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, TextField, Avatar, Chip, IconButton, Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import { fetchPayslipsAsync, payslipSelectors } from "../payslipSlice";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router-dom";


function Payroll() {
    const dispatch = useAppDispatch();
    const payslips = useAppSelector(payslipSelectors.selectAll);
    const { payslipsLoaded, status } = useAppSelector(state => state.payslip);

    useEffect(() => {
        if (!payslipsLoaded) dispatch(fetchPayslipsAsync());
    }, [payslipsLoaded]);

    if (status.includes('pending')) return <LoadingComponent message="Loading Payroll..." />

    return (
        <Box sx={{ p: "32px" }}>
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

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
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
                            const formattedDate = date.toLocaleDateString();
                            return (
                                <TableRow
                                    key={item.payslipId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{item.payslipId}</TableCell>
                                    <TableCell align="center">{item.staffId}</TableCell>
                                    {/* <TableCell align="center">
                                    <Avatar alt={item.staff.firstName} src="/static/images/avatar/1.jpg" />
                                </TableCell> */}
                                    <TableCell align="center">{`${item.staff.lastName} ${item.staff.firstName}`}</TableCell>
                                    <TableCell align="center">Gross To Net</TableCell>
                                    <TableCell align="center">{item.basicSalary}</TableCell>
                                    <TableCell align="center">{item.grossSalary}</TableCell>
                                    <TableCell align="center">{item.netSalary}</TableCell>
                                    <TableCell align="center">
                                        {item.totalInsured}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.totalPaid}
                                    </TableCell>
                                    <TableCell align="center">{item.totalInsured}</TableCell>
                                    <TableCell align="center">{formattedDate}</TableCell>
                                    <TableCell align="center">
                                        {item.payslipStatus ? (
                                            <Chip color="success" label="Hợp lệ" />
                                        ) : (
                                            <Chip color="error" label="Đã hủy" />
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
            </TableContainer></Box>
    );
}

export default Payroll;