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
  fetchContractsAsync,
} from "../../app/store/contract/contractSlice";
import { useLocation } from "react-router-dom";
import { setHeaderTitle } from "../../app/layout/headerSlice";

const fontStyle = "Mulish";

export default function DetailOwnContract() {
  // -------------------------- VAR -----------------------------
  const dispatch = useAppDispatch();
  const location = useLocation();
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  const currentUser = useAppSelector((state) => state.account);
  const staffId = Number(currentUser.user?.userInfor.staffId)
  const employee = useAppSelector((state) =>
    employeeSelectors.selectById(state, staffId)
  );
  const { employeesLoaded } = useAppSelector((state) => state.employee);

  const contract = useAppSelector((state) =>
    contractSelectors.selectById(state, currentUser.user?.userInfor.staffId!)
  );
  const { status, contractsLoaded } = useAppSelector((state) => state.contract);
  
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(setHeaderTitle([{ title: "Hợp đồng của tôi", path: "/own-contract" }]));
  }, [dispatch, location]);
  
  useEffect(() => {
    if(!employeesLoaded) dispatch(fetchEmployeeAsync(staffId));
    if (!contractsLoaded) dispatch(fetchContractsAsync());
  }, [dispatch, contractsLoaded, employeesLoaded]);
  // -------------------------- FUNCTION ------------------------
  if (status.includes("pending"))
    return <LoadingComponent message="Loading..." />;
  // -------------------------- MAIN ----------------------------
  return (
    <Container sx={{ padding: "2%", width: "80%", borderRadius: "8px" }}>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <Typography
            sx={{
              padding: "5px 0",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "30px",
              lineHeight: "39px",
              fontFamily: fontStyle,
            }}
          >
            Thông tin hợp đồng
          </Typography>
        </Grid>
      </Grid>

      <Container>
        <Grid
          container
          sx={{
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
        ></Grid>
      </Container>
    </Container>
  );
}
