
import { SelectChangeEvent, Container, Typography, Grid, TextField, Autocomplete, Button, TableContainer, Paper, Table, TableHead, TableRow, TableBody, TableCell, styled, tableCellClasses, Chip } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';

import { BorderColor } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import MyCreateLeavetime from './MyCreateLeavetime';
import axios from 'axios';
import { LeaveLog } from '../../app/models/leaveLog';
import { CiCircleMore } from 'react-icons/ci';
import { FORMSTATUS } from '../../app/store/data';
import { Link } from 'react-router-dom';


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


function MyViewLeavetime() {

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


  // const rows = [
  //   createData("Nghỉ thai sản", "30/04/2023", '01/05/2023', "1", "...", "06/06/2023 18:00", "Từ chối", "09/09/2023 22:00", ""),
  //   createData("Nghỉ thai sản", "30/04/2023", '01/05/2023', "1", "...", "06/06/2023 18:00", "Chấp nhận", "09/09/2023 22:00", ""),
  //   createData("Nghỉ thai sản", "30/04/2023", '01/05/2023', "1", "...", "06/06/2023 18:00", "Chấp nhận", "09/09/2023 22:00", ""),
  //   createData("Nghỉ thai sản", "30/04/2023", '01/05/2023', "1", "...", "06/06/2023 18:00", "Chờ duyệt", "09/09/2023 22:00", ""),
  //   createData("Nghỉ thai sản", "30/04/2023", '01/05/2023', "1", "...", "06/06/2023 18:00", "Từ chối", "09/09/2023 22:00", ""),
  //   createData("Nghỉ thai sản", "30/04/2023", '01/05/2023', "1", "...", "06/06/2023 18:00", "Chờ duyệt", "09/09/2023 22:00", ""),
  //   createData("Nghỉ thai sản", "30/04/2023", '01/05/2023', "1", "...", "06/06/2023 18:00", "Từ chối", "09/09/2023 22:00", ""),





  // ];
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
  const [list, setList] = useState<LeaveLog[]>();
  axios.defaults.baseURL = "http://localhost:5000/api";
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("/log-leaves")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
   []);
  return (
    <>
      <Container>
        <Typography variant="h4" sx={headerStyle} style={styles}>
          Danh sách đơn nghỉ phép của tôi
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
                + Tạo đơn nghỉ phép
              </Button>
              <MyCreateLeavetime open={open} handleChange={handleChange} handleClose={handleClose} />
            </div>
          </Grid>
        </Grid>


        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Mã đơn</StyledTableCell>
                <StyledTableCell align="center">Loại đơn</StyledTableCell>
                <StyledTableCell align="center">Từ</StyledTableCell>
                <StyledTableCell align="center">Đến</StyledTableCell>
                <StyledTableCell align="center">Số ngày nghỉ</StyledTableCell>
                <StyledTableCell align="center">Lý do</StyledTableCell>
                <StyledTableCell align="center">Ngày tạo</StyledTableCell>
                <StyledTableCell align="center">Trạng thái</StyledTableCell>
                <StyledTableCell align="center">Ngày duyệt</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {list?.map((item) => (
                <StyledTableRow key={item.leaveLogId}>
                  <>
                    {/* <Link to="/detail-leave-log/:id"> */}
                      <StyledTableCell align="center">
                        {item.leaveLogId}
                      </StyledTableCell>
                      <StyledTableCell align="center">{item.leaveType.leaveTypeName}</StyledTableCell>
                      <StyledTableCell align="center">{item.leaveStart}</StyledTableCell>
                    <StyledTableCell align="center">{item.leaveEnd}</StyledTableCell>
                    <StyledTableCell align="center">{item.leaveDays}</StyledTableCell>
                    <StyledTableCell align="center">{item.description}</StyledTableCell>
                    <StyledTableCell align="center">{item.createAt}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip
                      label={item.status}
                      color={

                        item.status === 'Chấp nhận'
                          ? 'info'
                          : item.status === 'Chờ duyệt'
                            ? 'default' // or 'disabled' if you want a grayed-out color
                            : 'error'
                      }
                      sx={{ width: "92px" }}

                    />
                   
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.changeStatusTime}
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    <Button>
                    
                    <BorderColor />

                      {row.reply}
                      
                    </Button>
                    </StyledTableCell>
                  {/* <EditOtherTypes open={open} handleChange={handleChange} handleClose={handleClose} /> */}

                  {/* <StyledTableCell align="center"><Button color='error' onClick={handleClose}><DeleteIcon />{row.reply}</Button>


                  </StyledTableCell>
                   */} 

                  <StyledTableCell align="center">
                      <Button
                        component={Link}
                        to={`/detail-leave-log/${item.leaveLogId}`}
                      >
                         {item.status === FORMSTATUS.pending
                          ? <BorderColor />
                          
                          : <CiCircleMore style={{ fontSize:"30px", color:"black"}}/>
                      }
                     
                        {" "}
                        
                      </Button>
                    </StyledTableCell>
                  </>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default MyViewLeavetime;
