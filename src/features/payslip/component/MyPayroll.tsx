import { Box, Typography, Grid, TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import moment from "moment";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router-dom";
import ChipCustome from "../../../app/components/Custom/Chip/ChipCustome";
import { useAppDispatch, useAppSelector } from "../../../app/store/configureStore";
import classNames from "classnames";
import styles from './payslip.module.scss'
import { useEffect, useState } from "react";
import { Payslip } from "../../../app/models/payslip";
import agent from "../../../app/api/agent";
import { fetchPayslipsStaffAsync, payslipSelectors } from "../payslipSlice";

const cx = classNames.bind(styles);


function MyPayroll() {
    const { user } = useAppSelector(state => state.account);
    const [payslips, setPayslips] = useState<Payslip[]>([]);

    useEffect(() =>{
        agent.Payslip.listOfStaff(user?.userInfor.staffId!)
            .then(response  => setPayslips(response));
    }, [user]);

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
                        {payslips.length !== 0 && payslips?.map(item => {
                            const date = new Date(item.changeAt);
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
                                    <TableCell align="center">{item.grossStandardSalary}</TableCell>
                                    <TableCell align="center">{item.grossActualSalary}</TableCell>
                                    <TableCell align="center">{item.netStandardSalary}</TableCell>
                                    <TableCell align="center">
                                        {item.netActualSalary}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.totalCompInsured}
                                    </TableCell>
                                    <TableCell align="center">{item.totalCompPaid}</TableCell>
                                    <TableCell align="center">{moment(item.changeAt).format("DD-MM-YYYY")}</TableCell>
                                    {/* <TableCell align="center">
                                        {item.status ==="approved" ? (
                                            <ChipCustome status="approved">Đã thanh toán</ChipCustome>

                                        ) : (
                                            <ChipCustome status="rejected">Đã hủy</ChipCustome>
                                        )}

                                    </TableCell> */}
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

export default MyPayroll;