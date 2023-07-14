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
import AddIcon from "@mui/icons-material/Add";
import CreatePayslipDialog from "./CreatePayslipDialog";
import CreatePayslipMainForm from "./CreatePayslipMainForm";
import { fetchUserInforsAsync, userInforSelectors } from "../../department/userInforSlice";

const cx = classNames.bind(styles);

function Payroll() {
    const dispatch = useAppDispatch();
    const payslips = useAppSelector(payslipSelectors.selectAll);
    const { payslipsLoaded, status } = useAppSelector(state => state.payslip);
    const [open, setOpen] = useState(false);
    const users = useAppSelector(userInforSelectors.selectAll);
    const { userInforsLoaded, status: userInforLoaded } = useAppSelector(state => state.userInfor);

    useEffect(() => {
        if (!payslipsLoaded) dispatch(fetchPayslipsAsync());
    }, [payslipsLoaded]);

    useEffect(() => {
        if (!userInforLoaded)
            dispatch(fetchUserInforsAsync());
    }, [userInforLoaded])


    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };
    
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
                    <Button
                        variant="contained"
                        sx={{ fontWeight: "bold", textTransform: "none", color: "#FFF" }}
                        disableElevation={true}
                        startIcon={<AddIcon />}
                        onClick={handleOpenDialog}
                    >
                        Tạo Bảng Lương
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
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Gross Thỏa Thuận</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Gross Thực Tế</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Net Thỏa Thuận</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Net Thực Tế</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Trạng Thái</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Bảo Hiểm Công Ty</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Công Ty Chi Trả</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Phòng ban</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Ngày Trả Lương</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>TG Tạo</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>TG Thay Đổi</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Chi Tiết</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payslips?.map(item => {
                            const date = new Date(item.changeAt);
                            const currentUserInfor = users.find(c => c.staffId === item.staffId);

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
                                        {item.grossStandardSalary.toLocaleString()}

                                    </TableCell>
                                    <TableCell align="center">
                                        {item.grossActualSalary.toLocaleString()}

                                    </TableCell>
                                    <TableCell align="center">
                                        {item.netStandardSalary.toLocaleString()}

                                    </TableCell>
                                    <TableCell align="center">
                                        {item.netActualSalary.toLocaleString()}

                                    </TableCell>
                                    <TableCell align="center">
                                        {/* {item.status === 'pending' && item.enable === true && (
                                            <ChipCustome status="pending" >Chờ Duyệt</ChipCustome>
                                        )}
                                        {item.status === 'waiting' && item.enable === true && (
                                            <ChipCustome status="waiting" >Chờ Thanh Toán</ChipCustome>
                                        )}
                                        {item.status === 'payment' && item.enable === true && (
                                            <ChipCustome status="payment" >Đã Thanh Toán</ChipCustome>
                                        )}
                                        {item.enable === false && (
                                            <ChipCustome status="rejected" >Đã Hủy</ChipCustome>
                                        )} */}
                                    </TableCell>
                                    <TableCell align="center">
                                            {item.totalCompInsured.toLocaleString()}
                                    </TableCell>
                                    <TableCell align="center">
                                            {item.totalCompPaid.toLocaleString()}
                                    </TableCell>
                                    <TableCell align="center">
                                        {currentUserInfor?.departmentName}
                                    </TableCell>
                                    <TableCell align="center">{moment(item.payday).format("DD-MM-YYYY")}</TableCell>
                                    <TableCell align="center">{moment(item.createAt).format("DD-MM-YYYY")}</TableCell>
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
