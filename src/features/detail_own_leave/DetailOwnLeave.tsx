import { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

// component
import DetailLeaveFooter from "./component/DetailLeaveFooter";

// data
import { LEAVELOG } from "../../app/store/data";

// api

import { LeaveLog } from "../../app/models/leaveLog";

export default function DetailOwnLeave() {
  // -------------------------- VAR -----------------------------
  //const [logLeave, setLogLeave] = useState<LeaveLog>(LEAVELOG);
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  // -------------------------- MAIN ----------------------------
  return (
    // <Box sx={{ padding: "10px 30px 30px 30px", width: "calc(100vh - 240)" }}>
    //   <Grid>
    //     <Typography
    //       sx={{
    //         paddingTop: "5px",
    //         fontStyle: "normal",
    //         fontWeight: "700",
    //         fontSize: "30px",
    //         lineHeight: "39px",
    //       }}
    //     >Đơn xin nghỉ phép</Typography>
    //     <Typography
    //       sx={{
    //         paddingBottom: "15px",
    //         fontStyle: "normal",
    //         fontWeight: "500",
    //         fontSize: "20px",
    //         lineHeight: "20px",
    //       }}
    //     >Mã đơn - {logLeave.leaveLogId}</Typography>
    //   </Grid>

    //   <Container>
    //     <Grid
    //       container
    //       sx={{
    //         border: "1px solid #E2E1E5",
    //         backgroundColor: "white",
    //         borderRadius: "30px",
    //         padding: "20px 45px",
    //         margin: "5px 0",
    //       }}
    //     >
    //       <Grid item sx={{ width: "100%", padding: "30px 50px 0 50px" }}>
    //         {/* <DetailLeaveContent logLeave={logLeave} types={types} /> */}
    //       </Grid>
    //       <Grid item sx={{ width: "100%" }}>
    //         <DetailLeaveFooter logLeave={logLeave}/>
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </Box>
    <></>
  );
}
