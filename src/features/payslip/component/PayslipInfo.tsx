import { Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@mui/material";
import { useAppSelector } from "../../../app/store/configureStore";
import { Staff } from "../../../app/models/staff";
import Contract from "../../../app/models/contract";


interface Props {
    staffInfor: Staff,
    payslipId: number,
    contract: Contract | undefined

}
function PayslipInfo({staffInfor, payslipId, contract}: Props) {

    //fecth Department để lấy chức danh quản lí phòng ban cụ thể nào
    return (
        <>
            <Typography align="center" variant="h5" fontWeight="bold" my="12px">Thông tin nhân viên</Typography>
            <Box display="flex" justifyContent="center">
                <Table sx={{width: "60%", justifyContent:"center"}} >
                    <TableHead sx={{ bgcolor: "#F2F2F2" }}>
                        <TableRow>
                            <TableCell
                                align="center"
                                component="th"
                                scope="row"
                                style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>
                                Mã số nhân viên: {staffInfor.staffId}
                            </TableCell>
                            <TableCell
                                align="center"
                                component="th"
                                scope="row"
                                style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>
                                Mã số lương : {payslipId}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell
                                align="center"
                                style={{ borderRight: '1px solid #e0e0e0' }}>
                                Tên Nhân Viên: {staffInfor.lastName} {staffInfor.firstName}
                            </TableCell>
                            <TableCell
                                align="center"
                                component="th"
                                scope="row"
                                style={{ borderRight: '1px solid #e0e0e0' }}>
                                Chức danh: {staffInfor.isManager === true || staffInfor.staffId === 2 ? "Quản lý" : "Nhân viên"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        </>
    );
}

export default PayslipInfo;