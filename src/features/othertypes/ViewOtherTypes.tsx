
import { SelectChangeEvent, Container, Typography, Grid, TextField, Autocomplete, Button, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, styled, tableCellClasses, Switch, Chip, makeStyles } from '@mui/material';
import React, { ReactNode } from 'react';
import { BorderColor, } from '@mui/icons-material';
import { CiCircleMore } from "react-icons/ci";
import CreateOtherTypes from './CreateOtherTypes';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { FORMSTATUS } from '../../app/store/data';


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



function ViewOtherTypes() {

    function createData(
        Doid: string,
        id: number,
        name: string,
        kind: string,
        content: string,
        times: string,
        status: string,
        reply: string,

    ) {
        return { Doid, id, name, kind, content, times, status, reply };
    }


    const rows = [
        createData("HR0001", 1000001, 'Nguyen Hong Ngoc', "Đơn khác", "...", "09/09/2023 22:00", "Chờ duyệt", ""),
        createData("HR0002", 1000001, 'Nguyen Hong Ngoc', "Đơn khác", "...", "09/09/2023 22:00", "Chấp nhận", ""),
        createData("HR0003", 1000001, 'Nguyen Hong Ngoc', "Đơn khác", "...", "09/09/2023 22:00", "Từ chối", ""),
        createData("HR0004", 1000001, 'Nguyen Hong Ngoc', "Đơn khác", "...", "09/09/2023 22:00", "Chờ duyệt", ""),
        createData("HR0005", 1000001, 'Nguyen Hong Ngoc', "Đơn khác", "...", "09/09/2023 22:00", "Chấp nhận", ""),
        createData("HR0006", 1000001, 'Nguyen Hong Ngoc', "Đơn khác", "...", "09/09/2023 22:00", "Từ chối", ""),
        createData("HR0007", 1000001, 'Nguyen Hong Ngoc', "Đơn khác", "...", "09/09/2023 22:00", "Chờ duyệt", ""),





    ];
    const styles = {
        marginBottom: '10px',
    };


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
            <Container sx={{ padding: "15px 0" }}>
                <Typography variant="h4" sx={headerStyle} style={styles}>
                    Danh sách đơn khác
                </Typography>
                
                    <Grid sx={{ display: "flex", justifyContent: "space-between", padding: " 20px 0 5px 0" }}>
                        <Grid
                            item
                            xs={10}
                            sx={{ display: "flex", justifyContent: "space-between" }}
                        >
                            <Grid sx={{ margin: "0 5px" }}>
              <TextField size="small" label="Tìm kiếm..." />
            </Grid>

                            <Grid>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    sx={{width: 200, margin: "0 5px" }}
                                    renderInput={(params) => (
                                        <TextField {...params} size= 'small' label="Loại" style={styles} />
                                    )}
                                />
                            </Grid>
                            <Grid>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    sx={{ width: 200, margin: "0 5px" }}
                                    renderInput={(params) => (
                                        <TextField {...params} size= 'small' label="Phòng" />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={10}>

                            <Button variant="contained" onClick={handleClickOpen}>
                                + Tạo đơn
                            </Button>
                            <CreateOtherTypes open={open} handleChange={handleChange} handleClose={handleClose} />

                        </Grid>
                    </Grid>
               

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Mã đơn</StyledTableCell>
                                <StyledTableCell align="center">Mã nhân viên</StyledTableCell>
                                <StyledTableCell align="center">Tên nhân viên</StyledTableCell>
                                <StyledTableCell align="center">Loại đơn</StyledTableCell>
                                <StyledTableCell align="center">Nội dung</StyledTableCell>
                                <StyledTableCell align="center">Ngày tạo đơn</StyledTableCell>
                                <StyledTableCell align="center">Trạng thái</StyledTableCell>
                                <StyledTableCell align="center">Phản hồi</StyledTableCell>
                                <StyledTableCell align="center">Xóa</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.Doid}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.Doid}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.kind}</StyledTableCell>
                                    <StyledTableCell align="center">{row.content}</StyledTableCell>
                                    <StyledTableCell align="center">{row.times}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Chip
                                            label={row.status}
                                            color={
                                                row.status === FORMSTATUS.agree
                                                ? "info"
                                                : row.status === FORMSTATUS.pending
                                                ? "default" // or 'disabled' if you want a grayed-out color
                                                : "error"
                                            }
                                            sx={{width: "92px"}}

                                        />

                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button
                                            // onClick={handleClickOpen}
                                            component={Link}
                                            to={`/editothertype/${row.Doid}`}
                                        >
                                            {row.status === FORMSTATUS.pending
                          ? <BorderColor />
                          : <CiCircleMore style={{ fontSize:"30px", color:"black"}}/>
                      }
                                            {row.reply}

                                        </Button>
                                    </StyledTableCell>
                                    {/* <EditOtherTypes open={open} handleChange={handleChange} handleClose={handleClose} /> */}

                                    <StyledTableCell align="center"><Button color='error' onClick={handleClose}><DeleteIcon />{row.reply}</Button>


                                    </StyledTableCell>


                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}

export default ViewOtherTypes;



