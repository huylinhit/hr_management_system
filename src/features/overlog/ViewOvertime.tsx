
import { ReactNode } from "react";

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SelectChangeEvent, Container, Grid, Button, Dialog, DialogTitle, DialogContent, Typography, FormControl, InputLabel, Select, 
    MenuItem, TextField, DialogActions, Autocomplete, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from "react";

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
    { label: "7", year: 1994 },``
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
                <Container sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid item xs={4}>
                        <div>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Tạo yêu cầu tăng ca
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle sx={headerStyle} color="primary" > Yêu cầu tăng ca</DialogTitle>
                                <DialogContent>
                                    <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={2}><Typography sx={headerStyle}>Loại tăng ca</Typography></Grid>
                                            <Grid item xs={10}><Grid item xs={10}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Không</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Tăng ca thường"
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value={10}>Không</MenuItem>
                                                        <MenuItem value={20}>Tang ca thuong</MenuItem>
                                                        <MenuItem value={30}>Khong thuong</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container >
                                        <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={2}><Typography sx={headerStyle}>Chọn ngày</Typography></Grid>
                                                <Grid item xs={10}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <Container>
                                                            <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
                                                        </Container>
                                                    </LocalizationProvider>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid container >
                                        <Grid item xs={12} sx={{ py: '8px', border: '4px' }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={2}><Typography sx={headerStyle}>Thời gian</Typography></Grid>
                                                <Grid item xs={10}><TextField id="outlined-basic" label="Outlined" variant="outlined" /></Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Tạo</Button>
                                    <Button onClick={handleClose}>Đóng</Button>
                                </DialogActions>
                            </Dialog>

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
