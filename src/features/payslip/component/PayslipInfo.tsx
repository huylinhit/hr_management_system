import { Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@mui/material";

function PayslipInfo() {
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
                                Mã số nhân viên: 123123
                            </TableCell>
                            <TableCell
                                align="center"
                                component="th"
                                scope="row"
                                style={{ borderRight: '1px solid #e0e0e0', fontWeight: "bold" }}>
                                Mã số lương : 123123
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell
                                align="center"
                                style={{ borderRight: '1px solid #e0e0e0' }}>
                                Tên Nhân Viên: Nguyễn Huy Linh
                            </TableCell>
                            <TableCell
                                align="center"
                                component="th"
                                scope="row"
                                style={{ borderRight: '1px solid #e0e0e0' }}>
                                Chức danh: Quản lý
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        </>
    );
}

export default PayslipInfo;