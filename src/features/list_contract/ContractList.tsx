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
import { Allowance } from "../../app/models/allowance";
import { CiCircleMore } from "react-icons/ci";
import ChipCustome from "../../app/components/Custom/Chip/ChipCustome";
import styles from '../payslip/component/payslip.module.scss'
import classNames from "classnames/bind";
import LoadingComponent from "../../app/layout/LoadingComponent";

const cx = classNames.bind(styles);



const top100Films = [{ label: "1", year: 1994 }, ``];

export default function ContractList() {
  const { contractsLoaded, status } = useAppSelector(state => state.contract)
  // -------------------------- VAR -----------------------------
  const dispatch = useAppDispatch();
  const tableHeadTitle = [
    "Id",
    "MSNV",
    "Tên",
    "Ngày Kí HĐ",
    "Ngày Hết Hạn",
    "Loại Hợp Đồng",
    "Loại Lương",
    "Mức Lương Thỏa Thuận",
    "Mức Lương Đóng Thuế",
    "Người Phụ Thuộc",
    "Trạng Thái",
    "Tổng Phụ Cấp",
    "Ngày Thay Đổi",
    "Ghi Chú",
  ];
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  const contracts = useAppSelector(contractSelectors.selectAll);
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    if (!contractsLoaded)
      dispatch(fetchContractsAsync());
  }, [contractsLoaded, dispatch]);
  // -------------------------- FUNCTION ------------------------
  const calcTotalAllowance = (allowances: Array<Allowance>) => {
    let total = 0

    allowances.forEach((allowance) => {
      total = total + allowance.allowanceSalary
    })

    return total
  }

  if(status.includes('pending')) return <LoadingComponent message="Đang Tải Hợp Đồng ..."/>
  // -------------------------- MAIN ----------------------------
  return (
    <Box className={cx("wrapper")}>
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

      <TableContainer component={Paper} className={cx("container")}>
        <Table sx={{ minWidth: 700 }} >
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
            {contracts?.map(item => {
              const date = new Date(item.changeAt);
              const allowances = item.allowances.reduce((total, c) =>
                total + c.allowanceSalary,
                0)
              return (
                <TableRow
                  key={item.contractId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" >
                    <Typography
                      sx={{ textDecoration: "none", color: "#000", fontSize: "14px" }}
                      component={Link}
                      to={`${item.contractId}/staffs/${item.staffId}`}>
                      {item.contractId}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ textDecoration: "none", color: "#000" }}>
                    <Typography
                      sx={{ textDecoration: "none", color: "#000", fontSize: "14px" }}
                      component={Link}
                      to={`${item.contractId}/staffs/${item.staffId}`}>
                      {item.staffId}
                    </Typography>
                  </TableCell>
                  {/* <TableCell align="center">
                                    <Avatar alt={item.staff.firstName} src="/static/images/avatar/1.jpg" />
                                </TableCell> */}
                  <TableCell align="center">{`${item.staff.lastName} ${item.staff.firstName}`}</TableCell>
                  {/* <TableCell align="center">Gross To Net</TableCell> */}
                  <TableCell align="center">
                    <ChipCustome status="payment">
                      {moment(item.startDate).format("DD-MM-YYYY")}
                    </ChipCustome>
                  </TableCell>
                  <TableCell align="center">
                    <ChipCustome status="payment">
                      {moment(item.endDate).format("DD-MM-YYYY")}
                    </ChipCustome>
                  </TableCell>
                  <TableCell align="center">
                    {item.contractId === 1 &&
                      <ChipCustome status="approved">{item.contractType.name}</ChipCustome>}
                    {item.contractId === 2 &&
                      <ChipCustome status="waiting">{item.contractType.name}</ChipCustome>}
                  </TableCell>
                  <TableCell align="center">
                    {item.salaryType === 'Gross To Net' &&
                      <ChipCustome status="approved">{item.salaryType}</ChipCustome>}
                    {item.salaryType === 'Net To Gross' &&
                      <ChipCustome status="waiting">{item.salaryType}</ChipCustome>}
                  </TableCell>
                  <TableCell align="center">
                    <ChipCustome status="withdrawn">
                      {item.salary.toLocaleString()}
                    </ChipCustome>
                  </TableCell>
                  <TableCell align="center">
                    <ChipCustome status="withdrawn">
                      {item.taxableSalary.toLocaleString()}
                    </ChipCustome>
                  </TableCell>
                  <TableCell align="center">
                    {item.noOfDependences}
                  </TableCell>
                  <TableCell align="center">
                    {item.contractStatus === true ? (
                      <ChipCustome status="waiting">Hiệu Lực</ChipCustome>
                    ) : (
                      <ChipCustome status="rejected">Hết Hạn</ChipCustome>
                    )
                    }
                  </TableCell>
                  <TableCell align="center">
                    {allowances.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {moment(item.createAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    {item.note}
                  </TableCell>
                </TableRow>
              )
            })}
            {/* {contracts.map((contract) => (
              <StyledTableRow
                key={contract.staffId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {contract.staffId}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {contract.staff.lastName} {contract.staff.firstName}
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
                  {calcTotalAllowance(contract.allowances)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {contract.noOfDependences}
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
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
