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
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";

// fetch data
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useState } from "react";

// component
import {
  contractSelectors,
  fetchContractsAsync,
} from "../../app/store/contract/contractSlice";
import moment from "moment";

const top100Films = [{ label: "1", year: 1994 }, ``];

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
    "Ngày chỉnh sửa",
  ];
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  const contracts = useAppSelector(contractSelectors.selectAll);
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchContractsAsync());
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
        Danh sách hợp đồng
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
                <TextField {...params} label="Loại hợp đồng" />
              )}
            />
          </Grid>
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
            {contracts.map((contract) => (
              <StyledTableRow
                key={contract.staffId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {contract.staffId}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {contract.staff.fullName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {moment(contract.startDate).format("DD-MM-YYYY")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {moment(contract.endDate).format("DD-MM-YYYY")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {contract.contractType.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {contract.salary}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {/* {contract.allowances.map((allowance) => {
                    let total += Number(allowance?.)
                  })} */}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {contract.note}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    color="error"
                    onClick={() => {}}
                  >
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button
                    sx={{ color: "black" }}
                    component={Link}
                    to={`/detail-contract/${contract.staffId}`}
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
