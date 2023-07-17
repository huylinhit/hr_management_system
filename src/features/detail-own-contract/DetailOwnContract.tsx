import { useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

// component
import LoadingComponent from "../../app/layout/LoadingComponent";
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

export default function DetailOwnContract() {
  // -------------------------- VAR -----------------------------
  const dispatch = useAppDispatch();
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  const currentUser = useAppSelector((state) => state.account);
  const staffId = Number(currentUser.user?.userInfor.staffId)
  const employee = useAppSelector((state) =>
    employeeSelectors.selectById(state, staffId)
  );
  const { employeesLoaded } = useAppSelector((state) => state.employee);

  const contract = useAppSelector((state) =>
    contractSelectors.selectById(state, staffId)
  );
  const { status, contractsLoaded } = useAppSelector((state) => state.contract);
  console.log(contract);
  
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    if(!employeesLoaded) dispatch(fetchEmployeeAsync(staffId));
    if (!contractsLoaded) dispatch(fetchContractAsync(staffId));
  }, [dispatch, contractsLoaded, employeesLoaded]);
  // -------------------------- FUNCTION ------------------------
  if (status.includes("pending"))
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
      </Container>
    </Box>
  );
}
