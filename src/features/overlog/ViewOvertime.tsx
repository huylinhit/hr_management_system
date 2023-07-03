import {
  SelectChangeEvent,
  Container,
  Typography,
  Grid,
  TextField,
  Autocomplete,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  styled,
  tableCellClasses,
  Chip,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { BorderColor } from "@mui/icons-material";
import { CiCircleMore } from "react-icons/ci";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import CreateOvertime from "./CreateOvertime";
import { FORMSTATUS } from "../../app/store/data";
import { Root } from "react-dom/client";
import axios from "axios";
import React from "react";
import { LogOt } from "../../app/models/logOt";

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

function ViewOvertimeLog() {
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

  // const rows = [
  //   createData(
  //     "HR0001",
  //     1000001,
  //     "Nguyen Hong Ngoc",
  //     "Ngày lễ",
  //     "06/06/2023 18:00",
  //     "09/09/2023 22:00",
  //     "3:00",
  //     "...",
  //     "Từ chối",
  //     ""
  //   ),
  //   createData(
  //     "HR0002",
  //     1000001,
  //     "Nguyen Hong Ngoc",
  //     "Ngày lễ",
  //     "06/06/2023 18:00",
  //     "09/09/2023 22:00",
  //     "3:00",
  //     "...",
  //     "Chờ duyệt",
  //     ""
  //   ),
  //   createData(
  //     "HR0003",
  //     1000001,
  //     "Nguyen Hong Ngoc",
  //     "Ngày lễ",
  //     "06/06/2023 18:00",
  //     "09/09/2023 22:00",
  //     "3:00",
  //     "...",
  //     "Chấp nhận",
  //     ""
  //   ),
  //   createData(
  //     "HR0004",
  //     1000001,
  //     "Nguyen Hong Ngoc",
  //     "Ngày lễ",
  //     "06/06/2023 18:00",
  //     "09/09/2023 22:00",
  //     "3:00",
  //     "...",
  //     "Từ chối",
  //     ""
  //   ),
  //   createData(
  //     "HR0005",
  //     1000001,
  //     "Nguyen Hong Ngoc",
  //     "Ngày lễ",
  //     "06/06/2023 18:00",
  //     "09/09/2023 22:00",
  //     "3:00",
  //     "...",
  //     "Chờ duyệt",
  //     ""
  //   ),
  //   createData(
  //     "HR0006",
  //     1000001,
  //     "Nguyen Hong Ngoc",
  //     "Ngày lễ",
  //     "06/06/2023 18:00",
  //     "09/09/2023 22:00",
  //     "3:00",
  //     "...",
  //     "Chấp nhận",
  //     ""
  //   ),
  //   createData(
  //     "HR0007",
  //     1000001,
  //     "Nguyen Hong Ngoc",
  //     "Ngày lễ",
  //     "06/06/2023 18:00",
  //     "09/09/2023 22:00",
  //     "3:00",
  //     "...",
  //     "Từ chối",
  //     ""
  //   ),
  // ];
  const styles = {
    marginBottom: "10px",
  };

  function handleChange(
    event: SelectChangeEvent<unknown>,
    child: ReactNode
  ): void {}
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //call api

  const [list, setList] = useState<LogOt[]>();

  axios.defaults.baseURL = "http://localhost:5000/api";
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("/logots")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // call api
  return (
    <>
      {/* <Container sx={{ px: "50px" }}> */}
      <Typography variant="h4" sx={headerStyle} style={styles}>
        Danh sách đơn làm thêm giờ
      </Typography>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: " 20px 0 5px 0",
        }}
      >
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
              + Tạo đơn tăng ca
            </Button>
            <CreateOvertime
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
              <StyledTableCell align="center">Loại tăng ca</StyledTableCell>
              <StyledTableCell align="center">Từ</StyledTableCell>
              <StyledTableCell align="center">Đến</StyledTableCell>
              <StyledTableCell align="center">Thời gian</StyledTableCell>
              <StyledTableCell align="center">Lý do</StyledTableCell>
              <StyledTableCell align="center">Trạng thái</StyledTableCell>
              <StyledTableCell align="center">Phản hồi</StyledTableCell>
              <StyledTableCell align="center">Chỉnh sửa</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((item) => (
              <StyledTableRow key={item.otLogId}>
                <>
                  <Link to="/detail-overtime-log/:id">
                    <StyledTableCell align="center">
                      {item.otLogId}
                    </StyledTableCell>
                  </Link>

                  <StyledTableCell align="center">
                    {item.staffId}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.staff.firstName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.otType.typeName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.logStart}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {item.logEnd}
                  </StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>

                  <StyledTableCell align="center">
                    {item.reason}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip
                      label={item.status}
                      color={
                        item.status === FORMSTATUS.agree
                          ? "info"
                          : item.status === FORMSTATUS.pending
                          ? "default"
                          : "error"
                      }
                      sx={{ width: "92px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.processNote}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Button component={Link} to={`/detail-overtime-log/${item.otLogId}`}>
                      {" "}
                      Chỉnh sửa
                    </Button>
                  </StyledTableCell>
                </>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </Container> */}
    </>
  );
}

export default ViewOvertimeLog;
