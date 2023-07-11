import { useEffect } from "react";
import { Box, Grid, Typography, Container, IconButton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { LuEdit } from "react-icons/lu";

// component
import DetailAva from "./component/DetailAva";
import DetailContact from "./component/DetailContact";
import DetailInfo from "./component/DetailInfo";
import DetailSkill from "./component/DetailSkill";
import DetailEmployeeFooter from "./component/DetailEmployeeFooter";

// data
import { employeeSelectors, fetchEmployeeAsync } from "../../app/store/employee/employeeSlice";
import { contractSelectors, fetchContractsAsync } from "../../app/store/contract/contractSlice";

export default function DetailEmployee() {
  // -------------------------- VAR -----------------------------
  const { id } = useParams();
  const dispatch = useAppDispatch()
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  const employee = useAppSelector((state) => employeeSelectors.selectById(state, id!));  
  const contracts = useAppSelector(contractSelectors.selectAll);
  const { contractsLoaded } = useAppSelector((state) => state.contract)
  const isExistContract = contracts.find((contract) => contract.staffId === Number(id))  
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchEmployeeAsync(Number(id)));
  }, [dispatch]);

  useEffect(() => {
    if(!contractsLoaded) dispatch(fetchContractsAsync());
  }, [dispatch, contractsLoaded]);
  // -------------------------- FUNCTION ------------------------
  // -------------------------- MAIN ----------------------------
  return (
    <Box sx={{ padding: "10px 30px 30px 30px", width: "calc(100vh - 240)" }}>
      <Grid container>
        <Typography
          sx={{
            padding: "5px 0 15px 0",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "30px",
            lineHeight: "39px",
          }}
        >
          Thông tin nhân viên
        </Typography>
        <IconButton
          aria-label="delete"
          sx={{ padding: "10px 10px 20px 10px" }}
          component={Link}
          to={`/edit-employee/${employee?.staffId}`}
        >
          <LuEdit style={{ fontSize: "25px", color: "#007FFF" }} />
        </IconButton>
      </Grid>

      <Container>
        <Grid
          container
          sx={{
            border: "1px solid #E2E1E5",
            borderRadius: "20px",
            backgroundColor: "white",
            padding: "20px 45px 20px 45px",
          }}
        >
          <Grid
            item
            sx={{ width: "100%", paddingTop: "10px", paddingBottom: "15px" }}
          >
            <DetailAva employee={employee} isExistContract={!!isExistContract} />
          </Grid>

          <hr
            style={{
              background: "#E2E1E5",
              color: "#E2E1E5",
              borderColor: "#E2E1E5",
              height: "1px",
              width: "1000px",
            }}
          />
          <Grid
            item
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "15px 30px 0 30px",
            }}
          >
            <Grid item xs={5}>
              <DetailInfo employee={employee} />
            </Grid>

            <Grid item xs={1}>
              <hr
                style={{
                  background: "#E2E1E5",
                  color: "#E2E1E5",
                  borderColor: "#E2E1E5",
                  height: "350px",
                  width: "1px",
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <DetailContact employee={employee} />
              <DetailSkill employee={employee} />
            </Grid>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <DetailEmployeeFooter />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
