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
    Box,
    LinearProgress,
  } from "@mui/material";
  import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import DeleteIcon from "@mui/icons-material/Delete";
  import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
  import { DataGrid, GridColDef } from "@mui/x-data-grid";
  import { employeeSelectors, fetchEmployeesAsync } from "../../app/store/employee/employeeSlice";
  import { UserInfor } from "../../app/models/userInfor";
  
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
  
  export default function ContractList() {
    // -------------------------- VAR -----------------------------
    const dispatch = useAppDispatch();
    const tableHeadTitle = [
      "MSNV",
      "Tên",
      "Ngày kí hđ",
      "Ngày hết hạn",
      "Loại hợp đồng",
      "Mức lương",
      "Tổng phụ cấp",
      "Ngày chỉnh sửa ",
    ];
    // -------------------------- STATE ---------------------------
    // -------------------------- REDUX ---------------------------
    const employees = useAppSelector(employeeSelectors.selectAll);
  
    console.log(employees);
    
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
        {/* <Box sx={{ width: "94%", margin: "0 auto", marginTop: "1%" }}>
        <DataGrid
          autoHeight
          density="standard"
          getRowId={(row: any) => row.leaveLogId}
          sx={{
            height: 700,
            //border: "none",
            color: "#000000",
            fontSize: 16,
            fontWeight: 550,
            fontFamily: "Mulish",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow effect
            backgroundColor: "rgba(255, 255, 255, 1)", // Set the opacity
          }}
          slots={{
            loadingOverlay: LinearProgress,
            //toolbar: CustomToolbar,
          }}
          loading={!logleavesLoaded || logLeaveAdded}
          rows={rows}
          columns={columns}
          //showCellVerticalBorder
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box> */}
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
              {employees.map((employee) => (
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
                    <Button color="error" onClick={() => {}}>
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
      </Container>
    );
  }
  