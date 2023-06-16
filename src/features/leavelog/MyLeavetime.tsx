import { Autocomplete, Button, Container, Grid, Paper, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, styled, tableCellClasses, } from "@mui/material";
import React from "react";
import { ReactNode } from "react";
import { BorderColor } from "@mui/icons-material";
import CreateLeavetime from "./CreateLeavetime";

const headerStyle = {
  fontWeight: "bold",
};
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


function LeavetimeList() {
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
    return { id, name, kind, to, from, times, reason, status, more };
  }
  const rows = [
    createData(1000001, 'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023", "09/09/2023", "1", "...", "Chờ duyệt", "Xem thêm"),
    createData(1000001, 'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023", "09/09/2023", "1", "...", "Chờ duyệt", "Xem thêm"),
    createData(1000001, 'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023", "09/09/2023", "1", "...", "Chờ duyệt", "Xem thêm"),
    createData(1000001, 'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023", "09/09/2023", "1", "...", "Chờ duyệt", "Xem thêm"),
    createData(1000001, 'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023", "09/09/2023", "1", "...", "Chờ duyệt", "Xem thêm"),
    createData(1000001, 'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023", "09/09/2023", "1", "...", "Chờ duyệt", "Xem thêm"),
    createData(1000001, 'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023", "09/09/2023", "1", "...", "Chờ duyệt", "Xem thêm"),
    createData(1000001, 'Nguyen Hong Ngoc', "Ngày lễ", "06/06/2023", "09/09/2023", "1", "...", "Chờ duyệt", "Xem thêm"),
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
          Danh sách đơn nghỉ phép
        </Typography>
        <Container>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid
              item
              xs={10}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <TextField label="Tìm kiếm..." />
              <Grid>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films}
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Loại" style={styles} />
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
                    <TextField {...params} label="Phòng" />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <div>
                <Button variant="contained" onClick={handleClickOpen}>
                  + Tạo đơn nghỉ phép
                </Button>
                <CreateLeavetime open={open} handleChange={handleChange} handleClose={handleClose} />
              </div>
            </Grid>
          </Grid>
        </Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Mã nhân viên</StyledTableCell>
                <StyledTableCell align="center">Tên nhân viên</StyledTableCell>
                <StyledTableCell align="center">Loại nghỉ phép</StyledTableCell>
                <StyledTableCell align="center">Từ</StyledTableCell>
                <StyledTableCell align="center">Đến</StyledTableCell>
                <StyledTableCell align="center">Số ngày nghỉ</StyledTableCell>
                <StyledTableCell align="center">Lý do</StyledTableCell>
                <StyledTableCell align="center">Trạng thái</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.kind}</StyledTableCell>
                  <StyledTableCell align="center">{row.to}</StyledTableCell>
                  <StyledTableCell align="center">{row.from}</StyledTableCell>
                  <StyledTableCell align="center">{row.times}</StyledTableCell>
                  <StyledTableCell align="center">{row.reason}</StyledTableCell>
                  <StyledTableCell align="center">{row.status}</StyledTableCell>
                  <StyledTableCell align="center"><BorderColor /></StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default LeavetimeList;
