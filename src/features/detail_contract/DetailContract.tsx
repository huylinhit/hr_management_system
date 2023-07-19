import { useEffect } from "react";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { LuEdit } from "react-icons/lu";

// component
import LoadingComponent from "../../app/layout/LoadingComponent";
import DetailContractFooter from "./component/DetailContractFooter";
import DetailContractInfo from "./component/DetailContractInfo";
import DetailEmployeeInfo from "./component/DetailEmployeeInfo";

// data
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  employeeSelectors,
  fetchEmployeeAsync,
} from "../../app/store/employee/employeeSlice";
import {
  contractSelectors,
  fetchContractAsync,
} from "../../app/store/contract/contractSlice";
import { setHeaderTitle } from "../../app/layout/headerSlice";

export default function DetailContract() {
  // -------------------------- VAR -----------------------------
  const { id, staffid, prevpage } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  const employee = useAppSelector((state) =>
    employeeSelectors.selectById(state, Number(staffid))
  );
  const { status: employeeStatus, employeesLoaded } = useAppSelector((state) => state.employee);
  

  const contract = useAppSelector((state) =>
    contractSelectors.selectById(state, Number(staffid))
  );
  const { status: contractStatus, contractsLoaded } = useAppSelector((state) => state.contract);
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    if (!employeesLoaded) dispatch(fetchEmployeeAsync(Number(staffid)));
    if (!contractsLoaded) dispatch(fetchContractAsync(Number(staffid)));
  }, [dispatch, contractsLoaded, employeesLoaded]);

  useEffect(() => {
    if (prevpage === "list") {
      dispatch(
        setHeaderTitle([
          { title: "Hợp Đồng Nhân Viên", path: "/contracts" },
          { title: "Hợp đồng", path: "" },
        ])
      );
    } else if (prevpage === "staff") {
      dispatch(
        setHeaderTitle([
          { title: "Danh sách nhân viên", path: "/staffs" },
          { title: `${employee?.lastName} ${employee?.firstName}`, path: `/staffs/${employee?.staffId}` },
          { title: "Hợp đồng", path: "" },
        ])
      );
    }
  }, [dispatch, location]);
  // -------------------------- FUNCTION ------------------------
  if (contractStatus.includes("pending") && employeeStatus.includes("pending"))
    return <LoadingComponent message="Loading..." />;
  // -------------------------- MAIN ----------------------------
  return (
    <Box sx={{ padding: "10px 30px 30px 30px", width: "calc(100vh - 240)" }}>
      <Grid container>
        <Typography
          sx={{
            padding: "5px 0",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "30px",
            lineHeight: "39px",
          }}
        >
          Thông tin hợp đồng
        </Typography>
        <IconButton
          aria-label="delete"
          sx={{ padding: "10px 10px 20px 10px" }}
          component={Link}
          to={`/contracts/${id}/staffs/${staffid}/${prevpage}/edit`}
        >
          <LuEdit style={{ fontSize: "25px", color: "#007FFF" }} />
        </IconButton>
      </Grid>

      <Container
        sx={{
          backgroundColor: "white",
          padding: "15px",
        }}
      >
        <Grid
          container
          sx={{
            borderRadius: "15px",
            border: "1px solid #E2E1E5",
            background: "#FFF",
            margin: "0 10px",
            maxWidth: "1085px",
            padding: "10px 20px",
          }}
        >
          <Grid item sx={{ width: "100%", paddingTop: "25px" }}>
            <DetailEmployeeInfo employee={employee} />
          </Grid>

          <Grid
            item
            sx={{ width: "100%", paddingTop: "10px", paddingBottom: "25px" }}
          >
            <DetailContractInfo contract={contract} employee={employee} />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            margin: "0 10px",
            padding: "30px 20px 0 30px",
          }}
        >
          <DetailContractFooter employee={employee} prevpage={prevpage} />
        </Grid>
      </Container>
    </Box>
  );
}
