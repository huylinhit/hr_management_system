import BarChart from "./BarChart";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import MyResponsiveLine from "./LineChart";
import UserInforSummary from "./UserInforChart";
import DepartmentSummary from "./DepartmentSummary";
import CandidateSummary from "./CandidateSummary";
import TicketSummary from "./TicketsSummary";
import StaffList from "../employee/StaffList";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PayslipsMiniTable from "./PayslipsMiniTable";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { setHeaderTitle } from "../../app/layout/headerSlice";
import { useAppDispatch } from "../../app/store/configureStore";
const cardStyle = {
  border: "1px solid #CFCFCF",
  borderRadius: "8px",
  padding: "3% 4%",
  mb: "20px",
  boxShadow: "none",
};
const fontStyle = "Mulish";
export default function DashBoard() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(setHeaderTitle([{ title: "Dashboard", path: "" }]));
  }, [location, dispatch]);

  return (
    <>
      <Grid container xs={12} columnSpacing={2.5} sx={{ pl: "50px", pr: "20px", pt: "40px" }}>
        <Grid item xs={3}>
          <UserInforSummary />
        </Grid>

        <Grid item xs={3}>
          <DepartmentSummary />
        </Grid>

        <Grid item xs={3}>
          <CandidateSummary />
        </Grid>

        <Grid item xs={3}>
          <TicketSummary />
        </Grid>

        <Grid item xs={6}>
          <PayslipsMiniTable />
        </Grid>

        <Grid item xs={6}>
          <Grid mb={"2vh"}>
            <MyResponsiveLine />
          </Grid>
          <Grid>
            <Button
              variant="contained"
              fullWidth
              component={NavLink}
              to="/payslips"
              sx={{
                textTransform: "none",
                height: "13vh",
                background: "linear-gradient(45deg, #41A9FE 30%, #6877FE 90%)",
                color: "#ffffff", // Set the text color to white
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pl: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    //flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <PeopleAltOutlinedIcon
                    sx={{
                      mr: "10px",
                      fontSize: "35px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: "18px",
                      fontFamily: fontStyle,
                    }}
                  >
                    Đi tới bảng lương của nhân viên
                  </Typography>
                </Box>
              </Box>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
