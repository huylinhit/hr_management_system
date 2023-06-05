import { Autocomplete, Button, Container, Grid, List, ListItem, Paper, TextField, Typography } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from "react-router-dom";

const top100Films = [
    { label: "1", year: 1994 },
    { label: "2", year: 1972 },
    { label: "3", year: 1974 },
    { label: "4", year: 2008 },
    { label: "5", year: 1957 },
    { label: "6", year: 1993 },
    { label: "7", year: 1994 },
  ];
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
        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item xs={4}>
            <Button>Tạo đơn nghỉ phép</Button>
          </Grid>

          <Grid item xs={4}>
            <Button variant="contained" sx={{ width: 200 }}>
              Tìm kiếm
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Loại" />}
            />
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Phòng" />}
            />
          </Grid>
        </Container>

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