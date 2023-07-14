import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box, TextField, Avatar, Chip, IconButton, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router-dom";
import moment from "moment";
import styles from '../payslip/component/payslip.module.scss';
import classNames from "classnames/bind";
import AddIcon from "@mui/icons-material/Add";
import ChipCustome from "../../app/components/Custom/Chip/ChipCustome";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { userInforSelectors, fetchUserInforsAsync } from "../department/userInforSlice";
import CreatePayslipMainForm from "../payslip/component/CreatePayslipMainForm";
import { payslipSelectors, fetchPayslipsAsync } from "../payslip/payslipSlice";
import { contractSelectors, fetchContractsAsync } from "../../app/store/contract/contractSlice";

const cx = classNames.bind(styles);

function ListContract() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);


    const [open, setOpen] = useState(false);
    const users = useAppSelector(userInforSelectors.selectAll);
    const allContracts = useAppSelector(contractSelectors.selectAll);
    // const peopleContracts = allContracts.filter(c => c.staffId !== user?.userInfor.staffId);
    const { contractsLoaded, status: contractsStatus } = useAppSelector(state => state.contract);


    useEffect(() => {
        if (!contractsLoaded)
            dispatch(fetchContractsAsync());
    }, [contractsLoaded])

    if (contractsStatus.includes('pending')) return <LoadingComponent message="Đang Tải Hợp Đồng ..." />

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
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
                        variant="contained"
                        sx={{ fontWeight: "bold", textTransform: "none", color: "#FFF" }}
                        disableElevation={true}
                        startIcon={<AddIcon />}
                        onClick={handleOpenDialog}
                    >
                        Tạo Hợp Đồng
                    </Button>
                    {/* <CreatePayslipMainForm open={open} onClose={handleCloseDialog} /> */}
                </Grid>
            </Grid>

            <TableContainer component={Paper} className={cx("container")}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead className={cx("header")}>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>MSNV</TableCell>
                            {/* <TableCell align="center"  sx={{fontWeight: "bold"}}>Ảnh</TableCell> */}
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Tên NV</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Loại Hợp Đồng</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Loại Lương</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Lương Đóng Thuế</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Lương Thỏa Thuận</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Người Phụ Thuộc</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Bắt Đầu</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Kết Thúc</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Trạng Thái</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>TG Tạo</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>TG Thay Đổi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allContracts?.map(item => {
                            const date = new Date(item.changeAt);
                            const currentUserInfor = users.find(c => c.staffId === item.staffId);

                            return (
                                <TableRow
                                    key={item.contractId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" >
                                        <Typography
                                            sx={{ textDecoration: "none", color: "#000", fontSize: "14px" }}
                                            component={Link}
                                            to={`${item.contractId}/staffs/${item.staffId}`}>
                                            {item.contractId}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center" sx={{ textDecoration: "none", color: "#000" }}>
                                        <Typography
                                            sx={{ textDecoration: "none", color: "#000", fontSize: "14px" }}
                                            component={Link}
                                            to={`${item.contractId}/staffs/${item.staffId}`}>
                                            {item.staffId}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        {`${item.staff.lastName} ${item.staff.firstName}`}
                                    </TableCell>

                                    <TableCell align="center">
                                        <ChipCustome status="payment">
                                            {item.contractType.name}
                                        </ChipCustome>
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.salaryType}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.taxableSalary.toLocaleString()}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.salary.toLocaleString()}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.noOfDependences}
                                    </TableCell>
                                    <TableCell align="center">
                                        {moment(item.startDate).format("DD-MM-YYYY")}
                                    </TableCell>
                                    <TableCell align="center">
                                        {moment(item.endDate).format("DD-MM-YYYY")}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.contractStatus === true ? (
                                            <ChipCustome status="waiting">
                                                Hiệu Lực
                                            </ChipCustome>
                                        ) : (
                                            <ChipCustome status="rejected">
                                                Hết Hạn
                                            </ChipCustome>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        {moment(item.createAt).format("DD-MM-YYYY")}
                                    </TableCell>
                                    <TableCell align="center">
                                        {moment(item.changeAt).format("DD-MM-YYYY")}
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

export default ListContract;
