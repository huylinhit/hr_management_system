
import { SelectChangeEvent, Container, Typography, Grid, TextField, Autocomplete, Button, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, styled, tableCellClasses, Chip } from '@mui/material';
import React, { ReactNode } from 'react';

import { BorderColor } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import MyCreateOT from './MyCreateOT';

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


function MyViewOvertime() {

  function createData(

    kind: string,
    to: string,
    from: string,
    times: string,
    reason: string,
    create: string,
    status: string,
    appr: string,
    reply: ReactNode,

  ) {
    return { kind, to, from, times, reason, create, status, appr, reply };
  }


  const rows = [
    createData("Ngày lễ", "30/04/2023", '01/05/2023', "3 giờ", "...", "06/06/2023 18:00", "Từ chối", "09/09/2023 22:00", ""),
    createData("Ngày lễ", "30/04/2023", '01/05/2023', "3 giờ", "...", "06/06/2023 18:00", "Từ chối", "09/09/2023 22:00", ""),
    createData("Ngày lễ", "30/04/2023", '01/05/2023', "3 giờ", "...", "06/06/2023 18:00", "Chấp nhận", "09/09/2023 22:00", ""),
    createData("Ngày lễ", "30/04/2023", '01/05/2023', "3 giờ", "...", "06/06/2023 18:00", "Chờ duyệt", "09/09/2023 22:00", ""),
    createData("Ngày lễ", "30/04/2023", '01/05/2023', "3 giờ", "...", "06/06/2023 18:00", "Từ chối", "09/09/2023 22:00", ""),
    createData("Ngày lễ", "30/04/2023", '01/05/2023', "3 giờ", "...", "06/06/2023 18:00", "Chấp nhận", "09/09/2023 22:00", ""),
    createData("Ngày lễ", "30/04/2023", '01/05/2023', "3 giờ", "...", "06/06/2023 18:00", "Chờ duyệt", "09/09/2023 22:00", ""),





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
          Danh sách đơn làm thêm giờ của tôi
        </Typography>
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid
            item
            xs={10}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <TextField
              size='small'
              label="Tìm kiếm..." />
            <Grid>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} size='small' label="Loại" style={styles} />
                )}
              />
            </Grid>
            <Grid>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} size='small' label="Phòng" />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <div>
              <Button variant="contained" onClick={handleClickOpen}>
                + Tạo đơn tăng ca
              </Button>
              <MyCreateOT open={open} handleChange={handleChange} handleClose={handleClose} />
            </div>
          </Grid>
        </Grid>


        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 1000 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Loại tăng ca</StyledTableCell>
                <StyledTableCell align="center">Từ</StyledTableCell>
                <StyledTableCell align="center">Đến</StyledTableCell>
                <StyledTableCell align="center">Số giờ làm</StyledTableCell>
                <StyledTableCell align="center">Lý do</StyledTableCell>
                <StyledTableCell align="center">Ngày tạo</StyledTableCell>
                <StyledTableCell align="center">Trạng thái</StyledTableCell>
                <StyledTableCell align="center">Ngày duyệt</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.kind}>
                  <StyledTableCell component="th" scope="row">
                    {row.kind}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.to}</StyledTableCell>
                  <StyledTableCell align="center">{row.from}</StyledTableCell>
                  <StyledTableCell align="center">{row.times}</StyledTableCell>
                  <StyledTableCell align="center">{row.reason}</StyledTableCell>
                  <StyledTableCell align="center">{row.create}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip
                      label={row.status}
                      color={

                        row.status === 'Chấp nhận'
                          ? 'info'
                          : row.status === 'Chờ duyệt'
                            ? 'default' // or 'disabled' if you want a grayed-out color
                            : 'error'
                      }
                      sx={{ width: "92px" }}

                    />
                   
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.appr}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button>
                    <BorderColor />
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

export default MyViewOvertime;
