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
import React, { ReactNode } from "react";
import { BorderColor } from "@mui/icons-material";
import { CiCircleMore } from "react-icons/ci";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import CreateOvertime from "./CreateOvertime";
import { FORMSTATUS } from "../../app/store/data";

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

  const rows = [
    createData(
      "HR0001",
      1000001,
      "Nguyen Hong Ngoc",
      "Ngày lễ",
      "06/06/2023 18:00",
      "09/09/2023 22:00",
      "3:00",
      "...",
      "Từ chối",
      ""
    ),
    createData(
      "HR0002",
      1000001,
      "Nguyen Hong Ngoc",
      "Ngày lễ",
      "06/06/2023 18:00",
      "09/09/2023 22:00",
      "3:00",
      "...",
      "Chờ duyệt",
      ""
    ),
    createData(
      "HR0003",
      1000001,
      "Nguyen Hong Ngoc",
      "Ngày lễ",
      "06/06/2023 18:00",
      "09/09/2023 22:00",
      "3:00",
      "...",
      "Chấp nhận",
      ""
    ),
    createData(
      "HR0004",
      1000001,
      "Nguyen Hong Ngoc",
      "Ngày lễ",
      "06/06/2023 18:00",
      "09/09/2023 22:00",
      "3:00",
      "...",
      "Từ chối",
      ""
    ),
    createData(
      "HR0005",
      1000001,
      "Nguyen Hong Ngoc",
      "Ngày lễ",
      "06/06/2023 18:00",
      "09/09/2023 22:00",
      "3:00",
      "...",
      "Chờ duyệt",
      ""
    ),
    createData(
      "HR0006",
      1000001,
      "Nguyen Hong Ngoc",
      "Ngày lễ",
      "06/06/2023 18:00",
      "09/09/2023 22:00",
      "3:00",
      "...",
      "Chấp nhận",
      ""
    ),
    createData(
      "HR0007",
      1000001,
      "Nguyen Hong Ngoc",
      "Ngày lễ",
      "06/06/2023 18:00",
      "09/09/2023 22:00",
      "3:00",
      "...",
      "Từ chối",
      ""
    ),
  ];
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
  return (
    <>
      <Container sx={{ padding: "15px 0" }}>
        <Typography variant="h4" sx={headerStyle} style={styles}>
          Danh sách đơn làm thêm giờ
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
                sx={{ width: 200, margin: "0 5px"  }}
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
                sx={{ width: 200, margin: "0 5px"  }}
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
                  <StyledTableCell align="center">{row.to}</StyledTableCell>
                  <StyledTableCell align="center">{row.from}</StyledTableCell>
                  <StyledTableCell align="center">{row.times}</StyledTableCell>
                  <StyledTableCell align="center">{row.reason}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip
                      label={row.status}
                      color={
                        row.status === "Chấp nhận"
                          ? "info"
                          : row.status === "Chờ duyệt"
                          ? "default" // or 'disabled' if you want a grayed-out color
                          : "error"
                      }
                      sx={{ width: "92px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      // onClick={handleClickOpen}
                      component={Link}
                      to={`/detail-overtime-log/${row.Doid}`}
                    >
                      {row.status === FORMSTATUS.pending
                          ? <BorderColor />
                          : <CiCircleMore style={{ fontSize:"30px", color:"black"}}/>
                      }
                      {row.reply}
                    </Button>
                  </StyledTableCell>
                  {/* <EditOtherTypes open={open} handleChange={handleChange} handleClose={handleClose} /> */}

                  <StyledTableCell align="center">
                    <Button color="error" onClick={handleClose}>
                      <DeleteIcon />
                      {row.reply}
                    </Button>
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

export default ViewOvertimeLog;
