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
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { employeeSelectors, fetchEmployeesAsync } from "../../app/store/employee/employeeSlice";
import { UserInfor } from "../../app/models/userInfor";
import DeleteDialog from "./component/DeleteDialog";
import moment from "moment";
import { CiCircleMore } from "react-icons/ci";
import ChipCustome from "../../app/components/Custom/Chip/ChipCustome";
import styles from '../payslip/component/payslip.module.scss';
import classNames from "classnames/bind";
import { deepOrange } from "@mui/material/colors";
import { Height } from "@mui/icons-material";

const cx = classNames.bind(styles);

const top100Films = [
  { label: "1", year: 1994 },
  ``,
];

export default function EmployeeList() {
  // -------------------------- VAR -----------------------------
  const dispatch = useAppDispatch();
  const tableHeadTitle = [
    "MSNV",
    "Hình ảnh",
    "Tên",
    "Số điện thoại",
    "Mail",
    "Chức danh",
    "Trạng thái",
    "Giới tính",
    "Sinh nhật",
    "Xóa",
    "Xem thêm",
  ];
  // -------------------------- STATE ---------------------------
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [employeeDeleted, setEmployeeDeleted] = useState<UserInfor>()
  // -------------------------- REDUX ---------------------------
  const employees = useAppSelector(employeeSelectors.selectAll);
  const activeEmployees = employees?.filter((e) => e.accountStatus !== false);
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchEmployeesAsync());
  }, [dispatch]);
  // -------------------------- FUNCTION ------------------------
  // -------------------------- MAIN ----------------------------
  return (
    <Box className={cx("wrapper")}>
      <Typography sx={{
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "30px",
      }}>
        Danh sách nhân viên
      </Typography>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid
          item
          xs={10}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid>
            <TextField size="small" label="Tìm kiếm..." />
          </Grid>

          <Grid>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              options={top100Films}
              // sx={{ width: 200, margin: "0 5px" }}
              renderInput={(params) => (
                <TextField {...params} label="Phòng ban" />
              )}
            />
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Button
            variant="contained"
            component={Link}
            to="/create-new-employee"
          >
            + Thêm nhân viên mới
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} className={cx("container")}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead className={cx("header")}>
            <TableRow>
              {tableHeadTitle.map((title, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {activeEmployees?.map(item => {
              return (
                <TableRow
                  key={item.staffId}
                >
                  <TableCell align="center" >
                    <Typography
                      sx={{ textDecoration: "none", color: "#000", fontSize: "14px" }}
                      component={Link}
                      to="">
                      {item.staffId}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" >
                    {/* <Box display="flex" justifyContent="center"><Avatar sx={{  bgcolor: deepOrange[500] }}>{item.firstName.charAt(0).toUpperCase()}</Avatar></Box> */}
                  </TableCell>

                  <TableCell align="center">
                    {`${item.lastName} ${item.firstName}`}
                  </TableCell>
                  <TableCell align="center">
                    {item.phone}
                  </TableCell>
                  <TableCell align="center">
                    {item.email}
                  </TableCell>
                  <TableCell align="center">
                    {item.isManager === false ?
                      (
                        <ChipCustome status="cancel">Nhân Viên</ChipCustome>
                      ) : (
                        <ChipCustome status="payment">Quản Lí</ChipCustome>
                      )}
                  </TableCell>
                  <TableCell align="center">
                    {item.accountStatus === true ? (
                      <ChipCustome status="waiting">Hiệu Lực</ChipCustome>
                    ) : (
                      <ChipCustome status="rejected">Hết hạn</ChipCustome>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {item.gender === true ? (
                      <ChipCustome status="approved">Nam</ChipCustome>
                    ) : (
                      <ChipCustome status="rejected">Nữ</ChipCustome>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {moment(item.dob).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    <Button color="error" onClick={() => {
                      setOpenDeleteDialog(true)
                    }}>
                      <ChipCustome status="rejected">
                        {/* <DeleteIcon sx={{fontSize:"14px"}}/> */}
                        Xóa
                      </ChipCustome>
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      component={Link}
                      to="" //need change
                    >
                      <CiCircleMore style={{ fontSize: "14px", color: "black" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
            {/* {activeEmployees?.map((employee) => (
              <StyledTableRow
                key={employee.staffId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center" component="th" scope="row" >
                  {employee.staffId}
                </StyledTableCell>
                <StyledTableCell align="center">
                  
                </StyledTableCell>
                <StyledTableCell align="center">{employee.fullName}</StyledTableCell>
                <StyledTableCell align="center">{employee.phone}</StyledTableCell>
                <StyledTableCell align="center">{employee.hireDate}</StyledTableCell>
                <StyledTableCell align="center">{employee.email}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button color="error" onClick={() => {
                    setOpenDeleteDialog(true)
                    setEmployeeDeleted(employee)
                  }}>
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button
                    sx={{ color: "black" }}
                    component={Link}
                    to={`/detail-employee/${employee.staffId}`}
                  >
                    <MoreHorizIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} item={employeeDeleted} />
    </Box>
  );
}
