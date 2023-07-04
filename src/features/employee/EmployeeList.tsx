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
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { employeeSelectors, fetchEmployeesAsync } from "../../app/store/employee/employeeSlice";
import { UserInfor } from "../../app/models/userInfor";
import DeleteDialog from "./component/DeleteDialog";

const top100Films = [
  { label: "1", year: 1994 },
  ``,
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "5px",
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
  const dispatch = useAppDispatch();
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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [employeeDeleted, setEmployeeDeleted] = useState<UserInfor>()
  // -------------------------- REDUX ---------------------------
  const employees = useAppSelector(employeeSelectors.selectAll);  
  const activeEmployees = employees?.filter((e) => e.accountStatus !== false);
  console.log(activeEmployees);
  
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchEmployeesAsync());
  }, [dispatch]);
  // -------------------------- FUNCTION ------------------------
  // -------------------------- MAIN ----------------------------
  return (
    <Container sx={{ padding: "15px 0" }}>
      <Typography sx={{
            paddingTop: "5px",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "30px",
            lineHeight: "39px",
          }}>
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
          <Grid sx={{ margin: "0 5px" }}>
            <TextField size="small" label="Tìm kiếm..." />
          </Grid>

          <Grid>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              options={top100Films}
              sx={{ width: 200, margin: "0 5px" }}
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

      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">

          <TableHead>
            <TableRow sx={{ background: "black" }}>
              {tableHeadTitle.map((title, index) => (                
                <StyledTableCell
                  key={index}
                  sx={{ color: "white", fontSize: "15px" }}
                  align="center"
                >
                  {title}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {activeEmployees?.map((employee) => (
              <StyledTableRow
                key={employee.staffId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center" component="th" scope="row" >
                  {employee.staffId}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* {employee.} */}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} item={employeeDeleted}/>
    </Container>
  );
}
