import {
  Grid,
  Button,
  Typography,
  TextField,
  Autocomplete,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  tableCellClasses,
} from "@mui/material";

import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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

function EmployeeList() {
  function createData(
    msnv: string,
    name: string,
    kind: string,
    to: string,
    from: string,
    times: string,
    reason: string,
    status: string
  ) {
    return { msnv, name, kind, to, from, times, reason, status };
  }

  const rows = [
    createData(
      "NV01",
      "Nguyễn Hồng Ngọc",
      "Ngày lễ",
      "0123456789",
      "Nữ",
      "dchau@gmail.com",
      "...",
      "chờ duyệt"
    ),
    createData(
      "NV01",
      "Nguyễn Hồng Ngọc",
      "Ngày lễ",
      "0123456789",
      "Nữ",
      "dchau@gmail.com",
      "...",
      "chờ duyệt"
    ),
    createData(
      "NV01",
      "Nguyễn Hồng Ngọc",
      "Ngày lễ",
      "0123456789",
      "Nữ",
      "dchau@gmail.com",
      "...",
      "chờ duyệt"
    ),
    createData(
      "NV01",
      "Nguyễn Hồng Ngọc",
      "Ngày lễ",
      "0123456789",
      "Nữ",
      "dchau@gmail.com",
      "...",
      "chờ duyệt"
    ),
    createData(
      "NV01",
      "Nguyễn Hồng Ngọc",
      "Ngày lễ",
      "0123456789",
      "Nữ",
      "dchau@gmail.com",
      "...",
      "chờ duyệt"
    ),
    createData(
      "NV01",
      "Nguyễn Hồng Ngọc",
      "Ngày lễ",
      "0123456789",
      "Nữ",
      "dchau@gmail.com",
      "...",
      "chờ duyệt"
    ),
    createData(
      "NV01",
      "Nguyễn Hồng Ngọc",
      "Ngày lễ",
      "0123456789",
      "Nữ",
      "dchau@gmail.com",
      "...",
      "chờ duyệt"
    ),
    createData(
      "NV01",
      "Nguyễn Hồng Ngọc",
      "Ngày lễ",
      "0123456789",
      "Nữ",
      "dchau@gmail.com",
      "...",
      "chờ duyệt"
    ),
    createData(
      "NV01",
      "Nguyễn Hồng Ngọc",
      "Ngày lễ",
      "0123456789",
      "Nữ",
      "dchau@gmail.com",
      "...",
      "chờ duyệt"
    ),
    createData(
      "NV01",
      "Nguyễn Hồng Ngọc",
      "Ngày lễ",
      "0123456789",
      "Nữ",
      "dchau@gmail.com",
      "...",
      "chờ duyệt"
    ),
  ];

  return (
    <>
      <Typography variant="h4" sx={headerStyle}>
        Danh sách nhân viên
      </Typography>
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
              renderInput={(params) => <TextField {...params} label="Loại" />}
            />
          </Grid>
          <Grid>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Phòng" />}
            />
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Link to="/firststep">
            {" "}
            <Button variant="contained"> + Thêm nhân viên mới</Button>{" "}
          </Link>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ background: "black" }}>
              <StyledTableCell sx={{ color: "white" }} align="center">
                MSNV
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="center">
                Hình ảnh
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="center">
                Tên
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="center">
                Số điện thoại
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="center">
                Giới tính
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="center">
                Mail
              </StyledTableCell>

              <StyledTableCell sx={{ color: "white" }} align="center">
                Xóa
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white" }} align="center">
                Xem thêm
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.msnv}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.msnv}
                </StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.to}</StyledTableCell>
                <StyledTableCell align="center">{row.from}</StyledTableCell>
                <StyledTableCell align="center">{row.times}</StyledTableCell>

                <StyledTableCell align="center">
                  <Button color="error">
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button sx={{ color: "black" }}>
                    <MoreHorizIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default EmployeeList;
