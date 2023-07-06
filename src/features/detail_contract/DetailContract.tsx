import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { LuEdit } from "react-icons/lu";

// component
import DetailContractInfo from "./component/DetailContractInfo";
import DetailEmployeeInfo from "./component/DetailEmployeeInfo";

// data
import DetailContractFooter from "./component/DetailContractFooter";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { employeeSelectors, fetchEmployeeAsync } from "../../app/store/employee/employeeSlice";
import { contractSelectors, fetchContractAsync, fetchContractValidDetailASync } from "../../app/store/contract/contractSlice";
import { Link } from "react-router-dom";

export default function DetailContract() {
  // -------------------------- VAR -----------------------------
  const id = 1
  // const { id } = useParams();
  const dispatch = useAppDispatch()
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  const employee = useAppSelector((state) => employeeSelectors.selectById(state, id));  
  const contract = useAppSelector((state) => contractSelectors.selectById(state, id));
  console.log(contract);
    
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchEmployeeAsync(Number(id)));
    dispatch(fetchContractValidDetailASync(Number(id)));
  }, [dispatch]);
  // -------------------------- FUNCTION ------------------------
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
        <IconButton aria-label="delete" sx={{ padding: "10px 10px 20px 10px" }} 
         component={Link}
                    to={`/edit-contract/${contract?.contractId}`}
        >
          <LuEdit style={{ fontSize: "25px", color: "#007FFF" }} />
        </IconButton>
      </Grid>

      <Container
        sx={{
          boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
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
        <Grid container sx={{
            margin: "0 10px",
            padding: "30px 20px 0 30px",
          }}>
            <DetailContractFooter/>
          </Grid>
      </Container>
    </Box>
  );
}
