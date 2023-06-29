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
    Avatar,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
  import { Link } from "react-router-dom";
  
  // fetch data
  import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
  import { useEffect, useState } from "react";
  import {
    employeeSelectors,
    fetchEmployeesAsync,
  } from "../../app/store/employee/employeeSlice";
  
  // component
  import DeleteDialog from "./component/DeleteDialog";
  
  // style
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
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  
export default function ContractList () {
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
    const [employeeDelete, setEmployeeDelete] = useState({});
    // -------------------------- REDUX ---------------------------
    const employees = useAppSelector(employeeSelectors.selectAll);
    // -------------------------- EFFECT --------------------------
    useEffect(() => {
      dispatch(fetchEmployeesAsync());
    }, [dispatch]);
    // -------------------------- FUNCTION ------------------------
    // -------------------------- MAIN ----------------------------
    return (
        <Container sx={{ padding: "15px 0" }}>
      <Typography
        sx={{
          paddingTop: "5px",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "30px",
          lineHeight: "39px",
        }}
      >
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
              options={employees}
              sx={{ width: 200, margin: "0 5px", backgroundColor: "#FFFFFF" }}
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

      <TableContainer component={Paper}>
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
            {employees.map((employee) => (
              <StyledTableRow
                key={employee.staffId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {employee.staffId}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.imageFile === "" ? (
                    <Avatar>
                      {employee.firstName.charAt(0).toUpperCase()}
                    </Avatar>
                  ) : (
                    <Avatar src={employee.imageFile} />
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.lastName} {employee.firstName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.phone}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.hireDate}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.userId}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    color="error"
                    onClick={() => {
                      setEmployeeDelete(employee);
                      setOpenDeleteDialog(true);
                    }}
                  >
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
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        item={employeeDelete}
      />
    </Container>
    )
}