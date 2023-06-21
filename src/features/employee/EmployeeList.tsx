import { ReactNode } from "react";

import { LocalizationProvider, heIL } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import {
  SelectChangeEvent,
  Container,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  DialogActions,
  Autocomplete,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import React from "react";
import { BorderColor } from "@mui/icons-material";
import { Link } from "react-router-dom";

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
       
            <Link to="/firststep">    <Button variant="contained"> + Thêm nhân viên mới</Button> </Link>
          
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: "10px" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ background: "black" }}>
              <TableCell sx={{ color: "white" }} align="center">
                MSNV
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Hình ảnh
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Tên
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Số điện thoại
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Giới tính
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Mail
              </TableCell>

              <TableCell sx={{ color: "white" }} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.msnv}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.msnv}
                </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.to}</TableCell>
                <TableCell align="center">{row.from}</TableCell>
                <TableCell align="center">{row.times}</TableCell>

                <TableCell align="center">
                  <BorderColor />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default EmployeeList;
