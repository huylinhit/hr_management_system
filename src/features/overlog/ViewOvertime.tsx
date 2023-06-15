import * as React from 'react';
import { ReactNode } from "react";
import {
    SelectChangeEvent, Container, Grid, Button, Dialog, DialogTitle, DialogContent, Typography, FormControl, InputLabel, Select,
    MenuItem, TextField, DialogActions, Autocomplete, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, styled, tableCellClasses
} from '@mui/material';
import CreateOvertime from './CreateOvertime';

const headerStyle = {
    fontWeight: 'bold'
}

const top100Films = [
    { label: "1", year: 1994 },
    { label: "2", year: 1972 },
    { label: "3", year: 1974 },
    { label: "4", year: 2008 },
    { label: "5", year: 1957 },
    { label: "6", year: 1993 },
    { label: "7", year: 1994 }, ``
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function ViewOvertimeLog() {

    function createData(
        id: number,
        name: string,
        kind: string,
        to: string,
        from: string,
        times: string,
        reason: string,
        status: string,
        more: ReactNode,

    ) {
        return {id, name, kind, to, from, times, reason, status, more };
    }


    const rows = [
        createData(1000001,'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023 18:00", "09/09/2023 22:00", "3:00", "...", "Chờ duyệt","Xem thêm"),
        createData(1000001,'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023 18:00", "09/09/2023 22:00", "3:00", "...", "Chờ duyệt","Xem thêm"),        
        createData(1000001,'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023 18:00", "09/09/2023 22:00", "3:00", "...", "Chờ duyệt","Xem thêm"),        
        createData(1000001,'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023 18:00", "09/09/2023 22:00", "3:00", "...", "Chờ duyệt","Xem thêm"),        
        createData(1000001,'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023 18:00", "09/09/2023 22:00", "3:00", "...", "Chờ duyệt","Xem thêm"),       
        createData(1000001,'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023 18:00", "09/09/2023 22:00", "3:00", "...", "Chờ duyệt","Xem thêm"), 
        createData(1000001,'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023 18:00", "09/09/2023 22:00", "3:00", "...", "Chờ duyệt","Xem thêm"),
        createData(1000001,'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023 18:00", "09/09/2023 22:00", "3:00", "...", "Chờ duyệt","Xem thêm"),
        createData(1000001,'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023 18:00", "09/09/2023 22:00", "3:00", "...", "Chờ duyệt","Xem thêm"),       

        



    ];

    function handleChange(event: SelectChangeEvent<unknown>, child: ReactNode): void {

    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Container>
            <Typography variant="h4" sx={headerStyle}>
          Danh sách đơn làm thêm giờ
        </Typography>
                <Container sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid item xs={4}>
                        <div>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Tạo yêu cầu tăng ca
                            </Button>
                            <CreateOvertime open={open} handleChange={handleChange} handleClose={handleClose} />
                        </div>
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
                            sx={{ width: 200,   }}
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
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Mã nhân viên</StyledTableCell>
                                <StyledTableCell align="right">Tên nhân viên</StyledTableCell>
                                <StyledTableCell align="right">Loại tăng ca</StyledTableCell>
                                <StyledTableCell align="right">Từ</StyledTableCell>
                                <StyledTableCell align="right">Đến</StyledTableCell>
                                <StyledTableCell align="right">Thời gian</StyledTableCell>
                                <StyledTableCell align="right">Lý do</StyledTableCell>
                                <StyledTableCell align="right">Trạng thái</StyledTableCell>
                                <StyledTableCell align="right">Xem thêm</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.name}</StyledTableCell>
                                    <StyledTableCell align="right">{row.kind}</StyledTableCell>
                                    <StyledTableCell align="right">{row.to}</StyledTableCell>
                                    <StyledTableCell align="right">{row.from}</StyledTableCell>
                                    <StyledTableCell align="right">{row.times}</StyledTableCell>
                                    <StyledTableCell align="right">{row.reason}</StyledTableCell>
                                    <StyledTableCell align="right">{row.status}</StyledTableCell>
                                    <StyledTableCell align="right">{row.more}</StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}

export default ViewOvertimeLog;
