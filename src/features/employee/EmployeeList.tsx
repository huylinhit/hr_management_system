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
  Container,
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

 export default function EmployeeList() {
  // -------------------------- VAR -----------------------------
  const tableHeadTitle = [
    "MSNV",
    "Hình ảnh",
    "Tên",
    "Số điện thoại",
    "Giới tính",
    "Mail",
    "Xóa",
    "Xem thêm",
  ];
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  function createData(
    msnv: string,
    image: string,
    name: string,
    kind: string,
    to: string,
    from: string,
    time: string,
    reason: string,
    status: string
  ) {
    return { msnv, image, name, kind, to, from, time, reason, status };
  }
  // -------------------------- MAIN ----------------------------

  const rows = [
    createData(
      "NV01",
      "abc",
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
    <Container sx={{ padding: "15px 0" }}>
      <Typography variant="h4" sx={headerStyle}>
        Danh sách nhân viên
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
          <Grid sx={{ margin: "0 5px", backgroundColor: "#FFFFFF" }}>
            <TextField size="small" label="Tìm kiếm..." />
          </Grid>

          <Grid>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              options={top100Films}
              sx={{ width: 200, margin: "0 5px", backgroundColor: "#FFFFFF" }}
              renderInput={(params) => (
                <TextField {...params} label="Phòng ban" />
              )}
            />
          </Grid>
        </Grid>
        <Grid item xs={10}>
          {/* <Link to="/firststep"> */}
            <Button variant="contained" component={Link}
                    to="/create-new-employee"> + Thêm nhân viên mới</Button>
          {/* </Link> */}
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">

          <TableHead>
            <TableRow sx={{ background: "black" }}>
              {tableHeadTitle.map((title) => (
                <StyledTableCell sx={{ color: "white", fontSize: "15px" }} align="center">
                  {title}
                </StyledTableCell>
              ))}
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
                <StyledTableCell align="center">{row.time}</StyledTableCell>

                <StyledTableCell align="center">
                  <Button color="error">
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button
                    sx={{ color: "black" }}
                    component={Link}
                    to={`/detail-employee/${row.msnv}`}
                  >
                    <MoreHorizIcon />
                  </Button>
                </StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
