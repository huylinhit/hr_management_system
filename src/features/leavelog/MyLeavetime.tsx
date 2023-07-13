import {
  Autocomplete,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import { BorderColor } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CiCircleMore } from "react-icons/ci";
import { Link } from "react-router-dom";
import CreateLeavetime from "./CreateLeavetime";
import { FORMSTATUS } from "../../app/store/data";
import axios from "axios";
import { LeaveLog } from "../../app/models/leaveLog";
import { LeaveType } from "../../app/models/leaveType";

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
  { label: "7", year: 1994 },
  ``,
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function LeavetimeList() {
  function createData(
    Doid: string,
    id: number,
    name: string,
    kind: string,
    to: string,
    from: string,
    times: string,
    reason: string,
    status: string,
    reply: ReactNode
  ) {
    return { Doid, id, name, kind, to, from, times, reason, status, reply };
  }

  const styles = {
    marginBottom: "10px",
  };

  function handleChange(
    event: SelectChangeEvent<unknown>,
    child: ReactNode
  ): void { }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // call api
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
      <Container sx={{ padding: "15px 0" }}>
        <Typography variant="h4" sx={headerStyle} style={styles}>
          Danh sách đơn nghỉ phép
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
                sx={{ width: 200, margin: "0 5px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Loại"
                    style={styles}
                  />
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
                  <TextField {...params} size="small" label="Phòng" />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <div>
              <Button variant="contained" onClick={handleClickOpen}>
                + Tạo đơn nghỉ phép
              </Button>
              <CreateLeavetime
                open={open}
                handleChange={handleChange}
                handleClose={handleClose}
              />
            </div>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Mã đơn</StyledTableCell>
                <StyledTableCell align="center">Mã nhân viên</StyledTableCell>
                <StyledTableCell align="center">Tên nhân viên</StyledTableCell>
                <StyledTableCell align="center">Loại nghỉ phép</StyledTableCell>
                <StyledTableCell align="center">Từ</StyledTableCell>
                <StyledTableCell align="center">Đến</StyledTableCell>
                <StyledTableCell align="center">Số ngày nghỉ</StyledTableCell>
                <StyledTableCell align="center">Lý do</StyledTableCell>
                <StyledTableCell align="center">Trạng thái</StyledTableCell>
                <StyledTableCell align="center">Phản hồi</StyledTableCell>
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
                    {/* </Link> */}


                    <StyledTableCell align="center">{item.staffId}</StyledTableCell>
                    <StyledTableCell align="center">{item.staff.firstName}</StyledTableCell>
                    <StyledTableCell align="center">{item.leaveType.leaveTypeName}</StyledTableCell>
                    <StyledTableCell align="center">{item.leaveStart}</StyledTableCell>
                    <StyledTableCell align="center">{item.leaveEnd}</StyledTableCell>
                    <StyledTableCell align="center">{item.leaveDays}</StyledTableCell>
                    <StyledTableCell align="center">{item.description}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Chip
                        label={item.status}
                        color={
                          item.status === FORMSTATUS.agree
                            ? "info"
                            : item.status === FORMSTATUS.pending
                              ? "default" // or 'disabled' if you want a grayed-out color
                              : "error"
                        }
                        sx={{ width: "92px" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">{item.processNote}</StyledTableCell>
                    <StyledTableCell align="center">

                      {item.status === FORMSTATUS.pending

                        ? <Button
                          component={Link}
                          to={`/detail-leave-log/${item.leaveLogId}`}
                      
                        >

                          <BorderColor />
                        </Button>

                        : <Button
                          component={Link}
                          to={`/detail-own-leave-log/${item.leaveLogId}`}
                        >
                          <CiCircleMore style={{ fontSize: "30px", color: "black" }} />
                        </Button>
                      }
                      {" "}

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

export default LeavetimeList;
