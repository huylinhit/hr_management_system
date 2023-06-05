import { Button, Container, Grid, List, ListItem, Paper, Typography } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



function ViewOvertimeLog() {
    function createData(
        name: string,
        department: string,
        kind: string,
        to: string,
        from: string,
        times: string,
        status: string,
    ) {
        return { name, department, kind, to, from, times, status };
    }

    const rows = [
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
        createData('Minh Hoang', "Phát triển sản phẩm", "Bệnh", "09/01/2023 19:00", "09/01/2023 22:00", "3:00", "Đang chờ"),
    ];
    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                        <Grid container sx={{ mr: "0px", display: "flex" }}>

                            <Grid item xs={4}>
                                <Button  >Tạo đơn nghỉ phép</Button>
                            </Grid>

                            <Grid item xs={4}>
                                <Button variant="contained" sx={{ width: '100px' }}>Tìm kiếm</Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button>Loại</Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button>Phòng ban</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên nhân viên</TableCell>
                                <TableCell align="right">Phòng ban</TableCell>
                                <TableCell align="right">Loại nghỉ phép</TableCell>
                                <TableCell align="right">Từ</TableCell>
                                <TableCell align="right">Đến</TableCell>
                                <TableCell align="right">Thời gian</TableCell>
                                <TableCell align="right">Trạng thái</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.department}</TableCell>
                                    <TableCell align="right">{row.kind}</TableCell>
                                    <TableCell align="right">{row.to}</TableCell>
                                    <TableCell align="right">{row.from}</TableCell>
                                    <TableCell align="right">{row.times}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                
                                    </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>
            </Container>
        </>
    );
}

export default ViewOvertimeLog;