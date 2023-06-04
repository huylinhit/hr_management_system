import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

const headerStyle = {
  fontWeight: "bold",
};

function LeavetimeList() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={headerStyle}>
              <TableCell>Tên Nhân viên</TableCell>
              <TableCell>Phòng ban</TableCell>
              <TableCell>Loại nghỉ phép</TableCell>
              <TableCell>Từ</TableCell>
              <TableCell>Đến</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Minh Hoang</TableCell>
              <TableCell>Phát triển sản phẩm</TableCell>
              <TableCell>Bệnh</TableCell>
              <TableCell>09/01/2023 19:00</TableCell>
              <TableCell>09/01/2023 22:00</TableCell>
              <TableCell>03:00</TableCell>
              <TableCell>Đang chờ</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default LeavetimeList;
