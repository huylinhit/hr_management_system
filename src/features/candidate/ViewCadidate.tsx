

import { SelectChangeEvent, Container, Typography, Grid, TextField, Autocomplete, Button, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, styled, tableCellClasses, Chip } from '@mui/material';
import React, { ReactNode } from 'react';
import { BorderColor } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
 

const headerStyle = {
  fontWeight: "bold",
};
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function ViewCandidate() {
 
    function createData(
        igm: string,
        name: string,
        gender: string,
        position: string,
        mail: string,
        phone: number,
        status: string,
        reply: string,

    ) {
        return { igm, name, gender, position, mail, phone, status, reply };
    }


    const rows = [
        createData("", 'Nguyen Hong Ngoc', "Nữ", "Android Trainee", "hoangvm@gmail.com", 123456789, "Đạt", ""),
        createData("", 'Nguyen Hong Ngoc', "Nữ", "Android Trainee", "hoangvm@gmail.com", 123456789, "Đạt", ""),
        createData("", 'Nguyen Hong Ngoc', "Nữ", "Android Trainee", "hoangvm@gmail.com", 123456789, "Không đạt", ""),
        createData("", 'Nguyen Hong Ngoc', "Nữ", "Android Trainee", "hoangvm@gmail.com", 123456789, "Không đạt", ""),
        createData("", 'Nguyen Hong Ngoc', "Nữ", "Android Trainee", "hoangvm@gmail.com", 123456789, "Đạt", ""),
        createData("", 'Nguyen Hong Ngoc', "Nữ", "Android Trainee", "hoangvm@gmail.com", 123456789, "Đạt", ""),
        createData("", 'Nguyen Hong Ngoc', "Nữ", "Android Trainee", "hoangvm@gmail.com", 123456789, "Không đạt", ""),
        createData("", 'Nguyen Hong Ngoc', "Nữ", "Android Trainee", "hoangvm@gmail.com", 123456789, "Không đạt", ""),




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
            <Container>
                <Typography variant="h4" sx={headerStyle} style={styles}>
                    Danh sách ứng viên
                </Typography>
                <Grid >
                    <Grid
                        item
                        xs={10}
                        sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <TextField
                            size='small'
                            label="Tìm kiếm..." />
                        <Grid item xs={10} >
                            
                                <Button 
                                sx={{ borderRadius: '40px' }}
                                variant="contained" 
                                onClick={handleClickOpen} 
                                style={styles}
                                component={Link}
                                to="/createcandidate/"
                                >
                                    + Thêm nhân viên mới
                                </Button>

                           
                        </Grid>
                    </Grid>
                </Grid>
                <TableContainer component={Paper} sx={{ borderRadius: '20px' }}>
 
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="center">Tên nhân viên</StyledTableCell>
                <StyledTableCell align="center">Giới tính</StyledTableCell>
                <StyledTableCell align="center">Vị trí</StyledTableCell>
                <StyledTableCell align="center">Mail</StyledTableCell>
                <StyledTableCell align="center">Số điện thoại</StyledTableCell>
                <StyledTableCell align="center">Kết quả</StyledTableCell>
                <StyledTableCell align="center">Xem thêm</StyledTableCell>
                <StyledTableCell align="center">Xóa</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.igm}>
                  <StyledTableCell component="th" scope="row">
                    {row.igm}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.gender}</StyledTableCell>
                  <StyledTableCell align="center">{row.position}</StyledTableCell>
                  <StyledTableCell align="center">{row.mail}</StyledTableCell>
                  <StyledTableCell align="center">{row.phone}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip
                      label={row.status}
                      color={
                        row.status === "Đạt"
                          ? "success"
                          : row.status === "Không đạt"
                          ? "error" // or 'disabled' if you want a grayed-out color
                          : "error"
                      }
                      sx={{ width: "92px" }}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Button
                      // onClick={handleClickOpen}
                      component={Link}
                      to="/detailcandidate/"
                    >
                      <BorderColor /> {row.reply}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <DeleteIcon />
                  </StyledTableCell>
                  {/* <EditOtherTypes open={open} handleChange={handleChange} handleClose={handleClose} /> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default ViewCandidate;
