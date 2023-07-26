import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import {
  userInforSelectors,
  fetchUserInforsAsync,
  setUserInforAdded,
} from "../department/userInforSlice";
import { Card, Box, Typography, Grid } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
const cardStyle = {
  border: "1px solid #CFCFCF",
  borderRadius: "8px",
  padding: "20px 20px",
  mb: "20px",
  boxShadow: "none",
};
const fontStyle = "Mulish";
export default function UserInforSummary() {
  const { userInforsLoaded, userInforAdded } = useAppSelector((state) => state.userInfor);
  const userInfors = useAppSelector(userInforSelectors.selectAll);
  const dispatch = useAppDispatch();
  const [newAddedEmployeesCount, setNewAddedEmployeesCount] = useState<number>(0);
  useEffect(() => {
    if (!userInforsLoaded || userInforAdded) {
      dispatch(fetchUserInforsAsync());
      dispatch(setUserInforAdded(false));
    }
  }, [dispatch, userInforsLoaded, userInforAdded]);

  useEffect(() => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const newEmployees = userInfors.filter((userInfor) => {
      const joinDate = new Date(userInfor.hireDate); // Assuming you have a property named "joinDate" in the userInfor object
      return joinDate >= oneMonthAgo && joinDate <= today;
    });

    setNewAddedEmployeesCount(newEmployees.length);
  }, [userInfors]);
  return (
    <>
      <Card sx={cardStyle}>
        <Grid container xs={12}>
          <Grid container display={"flex"} justifyContent={"space-between"}>
            <Grid item>
              <Typography
                sx={{ fontFamily: fontStyle, fontWeight: "800", color: "#6D6D6D", pb: "10px" }}
              >
                Nhân viên
              </Typography>
              <Typography
                sx={{ fontFamily: fontStyle, fontWeight: "800", color: "#242424", pb: "10px" }}
              >
                {userInfors.length}
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ padding: "1px 7px", backgroundColor: "#D0E1FD", borderRadius: "8px" }}>
                <PeopleAltOutlinedIcon fontSize="small" sx={{ mt: "4px", color: "#3B82F6" }} />
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ fontFamily: fontStyle, fontWeight: "500", color: "#929292" }}>
              <span style={{ color: "#22C55E", fontWeight: 700 }}>
                {newAddedEmployeesCount} nhân viên mới
              </span>{" "}
              trong 1 tháng
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
