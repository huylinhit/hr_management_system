import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import {
  userInforSelectors,
  fetchUserInforsAsync,
  setUserInforAdded,
} from "../department/userInforSlice";
import { Card, Box, Typography, Grid } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { candidatesSelectors, fetchCandidatesAsync } from "../candidate/candidateSlice";
const cardStyle = {
  border: "1px solid #CFCFCF",
  borderRadius: "8px",
  padding: "20px 20px",
  mb: "20px",
  boxShadow: "none",
};
const fontStyle = "Mulish";
export default function CandidateSummary() {
  const { candidatesLoaded, candidateAdded } = useAppSelector((state) => state.candidate);
  const candidates = useAppSelector(candidatesSelectors.selectAll);
  const dispatch = useAppDispatch();
  const [newAddedEmployeesCount, setNewAddedEmployeesCount] = useState<number>(0);
  useEffect(() => {
    if (!candidatesLoaded || candidateAdded) {
      dispatch(fetchCandidatesAsync());
    }
  }, [dispatch, candidatesLoaded, candidateAdded]);

  useEffect(() => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const newEmployees = candidates.filter((candidate) => {
      const joinDate = new Date(candidate.applyDate); // Assuming you have a property named "joinDate" in the userInfor object
      return joinDate >= oneMonthAgo && joinDate <= today;
    });

    setNewAddedEmployeesCount(newEmployees.length);
  }, [candidates]);
  return (
    <>
      <Card sx={cardStyle}>
        <Grid container xs={12}>
          <Grid container display={"flex"} justifyContent={"space-between"}>
            <Grid item>
              <Typography
                sx={{ fontFamily: fontStyle, fontWeight: "800", color: "#6D6D6D", pb: "10px" }}
              >
                Ứng viên
              </Typography>
              <Typography
                sx={{ fontFamily: fontStyle, fontWeight: "800", color: "#242424", pb: "10px" }}
              >
                {candidates.length}
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ padding: "1px 7px", backgroundColor: "#C3EDF5", borderRadius: "8px" }}>
                <PeopleAltOutlinedIcon fontSize="small" sx={{ mt: "4px", color: "#3DC7E7" }} />
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ fontFamily: fontStyle, fontWeight: "500", color: "#929292" }}>
              <span style={{ color: "#22C55E", fontWeight: 700 }}>
                {newAddedEmployeesCount} ứng viên mới
              </span>{" "}
              trong 1 tháng
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
